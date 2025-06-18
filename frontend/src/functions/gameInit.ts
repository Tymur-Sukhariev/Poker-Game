import { GameState } from '@/types/types';
import { createPlayers } from './createPlayers';
import { shuffleDeck } from './deck';


export function initializeGame(stackForAll: number): GameState { 
  const players = createPlayers(stackForAll); // Pass stack value down!
  let deck = shuffleDeck();

  // Deal 2 hole cards to each player
  for (let i = 0; i < 2; i++) {
    for (const player of players) {
      const card = deck.pop();
      if (card) {
        player.holeCards.push(card);
      }
    }
  }

  const bbIndex = players.findIndex(player => player.position === 'bb');
  const currentPlayerIndex = (bbIndex + 1) % players.length;



  const gameState: GameState = {
    players,
    deck,
    pot: 60, // Small Blind + Big Blind
    currentPlayerIndex,
    board: [],
    stage: 'preflop',
    currentBet: 40, // BB amount
    lastRaise: 0,
    actionLog: [],
    checkCount: 0,
    isGameOver: false,
    isGameStarted: false,
    bbActedInPreflop: false,
    stackForAll

  };

  return gameState;
}
