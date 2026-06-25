const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  await page.goto('https://planex-front-end.vercel.app/dashboard/', { waitUntil:'networkidle' });
  await page.fill('input[name="email"]', 'fatimaqa202@gmail.com');
  await page.fill('input[name="password"]', 'Test@1234');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  console.log('login url', page.url());
  const logout = await page.$('button:has-text("Logout")');
  console.log('logout exists', !!logout);
  if (logout) {
    await logout.click();
    await page.waitForTimeout(3000);
    console.log('after logout url', page.url());
    const body = await page.locator('body').innerText();
    console.log('after logout body snippet', body.slice(0,400));
  }
  console.log('direct dashboard access after logout');
  await page.goto('https://planex-front-end.vercel.app/dashboard/', { waitUntil:'networkidle' });
  await page.waitForTimeout(3000);
  console.log('direct access url', page.url());
  const directBody = await page.locator('body').innerText();
  console.log('direct body snippet', directBody.slice(0,400));
  await browser.close();
})();
