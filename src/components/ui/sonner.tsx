import { AlertCircleIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react'
import { Toaster as Sonner } from 'sonner'

import { useTheme } from '@/contexts/ThemeProvider'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group pointer-events-auto flex gap-3 p-4"
      toastOptions={{
        duration: 5000,
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          title: 'h-5',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          icon: 'self-start mt-0.5'
        }
      }}
      icons={{
        success: <CheckCircle2Icon className="size-5 !text-green-400" />,
        warning: <AlertCircleIcon className="size-5 !text-yellow-400" />,
        error: <XCircleIcon className="size-5 !text-red-400" />
      }}
      {...props}
    />
  )
}

export { Toaster }
