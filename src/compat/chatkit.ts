import type { WidgetNode, WidgetTemplate } from '../types/widget';

export interface ChatKitNode {
  type: string;
  children?: ChatKitNode[];
  [prop: string]: unknown;
}

function normalizeAction(props: Record<string, unknown>): Record<string, unknown> {
  const nextProps = { ...props };

  if ('onClick' in nextProps && !('onClickAction' in nextProps)) {
    nextProps.onClickAction = nextProps.onClick;
    delete nextProps.onClick;
  }

  if ('onSubmit' in nextProps && !('onSubmitAction' in nextProps)) {
    nextProps.onSubmitAction = nextProps.onSubmit;
    delete nextProps.onSubmit;
  }

  if ('onChange' in nextProps && !('onChangeAction' in nextProps)) {
    nextProps.onChangeAction = nextProps.onChange;
    delete nextProps.onChange;
  }

  return nextProps;
}

function normalizeProps(type: string, props: Record<string, unknown>): Record<string, unknown> {
  const nextProps = normalizeAction(props);

  if (type === 'Button' && 'title' in nextProps && !('label' in nextProps)) {
    nextProps.label = nextProps.title;
  }

  if (type === 'Form' && 'submit' in nextProps && !('onSubmitAction' in nextProps)) {
    nextProps.onSubmitAction = nextProps.submit;
  }

  return nextProps;
}

function normalizeNode(node: ChatKitNode): WidgetNode {
  const { type, children, ...props } = node;

  return {
    type: type as WidgetNode['type'],
    ...normalizeProps(type, props),
    ...(children ? { children: children.map(normalizeNode) } : {}),
  };
}

export function fromChatKit(widgetRoot: ChatKitNode): WidgetTemplate {
  return normalizeNode(widgetRoot);
}
