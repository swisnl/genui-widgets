import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { render } from '../src/render';

describe('render', () => {
  it('mounts, dispatches actions, updates, and destroys', async () => {
    const container = document.createElement('div');
    const handler = vi.fn();

    container.addEventListener('genui-action', (e: Event) => {
      handler((e as CustomEvent).detail.action);
    });

    const widget = render(
      container,
      {
        type: 'Button',
        label: 'Click me',
        onClickAction: { type: 'ping', payload: { ok: true } },
      },
    );

    expect(container.classList.contains('genui-widget-root')).toBe(true);
    expect(container.textContent).toContain('Click me');

    const button = container.querySelector('button');
    button?.click();
    await Promise.resolve();
    await Promise.resolve();

    expect(handler).toHaveBeenCalledWith({ type: 'ping', payload: { ok: true } });

    widget.update({
      type: 'Text',
      value: 'Updated',
    });

    await nextTick();

    expect(container.textContent).toContain('Updated');

    widget.destroy();
    expect(container.classList.contains('genui-widget-root')).toBe(false);
  });

  it('maps legacy button style attributes into the expected button classes', async () => {
    const container = document.createElement('div');

    render(container, {
      type: 'Button',
      label: 'Add to cart',
      style: 'secondary',
    });

    await nextTick();

    const button = container.querySelector('button');

    expect(button?.classList.contains('genui-button--color-primary')).toBe(true);
    expect(button?.classList.contains('genui-button--variant-outline')).toBe(true);
  });

  it('uses modifier classes for finite Box and Divider styles', async () => {
    const boxContainer = document.createElement('div');

    render(boxContainer, {
      type: 'Box',
      border: true,
    });

    await nextTick();

    const box = boxContainer.querySelector('.genui-box');
    expect(box?.classList.contains('genui-box--border')).toBe(true);

    const dividerContainer = document.createElement('div');

    render(dividerContainer, {
      type: 'Divider',
      color: 'default',
    });

    await nextTick();

    const divider = dividerContainer.querySelector('hr');
    expect(divider?.classList.contains('genui-divider--color-default')).toBe(true);
  });

  it('renders and updates Jinja template strings with template context', async () => {
    const container = document.createElement('div');
    const template = `{"type":"Card","children":[{"type":"Title","value":{{ title | tojson }}},{"type":"Row","gap":1,"children":[{%- set _items -%}{%- for techItem in tech -%}{%- set itemIndex = loop.index0 -%},{"type":"Badge","key":{{ itemIndex | tojson }},"label":{{ techItem | tojson }}}{%- endfor -%}{%- endset -%}{{- (_items[1:] if _items and _items[0] == ',' else _items) -}}]}]}`;

    const widget = render(container, template, {
      templateContext: {
        tech: ['Vue', 'Jinja'],
        title: 'Launch ready',
      },
    });

    await nextTick();

    expect(container.textContent).toContain('Launch ready');
    expect([...container.querySelectorAll('.genui-badge')].map((element) => element.textContent)).toEqual([
      'Vue',
      'Jinja',
    ]);

    widget.update(template, {
      tech: ['TypeScript'],
      title: 'Updated copy',
    });

    await nextTick();

    expect(container.textContent).toContain('Updated copy');
    expect([...container.querySelectorAll('.genui-badge')].map((element) => element.textContent)).toEqual([
      'TypeScript',
    ]);
  });
});
