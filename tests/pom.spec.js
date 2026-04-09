import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CONFIG } from '../config/config.js';

test.describe('Automation Practice - E-commerce Tests', () => {
  let authPage;
  let loginPage;
  let dashboardPage;

  test.beforeAll(async ({ browser }) => {
    // Login once and save context for reuse
    const context = await browser.newContext();
    authPage = await context.newPage();
    
    loginPage = new LoginPage(authPage);
    dashboardPage = new DashboardPage(authPage);

    // Perform login once
    await authPage.goto(CONFIG.baseUrl);
    await authPage.waitForLoadState('domcontentloaded');
    await authPage.waitForTimeout(CONFIG.implicitTimeout);
    await loginPage.login(CONFIG.testUsername, CONFIG.testPassword);

    console.log('Login completed and stored');
  });

  test.afterAll(async () => {
    // Close the authenticated page after all tests
    await authPage.close();
  });

  test('TC-001: User can login with valid credentials', async () => {
    const url = authPage.url();
    expect(url).toContain('dashboard');
  });

  test('TC-002: Profile name is displayed after login', async () => {
    const profileName = await dashboardPage.getLoggedInUserName();
    expect(profileName).toBeTruthy();
  });

  test('TC-003: Dashboard admin menu is visible after login', async () => {
    const isVisible = await dashboardPage.adminLink.isVisible();
    expect(isVisible).toBe(true);
  });

  test('TC-004: Dashboard page URL verified', async () => {
    const url = authPage.url();
    expect(url).toMatch(/dashboard/);
  });

  test('TC-005: Multiple dashboard menu items visible after login', async () => {
    const adminVisible = await dashboardPage.adminLink.isVisible();
    const pimVisible = await dashboardPage.pimLink.isVisible();
    const leaveVisible = await dashboardPage.leaveLink.isVisible();

    expect(adminVisible).toBe(true);
    expect(pimVisible).toBe(true);
    expect(leaveVisible).toBe(true);
  });
});
