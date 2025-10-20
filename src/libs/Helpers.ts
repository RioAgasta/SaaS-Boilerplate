/**
 * Formats a number as a currency string for supported currencies.
 * @param amount The number to format.
 * @param currency The currency code (IDR, USD, EUR).
 * @returns The formatted currency string.
 *
 * @example
 * formatCurrency(123456.78, 'IDR'); // "Rp 123.456,78"
 * formatCurrency(1234.56, 'USD');  // "$1,234.56"
 * formatCurrency(1234.56, 'EUR');  // "€1,234.56"
 */
export const formatCurrency = (amount: number, currency: 'IDR' | 'USD' | 'EUR'): string => {
  const locale = currency === 'IDR' ? 'id-ID' : 'en-US'; // Use en-US for both USD and EUR for consistent formatting
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Formats a Date object into a localized date and time string.
 * @param date The Date object to format.
 * @param locale The locale to use for formatting ('id-ID', 'en-US', 'en-GB').
 * @param timeZone Optional IANA time zone name (e.g., 'Asia/Jakarta', 'America/New_York', 'Europe/London').
 * @returns The formatted date-time string.
 *
 * @example
 * formatDate(new Date(), 'id-ID', 'Asia/Jakarta'); // e.g., "19/10/2025 14.30.00 WIB" (format depends on system)
 * formatDate(new Date(), 'en-US');                 // e.g., "10/19/2025, 9:30:00 AM"
 * formatDate(new Date(), 'en-GB');                 // e.g., "19/10/2025, 09:30:00"
 */
export const formatDate = (
  date: Date,
  locale: 'id-ID' | 'en-US' | 'en-GB',
  timeZone?: 'Asia/Jakarta' | 'Asia/Makassar' | 'Asia/Jayapura' | 'America/New_York' | 'Europe/London',
): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: locale === 'en-US', // Use 12-hour format for US, 24-hour for others
  };

  if (timeZone) {
    options.timeZone = timeZone;
    // The `timeZoneName` option is what displays the abbreviation (e.g., WIB, GMT)
    options.timeZoneName = 'short';
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
};
