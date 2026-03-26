import { describe, expect, it } from 'vitest';
import { applyTheme, defaultTheme } from '../src/theme';
import { defaultLightPalettes } from '../src/palette';

describe('applyTheme', () => {
  it('sets CSS custom properties on an element', () => {
    const element = document.createElement('div');

    applyTheme(element, defaultTheme);

    expect(element.style.getPropertyValue('--genui-primary-60')).toBe(defaultLightPalettes.primary['60']);
    expect(element.style.getPropertyValue('--genui-surface')).toBe('#ffffff');
    expect(element.style.getPropertyValue('--genui-base-size')).toBe(defaultTheme.baseSize);
  });
});
