import { BasePage } from './BasePage.js';

/**
 * ProductPage Object
 * Contains locators and methods for product page interactions
 */
export class ProductPage extends BasePage {
  constructor(page) {
    super(page);

    // ==================== Locators ====================
    this.productTitle = page.locator('h1[itemprop="name"]');
    this.productPrice = page.locator('span[id*="our_price"]');
    this.addToCartButton = page.locator('button[name="Submit"]');
    this.productQuantity = page.locator('input[name="quantity"]');
    this.productImage = page.locator('img[itemprop="image"]');
    this.productDescription = page.locator('[itemprop="description"]');
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
   * Get product description
   */
  async getProductDescription() {
    return await this.getText(this.productDescription);
  }

  /**
   * Add product to cart
   */
  async addToCart() {
    await this.click(this.addToCartButton);
    await this.waitForPageLoad();
  }

  /**
   * Set product quantity
   * @param {number} quantity - The quantity to set
   */
  async setQuantity(quantity) {
    await this.fillInput(this.productQuantity, quantity.toString());
  }

  /**
   * Get product quantity
   */
  async getQuantity() {
    return await this.getValue(this.productQuantity);
  }

  /**
   * Verify product title contains text
   * @param {string} expectedText - The expected text
   */
  async verifyProductTitle(expectedText) {
    return await this.verifyElementContainsText(this.productTitle, expectedText);
  }

  /**
   * Check if product image is visible
   */
  async isProductImageVisible() {
    return await this.isVisible(this.productImage);
  }

  /**
   * Check if product details are loaded
   */
  async areProductDetailsLoaded() {
    return await this.isVisible(this.productTitle) &&
      await this.isVisible(this.productPrice) &&
      await this.isVisible(this.productDescription);
  }

  /**
   * Check if add to cart button is visible
   */
  async isAddToCartButtonVisible() {
    return await this.isVisible(this.addToCartButton);
  }

  /**
   * Go back to products page
   */
  async goBackToProducts() {
    await this.goBack();
  }
}
