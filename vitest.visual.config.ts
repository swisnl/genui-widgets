import vue from '@vitejs/plugin-vue';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const platformAliases: Record<string, string> = {
  darwin: 'macos',
  win32: 'windows',
};

const snapshotEnvironment = (() => {
  const rawEnvironment = process.env.VISUAL_SNAPSHOT_ENV?.trim() || process.platform;
  const normalizedEnvironment = rawEnvironment.toLowerCase();
  const aliasedEnvironment = platformAliases[normalizedEnvironment] ?? normalizedEnvironment;

  return aliasedEnvironment.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'unknown';
})();

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['tests/visual/**/*.visual.test.ts'],
    attachmentsDir: 'tests/visual/__artifacts__',
    setupFiles: ['./tests/visual/setup.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }],
      viewport: {
        width: 1280,
        height: 960,
      },
      screenshotDirectory: '__screenshots__',
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            threshold: 0.2,
            allowedMismatchedPixels: 20,
          },
          resolveScreenshotPath: ({ root, testFileDirectory, arg, ext }) =>
            `${root}/${testFileDirectory}/__screenshots__/${snapshotEnvironment}-${arg}${ext}`,
        },
      },
    },
  },
});
