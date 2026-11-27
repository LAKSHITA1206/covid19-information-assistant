"""SQLite connection and schema helpers."""

import os
import sqlite3
from pathlib import Path


_BACKEND_DIR = Path(__file__).resolve().parent
DB_PATH = Path(os.getenv("DATABASE_PATH", str(_BACKEND_DIR / "data" / "assistant.db")))


def get_db() -> sqlite3.Connection:
    """Return a configured connection, creating the database directory if needed."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH, timeout=10)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def init_db() -> None:
    """Create or update the account table without discarding existing profile fields."""
    connection = get_db()
    try:
        with connection:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL,
                    hashed_pw TEXT,
                    name TEXT,
                    gender TEXT,
                    age INTEGER,
                    google_sub TEXT,
                    role TEXT NOT NULL DEFAULT 'Citizen',
                    created_at TEXT
                )
                """
            )
            columns = {
                row["name"] for row in connection.execute("PRAGMA table_info(users)").fetchall()
            }
            if "role" not in columns:
                connection.execute(
                    "ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'Citizen'"
                )
            if "created_at" not in columns:
                connection.execute("ALTER TABLE users ADD COLUMN created_at TEXT")
            connection.execute(
                "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_nocase ON users(email COLLATE NOCASE)"
            )
    finally:
        connection.close()
