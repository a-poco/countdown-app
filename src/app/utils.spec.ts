import { isValidDate, calculateCountdown, capitalizeWords } from './utils'
import { format } from 'date-fns'

describe('Utils', () => {
  describe('isValidDate', () => {
    it('should return false for invalid dates', () => {
      expect(isValidDate('invalid')).toBe(false)
    })

    it('should return false for past dates', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 1)
      const pastDateString = format(pastDate, 'yyyyMMdd')
      expect(isValidDate(pastDateString)).toBe(false)
    })

    it('should return true for future dates', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      const futureDateString = format(futureDate, 'yyyyMMdd')
      expect(isValidDate(futureDateString)).toBe(true)
    })
  })

  describe('capitalizeWords', () => {
    it('should capitalize first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World')
    })

    it('should handle multiple spaces', () => {
      expect(capitalizeWords('hello  world')).toBe('Hello  World')
    })

    it('should convert rest of word to lowercase', () => {
      expect(capitalizeWords('hELLo wORLd')).toBe('Hello World')
    })
  })
})
