import { defineConfig, devices } from '@playwright/test';

const testPort = process.env.TEST_PORT || process.env.PORT || 3001;

export default defineConfig({
  globalTeardown: './test/e2e/global-teardown.js',
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${testPort}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node src/server.js',
    url: `http://localhost:${testPort}`,
    env: { PORT: String(testPort) },
    reuseExistingServer: false,
  },
});
