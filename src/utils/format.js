/**
 * Formatting helpers for tabular numbers, currencies, thermal units, and timestamps
 */

/**
 * Format currency in USD
 * @param {number} amount
 * @param {boolean} [compact=false]
 * @returns {string}
 */
export function formatCurrency(amount, compact = false) {
  if (compact && amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format megawatt or kilowatt values
 * @param {number} mw
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatPowerMW(mw, decimals = 2) {
  return `${mw.toFixed(decimals)} MW`;
}

/**
 * Format megawatt-hours
 * @param {number} mwh
 * @returns {string}
 */
export function formatEnergyMWh(mwh) {
  return `${new Intl.NumberFormat('en-US').format(Math.round(mwh))} MWh`;
}

/**
 * Format carbon tonnage
 * @param {number} tonnes
 * @param {number} [decimals=1]
 * @returns {string}
 */
export function formatTonnes(tonnes, decimals = 1) {
  return `${tonnes.toFixed(decimals)} tonnes`;
}

/**
 * Format temperature in Celsius
 * @param {number} celsius
 * @returns {string}
 */
export function formatTemp(celsius) {
  return `${Math.round(celsius)}°C`;
}

/**
 * Format distance in kilometers
 * @param {number} km
 * @param {number} [decimals=1]
 * @returns {string}
 */
export function formatDistance(km, decimals = 1) {
  return `${km.toFixed(decimals)} km`;
}

/**
 * Format current UTC time string: HH:MM:SS UTC
 * @param {Date} [date]
 * @returns {string}
 */
export function formatUtcTime(date = new Date()) {
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds} UTC`;
}
