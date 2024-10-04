import { test, expect } from '@playwright/test';

test('should navigate to the homepage and see content', async ({ page }) => {
  // Use the BASE_URL from the environment variable
  await page.goto(process.env.BASE_URL);  // Use the dynamic BASE_URL
  
  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');
  
  // Check for the presence of the expected text
  const content = await page.content();
  expect(content).toContain('Welcome');
});