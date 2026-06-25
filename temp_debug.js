const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://planex-front-end.vercel.app/', { waitUntil: 'networkidle' });
  console.log('initial url', page.url());
  console.log('email visible', await page.locator('input[name="email"]').isVisible());
  console.log('password visible', await page.locator('input[name="password"]').isVisible());
  await page.fill('input[name="email"]', 'wronguser@example.com');
  await page.fill('input[name="password"]', 'WrongPassword1!');
  console.log('filled');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);
  console.log('after click url', page.url());
  const body = await page.locator('body').innerText();
  console.log('body snippet', body.slice(0,500).replace(/\n/g,' | '));
  await browser.close();
})();
