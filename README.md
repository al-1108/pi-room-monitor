# Pi Room Monitor

Full-stack temperature monitoring dashboard built with Next.js, React, FastAPI, and SQLite, designed for deployment on a Raspberry Pi 5.

Uses a DHT11 temperature and humidity sensor connected to the Raspberry Pi 5.

## Hardware & Additional Dependencies

- Raspberry Pi 5
- DHT11 temperature and humidity sensor
- Breadboard
- Raspberry Pi GPIO extension board and ribbon cable
- Jumper wires
- 10kΩ resistor
- Freenove DHT11 library (`Freenove_DHT.py` and `libdht.so`)
- Python 3, Node.js, and npm

## 1. Set Up the Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 2. Start Sensor

```bash
cd backend
source .venv/bin/activate
python sensor.py
```

## 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

dashboard at `http://localhost:3000`.