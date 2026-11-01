import { useEffect, useReducer } from 'react'

import { createShoe } from './engine/cards'
import {
  type Action,
  type GameState,
  canDeal,
  createGame,
  needsReshuffle,
  reducer
} from './engine/game'
import { RULES } from './engine/rules'

const BALANCE_KEY = 'games.blackjack.balance'

const loadBalance = (): number => {
  try {
    const stored = localStorage.getItem(BALANCE_KEY)
    const balance = Number(stored)
    return stored !== null && Number.isFinite(balance) && balance >= 0
      ? balance
      : RULES.startingBalance
  } catch {
    return RULES.startingBalance
  }
}

const saveBalance = (balance: number) => {
  try {
    localStorage.setItem(BALANCE_KEY, String(balance))
  } catch {
    // Storage blocked: the balance lasts for this visit only.
  }
}

export type BlackjackControls = {
  state: GameState
  addChip: (value: number) => void
  clearBet: () => void
  deal: () => void
  hit: () => void
  stand: () => void
  double: () => void
  newRound: () => void
  rebuy: () => void
}

export const useBlackjack = (): BlackjackControls => {
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createGame(loadBalance(), Math.random)
  )

  // Saved only between hands: the stake is out of the balance mid-hand, so reloading during a
  // hand restores the balance from before the deal.
  useEffect(() => {
    if (state.phase !== 'player') saveBalance(state.balance)
  }, [state.phase, state.balance])

  const send = (action: Action) => dispatch(action)
  // Shuffling is random, so it happens here and the reducer stays pure.
  const deal = () =>
    send({
      type: 'deal',
      shoe: needsReshuffle(state) ? createShoe(RULES.decks, Math.random) : undefined
    })

  const controls: BlackjackControls = {
    state,
    addChip: (value) => send({ type: 'add-chip', value }),
    clearBet: () => send({ type: 'clear-bet' }),
    deal,
    hit: () => send({ type: 'hit' }),
    stand: () => send({ type: 'stand' }),
    double: () => send({ type: 'double' }),
    newRound: () => send({ type: 'new-round' }),
    rebuy: () => send({ type: 'rebuy' })
  }

  // H hit · S stand · D double · Enter deal. Ignored while typing or with modifiers, and when a
  // button has focus Enter is left to the button so it isn't triggered twice.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return

      const key = event.key.toLowerCase()
      if (key === 'enter') {
        if (target?.closest('button, a')) return
        if (canDeal(state)) controls.deal()
      } else if (key === 'h') controls.hit()
      else if (key === 's') controls.stand()
      else if (key === 'd') controls.double()
      else return
      event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return controls
}
