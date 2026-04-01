import type { WidgetTemplate } from '../../../src/types/widget';
import type { VisualScenario } from './types';

const emailFrom = 'alice@company.com';
const defaultTo = 'bob@example.com';
const defaultSubject = 'Q2 Planning Follow-up';
const defaultBody =
  'Hi Bob,\n\nThanks for the great discussion earlier today. I wanted to follow up on a few items we discussed during the Q2 planning session.\n\nCould you share the updated timeline for the infrastructure migration? I want to make sure our roadmap aligns with your team\'s milestones.\n\nBest regards,\nAlice';

export const emailComposeTemplate: WidgetTemplate = {
  type: 'Card',
  size: 'lg',
  confirm: {
    action: { type: 'email.send' },
    label: 'Send email',
  },
  cancel: {
    action: { type: 'email.discard' },
    label: 'Discard',
  },
  children: [
    {
      type: 'Row',
      children: [
        {
          type: 'Text',
          value: 'FROM',
          width: 80,
          weight: 'semibold',
          color: 'tertiary',
          size: 'xs',
        },
        { type: 'Text', value: emailFrom, color: 'tertiary' },
      ],
    },
    { type: 'Divider', flush: true },
    {
      type: 'Row',
      children: [
        {
          type: 'Text',
          value: 'TO',
          width: 80,
          weight: 'semibold',
          color: 'tertiary',
          size: 'xs',
        },
        {
          type: 'Text',
          value: defaultTo,
          editable: {
            name: 'email.to',
            required: true,
            placeholder: 'name@example.com',
          },
        },
      ],
    },
    { type: 'Divider', flush: true },
    {
      type: 'Row',
      children: [
        {
          type: 'Text',
          value: 'SUBJECT',
          width: 80,
          weight: 'semibold',
          color: 'tertiary',
          size: 'xs',
        },
        {
          type: 'Text',
          value: defaultSubject,
          editable: {
            name: 'email.subject',
            required: true,
            placeholder: 'Email subject',
          },
        },
      ],
    },
    { type: 'Divider', flush: true },
    {
      type: 'Text',
      value: defaultBody,
      minLines: 9,
      editable: {
        name: 'email.body',
        required: true,
        placeholder: 'Write your message…',
      },
    },
  ],
};

export const emailComposeScenario: VisualScenario = {
  id: 'email-compose',
  width: 560,
  template: emailComposeTemplate,
};
