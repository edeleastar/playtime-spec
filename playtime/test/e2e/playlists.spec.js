import { test, expect } from '@playwright/test';
import { testUser } from '../fixtures.js';

const secondUser = {
  firstName: 'Joe',
  lastName: 'User',
  email: 'joe@playlists-test.com',
  password: 'password',
};

test.describe('Playlists', () => {
  test('create playlist, see in list, open (empty)', async ({ page }) => {
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

    await page.getByLabel(/playlist title/i).fill('My First Playlist');
    await page.getByRole('button', { name: /add playlist/i }).click();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('body')).toContainText('My First Playlist');

    await page.getByRole('link', { name: /My First Playlist/i }).first().click();
    await expect(page).toHaveURL(/\/playlist\/.+/);
    await expect(page.locator('body')).toContainText('My First Playlist');
    await expect(page.locator('body')).toContainText('Add track');
  });

  test('second user sees only own playlists', async ({ page }) => {
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
    await page.getByLabel(/playlist title/i).fill('Maggie Playlist');
    await page.getByRole('button', { name: /add playlist/i }).click();
    await page.getByRole('link', { name: /log out/i }).click();

    await page.goto('/signup');
    await page.getByLabel(/first name/i).fill(secondUser.firstName);
    await page.getByLabel(/last name/i).fill(secondUser.lastName);
    await page.getByLabel(/email/i).fill(secondUser.email);
    await page.getByLabel(/password/i).fill(secondUser.password);
    await page.getByRole('button', { name: /register/i }).click();
    await page.goto('/login');
    await page.getByLabel(/email/i).fill(secondUser.email);
    await page.getByLabel(/password/i).fill(secondUser.password);
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('body')).not.toContainText('Maggie Playlist');
    await page.getByLabel(/playlist title/i).fill('Joe Playlist');
    await page.getByRole('button', { name: /add playlist/i }).click();
    await expect(page.locator('body')).toContainText('Joe Playlist');
    await expect(page.locator('body')).not.toContainText('Maggie Playlist');
  });
});
