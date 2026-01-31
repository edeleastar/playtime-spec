/**
 * E2E tests for full stack with MongoDB. Run with MONGO_URI set to use Mongo backend.
 * Example: MONGO_URI=mongodb://localhost:27017/playtime_test npm run test:e2e
 * Same flow runs with JSON backend when MONGO_URI is not set.
 */

import { test, expect } from '@playwright/test';
import { testUser } from '../fixtures.js';

const mongoPlaylistTitle = 'Mongo E2E Playlist';
const mongoTrackTitle = 'Mongo E2E Track';
const mongoTrackArtist = 'Mongo E2E Artist';

test.describe('MongoDB E2E', () => {
  test('data persists and is visible after re-login (Mongo or JSON backend)', async ({
    page,
  }) => {
    const uniqueEmail = `mongo-${Date.now()}@test.com`;
    await page.goto('/signup');
    await page.getByLabel(/first name/i).fill(testUser.firstName);
    await page.getByLabel(/last name/i).fill(testUser.lastName);
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /register/i }).click();

    await page.goto('/login');
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page).toHaveURL('/dashboard');

    await page.getByLabel(/playlist title/i).fill(mongoPlaylistTitle);
    await page.getByRole('button', { name: /add playlist/i }).click();
    await expect(page.locator('body')).toContainText(mongoPlaylistTitle);

    await page
      .getByRole('link', { name: new RegExp(mongoPlaylistTitle) })
      .first()
      .click();
    await page.getByLabel(/^title$/i).fill(mongoTrackTitle);
    await page.getByLabel(/artist/i).fill(mongoTrackArtist);
    await page.getByRole('button', { name: /add track/i }).click();

    await expect(page.locator('body')).toContainText(mongoTrackTitle);
    await expect(page.locator('body')).toContainText(mongoTrackArtist);

    await page.getByRole('link', { name: /log out/i }).click();
    await expect(page).toHaveURL('/');

    await page.goto('/login');
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('body')).toContainText(mongoPlaylistTitle);

    await page
      .getByRole('link', { name: new RegExp(mongoPlaylistTitle) })
      .first()
      .click();
    await expect(page.locator('body')).toContainText(mongoTrackTitle);
    await expect(page.locator('body')).toContainText(mongoTrackArtist);
  });
});
