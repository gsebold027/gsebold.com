export const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'] as const
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const

export type Suit = (typeof SUITS)[number]
export type Rank = (typeof RANKS)[number]
export type Card = { suit: Suit; rank: Rank }

/** Returns a number in [0, 1), like Math.random. Injected so shuffles are testable. */
export type Random = () => number

export const createShoe = (decks: number, random: Random): Card[] => {
  const shoe: Card[] = []
  for (let d = 0; d < decks; d++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) shoe.push({ suit, rank })
    }
  }
  // Fisher–Yates
  for (let i = shoe.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shoe[i], shoe[j]] = [shoe[j], shoe[i]]
  }
  return shoe
}

const rankValue = (rank: Rank): number => {
  if (rank === 'A') return 1
  if (rank === 'J' || rank === 'Q' || rank === 'K') return 10
  return Number(rank)
}

export type HandValue = {
  total: number
  /** An ace is counted as 11 in the total. */
  soft: boolean
}

// Aces count 1; at most one can count 11 without busting, so add 10 once if it fits.
export const handValue = (cards: Card[]): HandValue => {
  const hard = cards.reduce((sum, card) => sum + rankValue(card.rank), 0)
  const hasAce = cards.some((card) => card.rank === 'A')
  return hasAce && hard + 10 <= 21 ? { total: hard + 10, soft: true } : { total: hard, soft: false }
}

export const isBlackjack = (cards: Card[]) => cards.length === 2 && handValue(cards).total === 21

export const isBust = (cards: Card[]) => handValue(cards).total > 21
