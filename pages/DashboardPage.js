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
        await this.waitForPageLoad();
        return this.isUrlContains('dashboard');
    }

    /**
     * Check if sidebar is visible
     * @returns {boolean} True if sidebar visible
     */
    async isSidebarVisible() {
        try {
            return await this.isVisible(this.sidebar);
        } catch {
            return false;
        }
    }

    /**
     * Get logged-in user name
     * @returns {string} User name
     */
    async getLoggedInUserName() {
        return await this.getText(this.profileName);
    }

    // ==================== Navigation ====================

    /**
     * Click on menu item by name
     * @param {string} menuName - Menu name
     */
    async clickMenu(menuName) {
        const menuLocator = await this.getLocator(`//a[contains(text(), "${menuName}")]`);
        await this.click(menuLocator);
        await this.waitForPageLoad();
    }

    /**
     * Navigate to Admin
     */
    async goToAdmin() {
        await this.click(this.adminLink);
        await this.waitForPageLoad();
    }

    /**
     * Navigate to PIM
     */
    async goToPIM() {
        await this.click(this.pimLink);
        await this.waitForPageLoad();
    }

    /**
     * Navigate to Leave
     */
    async goToLeave() {
        await this.click(this.leaveLink);
        await this.waitForPageLoad();
    }

    /**
     * Navigate to Dashboard
     */
    async goToDashboard() {
        await this.click(this.dashboardLink);
        await this.waitForPageLoad();
    }

    // ==================== Logout ====================

    /**
     * Perform logout
     */
    async logout() {
        await this.click(this.profileImage);
        await this.waitForElementVisible(this.logoutButton, 30000);
        await this.click(this.logoutButton);
        await this.waitForPageLoad();
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
