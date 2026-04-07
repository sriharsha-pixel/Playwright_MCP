import { BasePage } from './BasePage.js';

/**
 * Product Page Object
 * Contains locators and methods for product page interactions
 */
export class ProductPage extends BasePage {
  // Locators
  get productTitle() {
    return 'h1[itemprop="name"]';
  }

  get productPrice() {
    return 'span[id*="our_price"]';
  }

  get addToCartButton() {
    return 'button[name="Submit"]';
  }

  get productQuantity() {
    return 'input[name="quantity"]';
  }

  /**
   * Get product title
   */
  async getProductTitle() {
    return await this.getText(this.productTitle);
  }

  /**
   * Get product price
   */
  async getProductPrice() {
    return await this.getText(this.productPrice);
  }

  /**
   * Add product to cart
   */
  async addToCart() {
    await this.click(this.addToCartButton);
    await this.waitForPageLoad('networkidle');
  }

  /**
   * Set product quantity
   * @param {number} quantity - The quantity to set
   */
  async setQuantity(quantity) {
    await this.fillInput(this.productQuantity, quantity.toString());
  }

  /**
   * Verify product title contains text
   * @param {string} expectedText - The expected text
   */
  async verifyProductTitle(expectedText) {
    const title = await this.getProductTitle();
    return title.includes(expectedText);
  }
}
