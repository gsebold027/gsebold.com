import { describe, expect, it } from 'vitest'

import { type Card, type Rank, createShoe, handValue, isBlackjack } from './cards'
import {
  type Action,
  type GameState,
  canDouble,
  createGame,
  isBroke,
  needsReshuffle,
  reducer
} from './game'
import { RULES } from './rules'

const card = (rank: Rank): Card => ({ suit: 'spades', rank })
const cards = (...ranks: Rank[]) => ranks.map(card)

// A game whose shoe starts with these cards, in deal order: player, dealer, player, dealer, then
// hits. Padded with 2s so the dealer always has cards to draw.
const stacked = (ranks: Rank[], overrides: Partial<GameState> = {}): GameState => ({
  ...createGame(RULES.startingBalance, Math.random),
  shoe: [...cards(...ranks), ...cards(...Array<Rank>(300).fill('2'))],
  ...overrides
})

const play = (state: GameState, ...actions: Action[]) => actions.reduce(reducer, state)
const bet = (amount: number): Action[] =>
  RULES.chips
    .slice()
    .reverse()
    .flatMap((chip) => {
      const count = Math.floor(amount / chip)
      amount -= count * chip
      return Array<Action>(count).fill({ type: 'add-chip', value: chip })
    })

describe('handValue', () => {
  it('counts one ace as 11 when it fits (soft)', () => {
    expect(handValue(cards('A', '6'))).toEqual({ total: 17, soft: true })
  })

  it('drops the ace to 1 when 11 would bust (hard)', () => {
    expect(handValue(cards('A', '6', '9'))).toEqual({ total: 16, soft: false })
  })

  it('counts only one of several aces as 11', () => {
    expect(handValue(cards('A', 'A', '9'))).toEqual({ total: 21, soft: true })
  })

  it('values face cards at 10', () => {
    expect(handValue(cards('K', 'Q'))).toEqual({ total: 20, soft: false })
  })

  it('treats only a two-card 21 as blackjack', () => {
    expect(isBlackjack(cards('A', 'K'))).toBe(true)
    expect(isBlackjack(cards('7', '7', '7'))).toBe(false)
  })
})

describe('createShoe', () => {
  it('holds every card of every deck exactly once', () => {
    const shoe = createShoe(RULES.decks, Math.random)
    expect(shoe).toHaveLength(52 * RULES.decks)
    const aces = shoe.filter((c) => c.rank === 'A' && c.suit === 'hearts')
    expect(aces).toHaveLength(RULES.decks)
  })
})

describe('betting', () => {
  it('builds the bet from chips, capped by the table limit and the balance', () => {
    let state = play(createGame(RULES.startingBalance, Math.random), ...bet(500))
    expect(state.bet).toBe(500)
    state = reducer(state, { type: 'add-chip', value: 5 })
    expect(state.bet).toBe(500)

    const poor = play(createGame(30, Math.random), ...bet(25), { type: 'add-chip', value: 25 })
    expect(poor.bet).toBe(25)
  })

  it('will not deal below the minimum bet', () => {
    const state = reducer(createGame(RULES.startingBalance, Math.random), { type: 'deal' })
    expect(state.phase).toBe('betting')
  })
})

