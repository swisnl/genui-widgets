import { inject } from 'vue';
import { ACTION_HOOKS_KEY } from '../injectionKeys';
import type { WidgetAction } from '../types/widget';

export function useActionDispatcher() {
  const actionHooks = inject(ACTION_HOOKS_KEY, []);

  async function dispatchAction(action: WidgetAction | null | undefined): Promise<void> {
    if (!action) {
      return;
    }

    for (const hook of actionHooks) {
      await hook(action);
    }
  }

  return { actionHooks, dispatchAction };
}
