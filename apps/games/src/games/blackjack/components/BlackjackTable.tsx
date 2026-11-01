import { Button } from '@gsebold/ui/components/button'
import { cn } from '@gsebold/ui/lib/utils'

import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { preloadCards } from '../assets/cards'
import { handValue } from '../engine/cards'
import { type GameState, canAddChip, canDeal, canDouble, isBroke } from '../engine/game'
import { RULES } from '../engine/rules'
import { useBlackjack } from '../useBlackjack'
import { Hand } from './Hand'

const formatChips = (amount: number, locale: string) => new Intl.NumberFormat(locale).format(amount)

// One sentence describing the table, shown under the hands and announced to screen readers.
const useStatus = (state: GameState) => {
  const { t, i18n } = useTranslation('blackjack')
  const chips = (amount: number) => formatChips(amount, i18n.language)

  if (state.phase === 'betting') {
    return isBroke(state)
      ? t('status.broke')
      : t('status.place_bet', { min: chips(RULES.minBet), max: chips(RULES.maxBet) })
  }

  const hand = state.hands[0]
  const player = handValue(hand.cards).total

  if (state.phase === 'player') {
    const turn = t('status.your_turn', {
      player,
      dealer: handValue(state.dealer.slice(0, 1)).total
    })
    return state.reshuffled ? `${t('status.reshuffled')} ${turn}` : turn
  }

  const outcome = hand.outcome ?? 'lose'
  // "You win" reports profit, not the stake coming back.
  const profit = (hand.payout ?? 0) - hand.bet
  const verdict = t(`status.${outcome}`, { amount: chips(profit) })
  const totals = t('status.result', { player, dealer: handValue(state.dealer).total })
  return `${verdict} ${totals}`
}

const BlackjackTable = () => {
  const { t, i18n } = useTranslation('blackjack')
  const game = useBlackjack()
  const { state } = game
  const status = useStatus(state)
  const chips = (amount: number) => formatChips(amount, i18n.language)

  useEffect(preloadCards, [])

  const inRound = state.phase !== 'betting'
  const settled = state.phase === 'settled'
  const outcome = state.hands[0]?.outcome
  const won = outcome === 'win' || outcome === 'blackjack'
  // In a round, show what's actually staked (doubled hands included), not the base bet.
  const staked = inRound ? state.hands.reduce((sum, hand) => sum + hand.bet, 0) : state.bet

  return (
    <div className="flex flex-col gap-6">
      <dl className="flex justify-between gap-4 font-pixel text-sm">
        <div>
          <dt className="text-muted-foreground">{t('balance')}</dt>
          <dd className="text-lg tabular-nums">{chips(state.balance)}</dd>
        </div>
        <div className="text-right">
          <dt className="text-muted-foreground">{t('bet')}</dt>
          <dd className="text-lg tabular-nums">{chips(staked)}</dd>
        </div>
      </dl>

      <div className="flex min-h-[22rem] flex-col justify-between gap-8 rounded-xl border bg-card px-4 py-6 shadow sm:px-8">
        <Hand
          round={state.round}
          who={t('dealer')}
          handName={t('dealer_hand')}
          cards={state.dealer}
          holeCardHidden={state.phase === 'player'}
          staggerAll
        />
        <p
          aria-hidden="true"
          className={cn(
            'text-center text-sm text-muted-foreground',
            settled && 'font-medium text-foreground',
            settled && won && 'text-primary-text'
          )}>
          {status}
        </p>
        <Hand
          round={state.round}
          who={t('you')}
          handName={t('your_hand')}
          cards={state.hands[0]?.cards ?? []}
          highlight={state.phase === 'player'}
        />
      </div>

      {/* Announces each new status; the visible line above is aria-hidden from this region. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {status}
      </p>

      {state.phase === 'player' ? (
        <div className="grid grid-cols-3 gap-2">
          <Button size="lg" onClick={game.hit} aria-keyshortcuts="h">
            {t('actions.hit')}
          </Button>
          <Button size="lg" variant="secondary" onClick={game.stand} aria-keyshortcuts="s">
            {t('actions.stand')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={game.double}
            disabled={!canDouble(state)}
            aria-keyshortcuts="d">
            {t('actions.double')}
          </Button>
        </div>
      ) : isBroke(state) ? (
        <Button size="lg" onClick={game.rebuy}>
          {t('actions.rebuy', { amount: chips(RULES.startingBalance) })}
        </Button>
      ) : (
        <div className="flex flex-col gap-4">
          {!inRound && (
            <div className="flex flex-wrap justify-center gap-2">
              {RULES.chips.map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  className="size-14 rounded-full font-pixel tabular-nums"
                  disabled={!canAddChip(state, value)}
                  onClick={() => game.addChip(value)}
                  aria-label={t('chip_label', { value: chips(value) })}>
                  {value}
                </Button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {settled ? (
              <Button size="lg" variant="secondary" onClick={game.newRound}>
                {t('actions.new_bet')}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="secondary"
                onClick={game.clearBet}
                disabled={state.bet === 0}>
                {t('actions.clear')}
              </Button>
            )}
            <Button
              size="lg"
              onClick={game.deal}
              disabled={!canDeal(state)}
              aria-keyshortcuts="Enter">
              {settled ? t('actions.deal_again') : t('actions.deal')}
            </Button>
          </div>
        </div>
      )}

      <p className="hidden text-center text-xs text-muted-foreground sm:block">
        {t('keyboard_hint')}
      </p>
    </div>
  )
}

export { BlackjackTable }
