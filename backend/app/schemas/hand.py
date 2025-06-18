from pydantic import BaseModel


class HandIn(BaseModel):
    stack: str
    hands: str
    actions: str = ""
    winnings: str = ""
