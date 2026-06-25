import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { negativeLoginCases } from '../../../test-data/login-data';

const loginCase = negativeLoginCases.find((entry) => entry.id === 'NEG-018')!;

test('NEG-018 - Case sensitivity with wrong password casing', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(loginCase.email, loginCase.password);
  await loginPage.expectLoginError("Invalid credentials");
});
