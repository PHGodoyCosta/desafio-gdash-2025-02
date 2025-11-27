FROM python3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN python3 -m pip install -r requirements.txt --no-cache-dir

COPY . .

CMD ["python3", "main.py"]

