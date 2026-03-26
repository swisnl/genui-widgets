import type { WidgetTemplate } from '../../../src/types/widget';
import type { VisualScenario } from './types';

export const scheduleCardTemplate: WidgetTemplate = {
  type: 'Card',
  children: [
    {
      type: 'Row',
      align: 'stretch',
      gap: 3,
      children: [
        {
          type: 'Box',
          width: 5,
          background: '#0ea5e9',
          radius: 'full',
        },
        {
          type: 'Col',
          flex: 1,
          gap: 1,
          children: [
            {
              type: 'Row',
              children: [
                {
                  type: 'Text',
                  color: 'var(--genui-text-secondary)',
                  size: 'sm',
                  value: 'Friday, March 28',
                },
                {
                  type: 'Spacer',
                },
                {
                  type: 'Text',
                  color: '#0ea5e9',
                  size: 'sm',
                  value: '09:30',
                },
              ],
            },
            {
              type: 'Title',
              value: 'Product roadmap review',
              size: 'md',
            },
          ],
        },
      ],
    },
  ],
};

export const scheduleCardScenario: VisualScenario = {
  id: 'schedule-card',
  width: 520,
  template: scheduleCardTemplate,
};
