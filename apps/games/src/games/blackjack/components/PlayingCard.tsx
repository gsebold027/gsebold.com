import { cn } from '@gsebold/ui/lib/utils'

import { cardBackSrc, cardSrc } from '../assets/cards'
import type { Card } from '../engine/cards'

type PlayingCardProps = {
  card: Card
  faceDown?: boolean
  /** Accessible name of the card when face up, e.g. "10 of hearts". */
  label: string
  /** Hidden card's accessible name, e.g. "Face-down card". */
  hiddenLabel: string
  /** Delay before the enter transition, to stagger cards that appear together. */
  delayMs: number
}

// Enter: 8px drop + fade, 200ms strong ease-out (a CSS transition from @starting-style, so it
// stays off the main thread). Flip: rotateY, 250ms ease-in-out because the card moves on screen.
// The global prefers-reduced-motion rule in @gsebold/tailwind collapses both.
const PlayingCard = ({ card, faceDown = false, label, hiddenLabel, delayMs }: PlayingCardProps) => (
  <div
    role="img"
    aria-label={faceDown ? hiddenLabel : label}
    className="w-[clamp(4.5rem,18vw,6rem)] aspect-[5/7] shrink-0 perspective-[800px] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] starting:-translate-y-2 starting:opacity-0"
    style={{ transitionDelay: `${delayMs}ms` }}>
    <div
      className={cn(
        'relative size-full transform-3d transition-transform duration-[250ms] ease-[cubic-bezier(0.77,0,0.175,1)]',
        faceDown && 'rotate-y-180'
      )}>
      <img
        src={cardSrc(card)}
        alt=""
        draggable={false}
        className="absolute inset-0 size-full rounded-[6%] shadow-[-3px_2px_8px_rgb(0_0_0/0.3)] ring-1 ring-black/15 backface-hidden select-none"
      />
      <img
        src={cardBackSrc}
        alt=""
        draggable={false}
        className="absolute inset-0 size-full rotate-y-180 rounded-[6%] shadow-[-3px_2px_8px_rgb(0_0_0/0.3)] ring-1 ring-black/15 backface-hidden select-none"
      />
    </div>
  </div>
)

export { PlayingCard }
