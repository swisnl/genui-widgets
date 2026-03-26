import type { WidgetTemplate } from '../../../src/types/widget';
import { makeProductImage } from './assets';
import type { VisualScenario } from './types';

const catalogItems = [
  {
    image: makeProductImage('#d97706', '#f59e0b', 'A1'),
    title: 'Amber Travel Bottle',
    subtitle: '500 ml insulated steel',
  },
  {
    image: makeProductImage('#0f766e', '#14b8a6', 'B2'),
    title: 'Seafoam Packing Cube',
    subtitle: 'Compression set of 3',
  },
];

export const checkoutCardTemplate: WidgetTemplate = {
  type: 'Card',
  size: 'sm',
  children: [
    {
      type: 'Col',
      gap: 3,
      children: catalogItems.map((item) => ({
        type: 'Row',
        align: 'center',
        gap: 3,
        children: [
          {
            type: 'Image',
            src: item.image,
            alt: item.title,
            size: 48,
          },
          {
            type: 'Col',
            gap: 1,
            children: [
              {
                type: 'Text',
                value: item.title,
                size: 'md',
                weight: 'semibold',
                color: 'primary',
              },
              {
                type: 'Text',
                value: item.subtitle,
                size: 'sm',
                color: 'secondary',
              },
            ],
          },
        ],
      })),
    },
    {
      type: 'Divider',
      flush: true,
    },
    {
      type: 'Col',
      gap: 2,
      children: [
        {
          type: 'Row',
          children: [
            { type: 'Text', value: 'Subtotal', size: 'sm' },
            { type: 'Spacer' },
            { type: 'Text', value: '$78.00', size: 'sm' },
          ],
        },
        {
          type: 'Row',
          children: [
            { type: 'Text', value: 'Sales tax (8%)', size: 'sm' },
            { type: 'Spacer' },
            { type: 'Text', value: '$6.24', size: 'sm' },
          ],
        },
        {
          type: 'Row',
          children: [
            { type: 'Text', value: 'Total with tax', weight: 'semibold', size: 'sm' },
            { type: 'Spacer' },
            { type: 'Text', value: '$84.24', weight: 'semibold', size: 'sm' },
          ],
        },
      ],
    },
    {
      type: 'Divider',
      flush: true,
    },
    {
      type: 'Col',
      gap: 2,
      children: [
        {
          type: 'Button',
          label: 'Purchase',
          onClickAction: { type: 'purchase' },
          style: 'primary',
          block: true,
        },
        {
          type: 'Button',
          label: 'Add to cart',
          onClickAction: { type: 'add_to_cart' },
          style: 'secondary',
          block: true,
        },
      ],
    },
  ],
};

export const checkoutCardScenario: VisualScenario = {
  id: 'checkout-card',
  width: 460,
  template: checkoutCardTemplate,
};
