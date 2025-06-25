  const suits = ['s', 'h', 'd', 'c'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

function createDeck(): string[] {
  const deck: string[] = [];
  for (const rank of ranks) {
    for (const suit of suits) {
      deck.push(`${rank}${suit}`); 
    }
  }
  return deck;
}

export function shuffleDeck() {
  const deck = createDeck();
  const shuffled = [...deck];

  //Fisher–Yates Shuffle:
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
