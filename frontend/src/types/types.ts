export type Card = string;

export interface Player {
  stack: number;
  holeCards: Card[];
  isFolded: boolean;
  isAllIn: boolean;
  position: 'd' | 'sb' | 'bb' | null;
  currentBet: number;
}

export interface GameState {
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


export type ActionLogEntry = {
  playerIndex: number;
  action: "fold" | "check" | "call" | "bet" | "raise" | "allin" | "deal_flop" | "deal_turn" | "deal_river"
  amount?: number; 
  cards?: string[]; // For deal actions
  round: "preflop" | "flop" | "turn" | "river";
}
