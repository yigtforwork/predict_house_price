FROM python:3.12-slim

WORKDIR /model_server_services

# Install dependencies first for better Docker layer caching
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

EXPOSE 8000

CMD ["uvicorn", "services:app", "--host", "0.0.0.0", "--port", "8000"]