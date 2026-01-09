import { cn } from '@/lib/utils'

const TypographyH2 = ({ className, ...props }: React.ComponentProps<'h2'>) => (
  <h2
    className={cn(
      'scroll-m-20 text-heading2 leading-[1] font-semibold tracking-tight first:mt-0',
      className
    )}
    {...props}
  />
)

export { TypographyH2 }
