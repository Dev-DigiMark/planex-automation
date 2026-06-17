import { test, expect } from '@playwright/test';
import { login ,getCredentials} from '../auth/login';
import employeeJSON from  "../employees/employee-data.json"


test('EMP-NEG-001 - Verify all mandatory field validations', async ({ page }) => {
   const userCredentials = getCredentials();
    const employeeData = employeeJSON;
    await login(page,userCredentials);

  await page.getByRole('link', { name: 'Employees' }).click();
  await page.locator('button').filter({ hasText: 'Add Employee' }).click();


  // Form submit without entering any data
    
  await page.locator('button').filter({ hasText: 'Continue' }).click();

  // Employee Information
  await expect(page.getByText(/Full NAME.*required/i)).toBeVisible();
  await expect(page.getByText(/DESIGNATION.*required/i)).toBeVisible();
  await expect(page.getByText(/DEPARTMENT.*required/i)).toBeVisible();
  await expect(page.getByText(/EMPLOYMENT TYPE.*required/i)).toBeVisible();
  await expect(page.getByText(/PHONE NUMBER.*required/i)).toBeVisible();
 // await expect(page.getByText(/EMERGENCY CONTACT.*required/i)).toBeVisible();
 // await expect(page.getByText(/ADDRESS.*required/i)).toBeVisible();
 
 await page.getByRole('link', { name: 'Employees' }).click();
  await page.locator('button').filter({ hasText: 'Add Employee' }).click();


  await page.getByRole('textbox', { name: 'Full Name *' })
    .fill(employeeData.employee.fullName);

   await page.getByRole('textbox', { name: 'Designation *' })
    .fill(employeeData.employee.designation);

  await  page.locator('button').filter({ hasText: 'Select...' }).click();
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

  await page.locator('button').filter({ hasText: 'Continue' }).click();
  // File Uploads
 // await expect(page.getByText(/PROFILE IMAGE.*required/i)).toBeVisible();

 

  await expect(page.getByText(/CNIC Number.*required/i)).toBeVisible();
  await expect(page.getByText(/Add Contract Document.*required/i)).toBeVisible();
  
  await page.waitForTimeout(5000);
 await page.locator('[name="cnic_number"]').click();
 await page.locator('[name="cnic_number"]').fill(employeeData.employee.cnic);
 
await page.locator('[name="contract_document"]') .setInputFiles('tests/employees/Scintia Outreach Content (1).pdf');//await page.goBack();
 await page.locator('button').filter({ hasText: 'Continue' }).click();



 
  
  await page.locator('button').filter({ hasText: 'Continue' }).click();
  // Finance
  //await expect(page.getByText(/Account Title.*required/i)).toBeVisible();
  
   await expect(page.getByText(/Basic Salary (PKR).*required/)).toBeVisible();


  

 await page.getByRole('spinbutton', { name: 'basic-salary *' })
  .fill(employeeData.finance.basicSalary);

await page.locator('button').filter({ hasText: 'Continue' }).click();
  
  // Stay on same page
  //await expect(page).toHaveURL(/employee/i);
});