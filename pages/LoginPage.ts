import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly body: Locator;
  readonly logoutButton: Locator;
  readonly dashboardGreeting: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.forgotPasswordLink = page.locator('text=Forgot password?');
    this.body = page.locator('body');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.dashboardGreeting = page.locator('text=Welcome back, fatima');
  }

  private async setInputValue(input: Locator, value: string): Promise<void> {
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await expect(input).toBeEditable({ timeout: 15000 });
    try {
      await input.fill(value, { timeout: 15000 });
    } catch {
      await input.evaluate((el, v) => {
        const inputEl = el as HTMLInputElement;
        inputEl.value = v;
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
      }, value);
    }
  }

  async navigate(): Promise<void> {
    const baseUrl = process.env.BASE_URL || 'https://planex-front-end.vercel.app/';
    await this.page.goto(baseUrl, { waitUntil: 'load', timeout: 60000 });
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.loginButton).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.setInputValue(this.emailInput, email);
    await this.setInputValue(this.passwordInput, password);
    await expect(this.loginButton).toBeVisible({ timeout: 15000 });
    await this.loginButton.scrollIntoViewIfNeeded();
    await this.loginButton.click({ timeout: 60000 });
  }

  async clearCredentials(): Promise<void> {
    await this.setInputValue(this.emailInput, '');
    await this.setInputValue(this.passwordInput, '');
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.body).toContainText(message, { timeout: 15000 });
  }

  async expectDashboardVisible(): Promise<void> {
    await expect(this.logoutButton).toBeVisible({ timeout: 15000 });
    await expect(this.dashboardGreeting).toBeVisible({ timeout: 15000 });
    await expect(this.body).toContainText('Dashboard', { timeout: 15000 });
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.emailInput).toBeVisible({ timeout: 15000 });
    await expect(this.loginButton).toBeVisible({ timeout: 15000 });
    await expect(this.body).toContainText('Login', { timeout: 15000 });
  }
}
