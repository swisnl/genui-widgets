import type { PaletteScale, SemanticColor, ThemeConfig } from './types/theme';
import { defaultDarkPalettes, defaultLightPalettes, resolveTheme } from './palette';

function clonePalettes(
  palettes?: Partial<Record<SemanticColor, Partial<PaletteScale>>>,
): Partial<Record<SemanticColor, Partial<PaletteScale>>> | undefined {
  if (!palettes) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(palettes).map(([color, scale]) => [color, scale ? { ...scale } : {}]),
  ) as Partial<Record<SemanticColor, Partial<PaletteScale>>>;
}

export const defaultTheme: ThemeConfig = {
  baseSize: '1rem',
  palettes: clonePalettes(defaultLightPalettes),
};

export const darkTheme: ThemeConfig = {
  baseSize: '1rem',
  palettes: clonePalettes(defaultDarkPalettes),
  surface: '#18211f',
  surfaceSecondary: '#273230',
  surfaceTertiary: '#33403d',
  background: '#18211f',
  textPrimary: '#F5F5F5',
  textSecondary: '#c8d4d1',
  textTertiary: '#94a5a1',
  borderDefault: '#2e3838',
  disabledBg: '#38433f',
  disabledText: '#667874',
};

export function applyTheme(element: HTMLElement, theme: ThemeConfig): void {
  const vars = resolveTheme(theme);

  for (const [cssVar, value] of Object.entries(vars)) {
    element.style.setProperty(cssVar, value);
  }
}

/**
 * Create a custom theme by merging overrides onto a base theme.
 */
export function createTheme(base: ThemeConfig, overrides: Partial<ThemeConfig>): ThemeConfig {
  const merged: ThemeConfig = { ...base, ...overrides };
  const palettes = clonePalettes(base.palettes) ?? {};
  const hasPalettes = Boolean(base.palettes || overrides.palettes);

  if (overrides.palettes) {
    for (const [color, scale] of Object.entries(overrides.palettes)) {
      palettes[color as SemanticColor] = {
        ...palettes[color as SemanticColor],
        ...scale,
      };
    }
  }

  if (hasPalettes) {
    merged.palettes = palettes;
  }

  if (base.overrides || overrides.overrides) {
    merged.overrides = { ...base.overrides, ...overrides.overrides };
  }

  return merged;
}
