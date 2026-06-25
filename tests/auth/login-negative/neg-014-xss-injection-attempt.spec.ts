import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { negativeLoginCases } from '../../../test-data/login-data';

const loginCase = negativeLoginCases.find((entry) => entry.id === 'NEG-014')!;

test('NEG-014 - XSS injection attempt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(loginCase.email, loginCase.password);
  await loginPage.expectLoginError("Please enter a valid email address");
});
