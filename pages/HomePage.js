import { BasePage } from './BasePage.js';
import { CONFIG } from '../config/config.js';

/**
 * HomePage Object
 * Contains locators and methods for home page interactions
 */
export class HomePage extends BasePage {
  constructor(page) {
    super(page);

    // ==================== Locators ====================
    this.searchInput = page.locator('input[name="search_query"]');
    this.searchButton = page.locator('button[name="submit_search"]');
    this.productsList = page.locator('.product-container');
    this.productName = page.locator('.product-name');
  }

  /**
   * Navigate to home page
   */
  async goToHomePage() {
    await this.navigateTo(CONFIG.baseUrl);
    await this.waitForPageLoad();
  }

  /**
   * Verify landing page URL
   * @param {string} searchTerm - The term to verify in URL
   */
  async verifyLandingPage(searchTerm) {
    return this.isUrlContains(searchTerm);
  }

  /**
   * Search for a product
   * @param {string} searchTerm - The product to search for
   */
  async searchProduct(searchTerm) {
    await this.fillInput(this.searchInput, searchTerm);
    await this.click(this.searchButton);
    await this.waitForPageLoad();
  }

  /**
   * Get all product names from search results
   */
  async getAllProductNames() {
    await this.waitForElementVisible(this.productName, 30000);
    // const products = await this.productName.allTextContents();
    const products = await this.getAllTextContents(this.productName);
    return products;
  }

  /**
   * Click on a product by name
   * @param {string} productName - The product name to click
   */
  async clickOnProduct(productName) {
    const productLocator = await this.getLocator(`a:has-text("${productName}")`);
    await this.click(productLocator);
    await this.waitForPageLoad();
  }

  /**
   * Verify if product exists in search results
   * @param {string} productName - The product name to verify
   */
  async verifyProductExists(productName) {
    const productLocator = await this.getLocator(`a:has-text("${productName}")`);
    return await productLocator.isVisible();
  }

  /**
   * Get total number of products
   */
  async getProductCount() {
    return await this.getProductCount(this.productName);
  }
}