describe('a round', () => {
  it('takes the bet on deal and deals player, dealer, player, dealer', () => {
    const state = play(stacked(['9', '10', '7', '8']), ...bet(100), { type: 'deal' })
    expect(state.balance).toBe(900)
    expect(state.hands[0].cards).toEqual(cards('9', '7'))
    expect(state.dealer).toEqual(cards('10', '8'))
    expect(state.phase).toBe('player')
  })

  it('pays 2:1 total (1:1 winnings) when the player beats the dealer', () => {
    const state = play(
      stacked(['10', '10', 'Q', '7']),
      ...bet(100),
      { type: 'deal' },
      { type: 'stand' }
    )
    expect(state.hands[0].outcome).toBe('win')
    expect(state.balance).toBe(1100)
  })

  it('pays a natural blackjack 3:2 immediately', () => {
    const state = play(stacked(['A', '10', 'K', '7']), ...bet(100), { type: 'deal' })
    expect(state.phase).toBe('settled')
    expect(state.hands[0].outcome).toBe('blackjack')
    expect(state.balance).toBe(1150)
  })

  it('pushes when both have blackjack', () => {
    const state = play(stacked(['A', 'A', 'K', 'K']), ...bet(100), { type: 'deal' })
    expect(state.hands[0].outcome).toBe('push')
    expect(state.balance).toBe(1000)
  })

  it('ends the round when the dealer peeks a blackjack', () => {
    const state = play(stacked(['10', 'A', '9', 'K']), ...bet(100), { type: 'deal' })
    expect(state.phase).toBe('settled')
    expect(state.hands[0].outcome).toBe('lose')
    expect(state.balance).toBe(900)
  })

  it('busts the player on a hit past 21 without the dealer drawing', () => {
    const state = play(
      stacked(['10', '6', '6', '10', 'K']),
      ...bet(100),
      { type: 'deal' },
      {
        type: 'hit'
      }
    )
    expect(state.hands[0].outcome).toBe('bust')
    expect(state.dealer).toHaveLength(2)
    expect(state.balance).toBe(900)
  })

  it('stands automatically on 21', () => {
    const state = play(
      stacked(['10', '10', '5', '7', '6']),
      ...bet(100),
      { type: 'deal' },
      {
        type: 'hit'
      }
    )
    expect(state.phase).toBe('settled')
    expect(state.hands[0].outcome).toBe('win')
  })

  it('makes the dealer stand on soft 17', () => {
    const state = play(
      stacked(['10', 'A', '7', '6']),
      ...bet(100),
      { type: 'deal' },
      { type: 'stand' }
    )
    expect(state.dealer).toEqual(cards('A', '6'))
    expect(state.hands[0].outcome).toBe('push')
  })

  it('makes the dealer hit 16 and pays when the dealer busts', () => {
    const state = play(
      stacked(['10', '10', '2', '6', 'K']),
      ...bet(100),
      { type: 'deal' },
      {
        type: 'stand'
      }
    )
    expect(state.dealer).toEqual(cards('10', '6', 'K'))
    expect(state.hands[0].outcome).toBe('win')
    expect(state.balance).toBe(1100)
  })

  it('doubles: doubles the bet, takes exactly one card, and ends the hand', () => {
    const state = play(
      stacked(['6', '10', '5', '7', 'K']),
      ...bet(100),
      { type: 'deal' },
      {
        type: 'double'
      }
    )
    expect(state.hands[0].cards).toEqual(cards('6', '5', 'K'))
    expect(state.hands[0].bet).toBe(200)
    expect(state.hands[0].outcome).toBe('win')
    expect(state.balance).toBe(1200)
  })

  it('only doubles on the first two cards and with enough balance', () => {
    const afterHit = play(
      stacked(['2', '10', '3', '7', '2']),
      ...bet(100),
      { type: 'deal' },
      {
        type: 'hit'
      }
    )
    expect(canDouble(afterHit)).toBe(false)

    const allIn = play(stacked(['6', '10', '5', '7']), ...bet(100), { type: 'deal' })
    expect(canDouble({ ...allIn, balance: 50 })).toBe(false)
  })
})

describe('between rounds', () => {
  it('deals again with the same bet from the settled table', () => {
    const settled = play(
      stacked(['10', '10', 'Q', '7', '9', '9', '8', '7']),
      ...bet(100),
      {
        type: 'deal'
      },
      { type: 'stand' }
    )
    const again = reducer(settled, { type: 'deal' })
    expect(again.phase).toBe('player')
    expect(again.balance).toBe(1000)
  })

  it('requires a fresh shoe once the cut card is reached', () => {
    const state = play(createGame(RULES.startingBalance, Math.random), ...bet(25))
    const atCut = { ...state, next: Math.floor(state.shoe.length * RULES.penetration) }
    expect(needsReshuffle(atCut)).toBe(true)
    expect(() => reducer(atCut, { type: 'deal' })).toThrow()

    const fresh = createShoe(RULES.decks, Math.random)
    const dealt = reducer(atCut, { type: 'deal', shoe: fresh })
    expect(dealt.reshuffled).toBe(true)
    expect(dealt.next).toBe(4)
  })

  it('offers a rebuy only when the balance is below the minimum bet', () => {
    const rich = createGame(RULES.startingBalance, Math.random)
    expect(reducer(rich, { type: 'rebuy' })).toBe(rich)

    const broke = createGame(0, Math.random)
    expect(isBroke(broke)).toBe(true)
    expect(reducer(broke, { type: 'rebuy' }).balance).toBe(RULES.startingBalance)
  })
})
