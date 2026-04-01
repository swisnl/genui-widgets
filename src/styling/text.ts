import type { CSSProperties } from 'vue';
import { textColorTokens } from './tokens';
import { lineClampStyles, resolveToken, toCssLength } from './styles';

export function textStyles(options: {
  color?: string | null;
  defaultColor?: string;
  maxLines?: number | null;
  width?: string | number | null;
}): CSSProperties {
  const styles: CSSProperties = {
    ...lineClampStyles(options.maxLines),
  };

  const color = resolveToken(options.color, textColorTokens);

  if (color && options.color !== options.defaultColor) {
    styles.color = color;
  }

  const width = toCssLength(options.width);
  if (width) {
    styles.width = width;
    styles.flexShrink = 0;
  }

  return styles;
}
