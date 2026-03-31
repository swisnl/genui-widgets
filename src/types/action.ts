import type { WidgetAction } from './widget';

export interface ActionEventDetail {
  action: WidgetAction;
  waitUntil(promise: Promise<void>): void;
}

export interface ChatKitAction {
  type: string;
  payload?: Record<string, unknown>;
  handling?: 'client' | 'server';
}
