/**
 * Test Helper utilities
 * Common utility functions for tests
 */

/**
 * Wait for a specific amount of time (in milliseconds)
 * @param {number} ms - Milliseconds to wait
 */
export async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random string
 * @param {number} length - Length of the string
 */
export function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Get current timestamp in a readable format
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
 * Compare two strings (case-insensitive)
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 */
export function compareStringsIgnoreCase(str1, str2) {
  return str1.toLowerCase().trim() === str2.toLowerCase().trim();
}
