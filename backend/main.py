from fastapi import FastAPI
from pydantic import BaseModel
from database import init_db, get_readings, save_reading, get_readings_by_date, delete_reading
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

init_db()


class TemperatureReading(BaseModel):
    timestamp:str
    room_temp:float
    pi_temp:float


@app.get("/")
def home():
    return {
        "msg": "hello world"
    }

@app.get("/api/temp")
def get_temp():
    readings = get_readings()
    temp_lst = []
    for timestamp, room_temp, pi_temp in readings:
        temp_lst.append(
            {
                "timestamp": timestamp,
                "room_temp": room_temp,
                "pi_temp": pi_temp
            }
        )
    return temp_lst

@app.get("/api/temp/date")
def get_temp_by_date(date: date):
    readings = get_readings_by_date(date.isoformat())
    temp_lst = []
    for timestamp, room_temp, pi_temp in readings:
        temp_lst.append({
            "timestamp": timestamp,
            "room_temp": room_temp,
            "pi_temp": pi_temp
        })

    return temp_lst

@app.post("/api/temp")
def add_temperature(reading: TemperatureReading):
    save_reading(reading.timestamp, reading.room_temp, reading.pi_temp)
    return {"message":"temperature saved"}

@app.delete("/api/del")
def delete_datetime(datetime: str):
    count = delete_reading(datetime)

    if count == 0:
        return {"message": "no entries found"}

    return {"message": f"deleted {datetime}"}