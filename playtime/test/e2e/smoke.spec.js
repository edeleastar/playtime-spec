import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('app starts and GET / returns 200 with welcome content', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);

    await expect(page.locator('body')).toContainText('Welcome');
    await expect(page.locator('body')).toContainText('Playtime');
  });
});
