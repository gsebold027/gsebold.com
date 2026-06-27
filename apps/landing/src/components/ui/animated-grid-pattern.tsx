import { ComponentPropsWithoutRef, useEffect, useId, useRef, useState } from 'react'

import { m } from 'motion/react'

import { cn } from '@/lib/utils'

// Pure helpers at module scope so effects can list their real deps without wrapping in useCallback.
function getPos(dims: { width: number; height: number }, cellW: number, cellH: number) {
  return [
    Math.floor((Math.random() * dims.width) / cellW),
    Math.floor((Math.random() * dims.height) / cellH)
  ]
}

function generateSquares(
  count: number,
  dims: { width: number; height: number },
  cellW: number,
  cellH: number
) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    pos: getPos(dims, cellW, cellH)
  }))
}

export type AnimatedGridPatternProps = {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: string | number
  numSquares?: number
  maxOpacity?: number
  duration?: number
  repeatDelay?: number
} & ComponentPropsWithoutRef<'svg'>

const AnimatedGridPattern = ({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}: AnimatedGridPatternProps) => {
  const id = useId()
  const containerRef = useRef(null)
  const dimensionsRef = useRef({ width: 0, height: 0 })
  const [squares, setSquares] = useState(() =>
    generateSquares(numSquares, { width: 0, height: 0 }, width, height)
  )

  const updateSquarePosition = (id: number) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id ? { ...sq, pos: getPos(dimensionsRef.current, width, height) } : sq
      )
    )
  }

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const dims = {
          width: entry.contentRect.width,
          height: entry.contentRect.height
        }
        dimensionsRef.current = dims
        if (dims.width && dims.height) {
          setSquares(generateSquares(numSquares, dims, width, height))
        }
      }
    })

    resizeObserver.observe(element)
    return () => resizeObserver.unobserve(element)
  }, [numSquares, width, height])

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-accent stroke-secondary',
        className
      )}
      {...props}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id }) => (
          <m.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: id * 0.1,
              repeatType: 'reverse'
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            key={`${x}-${y}-${id}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  )
}

export { AnimatedGridPattern }
