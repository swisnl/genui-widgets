import type { ThemeConfig } from './theme';
import type { TemplateContext, WidgetTemplateSource } from './widget';

export interface WidgetInstance {
  update(template: WidgetTemplateSource, templateContext?: TemplateContext): void;
  setTheme(theme: ThemeConfig): void;
  destroy(): void;
}

export interface RenderOptions {
  theme?: ThemeConfig;
  format?: 'native' | 'chatkit';
  templateContext?: TemplateContext;
}
