import { test } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { getCredentials, login } from '../auth/login';

let dashboardPage: DashboardPage;

test.describe('Dashboard - Add Employee Navigation', () => {
  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await login(page, getCredentials());
    await dashboardPage.waitForDashboardLoaded();
  });

  test('Verify Add Employee quick action navigates correctly', async () => {
    await dashboardPage.clickAddEmployee();
    await dashboardPage.expectNavigationToPage(/add employee|employee/i, /Employee Management/i);
  });
});
