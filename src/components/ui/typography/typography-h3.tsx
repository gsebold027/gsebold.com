import { cn } from '@/lib/utils'

const TypographyH3 = ({ className, ...props }: React.ComponentProps<'h3'>) => (
  <h1
    className={cn('scroll-m-20 text-heading3 font-semibold tracking-tight', className)}
    {...props}
  />
)

export { TypographyH3 }
