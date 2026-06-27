import { cn } from '@/lib/utils'

const TypographyH1 = ({ className, children, ...props }: React.ComponentProps<'h1'>) => (
  <h1
    className={cn(
      'scroll-m-20 text-heading1 leading-[1] font-extrabold tracking-tight text-balance',
      className
    )}
    {...props}>
    {children}
  </h1>
)

const TypographyH2 = ({ className, children, ...props }: React.ComponentProps<'h2'>) => (
  <h2
    className={cn(
      'scroll-m-20 text-heading2 leading-[1] font-semibold tracking-tight first:mt-0',
      className
    )}
    {...props}>
    {children}
  </h2>
)

const TypographyH3 = ({ className, children, ...props }: React.ComponentProps<'h3'>) => (
  <h3
    className={cn('scroll-m-20 text-heading3 font-semibold tracking-tight', className)}
    {...props}>
    {children}
  </h3>
)

const TypographyH4 = ({ className, children, ...props }: React.ComponentProps<'h4'>) => (
  <h4
    className={cn('scroll-m-20 text-heading4 font-semibold tracking-tight', className)}
    {...props}>
    {children}
  </h4>
)

export { TypographyH1, TypographyH2, TypographyH3, TypographyH4 }
