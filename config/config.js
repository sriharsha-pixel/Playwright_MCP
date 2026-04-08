import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * Configuration object for the test suite
 * Reads values from .env file with fallback defaults
 */
export const CONFIG = {
  // URLs
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/',
  loginUrl: process.env.LOGIN_URL || 'https://opensource-demo.orangehrmlive.com/',

  // Test Credentials
  testUsername: process.env.TEST_USERNAME || 'Admin',
  testPassword: process.env.TEST_PASSWORD || 'admin123',

  // Browser Configuration
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS === 'true',

  // Timeouts
  implicitTimeout: parseInt(process.env.IMPLICIT_TIMEOUT || '5000'),
  pageLoadTimeout: parseInt(process.env.PAGE_LOAD_TIMEOUT || '30000'),
  networkIdleTimeout: parseInt(process.env.NETWORK_IDLE_TIMEOUT || '10000'),

  // Environment
  environment: process.env.ENVIRONMENT || 'qa',
  logLevel: process.env.LOG_LEVEL || 'info',
};

/**
 * Get timeout value
 * @param {string} timeoutType - The type of timeout (implicit, pageLoad, networkIdle)
 * @returns {number} Timeout in milliseconds
 */
export function getTimeout(timeoutType) {
  const timeouts = {
    implicit: CONFIG.implicitTimeout,
    pageLoad: CONFIG.pageLoadTimeout,
    networkIdle: CONFIG.networkIdleTimeout,
  };
  return timeouts[timeoutType] || CONFIG.implicitTimeout;
}
