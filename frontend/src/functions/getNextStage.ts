import { GameState } from "@/types/types";

export function getNextStage(current: GameState["stage"]) {
  switch (current) {
    case "preflop":
      return "flop";
    case "flop":
      return "turn";
    case "turn":
      return "river";
    case "river":
      return "showdown";
    default:
      return "showdown"; // fallback
  }
}
