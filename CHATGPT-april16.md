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
})();  based on the index.html <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to 2023</title>
</head>
<body>
    <h1>Simple Welcome to 2023 with External JavaScript</h1>
    <button onclick="showWelcome()">Click me!</button>

    <script src="welcome.js"></script>
</body>
</html>
this code   const alertMessage = page.on('dialog', async (dialog) => {
    console.log('Alert message:', dialog.message());
    await dialog.dismiss();
  }); never gets exectued 

You're right. The issue is that the page.on('dialog') event listener is being added after the button click, so the alert might have already been triggered before the listener is set up. To fix this, move the event listener before the button click action. Here's the updated Puppeteer test script:

javascript
Copy code
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Show the browser
    devtools: true   // Open the DevTools
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:8080'); // Replace this URL with the local path to your HTML file or your server URL.
  console.log('Page title:');

  // Set up event listener for 'dialog' event
  page.on('dialog', async (dialog) => {
    console.log('Alert message:', dialog.message());
    await dialog.dismiss();
  });

  // Perform UI tests here
  await page.click('button');
  debugger; // Add this line to pause execution
  await page.waitForTimeout(1000 * 60 * 5); // Wait for 5 minutes

  await browser.close();
})();
With this change, the event listener is set up before clicking the button, ensuring that the alert event is captured and the console.log() statement inside the listener is executed.




George B
what is currently   page.on('dialog' event? it seems that the  <button onclick="showWelcome()">Click me!</button> is just calling a function and I really want to capture the result of showWelcome() with pupetter 
I apologize for the confusion. Since the showWelcome() function doesn't return any value or create a dialog, you're right that the page.on('dialog') event is not suitable in this case. Instead, you can modify the showWelcome() function to return a value and then retrieve that value using Puppeteer.

First, update the welcome.js file to return a value from the showWelcome() function:

javascript
Copy code
function showWelcome() {
  try {
    const message = "Welcome to 2023!";
    message.nonExistentMethod();
    return "Success";
  } catch (error) {
    console.error('An error occurred:', error);
    return "Error: " + error.message;
  }
}
Next, update the Puppeteer test script to capture the result of the showWelcome() function:

javascript
Copy code
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
  const result = await page.evaluate(() => {
    return showWelcome();
  });
  console.log('Result of showWelcome():', result);

  debugger; // Add this line to pause execution
  await page.waitForTimeout(1000 * 60 * 5); // Wait for 5 minutes

  await browser.close();
})();
Now, the script will log the result of the showWelcome() function after clicking the button.