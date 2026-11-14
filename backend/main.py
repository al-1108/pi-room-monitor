from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "msg": "hello world"
    }

@app.get("/latest_temp")
def get_latest_temp():
    return {
        "temp": 22,
        "time": "smth"
    }