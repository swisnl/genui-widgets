import type { WidgetTemplate } from '../../../src/types/widget';
import { previewImage } from './assets';
import type { VisualScenario } from './types';

export const mediaListTemplate: WidgetTemplate = {
  type: 'Card',
  size: 'lg',
  children: [
    {
      type: 'Image',
      src: previewImage,
      alt: 'Decorative release banner',
      height: 180,
      width: '100%',
      fit: 'cover',
      radius: 'xl',
    },
    {
      type: 'Title',
      value: 'What this suite protects',
      size: 'xl',
    },
    {
      type: 'ListView',
      direction: 'row',
      children: [
        {
          type: 'ListViewItem',
          children: [
            {
              type: 'Col',
              justify: 'between',
              width: '100%',
              children: [
                { type: 'Badge', label: 'Stable', color: 'success', variant: 'soft' },
                {
                  type: 'Col',
                  gap: 1,
                  children: [
                    { type: 'Text', value: 'Card spacing and typography', size: 'md' },
                    {
                      type: 'Caption',
                      value: 'Padding, border radius, and text rhythm stay locked in.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'ListViewItem',
          children: [
            {
              type: 'Col',
              justify: 'between',
              width: '100%',
              children: [
                { type: 'Badge', label: 'Important', color: 'info', variant: 'outline' },
                {
                  type: 'Col',
                  gap: 1,
                  children: [
                    { type: 'Text', value: 'Theme token regressions', size: 'md' },
                    {
                      type: 'Caption',
                      value: 'Light and dark palettes are compared from the same template.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const mediaListScenario: VisualScenario = {
  id: 'media-list',
  width: 760,
  template: mediaListTemplate,
};
