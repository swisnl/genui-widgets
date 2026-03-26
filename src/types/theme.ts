export type PaletteStep = '5' | '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90';
export type PaletteScale = Record<PaletteStep, string>;
export type SemanticColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'discovery' | 'caution';

export const PALETTE_STEPS: readonly PaletteStep[] = ['5', '10', '20', '30', '40', '50', '60', '70', '80', '90'];

export const SEMANTIC_COLORS: readonly SemanticColor[] = [
  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'discovery', 'caution',
];

export interface ThemeConfig {
  baseSize?: string;
  /** Override individual palette steps per semantic color */
  palettes?: Partial<Record<SemanticColor, Partial<PaletteScale>>>;
  /** Global surface/text/border tokens */
  surface?: string;
  surfaceSecondary?: string;
  surfaceTertiary?: string;
  background?: string;
  textPrimary?: string;
  textSecondary?: string;
  textTertiary?: string;
  borderDefault?: string;
  disabledBg?: string;
  disabledText?: string;
  /** Escape hatch: override any CSS var directly (key = var name without --) */
  overrides?: Record<string, string>;
}

export type ThemeTokens = ThemeConfig;
