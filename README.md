full-stack temperature monitoring dashboard built with Next.js, React, FastAPI, and SQLite, designed for deployment on a Raspberry Pi.

1. Set Up the Backend

cd backend

python3 -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload

2. Start sensor

python sensor.py

3. Start frontend

cd frontend

npm install

npm run dev