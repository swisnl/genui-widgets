import vue from '@vitejs/plugin-vue';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

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
            `${root}/${testFileDirectory}/__screenshots__/${arg}${ext}`,
        },
      },
    },
  },
});
