import test  from "playwright/test";
import { getCredentials, login } from "../auth/login";
import employeeJSON from  "../employees/employee-data.json"
 import path from 'path';
import { expect } from "playwright/test";

test("checkEmployeetable", async ({ page }) => {
   const userCredentials = getCredentials();


   const employeeData = employeeJSON;
    await login(page,userCredentials);


const employeeEmail = employeeData.portalCredentials.email;

await page.getByRole('link', { name: 'Employees' }).click();
await page.waitForURL('**/dashboard/employees');
await page.getByRole('textbox', { name: 'Search...' }).fill(employeeEmail);



await expect(
  page.getByRole('row', { name: new RegExp(employeeEmail, 'i') })
).toBeVisible();
await page.getByRole('link', { name: 'Employees' }).click();
await page.waitForURL('**/dashboard/employees');

await page.getByRole('textbox', { name: 'Search...' }).fill(employeeEmail);

// Row locate karo
const employeeRow = page.locator('tr').filter({
  hasText: employeeEmail
});

// Verify
await expect(employeeRow).toBeVisible();

// Row ka poora text nikalo
const employeeDetails = await employeeRow.textContent();

console.log(' Employee record found');
console.log(' Email:', employeeEmail);
console.log(' Details:', employeeDetails);


if (await employeeRow.count() > 0) {
  console.log(' Employee exists in table');

  const details = await employeeRow.textContent();
  console.log('Employee Details:', details);
} else {
  console.log(' Employee NOT found in table');
}
})