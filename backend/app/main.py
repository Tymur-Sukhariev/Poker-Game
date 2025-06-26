from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import hand  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True, #cookies or auth headers
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hand.router, prefix="/hands", tags=["hands"])


@app.get("/")
def read_root():
    return {"message": "Poker API running"}
