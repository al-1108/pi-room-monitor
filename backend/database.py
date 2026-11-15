import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "data" / "temperatures.db"

def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS readings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL UNIQUE,
                room_temp REAL NOT NULL
            )
        """)
#pi_temp REAL NOT NULL

def save_reading(time, room_temp):
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            INSERT OR IGNORE INTO readings 
            (timestamp, room_temp)
            VALUES (?, ?)""", (time, room_temp))

def get_readings():
    with sqlite3.connect(DB_PATH) as conn:
        return conn.execute("""
            SELECT timestamp, room_temp
            FROM readings
            ORDER BY timestamp
        """).fetchall()

def get_readings_by_date(date):
    with sqlite3.connect(DB_PATH) as conn:
        return conn.execute("""
            SELECT timestamp, room_temp
            FROM readings
            WHERE timestamp LIKE ?
            ORDER BY timestamp""",
            (f"{date}%",)).fetchall()




# if __name__ == "__main__":
#     init_db()

#     save_reading("2026-11-14T12:00:00", 22.5)
#     save_reading("2026-11-14T12:05:00", 22.7)

#     print(get_readings())