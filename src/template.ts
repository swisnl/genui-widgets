import nunjucks from 'nunjucks/browser/nunjucks.js';
import type { TemplateContext, WidgetTemplate, WidgetTemplateSource } from './types/widget';

const templateEnvironment = new nunjucks.Environment(undefined, {
  autoescape: false,
  lstripBlocks: true,
  trimBlocks: true,
});

function sliceValue(value: unknown, start?: number, end?: number): unknown {
  if (value == null) {
    return value;
  }

  if (
    typeof value === 'string' ||
    Array.isArray(value) ||
    (typeof value === 'object' &&
      'slice' in value &&
      typeof (value as { slice?: unknown }).slice === 'function')
  ) {
    return (value as { slice(start?: number, end?: number): unknown }).slice(start, end);
  }

  return value;
}

templateEnvironment.addFilter('tojson', (value: unknown, indentation?: unknown) => {
  const normalizedValue = value === undefined ? null : value;
  const spacing = typeof indentation === 'number' ? indentation : undefined;

  return JSON.stringify(normalizedValue, null, spacing);
});
templateEnvironment.addGlobal('__genuiSlice', (value: unknown, start: number, end: number) =>
  sliceValue(value, start, end),
);
templateEnvironment.addGlobal('__genuiSliceFrom', (value: unknown, start: number) =>
  sliceValue(value, start),
);
templateEnvironment.addGlobal('__genuiSliceTo', (value: unknown, end: number) =>
  sliceValue(value, 0, end),
);

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function summarizeOutput(output: string, maxLength = 180): string {
  const normalized = output.replace(/\s+/g, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength)}...`;
}

function assertWidgetTemplate(value: unknown): WidgetTemplate {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    typeof (value as { type?: unknown }).type !== 'string'
  ) {
    throw new Error('Resolved widget template must be a JSON object with a string "type" property.');
  }

  return value as WidgetTemplate;
}

function normalizeJinjaSliceSyntax(expression: string): string {
  const slicePattern =
    /((?:[A-Za-z_][\w.]*(?:\[[^\x5B\x5D]+\])*)|\([^()\n]+\))\[\s*([^:\x5B\x5D]*)\s*:\s*([^:\x5B\x5D]*)\s*\]/g;

  let current = expression;
  let previous: string | null = null;

  while (current !== previous) {
    previous = current;
    current = current.replace(slicePattern, (_match, target: string, start: string, end: string) => {
      const normalizedStart = start.trim();
      const normalizedEnd = end.trim();

      if (normalizedStart && normalizedEnd) {
        return `__genuiSlice(${target}, ${normalizedStart}, ${normalizedEnd})`;
      }

      if (normalizedStart) {
        return `__genuiSliceFrom(${target}, ${normalizedStart})`;
      }

      if (normalizedEnd) {
        return `__genuiSliceTo(${target}, ${normalizedEnd})`;
      }

      return target;
    });
  }

  return current;
}

function normalizeJinjaCompatibility(template: string): string {
  return template
    .replace(/(\{\{[-+]?)([\s\S]*?)([-+]?\}\})/g, (_match, open: string, content: string, close: string) => {
      return `${open}${normalizeJinjaSliceSyntax(content)}${close}`;
    })
    .replace(/(\{%[-+]?)([\s\S]*?)([-+]?%\})/g, (_match, open: string, content: string, close: string) => {
      return `${open}${normalizeJinjaSliceSyntax(content)}${close}`;
    });
}

export function resolveTemplate(
  template: WidgetTemplateSource,
  context: TemplateContext = {},
): WidgetTemplate {
  if (typeof template !== 'string') {
    return template;
  }

  const rendered = templateEnvironment.renderString(normalizeJinjaCompatibility(template), context);

  try {
    return assertWidgetTemplate(JSON.parse(rendered));
  } catch (error) {
    const preview = summarizeOutput(rendered);
    const suffix = preview ? ` Rendered output: ${preview}` : '';

    throw new Error(`Failed to parse rendered widget template as JSON: ${toErrorMessage(error)}.${suffix}`);
  }
}
