import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);
const MOCK_PORT = 8099;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 60_000,
  use: {
    baseURL,
    locale: "id-ID",
    timezoneId: "Asia/Jakarta",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : {},
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: [
    {
      command: "node e2e/mock-backend.mjs",
      url: `http://127.0.0.1:${MOCK_PORT}/api/program`,
      env: { MOCK_BACKEND_PORT: String(MOCK_PORT) },
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `npm run build && npm run start -- --hostname 127.0.0.1 --port ${PORT}`,
      url: baseURL,
      timeout: 300_000,
      reuseExistingServer: !process.env.CI,
      env: {
        API_BASE_URL: `http://127.0.0.1:${MOCK_PORT}/api`,
        NEXT_PUBLIC_SITE_URL: baseURL,
        NEXT_PUBLIC_FEATURE_DASHBOARD_SUMMARY: "true",
      },
    },
  ],
});
