import type { CSSProperties } from 'vue';
import { isTailwindToken, resolveTailwindToken } from './tailwind';

export type LengthValue = string | number | null | undefined;
export type InsetsValue =
  | LengthValue
  | {
      x?: LengthValue;
      y?: LengthValue;
      top?: LengthValue;
      right?: LengthValue;
      bottom?: LengthValue;
      left?: LengthValue;
    };

const radiusTokens = {
  none: '0',
  '2xs': 'calc(var(--genui-base-size) * .125)',
  xs: 'calc(var(--genui-base-size) * .25)',
  sm: 'calc(var(--genui-base-size) * .375)',
  md: 'calc(var(--genui-base-size) * .5)',
  lg: 'calc(var(--genui-base-size) * .75)',
  xl: 'calc(var(--genui-base-size) * 1)',
  '2xl': 'calc(var(--genui-base-size) * 1.125)',
  '3xl': 'calc(var(--genui-base-size) * 1.25)',
  '4xl': 'calc(var(--genui-base-size) * 1.5)',
  full: '9999px',
  '100%': '100%',
} as const;

export function resolveToken(
  value: string | null | undefined,
  tokenMap: Record<string, string>,
): string | undefined {
  if (!value) {
    return undefined;
  }

  // Check semantic tokens first
  if (value in tokenMap) {
    return tokenMap[value];
  }

  // Check Tailwind tokens
  if (isTailwindToken(value)) {
    const resolved = resolveTailwindToken(value);
    if (resolved) {
      return resolved;
    }
  }

  // Return value as-is (could be a CSS variable, hex color, etc.)
  return value;
}

export function toCssLength(value: LengthValue, unit = 'px'): string | undefined {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  return typeof value === 'number' ? `${value}${unit}` : value;
}

export function toBaseSpace(value: LengthValue): string | undefined {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  return typeof value === 'number'
    ? `calc(var(--genui-base-size) * ${value * 0.25})`
    : value;
}

export function resolveRadius(value: string | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  return radiusTokens[value as keyof typeof radiusTokens] ?? value;
}

export function lineClampStyles(maxLines: number | null | undefined): CSSProperties {
  if (!maxLines) {
    return {};
  }

  return {
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
}

export function dimensionStyles(options: {
  width?: LengthValue;
  height?: LengthValue;
  size?: LengthValue;
  aspectRatio?: string | number | null | undefined;
}): CSSProperties {
  const styles: CSSProperties = {};
  const width = options.size ?? options.width;
  const height = options.size ?? options.height;

  const resolvedWidth = toCssLength(width);
  const resolvedHeight = toCssLength(height);

  if (resolvedWidth) {
    styles.width = resolvedWidth;
  }

  if (resolvedHeight) {
    styles.height = resolvedHeight;
  }

  if (options.aspectRatio !== null && options.aspectRatio !== undefined && options.aspectRatio !== '') {
    styles.aspectRatio = options.aspectRatio;
  }

  return styles;
}

export function insetStyles(
  prefix: 'padding' | 'margin',
  value: InsetsValue,
  resolveValue: (value: LengthValue) => string | undefined = toBaseSpace,
): CSSProperties {
  if (value === null || value === undefined || value === '') {
    return {};
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const resolved = resolveValue(value);
    return resolved ? { [prefix]: resolved } : {};
  }

  const styles: CSSProperties = {};
  const top = value.top ?? value.y;
  const right = value.right ?? value.x;
  const bottom = value.bottom ?? value.y;
  const left = value.left ?? value.x;

  const entries = [
    [`${prefix}Top`, top],
    [`${prefix}Right`, right],
    [`${prefix}Bottom`, bottom],
    [`${prefix}Left`, left],
  ] as const;

  for (const [property, propertyValue] of entries) {
    const resolved = resolveValue(propertyValue);
    if (resolved) {
      styles[property] = resolved;
    }
  }

  return styles;
}
