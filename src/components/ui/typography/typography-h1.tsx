import { cn } from '@/lib/utils'

const TypographyH1 = ({ className, ...props }: React.ComponentProps<'h1'>) => (
  <h1
    className={cn(
      'scroll-m-20 text-heading1 leading-[1] font-extrabold tracking-tight text-balance',
      className
    )}
    {...props}
  />
)

export { TypographyH1 }
