<script setup lang="ts">
    import { computed } from 'vue';
    import { cx } from '../styling/classes';
    import { toCssLength } from '../styling/styles';

    const props = defineProps({
        color: {
            type: [String, Object],
            default: 'default', // 'subtle', 'strong', or specific color
        },
        size: {
            type: [String, Number],
            default: 1, // Thickness in px
        },
        spacing: {
            type: [String, Number],
            default: null, // Margin Y
        },
        flush: {
            type: Boolean,
            default: false,
        },
    });

    const classes = computed(() => {
        return cx('genui-divider', {
            'genui-divider--color-default': props.color === 'default',
            'genui-divider--color-subtle': props.color === 'subtle',
            'genui-divider--color-strong': props.color === 'strong',
            'genui-divider--flush': props.flush,
        });
    });

    const styles = computed(() => {
        const s = {};

        if (typeof props.color === 'string'
            && props.color !== 'default'
            && props.color !== 'subtle'
            && props.color !== 'strong') {
            s.backgroundColor = props.color;
        }

        // Size (height)
        const height = toCssLength(props.size);
        s.height = height;

        // Spacing (margin-top/bottom)
        if (props.spacing) {
            const margin = toCssLength(props.spacing);
            s.marginTop = margin;
            s.marginBottom = margin;
        }

        return s;
    });
</script>

<template>
    <hr :class="classes"
        :style="styles"
    >
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-divider {
    border: none;
    margin: apprem.rem(1) 0; // Default spacing if not set
    width: 100%;

    &--color-default {
        background-color: var(--genui-border-default);
    }

    &--color-subtle {
        background-color: var(--genui-secondary-10);
    }

    &--color-strong {
        background-color: var(--genui-secondary-40);
    }

    &--flush {
        // Expand to fill container width including padding if needed,
        // but typically 'flush' acts on the container context implies removal of negative margins.
        // Based on Image implementation:
        margin-left: apprem.rem(-1);
        margin-right: apprem.rem(-1);
        width: apprem.rem(2 + 100%);
    }
}
</style>
