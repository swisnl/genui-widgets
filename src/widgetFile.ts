import type { WidgetTemplateSource } from './types/widget';

export interface WidgetFile {
  version?: string;
  name?: string;
  template: WidgetTemplateSource;
  [key: string]: unknown;
}

export type WidgetFileSource = WidgetFile | string;

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function assertWidgetFile(value: unknown): WidgetFile {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Widget file must be a JSON object.');
  }

  if (!('template' in value)) {
    throw new Error('Widget file must include a top-level "template" field.');
  }

  const template = (value as { template?: unknown }).template;

  if (
    typeof template !== 'string' &&
    (!template ||
      typeof template !== 'object' ||
      Array.isArray(template) ||
      typeof (template as { type?: unknown }).type !== 'string')
  ) {
    throw new Error('Widget file "template" must be a widget object or template string.');
  }

  return value as WidgetFile;
}

export function extractTemplateFromWidgetFile(widgetFile: WidgetFileSource): WidgetTemplateSource {
  if (typeof widgetFile === 'string') {
    try {
      return assertWidgetFile(JSON.parse(widgetFile)).template;
    } catch (error) {
      throw new Error(`Failed to parse widget file JSON: ${toErrorMessage(error)}`);
    }
  }

  return assertWidgetFile(widgetFile).template;
}
