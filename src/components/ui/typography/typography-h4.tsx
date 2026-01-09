import { cn } from '@/lib/utils'

const TypographyH4 = ({ className, ...props }: React.ComponentProps<'h4'>) => (
  <h1
    className={cn('scroll-m-20 text-heading4 font-semibold tracking-tight', className)}
    {...props}
  />
)

export { TypographyH4 }
