import type { WidgetTemplate } from '../../../src/types/widget';
import type { VisualScenario } from './types';

export const settingsFormTemplate: WidgetTemplate = {
  type: 'Card',
  size: 'lg',
  children: [
    {
      type: 'Title',
      value: 'Digest settings',
      size: 'xl',
    },
    {
      type: 'Col',
      gap: 4,
      children: [
        {
          type: 'Col',
          gap: 2,
          children: [
            { type: 'Caption', value: 'Workspace name' },
            { type: 'Input', modelValue: 'GenUI Design System', size: 'md' },
          ],
        },
        {
          type: 'Col',
          gap: 2,
          children: [
            { type: 'Caption', value: 'Digest cadence' },
            {
              type: 'Select',
              modelValue: 'weekly',
              options: [
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
              ],
            },
          ],
        },
        {
          type: 'Checkbox',
          label: 'Email owners when new items need approval',
          modelValue: true,
        },
        {
          type: 'Col',
          gap: 2,
          children: [
            { type: 'Caption', value: 'Deployment mode' },
            {
              type: 'RadioGroup',
              name: 'deployment-mode',
              direction: 'col',
              modelValue: 'automatic',
              options: [
                { label: 'Automatic once checks pass', value: 'automatic' },
                { label: 'Require manual confirmation', value: 'manual' },
              ],
            },
          ],
        },
        {
          type: 'Col',
          gap: 2,
          children: [
            { type: 'Caption', value: 'Go-live date' },
            { type: 'DatePicker', modelValue: '2026-03-19' },
          ],
        },
      ],
    },
  ],
};

export const settingsFormScenario: VisualScenario = {
  id: 'settings-form',
  width: 560,
  template: settingsFormTemplate,
};
