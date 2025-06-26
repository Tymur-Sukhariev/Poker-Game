import uuid
from app.db.connection import get_connection  
from app.models.hand import Hand

def insert_hand(stack: str, hands: str, actions: str, winnings: str, positions: str):
    conn = get_connection()  # <-- Use shared connection
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO hand_log (id, stack, hands, actions, winnings, positions)
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (str(uuid.uuid4()), stack, hands, actions, winnings, positions),
            )

def fetch_hand_history():
    conn = get_connection()

    with conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, stack, hands, actions, winnings, positions FROM hand_log"
            )
            return cur.fetchall()  # returns a list of dicts thanks to dict_row
            
