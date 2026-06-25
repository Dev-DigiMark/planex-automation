import {test,expect}  from "playwright/test";
import { getCredentials, login } from "../auth/login";



test('Billing Form - Positive Flow', async ({ page }) => {
    
  const userCredentials = getCredentials();
  await login(page,userCredentials);

  await page.getByRole('link', { name: 'Billing' }).click();
  await page.locator('button').filter({ hasText: 'Add Billing Date' }).click();



  // 1. Bill Name
  const billName = page.locator('#bill_name');
  await expect(billName).toBeVisible();
  await billName.fill('Office Rent');

  // 2. Amount
  const amount = page.locator('#amount');
  await expect(amount).toBeVisible();
  await amount.fill('50000');

  // 3. Due Date (open calendar)
  const dueDateBtn = page.getByRole('button', { name: /pick a date/i });
  await dueDateBtn.click();

  // select a date (example: 25)
  await page.getByRole('gridcell', { name: '25' }).click();

  // 4. Category dropdown
  const categoryBtn = page.locator('button[role="combobox"]').nth(0);
  await categoryBtn.click();
  await page.getByRole('option', { name: /rent|utilities|office/i }).click();

  // 5. Recurring Type dropdown
  const recurringBtn = page.locator('button[role="combobox"]').nth(1);
  await recurringBtn.click();
  await page.getByRole('option', { name: /monthly|weekly|yearly/i }).click();

  // 6. Reminder days
  const reminder = page.locator('#remind_days');
  await reminder.fill('3');

  // 7. Submit
  const submitBtn = page.getByRole('button', { name: /save billing/i });
  await expect(submitBtn).toBeEnabled();
  await submitBtn.click();

  // 8. Final Success Assertion (choose one based on app behavior)

  // Option A: URL change
  await expect(page).toHaveURL(/billing|success|dashboard/i);

  // Option B: success message
  await expect(
    page.getByText(/success|created|saved/i)
  ).toBeVisible();

});