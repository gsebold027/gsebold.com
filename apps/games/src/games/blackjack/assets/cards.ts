import type { Card } from '../engine/cards'

// Vite turns each SVG into a hashed URL; files are named <suit>_<rank>.svg (e.g. hearts_10.svg).
const urls = import.meta.glob<string>('./cards/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
})

const url = (name: string) => {
  const src = urls[`./cards/${name}.svg`]
  if (!src) throw new Error(`Missing card asset: ${name}.svg`)
  return src
}

export const cardSrc = (card: Card) => url(`${card.suit}_${card.rank}`)

export const cardBackSrc = url('back_blue')

// Fetched when the table mounts so a dealt card never pops in blank.
export const preloadCards = () => {
  for (const src of Object.values(urls)) {
    const image = new Image()
    image.src = src
  }
}
