export const formatDate = (
  date: Date | string | null | undefined,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric'
  }
): string => {
  if (!date) return '-'

  const newDate = new Date(date)

  if (Object.prototype.toString.call(newDate) !== '[object Date]' || isNaN(newDate.getTime())) {
    return '-'
  }

  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(newDate)
}

export const formatWorkDate = (date: Date, language: string): string => {
  const locale = language === 'pt' ? 'pt-BR' : 'en-US'

  const formatted = formatDate(date, locale, {
    month: 'short',
    year: 'numeric'
  })

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
