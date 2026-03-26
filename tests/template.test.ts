import { describe, expect, it } from 'vitest';
import { resolveTemplate } from '../src/template';

describe('resolveTemplate', () => {
  it('renders Jinja widget templates with filters, loops, and captured blocks', () => {
    const template = `{"type":"Card","size":"md","children":[{"type":"Image","src":{{ (image) | tojson }},"alt":{{ (title) | tojson }},"aspectRatio":{{ ((16 / 6)) | tojson }},"flush":true},{"type":"Col","gap":2,"padding":{"x":4,"y":3},"children":[{"type":"Title","value":{{ (title) | tojson }},"size":"md"},{"type":"Text","value":{{ (description) | tojson }},"size":"sm","color":"secondary","maxLines":3},{"type":"Row","gap":1,"wrap":"wrap","children":[{%- set _c -%}{%-for t in tech -%}{%-set i = loop.index0 -%},{"type":"Row","key":{{ (i) | tojson }},"children":[{"type":"Badge","label":{{ (t) | tojson }},"size":"sm","color":"success"}]}{%-endfor-%}{%- endset -%}{{- (_c[1:] if _c and _c[0] == ',' else _c) -}}]}]},{"type":"Divider"},{"type":"Row","children":[{"type":"Button","label":"Bekijk case","color":"primary","block":true,"iconEnd":"external-link","onClickAction":{"type":"open.url","payload":{"url":{{ (url) | tojson }}}}}]}]}`;

    const resolved = resolveTemplate(template, {
      description: 'A reusable project card rendered from Jinja.',
      image: 'https://example.com/widget-card.png',
      tech: ['Vue 3', 'Jinja'],
      title: 'GenUI Widgets',
      url: 'https://example.com/case-study',
    });

    expect(resolved).toEqual({
      type: 'Card',
      size: 'md',
      children: [
        {
          type: 'Image',
          src: 'https://example.com/widget-card.png',
          alt: 'GenUI Widgets',
          aspectRatio: 16 / 6,
          flush: true,
        },
        {
          type: 'Col',
          gap: 2,
          padding: { x: 4, y: 3 },
          children: [
            {
              type: 'Title',
              value: 'GenUI Widgets',
              size: 'md',
            },
            {
              type: 'Text',
              value: 'A reusable project card rendered from Jinja.',
              size: 'sm',
              color: 'secondary',
              maxLines: 3,
            },
            {
              type: 'Row',
              gap: 1,
              wrap: 'wrap',
              children: [
                {
                  type: 'Row',
                  key: 0,
                  children: [
                    {
                      type: 'Badge',
                      label: 'Vue 3',
                      size: 'sm',
                      color: 'success',
                    },
                  ],
                },
                {
                  type: 'Row',
                  key: 1,
                  children: [
                    {
                      type: 'Badge',
                      label: 'Jinja',
                      size: 'sm',
                      color: 'success',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Divider',
        },
        {
          type: 'Row',
          children: [
            {
              type: 'Button',
              label: 'Bekijk case',
              color: 'primary',
              block: true,
              iconEnd: 'external-link',
              onClickAction: {
                type: 'open.url',
                payload: {
                  url: 'https://example.com/case-study',
                },
              },
            },
          ],
        },
      ],
    });
  });
});
