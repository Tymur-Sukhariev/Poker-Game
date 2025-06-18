
import { advanceOrEndRound } from "@/functions/nextPlayerOrRound";
import { GameState } from "@/types/types";

// 👇 Dummy GameState with all but one folded
const dummyGameState: GameState = {
    players: [
        { isFolded: true, isAllIn: false, stack: 0, currentBet: 0, position: "sb", holeCards: [] },
        { isFolded: false, isAllIn: false, stack: 1000, currentBet: 0, position: "bb", holeCards: [] },
    ],
    actionLog: [],
    stage: "flop",
    board: [],
    deck: [],
    pot: 0,
    currentBet: 0,
    lastRaise: 0,
    checkCount: 0,
    currentPlayerIndex: 1,
    bbActedInPreflop: false,
    isGameOver: false,
    isGameStarted: false,
    stackForAll: 0
};

const updated = advanceOrEndRound(dummyGameState);

// ✅ Minimal test check
if (updated.isGameOver && updated.stage === "showdown") {
  console.log("✅ Test passed: Game ends when only one player remains.");
} else {
  console.error("❌ Test failed: Game did not end properly.");
}
