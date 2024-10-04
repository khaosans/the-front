import { test, expect } from '@playwright/test';

test('should load homepage with content', async ({ page }) => {
  console.log('Starting test: should load homepage with content');
  await page.goto('/');
  console.log('Navigated to homepage');

  await page.waitForSelector('body', { state: 'visible' });
  console.log('Body is visible');

  const content = await page.textContent('body');
  console.log('Page content:', content);

  expect(content).toContain('Welcome');
  console.log('Content contains "Welcome"');
});