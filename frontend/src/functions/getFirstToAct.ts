import {Player } from "@/types/types";

export function getFirstToAct(players: Player[]): number {

  const dealerIndex = players.findIndex(p => p.position === "d");
  const total = players.length;

  for (let i = 1; i <= total; i++) {
    const idx = (dealerIndex + i) % total;
    const p = players[idx];
    if (!p.isFolded && !p.isAllIn && p.stack > 0) return idx;
  }

  return 0; // failsafe
}