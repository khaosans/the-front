/// <reference types="node" />

import { test, expect } from '@playwright/test';

const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

test.use({
  extraHTTPHeaders: bypassSecret ? { 'x-vercel-protection-bypass': bypassSecret } : {},
});

test.describe('Smoke Tests for Unprotected Pages', () => {
  test('should load the home page and check basic elements', async ({ page }) => {
    await page.goto('/login');

    // Expect text 'Sign in to your account' to be visible anywhere on the page
    await expect(page.locator('text=Sign in to your account')).toBeVisible();
    
    // Check for main heading content
    // Add your assertions here

    // Check for page title
    // Add your assertions here
  });
});