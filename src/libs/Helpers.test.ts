import { describe, expect, it } from 'vitest';
import { formatCurrency, formatDate } from './Helpers';

describe('formatCurrency', () => {
  it('should format IDR correctly', () => {
    // Intl in Node might produce slightly different results than in browser
    // Using a regex to make it more robust against non-breaking spaces etc.
    expect(formatCurrency(50000, 'IDR')).toMatch(/Rp\s*50.000,00/);
  });

  it('should format USD correctly', () => {
    expect(formatCurrency(123.45, 'USD')).toBe('$123.45');
  });

  it('should format EUR correctly', () => {
    // The symbol/code placement can vary by locale, en-US places it at the start.
    expect(formatCurrency(99.99, 'EUR')).toBe('€99.99');
  });
});

describe('formatDate', () => {
  // Mock date: 2025-10-19 10:30:00 UTC
  const testDate = new Date(Date.UTC(2025, 9, 19, 10, 30, 0));

  it('should format date for Indonesia (WIB)', () => {
    // WIB is UTC+7. So 10:30 UTC should be 17:30 WIB.
    const result = formatDate(testDate, 'id-ID', 'Asia/Jakarta');

    // The output can be "19/10/2025 17.30.00 WIB" or "19.10.2025, 17.30.00 WIB" depending on ICU version in Node
    // We will check for the main components to make the test less brittle.
    expect(result).toContain('19'); // day
    expect(result).toContain('10'); // month
    expect(result).toContain('2025'); // year
    expect(result).toContain('17.30.00'); // time
    expect(result).toContain('WIB'); // timezone
  });

  it('should format date for US', () => {
    // New York is UTC-4 during DST in October. 10:30 UTC is 06:30 EDT.
    const result = formatDate(testDate, 'en-US', 'America/New_York');

    expect(result).toContain('10/19/2025');
    expect(result).toContain('6:30:00 AM');
  });

  it('should format date for UK', () => {
    // London is UTC+1 during BST in October. 10:30 UTC is 11:30 BST.
    const result = formatDate(testDate, 'en-GB', 'Europe/London');

    expect(result).toContain('19/10/2025');
    expect(result).toContain('11:30:00');
  });
});
