
import { test } from '@playwright/test';
import { getCredentials, login } from "../auth/login";
import positiveData from  "../expense-log/positiveData.json";

import path from 'path';

const filePath = path.join(__dirname, 'dummyBill.png');

test("expense-add ", async ({ page }) => {
const userCredentials = getCredentials();
const expense = positiveData.expense;

await login(page,userCredentials);
 await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Expense Log' }).click();
  await page.waitForTimeout(3000);

  await page.locator('button').filter({ hasText: '+ Log Expense' }).click();

  await page.getByRole('textbox', { name: 'Expense Name' }) .fill(expense.expenseName);

  await page.getByRole('spinbutton', { name: 'Amount (PKR)' })
    .fill(expense.amount);

  await page.getByRole('combobox').first().click();

  await page.getByRole('option', { name: expense.category })
    .click();

  await page.getByRole('button', { name: 'Pick a date' })
    .click();

await page.getByRole('button', { name: 'Pick a date' }).click();


await page.getByRole('button', { name: 'Pick a date' }).click();
  await page.getByRole('button', { name: `Wednesday, ${positiveData.expense.date}th,` }).click();

  await page.getByRole('textbox', { name: 'Description' })
    .fill(expense.description);
 
 await page.locator('input[name="receipt_photo"]')
  .setInputFiles(filePath);

  await page.locator('button[aria-label="Select..."]').nth(1).click();

  // await page.locator('button[aria-label="Select..."]').nth(1)
  //   .filter({ hasText: expense.department })
  //   .click();
  await page.getByRole('option', { name: expense.department }).click();

  await page.getByRole('button', { name: 'Save' }).click();

});