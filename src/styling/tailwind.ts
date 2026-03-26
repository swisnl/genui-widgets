import { TAILWIND_COLORS, type TailwindColor } from '../types/tailwind';

/**
 * Checks if a value is a valid Tailwind color token (e.g., 'red-400', 'blue-50')
 */
export function isTailwindToken(value: string): boolean {
  if (!value || typeof value !== 'string') return false;

  const match = value.match(/^([a-z]+)-(\d{2,3})$/);
  if (!match) return false;

  const [, color, step] = match;
  return (
    color in TAILWIND_COLORS &&
    step in TAILWIND_COLORS[color as TailwindColor]
  );
}

/**
 * Resolves a Tailwind token to its hex color value
 * Returns undefined if the token is invalid
 */
export function resolveTailwindToken(token: string): string | undefined {
  if (!isTailwindToken(token)) return undefined;

  const [color, step] = token.split('-');
  const colorKey = color as TailwindColor;

  const colorPalette = TAILWIND_COLORS[colorKey];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (colorPalette as any)[step];
}

/**
 * Converts a hex color to RGB and applies an alpha value
 * Example: adjustAlpha('#f87171', 0.1) => 'rgba(248, 113, 113, 0.1)'
 */
export function adjustAlpha(hexColor: string, alpha: number): string {
  // Handle both #RRGGBB and #RGB formats
  let hex = hexColor.replace('#', '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
