# `@swisnl/genui-widgets`

Render OpenAI ChatKit widget JSON in any web page with a single function call.

Pass a ChatKit widget payload directly to `render()` and it displays. No ChatKit dependency, no framework lock-in.

## Installation

```bash
npm install @swisnl/genui-widgets
```

## IIFE bundle (no build step)

The standalone bundle includes Vue and injects CSS automatically.

```html
<div id="widget"></div>
<script src="/dist/genui-widgets.js"></script>
<script>
  GenUIWidgets.render(
    document.getElementById('widget'),
    chatKitPayload,
    { format: 'chatkit' }
  );
</script>
```

## Render an OpenAI widget payload

```ts
import { render } from '@swisnl/genui-widgets';
import '@swisnl/genui-widgets/styles';

render(document.getElementById('widget'), chatKitPayload, {
  format: 'chatkit',
  actionHooks: [
    async (action) => {
      console.log('Action:', action);
    },
  ],
});
```

## Jinja templates

Templates can be Jinja strings that resolve to widget JSON at render time:

```ts
render(container, `{"type":"Card","children":[{"type":"Title","value":{{ title | tojson }}}]}`, {
  templateContext: { title: 'Hello' },
});
```

## `.widget` files

Extract the template from a `.widget` file and pass it directly to `render()`:

```ts
import { extractTemplateFromWidgetFile, render } from '@swisnl/genui-widgets';

const template = extractTemplateFromWidgetFile(await file.text());
render(container, template);
```


That's it. Pass the raw payload from the OpenAI response and the widget renders.

## Vue component

```vue
<script setup lang="ts">
import { provide } from 'vue';
import { ACTION_HOOKS_KEY, DynamicWidget, fromChatKit } from '@swisnl/genui-widgets';
import '@swisnl/genui-widgets/styles';

const template = fromChatKit(chatKitPayload);

provide(ACTION_HOOKS_KEY, [
  async (action) => console.log('Action:', action),
]);
</script>

<template>
  <DynamicWidget :template="template" />
</template>
```

## Updating and destroying

`render()` returns an instance you can update or clean up:

```ts
const widget = render(container, chatKitPayload, { format: 'chatkit' });

// Swap in a new payload
widget.update(newPayload);

// Clean up
widget.destroy();
```

## Theming

Widgets are styled through `--genui-*` CSS custom properties, all scoped to the `.genui-widget-root` container element. The library ships two ready-made themes and exposes the full API for custom themes.

### Built-in themes

```ts
import { defaultTheme, darkTheme, render } from '@swisnl/genui-widgets';

// Light (default — applied automatically when no theme is passed)
render(container, payload, { theme: defaultTheme });

// Dark
render(container, payload, { theme: darkTheme });
```

### Overriding with CSS variables

Because all tokens are plain CSS custom properties on `.genui-widget-root`, you can override them directly in a stylesheet without touching JavaScript at all:

```css
/* Target all widget roots on the page */
.genui-widget-root {
  --genui-surface: #f8f4ff;
  --genui-background: #f8f4ff;
  --genui-text-primary: #1a0040;
  --genui-primary-60: #7c3aed;
  --genui-primary-70: #6d28d9;
  --genui-border-default: #e2e8f0;
  --genui-base-size: 0.9rem;
}

/* Or scope overrides to a specific container */
#my-widget .genui-widget-root {
  --genui-surface: #1e1e2e;
  --genui-text-primary: #cdd6f4;
}
```

### Custom theme

Use `createTheme()` to merge overrides on top of a base theme:

```ts
import { createTheme, defaultTheme, render } from '@swisnl/genui-widgets';

render(container, payload, {
  theme: createTheme(defaultTheme, {
    surface: '#f8f4ff',
    background: '#f8f4ff',
    textPrimary: '#1a0040',
    palettes: {
      primary: { 60: '#7c3aed', 70: '#6d28d9' },
    },
  }),
});
```

### Semantic color palettes

Each semantic color (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `discovery`, `caution`) exposes ten lightness steps (`5` → `90`) as CSS variables:

```
--genui-primary-60       /* hex value */
--genui-primary-60-rgb   /* "R, G, B" for alpha compositing */
```

Override individual steps without replacing the whole palette:

```ts
createTheme(defaultTheme, {
  palettes: {
    primary: { 60: '#2563eb', 70: '#1d4ed8' },
    success: { 50: '#10b981' },
  },
});
```

### Raw CSS variable overrides

Use the `overrides` escape hatch to set any `--genui-*` variable directly:

```ts
createTheme(defaultTheme, {
  overrides: {
    'base-size': '0.9rem',
    '--genui-border-default': '#e2e8f0',
  },
});
```

Keys are automatically prefixed with `--genui-` when not already prefixed.

### Applying a theme in Vue with `useTheme`

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useTheme, darkTheme } from '@swisnl/genui-widgets';

const container = ref<HTMLElement | null>(null);
const { theme } = useTheme(container, darkTheme);

// Reactively update any token — the container updates automatically
theme.value = { ...theme.value, surface: '#1a1a2e' };
</script>

<template>
  <div ref="container">
    <DynamicWidget :template="widget" />
  </div>
</template>
```

### Applying a theme manually

```ts
import { applyTheme, createTheme, defaultTheme } from '@swisnl/genui-widgets';

applyTheme(document.getElementById('widget'), createTheme(defaultTheme, {
  textPrimary: '#1a0040',
}));
```

### Updating the theme at runtime

```ts
const widget = render(container, payload, { format: 'chatkit' });

widget.setTheme(darkTheme);
```

## Widget types

`Box` `Card` `Button` `Text` `Title` `Markdown` `Image` `Form` `Input` `Textarea` `Select` `Checkbox` `RadioGroup` `DatePicker` `Badge` `ListView` `ListViewItem` `Divider` `Spacer` `Row` `Col` `Label` `Caption` `Icon`

## Development

```bash
npm install
npm run demo      # run the demo
npm run build     # build both outputs
npm run lint
npm run typecheck
npm test
npm run test:visual
npm run test:visual:update   # refresh visual baselines
```

## Build output

| File | Description |
|---|---|
| `dist/genui-widgets.esm.js` | ESM build for bundlers |
| `dist/genui-widgets.css` | Stylesheet for ESM consumers |
| `dist/genui-widgets.js` | Self-contained browser bundle with CSS injection |
