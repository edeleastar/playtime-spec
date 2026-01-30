import { test, expect } from '@playwright/test';
import { testUser } from '../fixtures.js';

test.describe('Auth flow', () => {
  test('register user, login, see dashboard, logout', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel(/first name/i).fill(testUser.firstName);
    await page.getByLabel(/last name/i).fill(testUser.lastName);
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /register/i }).click();

    await expect(page).toHaveURL('/');

    await page.goto('/login');
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('body')).toContainText('Dashboard');

    await page.getByRole('link', { name: /log out/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('invalid login redirects to home', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/email/i).fill('nobody@test.com');
    await page.getByLabel(/password/i).fill('wrong');
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page).toHaveURL('/');
  });
});

test.describe('Session persistence', () => {
  test('login, reload dashboard still authenticated', async ({ page }) => {
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

    await page.reload();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('body')).toContainText('Dashboard');
  });

  test('logout, reload redirected to home', async ({ page }) => {
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
    await page.getByRole('link', { name: /log out/i }).click();
    await expect(page).toHaveURL('/');

    await page.goto('/dashboard');
    await expect(page).toHaveURL('/');
  });

  test('dashboard shows user name', async ({ page }) => {
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

    await expect(page.locator('body')).toContainText(testUser.firstName);
    await expect(page.locator('body')).toContainText(testUser.lastName);
  });
});
