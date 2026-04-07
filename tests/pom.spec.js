// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';

test.describe('Automation Practice - E-commerce Tests', () => {
  /** @type {HomePage} */
  let homePage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    homePage = new HomePage(page);
    
    // Navigate to home page
    await homePage.goToHomePage();
  });

  test('TC-001: Search for T-shirts and verify Faded Short Sleeve T-shirt', async ({ page }) => {
    // Act
    await homePage.searchProduct('T-shirts');

    // Assert
    const productExists = await homePage.verifyProductExists('Faded Short Sleeve T-Shirt');
    expect(productExists).toBe(true);
  });

  test('TC-002: Get all products from search results', async ({ page }) => {
    // Act
    await homePage.searchProduct('T-shirts');
    const products = await homePage.getAllProductNames();

    // Assert
    expect(products.length).toBeGreaterThan(0);
    console.log('Found products:', products);
  });

  test('TC-003: Click on product and verify product page', async ({ page }) => {
    // Act
    await homePage.searchProduct('T-shirts');
    await homePage.clickOnProduct('Faded Short Sleeve T-Shirt');
    
    const productPage = new ProductPage(page);
    const title = await productPage.getProductTitle();

    // Assert
    expect(title).toContain('Faded Short Sleeve T-Shirt');
  });
});
