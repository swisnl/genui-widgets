export type WidgetType =
  | 'Box'
  | 'Card'
  | 'Button'
  | 'Text'
  | 'Title'
  | 'Markdown'
  | 'Image'
  | 'Input'
  | 'Textarea'
  | 'Select'
  | 'Checkbox'
  | 'RadioGroup'
  | 'DatePicker'
  | 'Form'
  | 'Badge'
  | 'ListView'
  | 'ListViewItem'
  | 'Divider'
  | 'Spacer'
  | 'Row'
  | 'Col'
  | 'Label'
  | 'Caption'
  | 'Icon';

export type TextSize =
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

export type SpacingSize = 0 | 1 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

export interface WidgetAction {
  type: string;
  payload?: Record<string, unknown>;
  handling?: 'client' | 'server';
  [key: string]: unknown;
}

export interface WidgetNode {
  type: WidgetType;
  children?: WidgetNode[];
  [prop: string]: unknown;
}

export type WidgetTemplate = WidgetNode;
export type WidgetTemplateSource = WidgetTemplate | string;
export type TemplateContext = Record<string, unknown>;

export interface WidgetOption {
  label: string;
  value: string | number | boolean;
}

export interface WidgetActionButton {
  label: string;
  action: WidgetAction;
}
