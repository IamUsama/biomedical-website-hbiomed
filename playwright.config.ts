import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests',
  timeout: 30000,
  webServer: { command: 'npx astro preview --port 4322', port: 4322, reuseExistingServer: !process.env.CI },
  use: { baseURL: 'http://localhost:4322' },
});
