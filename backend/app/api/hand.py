from fastapi import APIRouter
from app.schemas.to_send import ToSend
from app.services.poker_logic import evaluate_hand
from app.repositories.hand_repository import insert_hand
from app.services.get_hand import fetch_hand_history

router = APIRouter()


@router.post("/play")
def play_hand(to_send: ToSend):
    stack, hands, actions, winnings, positions = evaluate_hand(to_send.dict())
    insert_hand(stack, hands, actions, winnings, positions)

    return {
        "stack": stack,
        "hands": hands,
        "actions": actions,
        "winnings": winnings,
        "positions": positions,
    }


@router.get("/history")
def get_hand_history():
    return fetch_hand_history()
