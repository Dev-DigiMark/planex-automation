import { expect, Page } from '@playwright/test';

export interface Credentials {
  email: string;
  password: string;
}

export function getCredentials(): Credentials {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  if (!email || !password) {
    throw new Error('Missing USER_EMAIL or USER_PASSWORD environment variables');
  }

  return { email, password };
}

export async function login(page: Page, credentials?: Credentials): Promise<void> {
  const creds = credentials || getCredentials();

  await page.goto(process.env.BASE_URL || '');
  await page.waitForLoadState('networkidle');
  // await page.waitForLoadState('domcontentloaded');

  
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(creds.email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(creds.password);
  await page.getByRole('button', { name: 'main button' }).click();
  
 


}
