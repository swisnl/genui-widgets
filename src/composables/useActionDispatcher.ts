import { getCurrentInstance } from 'vue';
import type { ActionEventDetail } from '../types/action';
import type { WidgetAction } from '../types/widget';

function collectFormData(el: HTMLElement): Record<string, FormDataEntryValue> {
  const form = el.closest('form');
  if (!form) return {};

  const entries: Record<string, FormDataEntryValue> = {};
  for (const [key, value] of new FormData(form)) {
    entries[key] = value;
  }
  return entries;
}

export function useActionDispatcher() {
  const instance = getCurrentInstance();

  async function dispatchAction(action: WidgetAction | null | undefined): Promise<void> {
    if (!action) return;

    const el = instance?.proxy?.$el as HTMLElement | undefined;
    if (!el) return;

    const promises: Promise<void>[] = [];
    const detail: ActionEventDetail = {
      action,
      payload: action.payload,
      formData: collectFormData(el),
      waitUntil(promise: Promise<void>) {
        promises.push(promise);
      },
    };

    el.dispatchEvent(new CustomEvent('genui-action', { detail, bubbles: true }));
    await Promise.all(promises);
  }

  return { dispatchAction };
}
