import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'genui-widgets.esm.js',
    },
    rollupOptions: {
      external: ['vue'],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
