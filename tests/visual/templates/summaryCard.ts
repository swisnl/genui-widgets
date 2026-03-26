import type { WidgetTemplate } from '../../../src/types/widget';
import type { VisualScenario } from './types';

export const summaryCardTemplate: WidgetTemplate = {
  type: 'Card',
  size: 'lg',
  confirm: {
    label: 'Ship it',
    action: { type: 'ship_release' },
  },
  cancel: {
    label: 'Needs review',
    action: { type: 'request_review' },
  },
  children: [
    {
      type: 'Caption',
      value: 'Release readiness',
      size: 'lg',
    },
    {
      type: 'Title',
      value: 'Calendar handoff is ready for final QA',
      size: '2xl',
    },
    {
      type: 'Text',
      value:
        'The visual baseline covers the schedule card, event rows, and action treatments that tend to drift when spacing tokens change.',
      size: 'md',
    },
    {
      type: 'Markdown',
      value: [
        '- Snapshot the default and dark themes',
        '- Keep the widget width and copy deterministic',
        '- Update baselines only for intentional UI changes',
      ].join('\n'),
    },
  ],
};

export const summaryCardScenario: VisualScenario = {
  id: 'summary-card',
  width: 760,
  template: summaryCardTemplate,
};
