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
    await this.page.goto(CONFIG.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify landing page URL
   * @param {string} searchTerm - The term to verify in URL
   */
  async verifyLandingPage(searchTerm) {
    return this.page.url().includes(searchTerm);
  }

  /**
   * Search for a product
   * @param {string} searchTerm - The product to search for
   */
  async searchProduct(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get all product names from search results
   */
  async getAllProductNames() {
    await this.page.waitForLoadState('networkidle');
    const products = await this.productName.allTextContents();
    return products;
  }

  /**
   * Click on a product by name
   * @param {string} productName - The product name to click
   */
  async clickOnProduct(productName) {
    const productLocator = this.page.locator(`a:has-text("${productName}")`);
    await productLocator.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify if product exists in search results
   * @param {string} productName - The product name to verify
   */
  async verifyProductExists(productName) {
    const productLocator = this.page.locator(`a:has-text("${productName}")`);
    return await productLocator.isVisible();
  }

  /**
   * Get total number of products
   */
  async getProductCount() {
    return await this.productName.count();
  }
}
