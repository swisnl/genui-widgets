declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

declare module 'nunjucks/browser/nunjucks.js' {
  export interface NunjucksEnvironmentOptions {
    autoescape?: boolean;
    lstripBlocks?: boolean;
    throwOnUndefined?: boolean;
    trimBlocks?: boolean;
  }

  export type NunjucksFilter = (value: unknown, ...args: unknown[]) => unknown;
  export type NunjucksGlobal = (...args: unknown[]) => unknown;

  export class Environment {
    constructor(loaders?: unknown, options?: NunjucksEnvironmentOptions);
    addFilter(name: string, filter: NunjucksFilter): void;
    addGlobal(name: string, value: NunjucksGlobal | unknown): void;
    renderString(template: string, context?: Record<string, unknown>): string;
  }

  interface NunjucksModule {
    Environment: typeof Environment;
    renderString(template: string, context?: Record<string, unknown>): string;
  }

  const nunjucks: NunjucksModule;
  export default nunjucks;
}
