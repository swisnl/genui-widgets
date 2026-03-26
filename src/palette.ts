import type { PaletteScale, SemanticColor, ThemeConfig } from './types/theme';
import { PALETTE_STEPS, SEMANTIC_COLORS } from './types/theme';
export { PALETTE_STEPS, SEMANTIC_COLORS } from './types/theme';

function hasCompleteScale(scale?: Partial<PaletteScale>): scale is PaletteScale {
  if (!scale) {
    return false;
  }

  return PALETTE_STEPS.every((step) => Boolean(scale[step]));
}

// Default semantic palettes are defined explicitly so the theme system stays
// independent from any external palette naming or generation scheme.
export const defaultLightPalettes: Record<SemanticColor, PaletteScale> = {
  primary: {
    5: '#fafafa',
    10: '#f4f4f5',
    20: '#e4e4e7',
    30: '#d4d4d8',
    40: '#a1a1aa',
    50: '#71717a',
    60: '#52525b',
    70: '#3f3f46',
    80: '#27272a',
    90: '#18181b',
  },
  secondary: {
    5: '#fafafa',
    10: '#f4f4f5',
    20: '#e4e4e7',
    30: '#d4d4d8',
    40: '#a1a1aa',
    50: '#71717a',
    60: '#52525b',
    70: '#3f3f46',
    80: '#27272a',
    90: '#18181b',
  },
  success: {
    5: '#ecfdf5',
    10: '#d1fae5',
    20: '#a7f3d0',
    30: '#6ee7b7',
    40: '#34d399',
    50: '#10b981',
    60: '#059669',
    70: '#047857',
    80: '#065f46',
    90: '#064e3b',
  },
  danger: {
    5: '#fef2f2',
    10: '#fee2e2',
    20: '#fecaca',
    30: '#fca5a5',
    40: '#f87171',
    50: '#ef4444',
    60: '#dc2626',
    70: '#b91c1c',
    80: '#991b1b',
    90: '#7f1d1d',
  },
  warning: {
    5: '#fffbeb',
    10: '#fef3c7',
    20: '#fde68a',
    30: '#fcd34d',
    40: '#fbbf24',
    50: '#f59e0b',
    60: '#d97706',
    70: '#b45309',
    80: '#92400e',
    90: '#78350f',
  },
  info: {
    5: '#eff6ff',
    10: '#dbeafe',
    20: '#bfdbfe',
    30: '#93c5fd',
    40: '#60a5fa',
    50: '#3b82f6',
    60: '#2563eb',
    70: '#1d4ed8',
    80: '#1e40af',
    90: '#1e3a8a',
  },
  discovery: {
    5: '#f5f3ff',
    10: '#ede9fe',
    20: '#ddd6fe',
    30: '#c4b5fd',
    40: '#a78bfa',
    50: '#8b5cf6',
    60: '#7c3aed',
    70: '#6d28d9',
    80: '#5b21b6',
    90: '#4c1d95',
  },
  caution: {
    5: '#fff7ed',
    10: '#ffedd5',
    20: '#fed7aa',
    30: '#fdba74',
    40: '#fb923c',
    50: '#f97316',
    60: '#ea580c',
    70: '#c2410c',
    80: '#9a3412',
    90: '#7c2d12',
  },
};

// Dark palettes: neutral colors (primary/secondary) invert to track surface
// contrast, but chromatic colors stay fixed so solid backgrounds, text accents,
// and alpha-based tints look the same regardless of theme.
export const defaultDarkPalettes: Record<SemanticColor, PaletteScale> = {
  primary: {
    5: '#18181b',
    10: '#27272a',
    20: '#3f3f46',
    30: '#52525b',
    40: '#71717a',
    50: '#a1a1aa',
    60: '#d4d4d8',
    70: '#e4e4e7',
    80: '#f4f4f5',
    90: '#fafafa',
  },
  secondary: {
    5: '#18181b',
    10: '#27272a',
    20: '#3f3f46',
    30: '#52525b',
    40: '#71717a',
    50: '#a1a1aa',
    60: '#d4d4d8',
    70: '#e4e4e7',
    80: '#f4f4f5',
    90: '#fafafa',
  },
  success: { ...defaultLightPalettes.success },
  danger: { ...defaultLightPalettes.danger },
  warning: { ...defaultLightPalettes.warning },
  info: { ...defaultLightPalettes.info },
  discovery: { ...defaultLightPalettes.discovery },
  caution: { ...defaultLightPalettes.caution },
};

/**
 * Convert hex color to RGB string (e.g., "255, 165, 0")
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * Resolve a ThemeConfig into a flat map of CSS var name → value.
 * Falls back to defaultLightPalettes when no palettes are provided in config.
 */
export function resolveTheme(config: ThemeConfig): Record<string, string> {
  const vars: Record<string, string> = {
    '--genui-base-size': config.baseSize ?? '1rem',
  };
  const palettes: Record<SemanticColor, PaletteScale> = {} as Record<SemanticColor, PaletteScale>;

  for (const color of SEMANTIC_COLORS) {
    const provided = config.palettes?.[color];
    const base = hasCompleteScale(provided)
      ? { ...provided }
      : { ...defaultLightPalettes[color], ...provided };

    palettes[color] = base;

    for (const step of PALETTE_STEPS) {
      vars[`--genui-${color}-${step}`] = base[step];
      // Also export RGB version for alpha blending
      vars[`--genui-${color}-${step}-rgb`] = hexToRgb(base[step]);
    }
  }

  vars['--genui-surface'] = config.surface ?? '#ffffff';
  vars['--genui-surface-secondary'] = config.surfaceSecondary ?? palettes.secondary['5'];
  vars['--genui-surface-tertiary'] = config.surfaceTertiary ?? palettes.secondary['10'];
  vars['--genui-text-primary'] = config.textPrimary ?? palettes.primary['90'];
  vars['--genui-text-secondary'] = config.textSecondary ?? palettes.secondary['60'];
  vars['--genui-text-tertiary'] = config.textTertiary ?? palettes.secondary['40'];
  vars['--genui-border-default'] = config.borderDefault ?? palettes.secondary['20'];
  vars['--genui-disabled-bg'] = config.disabledBg ?? palettes.secondary['10'];
  vars['--genui-disabled-text'] = config.disabledText ?? palettes.secondary['40'];

  if (config.overrides) {
    for (const [key, value] of Object.entries(config.overrides)) {
      vars[key.startsWith('--') ? key : `--genui-${key}`] = value;
    }
  }

  return vars;
}
