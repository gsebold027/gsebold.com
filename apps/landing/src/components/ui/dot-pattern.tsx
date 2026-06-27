import React, { useCallback, useId, useRef, useSyncExternalStore } from 'react'

import { m } from 'motion/react'

import { cn } from '@/lib/utils/index'

type DotPatternProps = {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  glow?: boolean
  [key: string]: unknown
} & React.SVGProps<SVGSVGElement>

const emptyDimensions = { width: 0, height: 0 }

export const DotPattern = ({
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: DotPatternProps) => {
  const id = useId()
  const containerRef = useRef<SVGSVGElement>(null)
  const snapshotRef = useRef(emptyDimensions)

  const subscribe = useCallback((notify: () => void) => {
    const element = containerRef.current
    if (!element) return () => {}

    const observer = new ResizeObserver(([entry]) => {
      snapshotRef.current = {
        width: entry.contentRect.width,
        height: entry.contentRect.height
      }
      notify()
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const dimensions = useSyncExternalStore(
    subscribe,
    () => snapshotRef.current,
    () => emptyDimensions
  )

  const dots = Array.from(
    {
      length: Math.ceil(dimensions.width / width) * Math.ceil(dimensions.height / height)
    },
    (_, i) => {
      const col = i % Math.ceil(dimensions.width / width)
      const row = Math.floor(i / Math.ceil(dimensions.width / width))
      return {
        x: col * width + cx,
        y: row * height + cy,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      }
    }
  )

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80',
        className
      )}
      {...props}>
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot) => (
        <m.circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill={glow ? `url(#${id}-gradient)` : 'currentColor'}
          initial={glow ? { opacity: 0.4, scale: 1 } : {}}
          animate={
            glow
              ? {
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.5, 1]
                }
              : {}
          }
          transition={
            glow
              ? {
                  duration: dot.duration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: dot.delay,
                  ease: 'easeInOut'
                }
              : {}
          }
        />
      ))}
    </svg>
  )
}
