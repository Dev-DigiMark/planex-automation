
import test  from "playwright/test";
import { getCredentials, login } from "../auth/login";
import employeeJSON from  "../employees/employee-data.json"
 import path from 'path';
import { expect } from "playwright/test";




test("Add Employee", async ({ page }) => {
   const userCredentials = getCredentials();


   const employeeData = employeeJSON;
    await login(page,userCredentials);
  

  await page.getByRole('link', { name: 'Employees' }).click();
  await page.locator('button').filter({ hasText: 'Add Employee' }).click();


await page.locator('input[name="profile"]')
  .setInputFiles('tests/test-data/Capture3.PNG');

  
 
 



  //const filePath = path.resolve(process.cwd(), 'test-data/Capture.PNG');

 // console.log('test-data/Capture.PNG'); // 👈 yahan likho



  //await page.setInputFiles('#profile', 'test-data/Capture.PNG');

  // BASIC INFO
  await page.getByRole('textbox', { name: 'Full Name *' })
    .fill(employeeData.employee.fullName);

  await page.getByRole('textbox', { name: 'Designation *' })
    .fill(employeeData.employee.designation);

  await page.locator('button').filter({ hasText: 'Select...' }).click();
  await page.getByText(employeeData.employee.department).click();

  // DATES
  await page.getByRole('button', { name: 'Pick a date' }).first().click();
  await page.getByRole('button', { name: `Thursday, ${employeeData.dates.dob}th,` }).click();

  await page.getByRole('button', { name: 'Pick a date' }).click();
  await page.getByRole('button', { name: `Tuesday, ${employeeData.dates.joiningDate}th,` }).click();

  // EMPLOYMENT TYPE
 // await page.locator('button').filter({ hasText: employeeData.employee.employmentType }).click();
  //await page.getByText(employeeData.employee.employmentType).click();

  // CONTACT INFO
  await page.getByRole('textbox', { name: 'Phone Number *' })
    .fill(employeeData.employee.phoneNumber);

  
  await page.getByRole('textbox', { name: 'Emergency Contact' }).fill(employeeData.employee.phoneNumber);

  await page.getByRole('textbox', { name: 'Address' })
    .fill(employeeData.employee.address);

  await page.locator('button').filter({ hasText: 'Continue' }).click();

  // CNIC
  await page.getByRole('textbox', { name: 'CNIC Number *' })
    .fill(employeeData.employee.cnic);

  await page.getByRole('button', { name: 'Pick a date' }).nth(1).click();
  await page.getByRole('button', { name: `Wednesday, ${employeeData.dates.cnicExpiry}th,` }).click();

  await page.locator('button').filter({ hasText: 'Continue' }).click();

  // DOCUMENT UPLOAD
  await page.locator('input[name="contract_document"]')
  .setInputFiles('tests/test-data/Scintia Outreach Content (1).pdf');

  await page.locator('button').filter({ hasText: 'Continue' }).click();

  await page.getByRole('textbox', { name: 'Account Title' })
  .fill(employeeData.finance.accountTitle);

await page.getByRole('textbox', { name: 'Account Number' })
  .fill(employeeData.finance.accountNumber);

await page.getByRole('textbox', { name: 'IBAN' })
  .fill(employeeData.finance.iban);

await page.getByRole('spinbutton', { name: 'Basic Salary (PKR) *' })
  .fill(employeeData.finance.basicSalary);
  await page.getByRole('spinbutton', { name: 'Allowances (PKR)' }).fill(employeeData.finance.allowance);
  await page.getByRole('spinbutton', { name: 'Provident Fund %' }).fill(employeeData.finance.providentFund);

await page.locator('button').filter({ hasText: 'Continue' }).click();
await page.getByRole('textbox', { name: 'Portal Email *' })
  .fill(employeeData.portalCredentials.email);

await page.getByRole('textbox', { name: 'Password *' })
  .fill(employeeData.portalCredentials.password);
await page.locator('button').filter({ hasText: 'Complete Registration' }).click();
 


}
)