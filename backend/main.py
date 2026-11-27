"""FastAPI application entry point."""

import os
from datetime import datetime, timezone

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.auth import PublicUser, get_current_user, initialize_auth_database, router as auth_router


class ChatRequest(BaseModel):
    conversation_id: str = Field(min_length=1, max_length=100)
    message: str = Field(min_length=1, max_length=4000)


class ChatReply(BaseModel):
    id: str
    role: str = "assistant"
    text: str
    sources: list[str]
    timestamp: str


app = FastAPI(
    title="COVID-19 Information Assistant API",
    version="1.0.0",
    description="Authentication and API services for the COVID-19 Information Assistant.",
)

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(auth_router)


@app.on_event("startup")
def prepare_database() -> None:
    initialize_auth_database()


@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/chat", response_model=ChatReply, tags=["assistant"])
def chat(request: ChatRequest, _user: PublicUser = Depends(get_current_user)) -> ChatReply:
    """Authenticated placeholder until a health-answer provider is configured."""
    return ChatReply(
        id=f"reply-{int(datetime.now(timezone.utc).timestamp() * 1000)}",
        text=(
            "Your question was received. Connect a verified health guidance provider "
            "to enable evidence-based answers. For urgent or personal medical concerns, "
            "contact a qualified healthcare professional."
        ),
        sources=[],
        timestamp=datetime.now().strftime("%I:%M %p"),
    )
