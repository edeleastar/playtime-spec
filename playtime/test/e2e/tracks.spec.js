import { test, expect } from '@playwright/test';
import { testUser } from '../fixtures.js';

const tracksTestPlaylistName = 'Tracks E2E Test Playlist';

test.describe('Tracks', () => {
  test('add track to playlist, see in list; delete track; delete playlist with tracks; dashboard → detail → back', async ({
    page,
  }) => {
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

    await page.getByLabel(/playlist title/i).fill(tracksTestPlaylistName);
    await page.getByRole('button', { name: /add playlist/i }).click();
    await page.getByRole('link', { name: new RegExp(tracksTestPlaylistName) }).first().click();

    await page.getByLabel(/^title$/i).fill('My Song');
    await page.getByLabel(/artist/i).fill('The Artist');
    await page.getByRole('button', { name: /add track/i }).click();

    await expect(page).toHaveURL(/\/playlist\/.+/);
    await expect(page.locator('body')).toContainText('My Song');
    await expect(page.locator('body')).toContainText('The Artist');

    await page.getByRole('link', { name: /delete track/i }).first().click();
    await expect(page.locator('body')).not.toContainText('My Song');

    await page.getByRole('link', { name: /back to dashboard/i }).click();
    await expect(page).toHaveURL('/dashboard');
    await page
      .locator('.box')
      .filter({ hasText: tracksTestPlaylistName })
      .getByRole('link', { name: /delete playlist/i })
      .click();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('body')).not.toContainText(tracksTestPlaylistName);

    await page.getByLabel(/playlist title/i).fill('Nav Test Playlist');
    await page.getByRole('button', { name: /add playlist/i }).click();
    await page.getByRole('link', { name: /Nav Test Playlist/i }).first().click();
    await expect(page).toHaveURL(/\/playlist\/.+/);
    await page.getByRole('link', { name: /back to dashboard/i }).click();
    await expect(page).toHaveURL('/dashboard');
  });
});
