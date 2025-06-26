FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential libpq-dev curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install poetry

# Copy only dependency files first (for better caching)
COPY pyproject.toml poetry.lock* /app/

# Install dependencies globally in the container
RUN poetry config virtualenvs.create false && \
    poetry install --no-root

# Copy the rest of the app code
COPY . /app

EXPOSE 8000

# Start the FastAPI app (this is overridden by docker-compose)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
