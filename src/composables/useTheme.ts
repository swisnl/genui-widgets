import { ref, watch, type Ref } from 'vue';
import { applyTheme, createTheme, defaultTheme } from '../theme';
import type { ThemeConfig } from '../types/theme';

export function useTheme(containerRef: Ref<HTMLElement | null>, initialTheme: ThemeConfig = {}) {
  const theme = ref<ThemeConfig>(createTheme(defaultTheme, initialTheme));

  watch(
    theme,
    (value) => {
      if (containerRef.value) {
        applyTheme(containerRef.value, createTheme(defaultTheme, value));
      }
    },
    { deep: true, immediate: true },
  );

  return { theme };
}
