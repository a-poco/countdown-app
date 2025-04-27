import { parse, differenceInSeconds } from 'date-fns'

export function isValidDate(dateString: string): boolean {
  try {
    const date = parse(dateString, 'yyyyMMdd', new Date())
    const now = new Date()
    if (isNaN(date.getTime())) {
      return false
    }
    return date > now
  } catch (error) {
    return false
  }
}

export function calculateCountdown(targetDateString: string): string {
  const now = new Date()
  const targetDate = new Date(targetDateString)

  let totalSeconds = differenceInSeconds(targetDate, now)

  const days = Math.floor(totalSeconds / (3600 * 24))
  totalSeconds %= 3600 * 24
  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${days} days, ${hours}h, ${minutes}m, ${seconds}s`
}

export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
