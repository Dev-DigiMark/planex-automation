import test from "playwright/test";
import { getCredentials, login } from "../auth/login";
import {  expect } from '@playwright/test';



const userCredentials = getCredentials();

test('Delete Expense', async ({ page }) => {

    await login(page,userCredentials);
    await page.getByText('Expense Log').click();
  

  

//    const row = page.locator('tbody tr').first();

//   // click 3 dots (SVG kebab menu)
//   await row.locator('svg').click();

//   // click delete option
//  await page.getByText('Delete').click();

//   // confirm delete (if exists)
 

});

