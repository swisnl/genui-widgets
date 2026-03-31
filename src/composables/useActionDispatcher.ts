import { getCurrentInstance } from 'vue';
import type { ActionEventDetail } from '../types/action';
import type { WidgetAction } from '../types/widget';

export function useActionDispatcher() {
  const instance = getCurrentInstance();

  async function dispatchAction(action: WidgetAction | null | undefined): Promise<void> {
    if (!action) return;

    const el = instance?.proxy?.$el as HTMLElement | undefined;
    if (!el) return;

    const promises: Promise<void>[] = [];
    const detail: ActionEventDetail = {
      action,
      waitUntil(promise: Promise<void>) {
        promises.push(promise);
      },
    };

    el.dispatchEvent(new CustomEvent('genui-action', { detail, bubbles: true }));
    await Promise.all(promises);
  }

  return { dispatchAction };
}
