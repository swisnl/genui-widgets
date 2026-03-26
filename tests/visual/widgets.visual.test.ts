import { afterEach, describe, expect, test } from 'vitest';
import { darkTheme, defaultTheme } from '../../src/index';
import { mountScenario } from './renderWidget';
import { visualScenarios } from './templates';

const themeVariants = [
  ['light', defaultTheme],
  ['dark', darkTheme],
] as const;

const mountedWidgets: Array<{ destroy(): void }> = [];

afterEach(() => {
  while (mountedWidgets.length > 0) {
    mountedWidgets.pop()?.destroy();
  }
});

describe('visual regression', () => {
  for (const scenario of visualScenarios) {
    const scenarioThemes = scenario.themeVariants
      ? themeVariants.filter(([themeName]) => scenario.themeVariants?.includes(themeName))
      : themeVariants;

    for (const [themeName, theme] of scenarioThemes) {
      test(`${scenario.id} (${themeName})`, async () => {
        const { locator, widget } = mountScenario(scenario.template, theme, scenario.width);
        mountedWidgets.push(widget);

        await expect.element(locator).toMatchScreenshot(`${scenario.id}-${themeName}`);
      });
    }
  }
});
