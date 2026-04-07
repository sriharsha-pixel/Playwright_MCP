/**
 * Base Page class for all page objects
 * Contains common methods and utilities
 */
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async navigateTo(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill input field with text
   * @param {string} selector - The selector of the input field
   * @param {string} text - The text to fill
   */
  async fillInput(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Click on an element
   * @param {string} selector - The selector of the element to click
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Press a key
   * @param {string} selector - The selector of the element
   * @param {string} key - The key to press
   */
  async pressKey(selector, key) {
    await this.page.press(selector, key);
  }

  /**
   * Get text from an element
   * @param {string} selector - The selector of the element
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - The selector of the element
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - The selector of the element
   * @param {number} timeout - Optional timeout in milliseconds
   */
  async waitForElementVisible(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Get locator for an element
   * @param {string} selector - The selector of the element
   */
  getLocator(selector) {
    return this.page.locator(selector);
  }

  /**
   * Wait for page load state
   * @param {string} state - The state to wait for (load, domcontentloaded, networkidle)
   */
  async waitForPageLoad(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }
}
