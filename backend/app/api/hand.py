from fastapi import APIRouter

from app.schemas.game_result import GameResult
from app.services.poker_logic import evaluate_hand
from app.db_access.hand import insert_hand, fetch_hand_history


router = APIRouter()


@router.post("/play")
def play_hand(game_result: GameResult):
    stack, hands, actions, winnings, positions = evaluate_hand(game_result.dict())
    insert_hand(stack, hands, actions, winnings, positions)

    return {"message": "Hand saved!"}


@router.get("/history")
def get_hand_history():
    return fetch_hand_history()
