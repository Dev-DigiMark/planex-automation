import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { validLogin, negativeLoginCases } from '../../test-data/login-data';

const dashboardUrl = 'https://planex-front-end.vercel.app/';
const loginUrl = 'https://planex-front-end.vercel.app/';

test.describe('Planex Login Page - Authentication Scenarios', () => {
  test('Positive login should authenticate and show dashboard content', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(validLogin.email, validLogin.password);
    await loginPage.expectDashboardVisible();
  });

  for (const testData of negativeLoginCases) {
    test(`${testData.id} - ${testData.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.login(testData.email, testData.password);

      if (testData.expectedToLogin) {
        await loginPage.expectDashboardVisible();
        return;
      }

      await loginPage.expectLoginError(testData.expectedMessage || 'Invalid credentials');
    });
  }

  test('Session invalidates after logout and refresh', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(validLogin.email, validLogin.password);
    await loginPage.expectDashboardVisible();

    await page.locator('button:has-text("Logout")').click();
    await loginPage.expectLoggedOut();

    await page.reload({ waitUntil: 'networkidle' });
    await loginPage.expectLoggedOut();
  });

  test('Direct dashboard access without login redirects to login page', async ({ page }) => {
    await page.goto('https://planex-front-end.vercel.app/dashboard/', { waitUntil: 'networkidle' });
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('text=Forgot password?')).toBeVisible();
    await expect(page).toHaveURL(loginUrl, { timeout: 15000 });
  });

  test('Browser back button after logout stays on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(validLogin.email, validLogin.password);
    await loginPage.expectDashboardVisible();

    await page.locator('button:has-text("Logout")').click();
    await loginPage.expectLoggedOut();

    await page.goBack();
    await loginPage.expectLoggedOut();
  });

  test('Refresh dashboard after logout remains on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(validLogin.email, validLogin.password);
    await loginPage.expectDashboardVisible();

    await page.locator('button:has-text("Logout")').click();
    await loginPage.expectLoggedOut();

    await page.goto('https://planex-front-end.vercel.app/dashboard/', { waitUntil: 'networkidle' });
    await loginPage.expectLoggedOut();
  });

  test('Multiple failed login attempts should show lockout message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    for (let attempt = 1; attempt <= 4; attempt += 1) {
      await loginPage.login('wronguser@example.com', 'InvalidPass123!');
      await expect(page.locator('body')).toContainText(`Attempt ${attempt} of 5`, { timeout: 15000 });
      await loginPage.expectPageLoaded();
    }

    await loginPage.login('wronguser@example.com', 'InvalidPass123!');
    await expect(page.locator('body')).toContainText('Too many failed attempts', { timeout: 15000 });
  });
});
