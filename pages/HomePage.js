import { BasePage } from './BasePage.js';

/**
 * Home Page Object
 * Contains locators and methods for home page interactions
 */
export class HomePage extends BasePage {
  // Locators
  get searchInput() {
    return 'input[name="search_query"]';
  }

  get searchButton() {
    return 'button[name="submit_search"]';
  }

  get productsList() {
    return '.product-container';
  }

  get productName() {
    return '.product-name';
  }

  /**
   * Navigate to home page
   */
  async goToHomePage() {
    await this.navigateTo('http://www.automationpractice.pl/index.php');
  }

  /**
   * Search for a product
   * @param {string} searchTerm - The product to search for
   */
  async searchProduct(searchTerm) {
    await this.fillInput(this.searchInput, searchTerm);
    await this.pressKey(this.searchInput, 'Enter');
    await this.waitForPageLoad('networkidle');
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
   * Get all product names from search results
   */
  async getAllProductNames() {
    await this.waitForPageLoad('networkidle');
    const products = await this.page.locator(this.productName).allTextContents();
    return products;
  }

  /**
   * Click on a product by name
   * @param {string} productName - The product name to click
   */
  async clickOnProduct(productName) {
    const productLocator = this.page.locator(`a:has-text("${productName}")`);
    await productLocator.click();
    await this.waitForPageLoad('networkidle');
  }
}
