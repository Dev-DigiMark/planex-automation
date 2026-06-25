const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  await page.goto('https://planex-front-end.vercel.app/dashboard/', { waitUntil:'networkidle' });
  console.log('TITLE:', await page.title());
  const inputs = await page.$$('[type="email"], [type="text"], [type="password"], button, a');
  for (const el of inputs.slice(0,40)) {
    const tag = await el.evaluate(n => n.tagName);
    const type = await el.evaluate(n => n.getAttribute('type'));
    const name = await el.evaluate(n => n.getAttribute('name'));
    const placeholder = await el.evaluate(n => n.getAttribute('placeholder'));
    const ariaLabel = await el.evaluate(n => n.getAttribute('aria-label'));
    const text = await el.evaluate(n => n.innerText);
    console.log({tag, type, name, placeholder, ariaLabel, text});
  }
  const form = await page.locator('form');
  console.log('FORM COUNT', await form.count());
  console.log('BODY TEXT START', await page.locator('body').innerText().then(t=>t.slice(0,1200)));
  await browser.close();
})();
