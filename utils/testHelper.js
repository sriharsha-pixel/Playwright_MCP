/**
 * Test Helper Utilities
 * Common utility functions for testing
 */

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate random string
 * @param {number} length - Length of random string
 * @returns {string} Random string
 */
export function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email
 * @returns {string} Random email address
 */
export function generateRandomEmail() {
  return `test${generateRandomString(8)}@example.com`;
}

/**
 * Generate random phone number
 * @returns {string} Random phone number
 */
export function generateRandomPhone() {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}

/**
 * Get current timestamp in a readable format
 * @returns {string} Timestamp
 */
export function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Log test information
 * @param {string} message - Message to log
 */
export function logInfo(message) {
  console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${message}`);
}

/**
 * Log test error
 * @param {string} message - Message to log
 */
export function logError(message) {
  console.error(`[ERROR] ${new Date().toLocaleTimeString()} - ${message}`);
}

/**
 * Log test warning
 * @param {string} message - Message to log
 */
export function logWarning(message) {
  console.warn(`[WARNING] ${new Date().toLocaleTimeString()} - ${message}`);
}

/**
 * Convert date to string format
 * @param {Date} date - The date to convert
 * @param {string} format - Date format (YYYY-MM-DD, MM/DD/YYYY, etc.)
 * @returns {string} Formatted date string
 */
export function formatDate(date = new Date(), format = 'YYYY-MM-DD') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  } else if (format === 'MM/DD/YYYY') {
    return `${month}/${day}/${year}`;
  } else if (format === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`;
  }
  return `${year}-${month}-${day}`;
}

/**
 * Get current date
 * @returns {string} Current date in YYYY-MM-DD format
 */
export function getCurrentDate() {
  return formatDate(new Date(), 'YYYY-MM-DD');
}

/**
 * Get future date
 * @param {number} days - Number of days in future
 * @returns {string} Future date in YYYY-MM-DD format
 */
export function getFutureDate(days = 1) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date, 'YYYY-MM-DD');
}

/**
 * Get past date
 * @param {number} days - Number of days in past
 * @returns {string} Past date in YYYY-MM-DD format
 */
export function getPastDate(days = 1) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date, 'YYYY-MM-DD');
}

/**
 * Capitalize string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert string to title case
 * @param {string} str - String to convert
 * @returns {string} Title case string
 */
export function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Check if string contains value (case insensitive)
 * @param {string} text - Text to search in
 * @param {string} searchValue - Value to search for
 * @returns {boolean} True if contains
 */
export function containsIgnoreCase(text, searchValue) {
  return text.toLowerCase().includes(searchValue.toLowerCase());
}

/**
 * Extract numbers from string
 * @param {string} str - String to extract from
 * @returns {string} Extracted numbers
 */
export function extractNumbers(str) {
  return str.replace(/\D/g, '');
}

/**
 * Remove special characters from string
 * @param {string} str - String to clean
 * @returns {string} Cleaned string
 */
export function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z0-9\s]/g, '');
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxAttempts - Maximum number of attempts
 * @param {number} delayMs - Initial delay in milliseconds
 * @returns {Promise<any>} Result of function
 */
export async function retryWithBackoff(fn, maxAttempts = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      const backoffDelay = delayMs * Math.pow(2, attempt - 1);
      logWarning(`Attempt ${attempt} failed. Retrying in ${backoffDelay}ms...`);
      await delay(backoffDelay);
    }
  }
}

/**
 * Generate random number
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function getRandomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random boolean
 * @returns {boolean} Random boolean
 */
export function getRandomBoolean() {
  return Math.random() < 0.5;
}

/**
 * Get element from array randomly
 * @param {any[]} array - Array to select from
 * @returns {any} Random element
 */
export function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Convert object to query string
 * @param {object} obj - Object to convert
 * @returns {string} Query string
 */
export function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

/**
 * Deep clone object
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Log with timestamp
 * @param {string} message - Message to log
 * @param {string} level - Log level (INFO, ERROR, WARN, etc.)
 */
export function logWithTimestamp(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}


/**
 * Compare two strings (case-insensitive)
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 */
export function compareStringsIgnoreCase(str1, str2) {
  return str1.toLowerCase().trim() === str2.toLowerCase().trim();
}
