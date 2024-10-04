import { test, expect } from '@playwright/test';

test('should navigate to the homepage and see content', async ({ page }) => {
  // Use the BASE_URL from the environment variable
  await page.goto(process.env.BASE_URL);  // Use the dynamic BASE_URL
  
  // Example of using the Bypass Token in a request
  const response = await page.request.get('/api/some-endpoint', {
    headers: {
      'Authorization': `Bearer ${process.env.BYPASS_TOKEN}`  // Use the Bypass Token
    }
  });

  // Check if the response is successful
  expect(response.ok()).toBeTruthy();

  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');
  
  // Check for the presence of the expected text
  const content = await page.content();
  expect(content).toContain('Welcome');
});