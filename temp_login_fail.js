const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  await page.goto('https://planex-front-end.vercel.app/dashboard/', { waitUntil:'networkidle' });
  await page.fill('input[name="email"]', 'wrong@example.com');
  await page.fill('input[name="password"]', 'BadPass1!');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  const url = page.url();
  console.log('URL after fail:', url);
  const body = await page.locator('body').innerText();
  console.log('BODY TEXT', body.slice(0,800));
  const errors = await page.locator('text=Invalid, text=error, text=Invalid email, text=Incorrect, text=Wrong, text=failed').allTextContents();
  console.log('ERROR TEXTS', errors);
  const errEls = await page.$$('[role="alert"], .alert, .error, div:has-text("invalid"), div:has-text("Incorrect")');
  console.log('error elements count', errEls.length);
  for (const el of errEls) {
    console.log('text', await el.innerText());
  }
  await browser.close();
})();
