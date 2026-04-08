import { BasePage } from './BasePage.js';

/**
 * DashboardPage Object
 * Contains locators and methods for dashboard page interactions
 */
export class DashboardPage extends BasePage {
    constructor(page) {
        super(page);

        // ==================== Locators ====================
        this.dashboardTitle = page.locator('//h6[contains(text(), "Dashboard")]');
        this.profileImage = page.locator('img[alt="profile picture"]');
        this.profileName = page.locator('(//p[@class="oxd-userdropdown-name"])[1]');
        this.logoutButton = page.locator('//a[contains(text(), "Logout")]');
        this.sidebar = page.locator('nav, .sidebar, [role="navigation"]');
        this.adminLink = page.locator('a:has-text("Admin")');
        this.pimLink = page.locator('a:has-text("PIM")');
        this.leaveLink = page.locator('a:has-text("Leave")');
        this.dashboardLink = page.locator('a:has-text("Dashboard")');
        this.timeAtWorkWidget = page.locator('//p[contains(text(), "Time at Work")]');
        this.myActionsWidget = page.locator('//p[contains(text(), "My Actions")]');
    }

    // ==================== Page Verification ====================

    /**
     * Check if dashboard is loaded
     * @returns {boolean} True if dashboard loaded
     */
    async isDashboardLoaded() {
        await this.page.waitForLoadState('networkidle');
        return this.page.url().includes('dashboard');
    }

    /**
     * Check if sidebar is visible
     * @returns {boolean} True if sidebar visible
     */
    async isSidebarVisible() {
        try {
            return await this.sidebar.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Get logged-in user name
     * @returns {string} User name
     */
    async getLoggedInUserName() {
        return await this.profileName.textContent();
    }

    // ==================== Navigation ====================

    /**
     * Click on menu item by name
     * @param {string} menuName - Menu name
     */
    async clickMenu(menuName) {
        const menuLocator = this.page.locator(`//a[contains(text(), "${menuName}")]`);
        await menuLocator.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Admin
     */
    async goToAdmin() {
        await this.adminLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to PIM
     */
    async goToPIM() {
        await this.pimLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Leave
     */
    async goToLeave() {
        await this.leaveLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Dashboard
     */
    async goToDashboard() {
        await this.dashboardLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== Logout ====================

    /**
     * Perform logout
     */
    async logout() {
        await this.profileImage.click();
        await this.logoutButton.waitFor({ state: 'visible' });
        await this.logoutButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get current page URL
     * @returns {string} Current URL
     */
    async getCurrentUrl() {
        return this.page.url();
    }

    /**
     * Check if URL contains text
     * @param {string} text - Text to check
     * @returns {boolean} True if URL contains text
     */
    async isUrlContains(text) {
        return this.page.url().includes(text);
    }

    // ==================== Widgets ====================

    /**
     * Check if time at work widget is visible
     * @returns {boolean} True if visible
     */
    async isTimeAtWorkWidgetVisible() {
        return await this.timeAtWorkWidget.isVisible();
    }

    /**
     * Check if my actions widget is visible
     * @returns {boolean} True if visible
     */
    async isMyActionsWidgetVisible() {
        return await this.myActionsWidget.isVisible();
    }
}
