import { ChevronDownIcon, Dot, GlobeIcon } from 'lucide-react'
import Flag from 'react-flagkit'

import { cn } from '../lib/utils'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './dropdown-menu'

export type Language<T extends string = string> = {
  value: T
  label: string
  /** ISO country code for react-flagkit, e.g. "US". */
  flagReference: string
}

type LanguageSwitcherProps<T extends string> = {
  languages: Language<T>[]
  current: string
  /** The app decides how a language change happens (e.g. navigating to /pt). */
  onChange: (language: T) => void
  /** Translated trigger name and menu heading, e.g. "Select language". */
  label: string
}

const LanguageSwitcher = <T extends string>({
  languages,
  current: currentLanguage,
  onChange: changeLanguage,
  label
}: LanguageSwitcherProps<T>) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        aria-label={label}
        className="flex items-center px-2 gap-2 [&>svg]:text-muted-foreground/80 data-[state=open]:bg-secondary">
        <GlobeIcon size={16} aria-hidden={true} />
        <span className="font-medium text-sm w-5" aria-hidden="true">
          {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}
        </span>
        <ChevronDownIcon className="h-4 w-4" aria-hidden={true} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[200px]">
      <DropdownMenuLabel className="text-muted-foreground">{label}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="flex flex-col gap-1">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.value}
            className="group"
            aria-current={currentLanguage === language.value ? 'true' : undefined}
            onClick={() => changeLanguage(language.value)}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Flag country={language.flagReference} size={16} aria-hidden={true} />
                <span
                  className={cn(
                    'text-muted-foreground group-hover:text-foreground',
                    currentLanguage === language.value && 'text-foreground'
                  )}>
                  {language.label}
                </span>
              </div>
              <Dot
                className={cn('hidden', currentLanguage === language.value && 'block')}
                aria-hidden={true}
              />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
)

export { LanguageSwitcher }
