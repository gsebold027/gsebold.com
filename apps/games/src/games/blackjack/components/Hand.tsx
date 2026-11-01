import { useTranslation } from 'react-i18next'

import type { Card, Rank } from '../engine/cards'
import { handValue } from '../engine/cards'
import { PlayingCard } from './PlayingCard'

const FACE_RANKS = ['A', 'J', 'Q', 'K'] as const
const isFaceRank = (rank: Rank): rank is (typeof FACE_RANKS)[number] =>
  (FACE_RANKS as readonly Rank[]).includes(rank)

type HandProps = {
  /** Changes every deal; keys the cards so a new round's cards mount (and animate) fresh. */
  round: number
  who: string
  /** Accessible name of the hand, e.g. "Your hand". */
  handName: string
  cards: Card[]
  /** The dealer's hole card (second card) is still face down. */
  holeCardHidden?: boolean
  highlight?: boolean
  /** Stagger every card (the dealer's draws land together); otherwise only the first two. */
  staggerAll?: boolean
}

const STAGGER_MS = 60

const Hand = ({
  round,
  who,
  handName,
  cards,
  holeCardHidden = false,
  highlight = false,
  staggerAll = false
}: HandProps) => {
  const { t } = useTranslation('blackjack')

  const cardName = (card: Card) =>
    t('card.name', {
      rank: isFaceRank(card.rank) ? t(`card.ranks.${card.rank}`) : card.rank,
      suit: t(`card.suits.${card.suit}`)
    })

  const value = handValue(cards)
  const total =
    value.soft && value.total < 21 ? t('soft_total', { total: value.total }) : value.total
  const visibleTotal = holeCardHidden ? handValue(cards.slice(0, 1)).total : total
  const label =
    cards.length === 0
      ? handName
      : holeCardHidden
        ? t('hand_label_hidden', { hand: handName })
        : t('hand_label', { hand: handName, total: String(total) })

  return (
    <section aria-label={label} className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-pixel text-muted-foreground">{who}</span>
        {cards.length > 0 && (
          <span
            aria-hidden="true"
            className={
              highlight
                ? 'rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground tabular-nums'
                : 'rounded-full bg-secondary px-2 py-0.5 font-medium tabular-nums'
            }>
            {visibleTotal}
          </span>
        )}
      </div>
      {/* Overlap cards on narrow screens so a 5-card hand still fits. */}
      <div className="flex min-h-[calc(clamp(4.5rem,18vw,6rem)*1.4)] justify-center -space-x-8 sm:-space-x-4">
        {cards.map((card, i) => (
          <PlayingCard
            key={`${round}-${i}`}
            card={card}
            // A card the player just hit for appears at once: no delay on their own action.
            delayMs={staggerAll || i < 2 ? i * STAGGER_MS : 0}
            faceDown={holeCardHidden && i === 1}
            label={cardName(card)}
            hiddenLabel={t('card.face_down')}
          />
        ))}
      </div>
    </section>
  )
}

export { Hand }
