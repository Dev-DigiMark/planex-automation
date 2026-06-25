import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { negativeLoginCases } from '../../../test-data/login-data';

const loginCase = negativeLoginCases.find((entry) => entry.id === 'NEG-009')!;

test('NEG-009 - Trailing spaces in email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(loginCase.email, loginCase.password);
  await loginPage.expectDashboardVisible();
});
