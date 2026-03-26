import type { InjectionKey } from 'vue';
import type { ActionHook } from './types/action';

export const ACTION_HOOKS_KEY: InjectionKey<ActionHook[]> = Symbol('genui:actionHooks');
