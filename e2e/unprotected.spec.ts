import { test, expect } from '@playwright/test';

test.describe('Streaming Website Tests', () => {
    test('should handle chunked streaming content', async ({ page }) => {
        console.log('Starting test: should handle chunked streaming content');
        await page.goto('/');
        console.log('Navigated to homepage');

        // Wait for the streaming content container to be visible
        await page.waitForSelector('body', { state: 'visible', timeout: 30000 });
        console.log('Body is visible');

        // Function to collect chunks
        const chunks: string[] = [];
        await page.exposeFunction('addChunk', (chunk: string) => {
            chunks.push(chunk);
            console.log('Received chunk:', chunk);
        });

        // Listen for chunks
        await page.evaluate(() => {
            const observer = new MutationObserver((mutations) => {
                for (let mutation of mutations) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                // @ts-ignore
                                window.addChunk(node.textContent);
                            }
                        });
                    }
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        });
        console.log('Set up MutationObserver');

        // Wait for some time to collect chunks (adjust timeout as needed)
        await page.waitForTimeout(10000);
        console.log('Waited for 10 seconds');

        // Verify that we received chunks
        expect(chunks.length).toBeGreaterThan(0);
        console.log('Total chunks received:', chunks.length);
        console.log('Chunks:', chunks);

        // You can add more specific assertions here based on the expected content of your chunks
    });

    test('should handle user interactions with streaming content', async ({ page }) => {
        await page.goto('/');

        // Wait for an interactive element to be available
        await page.waitForSelector('#interaction-button', { state: 'visible' });

        // Interact with the streaming content
        await page.click('#interaction-button');

        // Wait for and verify the response to the interaction
        const responseElement = await page.waitForSelector('#interaction-response', { state: 'visible', timeout: 5000 });
        const responseText = await responseElement.textContent();
        expect(responseText).toContain('Interaction successful');
    });

    // Add more tests as needed for your specific streaming features
});