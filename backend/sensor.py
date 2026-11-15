import random, time
from datetime import datetime, timedelta
from database import init_db, save_reading


def read_mock_temp():
    return round(random.uniform(20, 25), 2)

def read_temp():
    pass

def run_sensor():
    init_db()
    while True:
        now = datetime.now()

        next_min = (now.minute // 5 + 1) * 5
        # next_min = (now.minute + 1)

        next_reading = now.replace(
            minute=0,
            second=0,
            microsecond=0
        ) + timedelta(minutes=next_min)
        time.sleep((next_reading-now).total_seconds())


        room_temp = read_mock_temp()


        save_reading(f"{next_reading.isoformat()}", room_temp)
        print(f"{next_reading.isoformat()}: {room_temp}C")


if __name__ == "__main__":
    run_sensor()