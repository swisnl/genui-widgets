<script setup lang="ts">

    import { computed } from 'vue';
    import { marked } from 'marked';
    import DOMPurify from 'dompurify';

    const props = defineProps({
        value: {
            type: String,
            required: true,
        },
        streaming: {
            type: Boolean,
            default: false,
        },
    });

    const html = computed(() => {
        if (!props.value) return '';
        // Normalize URL's with references directly behind them, so they do not get joined onto the URL.
        // Example: [https://example.com][1] becomes [https://example.com] [1]
        const normalized = props.value.replace(
            /\[(https?:\/\/[^\]\s]+)]((?:\[[^\]]+])*)/g,
            (_, url, refs) => refs ? `${url} ${refs}` : url
        );
        const rawHtml = marked.parse(normalized);
        return DOMPurify.sanitize(rawHtml);
    });

</script>

<template>
    <div class="genui-markdown"
         v-html="html"
    />
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-markdown {
    ul,
    ol,
    table,
    blockquote,
    pre,
    p {
        color: var(--genui-text-primary);
        font-size: apprem.rem(1);
        line-height: 1.625;
        margin: 0 0 apprem.rem(1);
        padding: 0;
    }

    ul:last-child,
    ol:last-child,
    table:last-child,
    blockquote:last-child,
    pre:last-child,
    p:last-child {
        margin-bottom: 0;
    }

    ul {
        padding-left: apprem.rem(1.5);
        list-style: disc outside;
    }

    ol {
        padding-left: apprem.rem(1.25);
        list-style: auto outside;
    }

    table {
        width: 100%;
        border-spacing: 0;
        border-radius: apprem.rem(.5);
        overflow: hidden;
        border: 1px solid var(--genui-border-default);
    }

    table th,
    table td {
        font-size: apprem.rem(1);
        line-height: 1.625;
        text-align: left;
        vertical-align: middle;
        color: var(--genui-text-primary);
        border: 0;
        border-bottom: 1px solid var(--genui-border-default);
        padding: apprem.rem(.45) apprem.rem(.5) apprem.rem(.25);
    }

    table th {
        background-color: var(--genui-surface-secondary);
        color: var(--genui-text-primary);
        font-weight: 700;
    }

    blockquote {
        padding: apprem.rem(.25) apprem.rem(1);
        margin-left: apprem.rem(.125);
        border-left: apprem.rem(.25) solid var(--genui-border-default);
        color: var(--genui-text-secondary);
        font-style: italic;
    }

    pre,
    code {
        padding: apprem.rem(.125) apprem.rem(.25);
        font-size: apprem.rem(1);
        font-variant-numeric: tabular-nums lining-nums slashed-zero;
        font-feature-settings: "tnum", "zero";
        unicode-bidi: isolate;
        font-family: monospace;
    }

    code {
        box-decoration-break: clone;
        margin: 0;
        background: var(--genui-surface-secondary);
        border-radius: apprem.rem(.125);
        white-space: pre-wrap;
    }

    pre {
        background: var(--genui-surface-tertiary);
        border-radius: apprem.rem(.5);
        overflow-x: auto;
        padding: apprem.rem(.5) apprem.rem(1);
        tab-size: 4;
        box-shadow:
            inset 0 apprem.rem(.625) apprem.rem(.5) apprem.rem(-.625) var(--genui-border-default),
            inset 0 apprem.rem(-.625) apprem.rem(.5) apprem.rem(-.625) var(--genui-border-default);

        code {
            all: unset;
        }
    }

    strong {
        font-weight: 600;
    }

    a:not([class]) {
        font-weight: 600;
        text-decoration: underline;
        color: inherit;
    }
}

</style>
