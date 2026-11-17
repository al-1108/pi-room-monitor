import random, time
from datetime import datetime, timedelta
from database import init_db, save_reading
from Freenove_DHT import DHT


def read_mock_temp():
    return round(random.uniform(20, 25), 2)

def read_temp():
    dht = DHT(17)

    while True:
        if dht.readDHT11() == 0:
            temp = dht.getTemperature()

            if temp != -999.0:
                return temp
        time.sleep(1)

def read_cpu_temp():
    with open("/sys/class/thermal/thermal_zone0/temp") as f:
        return int(f.read().strip()) / 1000

def run_sensor():
    init_db()
    while True:
        now = datetime.now()

        # next_min = (now.minute // 5 + 1) * 5
        next_min = (now.minute + 1)

        next_reading = now.replace(
            minute=0,
            second=0,
            microsecond=0
        ) + timedelta(minutes=next_min)
        time.sleep((next_reading-now).total_seconds())


        room_temp = read_temp()
        pi_temp = read_cpu_temp()


        save_reading(f"{next_reading.isoformat()}", room_temp, pi_temp)
        print(f"{next_reading.isoformat()}: {room_temp}C")
        print(f"CPU temp: {pi_temp}")



if __name__ == "__main__":
    run_sensor()