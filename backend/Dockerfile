# backend/Dockerfile

FROM python:3.11

# Set working directory
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy project files
COPY . .

# Disable poetry virtualenv and install dependencies (with pokerkit)
RUN poetry config virtualenvs.create false \
 && poetry install --no-root

# Install pokerkit manually (safe fallback in case poetry fails)
RUN pip install pokerkit

# Expose port
EXPOSE 8000

# Start the FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
