import { MotionProps, m } from 'motion/react'

import { cn } from '@/lib/utils/index'

type LineShadowTextProps = {
  shadowColor?: string
  as?: React.ElementType
  children: string
} & Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps | 'children'> &
  Omit<MotionProps, 'children'>

export const LineShadowText = ({
  children,
  shadowColor = 'black',
  className,
  as: Component = 'span',
  ...props
}: LineShadowTextProps) => {
  const MotionComponent = m.create(Component)

  return (
    <MotionComponent
      style={{ '--shadow-color': shadowColor } as React.CSSProperties}
      className={cn(
        'relative z-0 inline-flex',
        'after:absolute after:top-[0.04em] after:left-[0.04em] after:content-[attr(data-text)]',
        'after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]',
        'after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent',
        'after:animate-line-shadow',
        className
      )}
      data-text={children}
      {...props}>
      {children}
    </MotionComponent>
  )
}
