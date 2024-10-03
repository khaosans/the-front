import { test, expect } from '@playwright/test';

test.describe('Unprotected Page Tests', () => {
    test('should navigate to the homepage and see content', async ({ page }) => {
        await page.goto('/'); // Navigate to the homepage

        // Check if the page contains any content
        const content = await page.content();
        expect(content).toContain('Welcome'); // Ensure this matches the actual homepage content
    });

    test('should navigate to the landing page and see content', async ({ page }) => {
        await page.goto('/landing'); // Navigate to the landing page

        // Check if the page contains any content
        const content = await page.content();
        expect(content).toContain('AI-Powered Task Management'); // Ensure this matches the actual landing page content
    });

    test('should navigate to the about page and see content', async ({ page }) => {
        await page.goto('/about'); // Navigate to the about page

        // Check if the page contains any content
        const content = await page.content();
        expect(content).toContain('About Us'); // Ensure this matches the actual about page content
    });

    test('should navigate to the signup page and see content', async ({ page }) => {
        await page.goto('/signup'); // Navigate to the signup page

        // Check if the page contains any content
        const content = await page.content();
        expect(content).toContain('Create your account'); // Ensure this matches the actual signup page content
    });
});