import { ChevronDownIcon, Dot, GlobeIcon } from 'lucide-react'
import Flag from 'react-flagkit'

import { usePageTranslation } from '@/lib/hooks'
import { cn } from '@/lib/utils'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui'

export type Language = {
  value: string
  label: string
  flagReference: string
}

const languages: Language[] = [
  { value: 'en', label: 'English', flagReference: 'US' },
  { value: 'pt', label: 'Português', flagReference: 'BR' }
]

const LanguageSwitcher = () => {
  const { i18n, t } = usePageTranslation()

  const currentLanguage = i18n.resolvedLanguage || i18n.language

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center px-2 gap-2 [&>svg]:text-muted-foreground/80 data-[state=open]:bg-secondary">
          <GlobeIcon size={16} aria-hidden={true} />
          <span className="font-medium text-sm w-5">
            {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}
          </span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="text-muted-foreground">
          {t('header.select_language')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.value}
              className="group"
              onClick={() => changeLanguage(language.value)}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Flag country={language.flagReference} size={16} />
                  <span
                    className={cn(
                      'text-muted-foreground group-hover:text-foreground',
                      currentLanguage === language.value && 'text-foreground'
                    )}>
                    {language.label}
                  </span>
                </div>
                <Dot className={cn('hidden', currentLanguage === language.value && 'block')} />
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { LanguageSwitcher }
