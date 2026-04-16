const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Load the local HTML file
    const htmlPath = path.resolve('/Users/customer/Work/f7z-io-f520kc/stuff/index.html');
    const fileUrl = `file://${htmlPath}`;

    console.log(`Loading: ${fileUrl}`);
    const response = await page.goto(fileUrl, { waitUntil: 'load' });
    console.log(`Page loaded`);

    // Wait a bit for rendering
    await page.waitForTimeout(1000);

    // Take screenshot
    const screenshotPath = '/Users/customer/Work/f7z-io-f520kc/stuff-screenshot.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to: ${screenshotPath}`);

    // Get computed styles to verify the design
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    console.log(`\nBackground color: ${bgColor}`);

    const fontFamily = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily;
    });
    console.log(`Font family: ${fontFamily}`);

    // Get all text content
    const text = await page.innerText('body');
    console.log('\n=== PAGE TEXT CONTENT ===');
    console.log(text);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
