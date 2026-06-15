import { test, expect } from '@playwright/test';
import { login, getCredentials } from './login';

// Keep browser open for 10 seconds after each test to see results
test.afterEach(async ({ page }, testInfo) => {
  if (!process.env.CI) {
    await page.waitForTimeout(10000);
  }
});


test("auth login", async ({page})=>{
  const credentials = getCredentials();
  login(page,credentials);

})


