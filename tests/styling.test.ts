import { describe, expect, it } from 'vitest';
import { blockModifier, blockVariant, cx } from '../src/styling/classes';
import { textStyles } from '../src/styling/text';
import {
  dimensionStyles,
  insetStyles,
  resolveRadius,
  resolveToken,
  toBaseSpace,
  toCssLength,
} from '../src/styling/styles';
import { surfaceColorTokens, textColorTokens } from '../src/styling/tokens';

describe('styling helpers', () => {
  it('composes class names from strings, objects, and arrays', () => {
    expect(
      cx(
        'genui-text',
        ['genui-text--size-md', null],
        { 'genui-text--truncate': true, 'genui-text--disabled': false },
      ),
    ).toEqual([
      'genui-text',
      'genui-text--size-md',
      'genui-text--truncate',
    ]);
  });

  it('builds block variants and modifiers', () => {
    expect(blockVariant('genui-button', 'size', 'lg')).toBe('genui-button--size-lg');
    expect(blockModifier('genui-button', 'pill')).toBe('genui-button--pill');
    expect(blockVariant('genui-button', 'size', null)).toBeUndefined();
  });

  it('resolves token and primitive style values', () => {
    expect(resolveToken('surface', surfaceColorTokens)).toBe('var(--genui-surface)');
    expect(resolveToken('custom', textColorTokens)).toBe('custom');
    expect(toCssLength(24)).toBe('24px');
    expect(toBaseSpace(4)).toBe('calc(var(--genui-base-size) * 1)');
    expect(resolveRadius('lg')).toBe('calc(var(--genui-base-size) * .75)');
  });

  it('builds dimension and inset style objects', () => {
    expect(dimensionStyles({ size: 48, aspectRatio: '1 / 1' })).toEqual({
      width: '48px',
      height: '48px',
      aspectRatio: '1 / 1',
    });

    expect(insetStyles('padding', { x: 2, top: '1rem' })).toEqual({
      paddingTop: '1rem',
      paddingRight: 'calc(var(--genui-base-size) * 0.5)',
      paddingLeft: 'calc(var(--genui-base-size) * 0.5)',
    });
  });

  it('builds shared text styles', () => {
    expect(textStyles({
      color: 'secondary',
      defaultColor: 'prose',
      maxLines: 3,
      width: 320,
    })).toEqual({
      color: 'var(--genui-text-secondary)',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      width: '320px',
    });

    expect(textStyles({
      color: 'prose',
      defaultColor: 'prose',
    })).toEqual({});
  });
});
