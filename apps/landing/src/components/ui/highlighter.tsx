import { useEffect, useRef } from 'react'
import type React from 'react'

import { useInView } from 'motion/react'
import { annotate } from 'rough-notation'
import { type RoughAnnotation } from 'rough-notation/lib/model'

type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket'

type HighlighterProps = {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export const Highlighter = ({
  children,
  action = 'highlight',
  color = '#ffd1dc',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false
}: HighlighterProps) => {
  const elementRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: '-10%'
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useEffect(() => {
    if (!shouldShow) return

    const element = elementRef.current
    if (!element) return

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline
    }

    let cancelled = false
    let resizeObserver: ResizeObserver | null = null
    let rafId: number | null = null

    // rough-notation attaches its own ResizeObserver the moment annotate() runs, debounced
    // 400ms: if the element's measured rect differs at all when that fires (a scrollbar
    // appearing after first paint, a font swap settling), it silently redraws with
    // animate:false — a hard snap to fully-drawn partway through our entrance animation.
    // Waiting for fonts + a settled frame before measuring means that baseline rect is
    // already final, so the 400ms-later recheck finds nothing changed.
    const start = () => {
      if (cancelled || !elementRef.current) return

      const annotation = annotate(elementRef.current, annotationConfig)
      annotationRef.current = annotation
      annotation.show()

      // ResizeObserver fires once immediately on observe() with the baseline size,
      // even with no real resize — skip that first call so mount doesn't redraw twice.
      let isInitialObservation = true
      resizeObserver = new ResizeObserver(() => {
        if (isInitialObservation) {
          isInitialObservation = false
          return
        }
        annotation.hide()
        annotation.show()
      })
      resizeObserver.observe(elementRef.current)
      resizeObserver.observe(document.body)
    }

    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    fontsReady.then(() => {
      if (cancelled) return
      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(start)
      })
    })

    return () => {
      cancelled = true
      if (rafId !== null) cancelAnimationFrame(rafId)
      resizeObserver?.disconnect()
      annotationRef.current?.remove()
      annotationRef.current = null
    }
  }, [shouldShow, action, color, strokeWidth, animationDuration, iterations, padding, multiline])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
