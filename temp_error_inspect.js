const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  async function testCase(email,password, label){
    await page.goto('https://planex-front-end.vercel.app/dashboard/', { waitUntil:'networkidle' });
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    const body = await page.locator('body').innerText();
    console.log('---', label, '---');
    console.log('body snippet', body.slice(0,200));
  }
  await testCase('','', 'empty empty');
  await testCase('fatimaqa202@gmail.com','', 'empty password');
  await testCase('','Test@1234', 'empty email');
  await testCase('invalid-email','Test@1234', 'invalid email format');
  await testCase('unknown@example.com','Test@1234', 'wrong email');
  await testCase('fatimaqa202@gmail.com','BadPassword', 'wrong password');
  await testCase(' a@b.com','Test@1234', 'leading space email');
  await testCase('a@b.com ','Test@1234', 'trailing space email');
  await testCase('fatimaqa202@gmail.com',' Test@1234', 'leading space password');
  await testCase('fatimaqa202@gmail.com','Test@1234 ', 'trailing space password');
  await browser.close();
})();
