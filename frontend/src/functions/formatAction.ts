import { ActionLogEntry } from "@/types/types";

export function formatAction(entry: ActionLogEntry,playerName: string) {
  const { action, amount, cards} = entry;

  switch (action) {
    case "fold":
      return `${playerName} folded`;
    case "check":
      return `${playerName} checked`;
    case "call":
      return `${playerName} called`;
    case "bet":
      return `${playerName} bet ${amount}`;
    case "raise":
      return `${playerName} raised ${amount}`;
    case "allin":
      return `${playerName} went all-in with ${amount}`;
    case "deal_flop":
      return `Flop: ${cards?.join("")}`;
    case "deal_turn":
      return `Turn: ${cards?.join("")}`;
    case "deal_river":
      return `River: ${cards?.join("")}`;
      
    default:
      return `${playerName} did something unknown`;
  }
}
