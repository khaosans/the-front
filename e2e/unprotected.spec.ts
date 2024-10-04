/// <reference types="node" />

import { test, expect } from '@playwright/test';

declare const process: {
  env: {
    VERCEL_AUTOMATION_BYPASS_SECRET?: string;
  };
};

const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

test.use({
  extraHTTPHeaders: bypassSecret ? { 'x-vercel-protection-bypass': bypassSecret } : {},
});

test.describe('Smoke Tests for Unprotected Pages', () => {
  test('should load the home page and check basic elements', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('text=Sign in to your account')).toBeVisible();
    
    // Add more assertions as needed
  });

});
