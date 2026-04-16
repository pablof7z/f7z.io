const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('Navigating to https://f7z.io/stuff/...');
    const response = await page.goto('https://f7z.io/stuff/', { waitUntil: 'networkidle' });
    console.log(`Page loaded with status: ${response.status()}`);

    // Wait a bit for any dynamic content
    await page.waitForTimeout(1000);

    // Take screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `/Users/customer/Work/f7z-io-f520kc/screenshot-${timestamp}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to: ${screenshotPath}`);

    // Get page content for analysis
    const content = await page.content();
    console.log('\n=== PAGE HTML (first 3000 chars) ===');
    console.log(content.substring(0, 3000));

    // Get text content
    const text = await page.innerText('body');
    console.log('\n=== PAGE TEXT CONTENT ===');
    console.log(text);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
