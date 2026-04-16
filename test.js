const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:3000');

  await page.click('#login-button');
  await page.waitForTimeout(3000); // Wait for loading screen

  // Wait a bit to let the text type out
  await page.waitForTimeout(4000);

  await page.screenshot({ path: 'test_sprite_fix.png' });

  await browser.close();
})();
