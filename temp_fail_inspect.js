const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const cases = [
    {name:'leading spaces email', email:' fatimaqa202@gmail.com', password:'Test@1234'},
    {name:'trailing spaces email', email:'fatimaqa202@gmail.com ', password:'Test@1234'},
    {name:'sql injection', email:"' OR '1'='1@example.com", password:"' OR '1'='1"},
    {name:'long email', email:`${'a'.repeat(120)}@example.com`, password:'Test@1234'},
    {name:'short email', email:'a@b.c', password:'Test@1234'},
    {name:'wrong case password', email:'fatimaqa202@gmail.com', password:'test@1234'},
  ];
  for (const c of cases) {
    console.log('CASE', c.name);
    await page.goto('https://planex-front-end.vercel.app/dashboard/', { waitUntil:'networkidle' });
    try {
      await page.fill('input[name="email"]', c.email);
      await page.fill('input[name="password"]', c.password);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      console.log('url', page.url());
      const text = await page.locator('body').innerText();
      console.log('body starts', text.slice(0,400).replace(/\n/g,' / '));
      console.log('contains invalid credentials', text.includes('Invalid credentials'));
      console.log('contains please enter', text.includes('Please enter a valid email address'));
      console.log('contains too many', text.includes('Too many failed attempts'));
    } catch (e) {
      console.log('error', e.message);
      const pages = browser.contexts().flatMap(ctx => ctx.pages());
      console.log('pages count', pages.length);
    }
  }
  await browser.close();
})();
