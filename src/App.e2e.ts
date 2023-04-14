import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Math with Mark/);
});

test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot({ fullPage: true });
});
