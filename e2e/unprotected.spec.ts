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
    // Use the specified URL for the test
    await page.goto('https://the-front-2rr1n1sy7-dynamicprompt.vercel.app/login', { waitUntil: 'networkidle' });

    // Wait for the "Sign in to your account" text to be visible
    await expect(page.locator('text=Sign in to your account')).toBeVisible({ timeout: 10000 });

    // Add more assertions as needed
  });
});
