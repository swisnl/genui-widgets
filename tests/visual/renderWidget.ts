import { page } from 'vitest/browser';
import { createTheme, darkTheme, defaultTheme, render } from '../../src/index';
import { resolveTheme } from '../../src/palette';
import type { WidgetInstance } from '../../src/types/instance';
import type { ThemeConfig } from '../../src/types/theme';
import type { WidgetTemplate } from '../../src/types/widget';

interface MountedScenario {
  locator: ReturnType<typeof page.getByTestId>;
  widget: WidgetInstance;
}

const DEFAULT_WIDTH = 720;
const darkThemeVars = resolveTheme(darkTheme);

export function mountScenario(
  template: WidgetTemplate,
  theme: ThemeConfig,
  width = DEFAULT_WIDTH,
): MountedScenario {
  const resolvedTheme = createTheme(defaultTheme, theme);
  const themeVars = resolveTheme(resolvedTheme);

  document.body.innerHTML = `
    <main data-testid="scenario-shell">
      <div data-testid="scenario-frame">
        <div data-testid="scenario-widget"></div>
      </div>
    </main>
  `;

  document.documentElement.style.colorScheme =
    themeVars['--genui-surface'].toLowerCase() === darkThemeVars['--genui-surface'].toLowerCase()
      ? 'dark'
      : 'light';

  const shell = document.querySelector<HTMLElement>('[data-testid="scenario-shell"]');
  const frame = document.querySelector<HTMLElement>('[data-testid="scenario-frame"]');
  const target = document.querySelector<HTMLElement>('[data-testid="scenario-widget"]');

  if (!shell || !frame || !target) {
    throw new Error('Failed to create the visual regression harness.');
  }

  Object.assign(shell.style, {
    padding: '32px',
    minHeight: '100vh',
    background: themeVars['--genui-surface'],
  });

  Object.assign(frame.style, {
    width: `${width}px`,
    padding: '24px',
    display: 'flex',
    justifyContent: 'center',
    background: themeVars['--genui-surface-secondary'],
    boxSizing: 'border-box',
    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
    fontFamily: 'Arial, sans-serif',
  });

  const widget = render(target, template, { theme: resolvedTheme });

  return {
    locator: page.getByTestId('scenario-frame'),
    widget,
  };
}
