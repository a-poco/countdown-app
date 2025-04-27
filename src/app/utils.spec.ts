import { isValidDate, calculateCountdown, capitalizeWords } from './utils';

describe('Utils', () => {
  describe('isValidDate', () => {
    it('should return false for invalid dates', () => {
      expect(isValidDate(new Date('invalid'))).toBe(false);
    });

    it('should return false for past dates', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      expect(isValidDate(pastDate)).toBe(false);
    });

    it('should return true for future dates', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      expect(isValidDate(futureDate)).toBe(true);
    });
  });

  describe('calculateCountdown', () => {
    it('should calculate countdown for future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 2);
      const countdown = calculateCountdown(futureDate);

      expect(countdown).toContain('2 days');
      expect(countdown).toMatch(/\d+h, \d+m, \d+s/);
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    it('should handle multiple spaces', () => {
      expect(capitalizeWords('hello  world')).toBe('Hello  World');
    });

    it('should convert rest of word to lowercase', () => {
      expect(capitalizeWords('hELLo wORLd')).toBe('Hello World');
    });
  });
});
