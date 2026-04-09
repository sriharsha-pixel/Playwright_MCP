import { BasePage } from './BasePage.js';

/**
 * LoginPage Object
 * Contains locators and methods for login page interactions
 */
export class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        // ==================== Locators ====================
        this.usernameField = page.locator('input[name="username"]');
        this.passwordField = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.pageTitle = page.locator('//h1[contains(text(), "Login")]');
        this.errorMessage = page.locator('.oxd-alert-content');
        this.forgotPasswordLink = page.locator('//p[contains(text(), "Forgot")]');
    }

    // ==================== Login Actions ====================

    /**
     * Perform login with username and password
     * @param {string} username - Username
     * @param {string} password - Password
     */
    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();

        // Wait for dashboard URL and sidebar menu to appear
        await this.page.waitForURL(/dashboard/, { timeout: 30000 });
        await this.page.waitForSelector('a:has-text("Admin")', { timeout: 30000 });
    }

    /**
     * Click login button
     */
    async clickLoginButton() {
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Check if login was successful (dashboard loaded)
     * @returns {boolean} True if login successful
     */
    async isLoginSuccessful() {
        await this.page.waitForURL('**/dashboard/**', { timeout: 30000 });
        return true;
    }

    /**
     * Get error message if login failed
     * @returns {string} Error message text
     */
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    // ==================== Navigation ====================

    /**
     * Navigate to login page
     */
    async goToLoginPage(baseUrl) {
        await this.page.goto(baseUrl);
        await this.page.waitForLoadState('domcontentloaded');
    }
}
