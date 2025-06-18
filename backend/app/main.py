from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import hand  # or whatever your router is

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hand.router, prefix="/hands", tags=["hands"])


@app.get("/")
def read_root():
    return {"message": "Poker API running"}
