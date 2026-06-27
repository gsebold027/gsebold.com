const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }
const dateFormatters: Record<string, Intl.DateTimeFormat> = {
  'en-US': new Intl.DateTimeFormat('en-US', DATE_FORMAT_OPTIONS),
  'pt-BR': new Intl.DateTimeFormat('pt-BR', DATE_FORMAT_OPTIONS)
}

const formatDate = (date: Date | string | null | undefined, locale = 'en-US'): string => {
  if (!date) return '-'

  const newDate = new Date(date)

  if (Object.prototype.toString.call(newDate) !== '[object Date]' || isNaN(newDate.getTime())) {
    return '-'
  }

  const formatter = dateFormatters[locale] ?? dateFormatters['en-US']
  return formatter.format(newDate)
}

const formatWorkDate = (date: Date, language: string): string => {
  const locale = language === 'pt' ? 'pt-BR' : 'en-US'

  const formatted = formatDate(date, locale)

  if (language === 'pt') {
    // Convert "mai. de 2021" to "Mai/2021"
    return formatted.replace(/\. de /, '/').replace(/^./, (char) => char.toUpperCase())
  } else {
    // Convert "May 2021" to "May/2021"
    return formatted.replace(' ', '/')
  }
}

export const formatWorkPeriod = (
  start: Date,
  end: Date | null,
  currentLabel: string,
  language: string
): string => {
  const startFormatted = formatWorkDate(start, language)

  if (end === null) {
    return `${startFormatted} -> ${currentLabel}`
  }

  const endFormatted = formatWorkDate(end, language)
  return `${startFormatted} -> ${endFormatted}`
}
