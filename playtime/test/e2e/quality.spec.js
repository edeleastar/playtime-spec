import { test, expect } from '@playwright/test';
import { testUser } from '../fixtures.js';

test.describe('Validation forms', () => {
  test('invalid playlist title shows validation errors', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel(/first name/i).fill(testUser.firstName);
    await page.getByLabel(/last name/i).fill(testUser.lastName);
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /register/i }).click();
    await page.goto('/login');
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page).toHaveURL('/dashboard');

    await page.getByLabel(/playlist title/i).fill('');
    await page.getByRole('button', { name: /add playlist/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByTestId('validation-errors')).toBeVisible();
    await expect(page.getByTestId('validation-errors')).toContainText(/\w+/);
  });

  test('invalid track input shows validation errors', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel(/first name/i).fill(testUser.firstName);
    await page.getByLabel(/last name/i).fill(testUser.lastName);
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /register/i }).click();
    await page.goto('/login');
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /log in/i }).click();

    await page.getByLabel(/playlist title/i).fill('Quality Test Playlist');
    await page.getByRole('button', { name: /add playlist/i }).click();
    await page.getByRole('link', { name: /Quality Test Playlist/i }).first().click();

    await page.getByLabel(/^title$/i).fill('');
    await page.getByLabel(/artist/i).fill('');
    await page.getByRole('button', { name: /add track/i }).click();

    await expect(page).toHaveURL(/\/playlist\//);
    await expect(page.getByTestId('validation-errors')).toBeVisible();
    await expect(page.getByTestId('validation-errors')).toContainText(/\w+/);
  });
});
