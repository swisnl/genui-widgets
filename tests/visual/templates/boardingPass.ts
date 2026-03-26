import type { WidgetTemplate } from '../../../src/types/widget';
import { airlineLogo } from './assets';
import type { VisualScenario } from './types';

export const boardingPassTemplate: WidgetTemplate = {
  type: 'Card',
  size: 'md',
  background: 'linear-gradient(135deg, #378CD1 0%, #2B67AC 100%)',
  children: [
    {
      type: 'Row',
      gap: 2,
      children: [
        {
          type: 'Image',
          src: airlineLogo,
          alt: 'Skybound Air logo',
          size: 16,
        },
        {
          type: 'Caption',
          value: 'SB 284',
          color: 'rgba(255, 255, 255, 0.92)',
        },
        {
          type: 'Spacer',
        },
        {
          type: 'Caption',
          value: 'Fri, Mar 28',
          color: 'rgba(255, 255, 255, 0.56)',
        },
      ],
    },
    {
      type: 'Divider',
      flush: true,
      color: 'rgba(255, 255, 255, 0.18)',
    },
    {
      type: 'Col',
      gap: 3,
      children: [
        {
          type: 'Row',
          align: 'center',
          children: [
            {
              type: 'Text',
              value: 'Amsterdam',
            },
            {
              type: 'Spacer',
            },
            {
              type: 'Text',
              value: 'Copenhagen',
            },
          ],
        },
        {
          type: 'Box',
          height: 8,
          radius: 'full',
          background: 'rgba(255, 255, 255, 0.18)',
          children: [
            {
              type: 'Box',
              width: '62%',
              height: '100%',
              radius: 'full',
              background: '#ffffff',
            },
          ],
        },
        {
          type: 'Row',
          children: [
            {
              type: 'Row',
              gap: 2,
              align: 'center',
              children: [
                {
                  type: 'Text',
                  value: '09:40',
                  size: 'sm',
                },
                {
                  type: 'Text',
                  value: 'Boarding',
                  color: 'rgba(255, 255, 255, 0.56)',
                  size: 'sm',
                },
              ],
            },
            {
              type: 'Spacer',
            },
            {
              type: 'Row',
              gap: 2,
              align: 'center',
              children: [
                {
                  type: 'Text',
                  value: 'On time',
                  color: 'rgba(255, 255, 255, 0.56)',
                  size: 'sm',
                },
                {
                  type: 'Text',
                  value: '11:05',
                  size: 'sm',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const boardingPassScenario: VisualScenario = {
  id: 'boarding-pass',
  width: 520,
  themeVariants: ['dark'],
  template: boardingPassTemplate,
};
