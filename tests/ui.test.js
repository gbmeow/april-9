const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Show the browser
    devtools: true   // Open the DevTools
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:8080'); // Replace this URL with the local path to your HTML file or your server URL.
  console.log('Page title:');

  // Perform UI tests here
  await page.click('button');
  debugger; // Add this line to pause execution
  await page.waitForTimeout(1000 * 60 * 5); // Wait for 5 minutes

  const alertMessage = page.on('dialog', async (dialog) => {
    console.log('Alert message:', dialog.message());
    await dialog.dismiss();
  });

  await browser.close();
})();

