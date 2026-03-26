import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'GenUIWidgets',
      formats: ['iife'],
      fileName: () => 'genui-widgets.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    assetsInlineLimit: 1_000_000,
    outDir: 'dist',
    emptyOutDir: false,
  },
});
