export type Card = string;

export type Player = {
  stack: number;
  holeCards: Card[];
  isFolded: boolean;
  isAllIn: boolean;
  position: 'd' | 'sb' | 'bb' | null;
  currentBet: number;
}

export type GameState = {
    players: Player[];
    deck: Card[];
    pot: number;
    currentPlayerIndex: number;
    board: Card[]; // flop, turn, river
    stage: 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';
    currentBet: number;
    lastRaise: number;
    actionLog: ActionLogEntry[];
    checkCount: number;
    isGameOver: boolean;
    isGameStarted: boolean
    bbActedInPreflop: boolean;
    stackForAll: number 
}

export type Round = "preflop" | "flop" | "turn" | "river";

export type ActionLogEntry = {
  playerIndex: number;
  action: "fold" | "check" | "call" | "bet" | "raise" | "allin" | "deal_flop" | "deal_turn" | "deal_river"
  amount?: number; 
  cards?: string[]; // For deal actions
  round: Round
}

export type HandHistoryItem = {
    id: string
    stack: string
    hands: string
    actions: string
    winnings: string
    positions: string
}