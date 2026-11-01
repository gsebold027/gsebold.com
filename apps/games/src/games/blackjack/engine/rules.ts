// Table rules. Standard, player-friendly casino rules: a 6-deck shoe, blackjack pays 3:2, the
// dealer stands on every 17 (soft included), double on any first two cards, the dealer peeks for
// blackjack. No insurance or surrender; split comes later.
export const RULES = {
  decks: 6,
  /** Reshuffle before a round once this share of the shoe has been dealt. */
  penetration: 0.75,
  /** Winnings per unit bet on a natural blackjack (3:2). */
  blackjackPays: 1.5,
  dealerStandsOn: 17,
  minBet: 5,
  maxBet: 500,
  chips: [5, 25, 100, 500],
  startingBalance: 1000
} as const
