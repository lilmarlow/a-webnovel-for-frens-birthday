const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Login screen
  await page.goto('http://localhost:8000');
  await page.screenshot({ path: 'screenshot_login.png' });

  // Game screen
  await page.click('#login-button');
  await page.waitForTimeout(1000); // Wait for transition
  await page.screenshot({ path: 'screenshot_game.png' });

  await browser.close();
})();
