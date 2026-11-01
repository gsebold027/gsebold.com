import { type Card, type Random, createShoe, handValue, isBlackjack, isBust } from './cards'
import { RULES } from './rules'

// betting: the player builds a bet. player: the player acts on their hand(s). settled: the round
// is over and every hand has an outcome. The dealer plays inside the transition from player to
// settled, so there is no separate dealer phase to wait on.
export type Phase = 'betting' | 'player' | 'settled'

export type Outcome = 'blackjack' | 'win' | 'push' | 'lose' | 'bust'

export type PlayerHand = {
  cards: Card[]
  bet: number
  doubled: boolean
  outcome?: Outcome
  /** Chips returned to the balance, stake included (0 on a loss). */
  payout?: number
}

export type GameState = {
  phase: Phase
  shoe: Card[]
  /** Index of the next card to deal from the shoe. */
  next: number
  balance: number
  /** The bet being built while betting; the last bet afterwards, reused by "deal again". */
  bet: number
  // An array so split can add hands later; v1 always has one.
  hands: PlayerHand[]
  activeHand: number
  dealer: Card[]
  /** The shoe was reshuffled before this round. */
  reshuffled: boolean
  /** Counts deals, so the UI can tell this round's cards from the last one's. */
  round: number
}

export type Action =
  | { type: 'add-chip'; value: number }
  | { type: 'clear-bet' }
  /** `shoe` is a fresh shuffled shoe, required when needsReshuffle() is true. */
  | { type: 'deal'; shoe?: Card[] }
  | { type: 'hit' }
  | { type: 'stand' }
  | { type: 'double' }
  | { type: 'new-round' }
  | { type: 'rebuy' }

export const createGame = (balance: number, random: Random): GameState => ({
  phase: 'betting',
  shoe: createShoe(RULES.decks, random),
  next: 0,
  balance,
  bet: 0,
  hands: [],
  activeHand: 0,
  dealer: [],
  reshuffled: false,
  round: 0
})

export const needsReshuffle = (state: GameState) =>
  state.next >= Math.floor(state.shoe.length * RULES.penetration)

export const canAddChip = (state: GameState, value: number) =>
  state.phase === 'betting' && state.bet + value <= Math.min(RULES.maxBet, state.balance)

export const canDeal = (state: GameState) =>
  (state.phase === 'betting' || state.phase === 'settled') &&
  state.bet >= RULES.minBet &&
  state.bet <= state.balance

export const canDouble = (state: GameState) => {
  const hand = state.hands[state.activeHand]
  return (
    state.phase === 'player' &&
    hand.cards.length === 2 &&
    !hand.doubled &&
    state.balance >= hand.bet
  )
}

/** Out of chips: not enough left for the minimum bet. */
export const isBroke = (state: GameState) =>
  state.phase !== 'player' && state.balance < RULES.minBet

const draw = (state: GameState): Card => {
  const card = state.shoe[state.next]
  state.next += 1
  return card
}

// Dealer stands on all 17s. If every player hand busted, the dealer doesn't draw.
const playDealer = (state: GameState) => {
  if (state.hands.every((hand) => isBust(hand.cards))) return
  while (handValue(state.dealer).total < RULES.dealerStandsOn) state.dealer.push(draw(state))
}

const settleHand = (hand: PlayerHand, dealer: Card[]): PlayerHand => {
  const player = handValue(hand.cards).total
  const dealerTotal = handValue(dealer).total
  const result = (outcome: Outcome, multiplier: number): PlayerHand => ({
    ...hand,
    outcome,
    payout: hand.bet * multiplier
  })

  if (isBust(hand.cards)) return result('bust', 0)
  if (isBlackjack(hand.cards) && !isBlackjack(dealer))
    return result('blackjack', 1 + RULES.blackjackPays)
  if (isBlackjack(dealer) && !isBlackjack(hand.cards)) return result('lose', 0)
  if (dealerTotal > 21 || player > dealerTotal) return result('win', 2)
  if (player === dealerTotal) return result('push', 1)
  return result('lose', 0)
}

const settle = (state: GameState): GameState => {
  const hands = state.hands.map((hand) => settleHand(hand, state.dealer))
  const winnings = hands.reduce((sum, hand) => sum + (hand.payout ?? 0), 0)
  return { ...state, phase: 'settled', hands, balance: state.balance + winnings }
}

// Moves to the next unfinished hand, or plays the dealer and settles when none are left.
const finishActiveHand = (state: GameState): GameState => {
  if (state.activeHand < state.hands.length - 1) {
    return { ...state, activeHand: state.activeHand + 1 }
  }
  const next = { ...state, dealer: [...state.dealer] }
  playDealer(next)
  return settle(next)
}

const deal = (state: GameState, freshShoe: Card[] | undefined): GameState => {
  const reshuffle = needsReshuffle(state)
  if (reshuffle && !freshShoe)
    throw new Error('deal: the shoe needs a reshuffle; pass a fresh shoe')

  const next: GameState = {
    ...state,
    shoe: reshuffle && freshShoe ? freshShoe : state.shoe,
    next: reshuffle ? 0 : state.next,
    reshuffled: reshuffle,
    round: state.round + 1,
    phase: 'player',
    balance: state.balance - state.bet,
    activeHand: 0
  }
  // Player, dealer, player, dealer (the dealer's second card is the hole card).
  const playerCards = [draw(next)]
  const dealerCards = [draw(next)]
  playerCards.push(draw(next))
  dealerCards.push(draw(next))
  next.hands = [{ cards: playerCards, bet: state.bet, doubled: false }]
  next.dealer = dealerCards

  // The dealer peeks: a natural on either side ends the round before the player acts.
  if (isBlackjack(playerCards) || isBlackjack(dealerCards)) return settle(next)
  return next
}

const updateActiveHand = (state: GameState, update: (hand: PlayerHand) => PlayerHand) => ({
  ...state,
  hands: state.hands.map((hand, i) => (i === state.activeHand ? update(hand) : hand))
})

export const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'add-chip':
      return canAddChip(state, action.value) ? { ...state, bet: state.bet + action.value } : state

    case 'clear-bet':
      return state.phase === 'betting' ? { ...state, bet: 0 } : state

    case 'deal':
      return canDeal(state) ? deal(state, action.shoe) : state

    case 'hit': {
      if (state.phase !== 'player') return state
      const next = { ...state }
      const card = draw(next)
      const hit = updateActiveHand(next, (hand) => ({ ...hand, cards: [...hand.cards, card] }))
      // Bust or 21 ends the hand: there is no decision left to make.
      return handValue(hit.hands[hit.activeHand].cards).total >= 21 ? finishActiveHand(hit) : hit
    }

    case 'stand':
      return state.phase === 'player' ? finishActiveHand(state) : state

    case 'double': {
      if (!canDouble(state)) return state
      const bet = state.hands[state.activeHand].bet
      const next = { ...state, balance: state.balance - bet }
      const card = draw(next)
      const doubled = updateActiveHand(next, (hand) => ({
        ...hand,
        cards: [...hand.cards, card],
        bet: hand.bet * 2,
        doubled: true
      }))
      return finishActiveHand(doubled)
    }

    case 'new-round':
      if (state.phase !== 'settled') return state
      return {
        ...state,
        phase: 'betting',
        hands: [],
        dealer: [],
        bet: state.bet <= state.balance ? state.bet : 0
      }

    case 'rebuy':
      return isBroke(state)
        ? {
            ...state,
            phase: 'betting',
            hands: [],
            dealer: [],
            bet: 0,
            balance: RULES.startingBalance
          }
        : state
  }
}
