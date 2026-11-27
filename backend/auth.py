"""Email and password authentication for the COVID-19 assistant."""

from __future__ import annotations

import base64
import hashlib
import hmac
import os
import secrets
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from typing import Literal

import jwt
from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, EmailStr, Field, field_validator
from backend.database import get_db, init_db


router = APIRouter(prefix="/auth", tags=["authentication"])
bearer_scheme = HTTPBearer(auto_error=False)

_configured_jwt_secret = os.getenv("JWT_SECRET_KEY")
if _configured_jwt_secret and (
    len(_configured_jwt_secret) < 32 or "replace-with" in _configured_jwt_secret.lower()
):
    raise RuntimeError("JWT_SECRET_KEY must be a private value with at least 32 characters.")
_JWT_SECRET = _configured_jwt_secret or secrets.token_urlsafe(48)
_JWT_ALGORITHM = "HS256"
_ACCESS_TOKEN_MINUTES = int(os.getenv("ACCESS_TOKEN_MINUTES", "60"))
_AUTH_COOKIE_NAME = "access_token"
_COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"
_PASSWORD_HASH_ITERATIONS = 600_000
class SignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    role: Literal["Citizen", "Healthcare Worker", "Student / Researcher"] = "Citizen"

    @field_validator("name")
    @classmethod
    def trim_name(cls, value: str) -> str:
        value = value.strip()
        if len(value) < 2:
            raise ValueError("Enter your full name.")
        return value


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class PublicUser(BaseModel):
    id: str
    name: str
    email: str
    role: str


class AuthResponse(BaseModel):
    success: bool = True
    user: PublicUser


def _connect() -> sqlite3.Connection:
    return get_db()


@contextmanager
def _connection():
    connection = _connect()
    try:
        with connection:
            yield connection
    finally:
        connection.close()


def initialize_auth_database() -> None:
    """Create the local users table on application startup."""
    init_db()


def _hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, _PASSWORD_HASH_ITERATIONS)
    return "$".join(
        (
            str(_PASSWORD_HASH_ITERATIONS),
            base64.urlsafe_b64encode(salt).decode("ascii"),
            base64.urlsafe_b64encode(digest).decode("ascii"),
        )
    )


def _verify_password(password: str, stored_hash: str) -> bool:
    try:
        iterations, salt_text, digest_text = stored_hash.split("$", 2)
        salt = base64.urlsafe_b64decode(salt_text.encode("ascii"))
        expected_digest = base64.urlsafe_b64decode(digest_text.encode("ascii"))
        actual_digest = hashlib.pbkdf2_hmac(
            "sha256", password.encode("utf-8"), salt, int(iterations)
        )
    except (ValueError, TypeError):
        return False
    return hmac.compare_digest(actual_digest, expected_digest)


def _public_user(row: sqlite3.Row) -> PublicUser:
    return PublicUser(id=str(row["id"]), name=row["name"], email=row["email"], role=row["role"])


def _issue_access_token(user_id: str) -> str:
    now = datetime.now(timezone.utc)
    return jwt.encode(
        {"sub": user_id, "iat": now, "exp": now + timedelta(minutes=_ACCESS_TOKEN_MINUTES)},
        _JWT_SECRET,
        algorithm=_JWT_ALGORITHM,
    )


def _auth_response(row: sqlite3.Row, response: Response) -> AuthResponse:
    response.set_cookie(
        key=_AUTH_COOKIE_NAME,
        value=_issue_access_token(str(row["id"])),
        max_age=_ACCESS_TOKEN_MINUTES * 60,
        httponly=True,
        secure=_COOKIE_SECURE,
        samesite="lax",
        path="/",
    )
    return AuthResponse(user=_public_user(row))


def _find_user_by_email(email: str) -> sqlite3.Row | None:
    with _connection() as connection:
        return connection.execute(
            "SELECT id, name, email, hashed_pw, role FROM users WHERE email = ? COLLATE NOCASE",
            (email.strip().lower(),),
        ).fetchone()


def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> PublicUser:
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Please sign in to continue.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = None
    if credentials is not None and credentials.scheme.lower() == "bearer":
        token = credentials.credentials
    if not token:
        token = request.cookies.get(_AUTH_COOKIE_NAME)
    if not token:
        raise unauthorized
    try:
        payload = jwt.decode(token, _JWT_SECRET, algorithms=[_JWT_ALGORITHM])
        user_id = payload.get("sub")
    except jwt.InvalidTokenError:
        raise unauthorized from None
    if not isinstance(user_id, str):
        raise unauthorized
    try:
        user_id = int(user_id)
    except ValueError:
        raise unauthorized from None
    if user_id < 1:
        raise unauthorized
    with _connection() as connection:
        row = connection.execute(
            "SELECT id, name, email, role FROM users WHERE id = ?", (user_id,)
        ).fetchone()
    if row is None:
        raise unauthorized
    return _public_user(row)


@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, response: Response) -> AuthResponse:
    email = str(payload.email).strip().lower()
    password_hash = _hash_password(payload.password)
    try:
        with _connection() as connection:
            connection.execute(
                "INSERT INTO users (name, email, hashed_pw, role, created_at) VALUES (?, ?, ?, ?, ?)",
                (
                    payload.name,
                    email,
                    password_hash,
                    payload.role,
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
            user_id = connection.execute("SELECT last_insert_rowid()").fetchone()[0]
            row = connection.execute(
                "SELECT id, name, email, role FROM users WHERE id = ?", (user_id,)
            ).fetchone()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=409, detail="An account with this email already exists.") from None
    return _auth_response(row, response)


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, response: Response) -> AuthResponse:
    row = _find_user_by_email(str(payload.email))
    if row is None or not row["hashed_pw"] or not _verify_password(payload.password, row["hashed_pw"]):
        raise HTTPException(status_code=401, detail="Email or password is incorrect.")
    return _auth_response(row, response)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response) -> Response:
    response.delete_cookie(
        key=_AUTH_COOKIE_NAME,
        httponly=True,
        secure=_COOKIE_SECURE,
        samesite="lax",
        path="/",
    )
    response.status_code = status.HTTP_204_NO_CONTENT
    return response


@router.get("/me", response_model=PublicUser)
def current_user(user: PublicUser = Depends(get_current_user)) -> PublicUser:
    return user
