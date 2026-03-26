import { describe, expect, it } from 'vitest';
import { resolveTemplate } from '../src/template';
import { extractTemplateFromWidgetFile } from '../src/widgetFile';

describe('extractTemplateFromWidgetFile', () => {
  const widgetFile = {
    version: '1.0',
    name: 'Person card',
    template:
      '{"type":"Card","size":"sm","children":[{"type":"Title","value":{{ (name) | tojson }}},{"type":"Text","value":{{ (jobTitle) | tojson }},"size":"sm","color":"secondary"}]}',
    outputJsonPreview: {
      type: 'Card',
      size: 'sm',
    },
  };

  it('extracts the template from a parsed widget file object', () => {
    expect(extractTemplateFromWidgetFile(widgetFile)).toBe(widgetFile.template);
  });

  it('extracts the template from widget file JSON text', () => {
    const template = extractTemplateFromWidgetFile(JSON.stringify(widgetFile));
    const resolved = resolveTemplate(template, {
      jobTitle: 'Engineer',
      name: 'Ada Lovelace',
    });

    expect(resolved).toEqual({
      type: 'Card',
      size: 'sm',
      children: [
        {
          type: 'Title',
          value: 'Ada Lovelace',
        },
        {
          type: 'Text',
          value: 'Engineer',
          size: 'sm',
          color: 'secondary',
        },
      ],
    });
  });

  it('throws when the widget file does not contain a template', () => {
    expect(() => extractTemplateFromWidgetFile('{"name":"Missing template"}')).toThrow(
      'template',
    );
  });
});
