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
    return await this.productTitle.textContent();
  }

  /**
   * Get product price
   */
  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  /**
   * Get product description
   */
  async getProductDescription() {
    return await this.productDescription.textContent();
  }

  /**
   * Add product to cart
   */
  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Set product quantity
   * @param {number} quantity - The quantity to set
   */
  async setQuantity(quantity) {
    await this.productQuantity.fill(quantity.toString());
  }

  /**
   * Get product quantity
   */
  async getQuantity() {
    return await this.productQuantity.inputValue();
  }

  /**
   * Verify product title contains text
   * @param {string} expectedText - The expected text
   */
  async verifyProductTitle(expectedText) {
    const title = await this.getProductTitle();
    return title.includes(expectedText);
  }

  /**
   * Check if product image is visible
   */
  async isProductImageVisible() {
    return await this.productImage.isVisible();
  }

  /**
   * Check if product details are loaded
   */
  async areProductDetailsLoaded() {
    return await this.productTitle.isVisible();
  }

  /**
   * Check if add to cart button is visible
   */
  async isAddToCartButtonVisible() {
    return await this.addToCartButton.isVisible();
  }

  /**
   * Go back to products page
   */
  async goBackToProducts() {
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }
}
