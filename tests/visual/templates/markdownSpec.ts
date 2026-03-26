import type { WidgetTemplate } from '../../../src/types/widget';
import type { VisualScenario } from './types';

export const markdownSpecTemplate: WidgetTemplate = {
  type: 'Card',
  size: 'lg',
  children: [
    {
      type: 'Title',
      value: 'Widget rendering notes',
      size: 'xl',
    },
    {
      type: 'Markdown',
      value: [
        'Use this fixture to catch regressions in rich text spacing.',
        '',
        '> Tables, lists, and code blocks are common drift points.',
        '',
        '| Token | Purpose |',
        '| --- | --- |',
        '| `surface` | Container background |',
        '| `textPrimary` | Main copy color |',
        '',
        '```ts',
        "render(container, template, { theme: darkTheme })",
        '```',
      ].join('\n'),
    },
  ],
};

export const markdownSpecScenario: VisualScenario = {
  id: 'markdown-spec',
  width: 760,
  template: markdownSpecTemplate,
};
