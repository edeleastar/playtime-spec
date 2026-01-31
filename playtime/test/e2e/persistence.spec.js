import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { test, expect } from '@playwright/test';
import { testUser } from '../fixtures.js';

const persistencePlaylistTitle = 'Persistence Test Playlist';
const persistenceTrackTitle = 'Persistence Test Track';
const persistenceTrackArtist = 'Persistence Test Artist';

test.describe('Persistence', () => {
  test('data survives in db.json and is visible after login', async ({ page }) => {
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

    await page.getByLabel(/playlist title/i).fill(persistencePlaylistTitle);
    await page.getByRole('button', { name: /add playlist/i }).click();
    await expect(page.locator('body')).toContainText(persistencePlaylistTitle);

    await page.getByRole('link', { name: new RegExp(persistencePlaylistTitle) }).first().click();
    await page.getByLabel(/^title$/i).fill(persistenceTrackTitle);
    await page.getByLabel(/artist/i).fill(persistenceTrackArtist);
    await page.getByRole('button', { name: /add track/i }).click();

    await expect(page.locator('body')).toContainText(persistenceTrackTitle);
    await expect(page.locator('body')).toContainText(persistenceTrackArtist);

    const dbPath = join(process.cwd(), 'src', 'models', 'json', 'db.json');
    expect(existsSync(dbPath), 'db.json should exist').toBe(true);
    const dbContent = JSON.parse(readFileSync(dbPath, 'utf8'));
    expect(dbContent.users?.length, 'users in db.json').toBeGreaterThanOrEqual(1);
    expect(dbContent.playlists?.length, 'playlists in db.json').toBeGreaterThanOrEqual(1);
    expect(dbContent.tracks?.length, 'tracks in db.json').toBeGreaterThanOrEqual(1);
    const playlistInDb = dbContent.playlists?.find((p) => p.title === persistencePlaylistTitle);
    expect(playlistInDb, 'playlist persisted in db.json').toBeDefined();
    const trackInDb = dbContent.tracks?.find((t) => t.title === persistenceTrackTitle);
    expect(trackInDb, 'track persisted in db.json').toBeDefined();

    await page.getByRole('link', { name: /log out/i }).click();
    await expect(page).toHaveURL('/');

    await page.goto('/login');
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('body')).toContainText(persistencePlaylistTitle);

    await page.getByRole('link', { name: new RegExp(persistencePlaylistTitle) }).first().click();
    await expect(page.locator('body')).toContainText(persistenceTrackTitle);
    await expect(page.locator('body')).toContainText(persistenceTrackArtist);
  });
});

test.describe('Validation', () => {
  test('invalid login shows error message', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/email/i).fill('unknown@test.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page.getByTestId('login-error')).toContainText('Invalid email or password');
  });

  test('duplicate signup shows error message', async ({ page }) => {
    const uniqueEmail = `dup-${Date.now()}@test.com`;
    await page.goto('/signup');
    await page.getByLabel(/first name/i).fill(testUser.firstName);
    await page.getByLabel(/last name/i).fill(testUser.lastName);
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /register/i }).click();

    await expect(page).toHaveURL('/');

    await page.goto('/signup');
    await page.getByLabel(/first name/i).fill('Other');
    await page.getByLabel(/last name/i).fill('Name');
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill('different');
    await page.getByRole('button', { name: /register/i }).click();

    await expect(page).toHaveURL(/\/signup/);
    await expect(page.getByTestId('signup-error')).toBeVisible();
    await expect(page.getByTestId('signup-error')).toContainText('Email already registered');
  });
});
