import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMergeCustom = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['heading1', 'heading2', 'heading3', 'heading4', 'paragraph'] }]
    }
  }
})

export function cn(...inputs: ClassValue[]) {
  return twMergeCustom(clsx(inputs))
}
