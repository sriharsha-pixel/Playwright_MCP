# Playwright Page Object Model (POM) Framework

A structured and maintainable test framework using Playwright with the Page Object Model pattern.

## Project Structure

```
PlaywrightMCP/
├── pages/
│   ├── BasePage.js          # Base class with common methods
│   ├── HomePage.js          # Home page object
│   └── ProductPage.js       # Product page object
├── tests/
│   ├── pom.spec.js          # POM-based tests
│   └── search-tshirts.spec.js # Original search test
├── utils/
│   └── testHelper.js        # Utility functions
├── playwright.config.js
└── package.json
```

## Architecture

### BasePage (pages/BasePage.js)
The base class that all page objects inherit from. Contains common methods like:
- `navigateTo(url)` - Navigate to a URL
- `fillInput(selector, text)` - Fill input fields
- `click(selector)` - Click elements
- `waitForElementVisible(selector)` - Wait for elements
- `getLocator(selector)` - Get Playwright locator

### HomePage (pages/HomePage.js)
Manages home page interactions:
- `goToHomePage()` - Navigate to home page
- `searchProduct(searchTerm)` - Search for products
- `verifyProductExists(productName)` - Check if product exists
- `getAllProductNames()` - Get all product names
- `clickOnProduct(productName)` - Click on a product

### ProductPage (pages/ProductPage.js)
Manages product page interactions:
- `getProductTitle()` - Get product title
- `getProductPrice()` - Get product price
- `addToCart()` - Add product to cart
- `setQuantity(quantity)` - Set product quantity

### Test Helpers (utils/testHelper.js)
Utility functions for common operations:
- `delay(ms)` - Wait for specified milliseconds
- `generateRandomString(length)` - Generate random strings
- `getTimestamp()` - Get formatted timestamp
- `logInfo(message)` - Log info messages
- `logError(message)` - Log error messages
- `compareStringsIgnoreCase(str1, str2)` - Compare strings

## Running Tests

### Run all tests
```powershell
npx playwright test
```

### Run specific test file
```powershell
npx playwright test tests/pom.spec.js
```

### Run in headed mode (visible browser)
```powershell
npx playwright test tests/pom.spec.js --headed
```

### Run in specific browser
```powershell
npx playwright test tests/pom.spec.js --project=chromium
```

### Run with headed mode in chromium
```powershell
npx playwright test tests/pom.spec.js --project=chromium --headed
```

### Debug mode
```powershell
npx playwright test tests/pom.spec.js --debug
```

## Test Examples

### Test Case 1: Search and Verify Product
```javascript
test('TC-001: Search for T-shirts and verify Faded Short Sleeve T-shirt', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.searchProduct('T-shirts');
  const productExists = await homePage.verifyProductExists('Faded Short Sleeve T-Shirt');
  expect(productExists).toBe(true);
});
```

### Test Case 2: Navigate to Product and Verify Title
```javascript
test('TC-003: Click on product and verify product page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.searchProduct('T-shirts');
  await homePage.clickOnProduct('Faded Short Sleeve T-Shirt');
  
  const productPage = new ProductPage(page);
  const title = await productPage.getProductTitle();
  expect(title).toContain('Faded Short Sleeve T-Shirt');
});
```

## Benefits of POM Pattern

1. **Maintainability** - Changes to UI selectors are made in one place
2. **Reusability** - Common methods and page objects can be reused across tests
3. **Readability** - Tests read like user actions rather than technical details
4. **Scalability** - Easy to add new pages and tests
5. **Reduced Duplication** - Common functionality is centralized

## Adding New Page Objects

1. Create a new file in `pages/` directory (e.g., `CheckoutPage.js`)
2. Import and extend `BasePage`
3. Define locators and methods specific to that page
4. Use in tests by importing the page object

Example:
```javascript
import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  get proceedButton() {
    return 'button[name="processAddress"]';
  }

  async proceedToCheckout() {
    await this.click(this.proceedButton);
    await this.waitForPageLoad('networkidle');
  }
}
```

## Adding New Test Cases

Create new test files in the `tests/` directory following the naming convention `<feature>.spec.js`.

Import necessary page objects and use them in your tests with the Page Object Model pattern.
