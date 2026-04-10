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
    await this.waitForPageLoad();
  }

  /**
   * Fill input field with text
   * @param {object} selector - The selector of the input field
   * @param {string} text - The text to fill
   */
  async fillInput(selector, text) {
    await selector.fill(text);
  }

  /**
   * Click on an element
   * @param {object} selector - The selector of the element to click
   */
  async click(selector) {
    await selector.click();
  }

  /**
   * Press a key
   * @param {object} selector - The selector of the element
   * @param {string} key - The key to press
   */
  async pressKey(selector, key) {
    await selector.press(key);
  }

  /**
   * Get text from an element
   * @param {object} selector - The selector of the element
   */
  async getText(selector) {
    return await selector.textContent();
  }

  /**
   * Check if element is visible
   * @param {object} selector - The selector of the element
   */
  async isVisible(selector) {
    return await selector.isVisible();
  }

  /**
   * Wait for element to be visible
   * @param {object} selector - The selector of the element
   * @param {number} timeout - Optional timeout in milliseconds
   */
  async waitForElementVisible(selector, timeout = 5000) {
    await selector.waitFor({ state: 'visible', timeout });
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

  /**
     * Check if URL contains text
     * @param {string} text - Text to check
     * @returns {boolean} True if URL contains text
     */
  async isUrlContains(text) {
    return this.page.url().includes(text);
  }

  /**
   * Get current page URL
   * @returns {string} Current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /** 
   * Get all text contents of elements matching selector
   * @param {object} selector - The selector of the elements
   * @returns {Array} Array of text contents
   */
  async getAllTextContents(selector) {
    return await selector.allTextContents();
  }

  /**
   * Get total number of products
   * @param {object} selector - The selector of the elements
   * @returns {number} Total number of products
   */
  async getProductCount(selector) {
    return await selector.count();
  }

  /**
   * Get input value of an element
   * @param {object} selector - The selector of the input element
   * @returns {string} Input value
   */
  async getValue(selector) {
    return await selector.inputValue();
  }

  /**
   * verify if element contains text
   * @param {object} selector - The selector of the element
   * @param {string} expectedText - The expected text to verify
   * @returns {boolean} True if element contains expected text
   */
  async verifyElementContainsText(selector, expectedText) {
    const actualText = await this.getText(selector);
    return actualText.includes(expectedText);
  }

  /**
   * Go back to previous page
   */
  async goBack() {
    await this.page.goBack();
    await this.waitForPageLoad();
  }

}
