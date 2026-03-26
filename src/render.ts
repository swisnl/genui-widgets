import { createApp, h, ref } from 'vue';
import DynamicWidget from './components/DynamicWidget.vue';
import { fromChatKit } from './compat/chatkit';
import { ACTION_HOOKS_KEY } from './injectionKeys';
import { resolveTemplate } from './template';
import { applyTheme, createTheme, defaultTheme } from './theme';
import type { WidgetInstance, RenderOptions } from './types/instance';
import type { TemplateContext, WidgetTemplate, WidgetTemplateSource } from './types/widget';

export function render(
  container: HTMLElement,
  template: WidgetTemplateSource,
  options: RenderOptions = {},
): WidgetInstance {
  const { actionHooks = [], theme = {}, format = 'native', templateContext: initialTemplateContext = {} } = options;
  let templateContext: TemplateContext = initialTemplateContext;

  const normalize = (value: WidgetTemplateSource, context: TemplateContext) => {
    const resolvedTemplate = resolveTemplate(value, context);

    return format === 'chatkit' ? fromChatKit(resolvedTemplate) : resolvedTemplate;
  };
  const templateRef = ref<WidgetTemplate>(normalize(template, templateContext));

  container.classList.add('genui-widget-root');
  applyTheme(container, createTheme(defaultTheme, theme));

  const app = createApp({
    render: () => h(DynamicWidget, { template: templateRef.value }),
  });

  app.provide(ACTION_HOOKS_KEY, actionHooks);
  app.mount(container);

  return {
    update(nextTemplate: WidgetTemplateSource, nextTemplateContext = templateContext) {
      templateContext = nextTemplateContext;
      templateRef.value = normalize(nextTemplate, templateContext);
    },
    setTheme(nextTheme) {
      applyTheme(container, createTheme(defaultTheme, nextTheme));
    },
    destroy() {
      app.unmount();
      container.classList.remove('genui-widget-root');
      container.removeAttribute('style');
    },
  };
}
