import { cn } from '@/lib/utils'

const TypographyP = ({ className, ...props }: React.ComponentProps<'p'>) => (
  <p className={cn('leading-7 text-paragraph', className)} {...props} />
)

export { TypographyP }
