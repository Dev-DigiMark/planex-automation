const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  await page.goto('https://planex-front-end.vercel.app/dashboard/', { waitUntil:'networkidle' });
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
  const emailInput = await page.locator('input[name="email"]').first();
  console.log('email parent', await emailInput.evaluate(el => el.parentElement?.outerHTML));
  const passwordInput = await page.locator('input[name="password"]').first();
  console.log('password parent', await passwordInput.evaluate(el => el.parentElement?.outerHTML));
  const body = await page.locator('body').innerHTML();
  console.log('body contains required', body.includes('This field is required'));
  await browser.close();
})();
