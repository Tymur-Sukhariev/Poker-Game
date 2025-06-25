import { Player } from "@/types/types";

export function createPlayers(stackForAll: number): Player[] {
  const players: Player[] = [];

  for (let i = 0; i < 6; i++) {
    players.push({
      stack: stackForAll, 
      holeCards: [],
      isFolded: false,
      isAllIn: false,
      position: null,
      currentBet: 0,
    });
  }

  // Randomly assign positions
  const dealer = Math.floor(Math.random() * 6);
  const sb = (dealer + 1) % 6;
  const bb = (sb + 1) % 6;

  players[dealer].position = 'd';
  players[sb].position = 'sb';
  players[bb].position = 'bb';

  // Post blinds
  players[sb].stack -= 20;
  players[sb].currentBet = 20;

  players[bb].stack -= 40;
  players[bb].currentBet = 40;

  return players;
}
