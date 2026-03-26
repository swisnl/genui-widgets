import type { WidgetTemplate } from '../../../src/types/widget';

export interface VisualScenario {
  id: string;
  width?: number;
  themeVariants?: Array<'light' | 'dark'>;
  template: WidgetTemplate;
}
