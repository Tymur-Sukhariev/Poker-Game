
CREATE TABLE IF NOT EXISTS hand_log (
    id         UUID  PRIMARY KEY,
    stack      TEXT  NOT NULL,          -- "1000"
    hands      TEXT  NOT NULL,          -- "Player 1: KsTd …"
    actions    TEXT  NOT NULL,          -- compressed string
    winnings   TEXT  NOT NULL,          -- "Player 1: 600, …"
    positions  TEXT  NOT NULL           -- "Dealer: P4, SB: P5, BB: P6"
);
