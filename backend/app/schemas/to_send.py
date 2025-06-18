from typing import List, Literal, Optional
from pydantic import BaseModel


class ActionLogEntry(BaseModel):
    action: Literal[
        "fold",
        "call",
        "check",
        "bet",
        "raise",
        "allin",
        "deal_flop",
        "deal_turn",
        "deal_river",
    ]
    playerIndex: int
    amount: Optional[int] = None
    round: Optional[str] = None
    cards: Optional[List[str]] = None


class ToSend(BaseModel):
    actions: List[ActionLogEntry]
    stackForAll: int
    holeCards: List[str]
