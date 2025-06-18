import sys
import os

# 👇 Add backend/app to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_history():
    response = client.get("/hands/history")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
