import { test, expect } from '@playwright/test';
import { getCredentials, login } from "../auth/login";



test('DASH-001 - Verify Dashboard UI Elements', async ({ page }) => {

    const userCredentials = getCredentials();
    await login(page, userCredentials);

    // Dashboard Heading
    await expect(page.getByRole('heading', { name: 'Dashboard' }))
    .toBeVisible();
    // Welcome Message
    await expect(page.getByText('Welcome back'))
        .toBeVisible();

    // Dashboard Cards
    await expect(page.getByText('Total Employees'))
        .toBeVisible();

    await expect(page.getByText('Active'))
        .toBeVisible();

    await expect(page.getByText(/Total Salary/i))
        .toBeVisible();

    await expect(page.getByText(/Pending Bills/i).first())
        .toBeVisible();

    await expect(page.getByText(/Total Expenses/i))
        .toBeVisible();

    // Sections
    await expect(page.getByText(/Quick Actions/i))
        .toBeVisible();

    await expect(page.getByText(/Billing Overview/i))
        .toBeVisible();
});