<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { resolveTemplate } from '../template';
import type { TemplateContext, WidgetTemplate, WidgetTemplateSource } from '../types/widget';

const props = withDefaults(
  defineProps<{
    template: WidgetTemplateSource;
    templateContext?: TemplateContext;
  }>(),
  {
    templateContext: () => ({}),
  },
);

function trackReactiveValue(value: unknown, seen = new Set<unknown>()): void {
  if (!value || typeof value !== 'object' || seen.has(value)) {
    return;
  }

  seen.add(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      trackReactiveValue(item, seen);
    }

    return;
  }

  for (const key in value as Record<string, unknown>) {
    trackReactiveValue((value as Record<string, unknown>)[key], seen);
  }
}

// Load sibling widgets eagerly
const modules = import.meta.glob('./*.vue', { eager: true }) as Record<string, { default: Component }>;
const widgets: Record<string, Component> = {};

for (const path in modules) {
  const name = path.split('/').pop()?.replace('.vue', '');

  if (name !== 'DynamicWidget') {
    widgets[name ?? ''] = modules[path].default;
  }
}

const resolvedTemplate = computed<WidgetTemplate>(() => {
  if (typeof props.template !== 'string') {
    trackReactiveValue(props.template);
  }

  trackReactiveValue(props.templateContext);
  return resolveTemplate(props.template, props.templateContext);
});

const componentToRender = computed(() => widgets[resolvedTemplate.value.type]);

const componentProps = computed(() => {
  const template = { ...resolvedTemplate.value };

  if (template.type === 'Button' && 'style' in template) {
    template.legacyStyle = template.style;
    delete template.style;
  }

  delete template.type;
  delete template.children;
  return template;
});
</script>

<template>
  <component
    :is="componentToRender"
    v-if="componentToRender"
    v-bind="componentProps"
  >
    <template v-if="resolvedTemplate.children && resolvedTemplate.children.length > 0">
      <DynamicWidget
        v-for="(child, index) in resolvedTemplate.children"
        :key="index"
        :template="child"
      />
    </template>
  </component>
</template>
