import { parse, differenceInSeconds } from 'date-fns'

export function isValidDate(date: Date): boolean {
  const now = new Date()
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false
  }
  return date > now
}

export function calculateCountdown(targetDate: Date): string {
  const now = new Date()
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
