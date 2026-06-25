import { test, expect } from '@playwright/test';
import { login } from './login';


test.describe('AUTH-NEGATIVE - Login negative scenarios', () => {
  test('Login with invalid email', async ({ page }) => {
    await login(page, {
      email: 'abc',
      password: 'Test@123'
    });

    await expect(page.getByText('Invalid email')).toBeVisible();
  });

  test('Login with empty email', async ({ page }) => {
    await login(page, {
      email: '',
      password: 'Test@123'
    });

    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('Login with empty password', async ({ page }) => {
    await login(page, {
      email: 'test@test.com',
      password: ''
    });

    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('Login with invalid password', async ({ page }) => {
    await login(page, {
      email: 'test@test.com',
      password: 'WrongPassword'
    });

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
