from dataclasses import dataclass

@dataclass(slots=True)
class Hand:
    id: str
    stack: str
    hands: str
    actions: str
    winnings: str
    positions: str
