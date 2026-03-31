import type { WidgetAction } from './widget';

export interface ActionEventDetail {
  action: WidgetAction;
  payload: Record<string, unknown> | undefined;
  formData: Record<string, FormDataEntryValue>;
  waitUntil(promise: Promise<void>): void;
}

export interface ChatKitAction {
  type: string;
  payload?: Record<string, unknown>;
  handling?: 'client' | 'server';
}
