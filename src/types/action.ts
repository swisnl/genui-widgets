import type { WidgetAction } from './widget';

export type ActionHook = (action: WidgetAction) => void | Promise<void>;

export interface ChatKitAction {
  type: string;
  payload?: Record<string, unknown>;
  handling?: 'client' | 'server';
}
