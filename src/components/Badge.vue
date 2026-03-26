<script setup lang="ts">
    import { computed } from 'vue';
    import { blockModifier, blockVariant, cx } from '../styling/classes';
    import { isTailwindToken, resolveTailwindToken, adjustAlpha } from '../styling/tailwind';

    const props = defineProps({
        label: {
            type: String,
            required: true,
        },
        color: {
            type: String, // 'secondary', 'success', 'danger', 'warning', 'info', 'discovery', or Tailwind tokens like 'red-400'
            default: 'secondary',
        },
        variant: {
            type: String, // 'solid', 'soft', 'outline'
            default: 'soft',
        },
        size: {
            type: String, // 'sm', 'md', 'lg'
            default: 'sm',
        },
        pill: {
            type: Boolean,
            default: true,
        },
    });

    const isTailwind = computed(() => isTailwindToken(props.color));

    const resolvedColor = computed(() => {
        if (isTailwind.value) {
            return resolveTailwindToken(props.color);
        }
        return props.color;
    });

    const classes = computed(() => {
        return cx(
            'genui-badge',
            !isTailwind.value && blockVariant('genui-badge', 'color', props.color),
            blockVariant('genui-badge', 'variant', props.variant),
            blockVariant('genui-badge', 'size', props.size),
            blockModifier('genui-badge', props.pill ? 'pill' : null),
        );
    });

    const style = computed(() => {
        if (!isTailwind.value || !resolvedColor.value) {
            return {};
        }

        const color = resolvedColor.value;
        switch (props.variant) {
            case 'solid':
                // Get a lighter shade for text (e.g., -50 step analog)
                return {
                    backgroundColor: color,
                    color: '#ffffff', // Use white text for solid backgrounds
                };
            case 'soft':
                return {
                    backgroundColor: adjustAlpha(color, 0.1),
                    color: color,
                };
            case 'outline':
                return {
                    borderColor: color,
                    color: color,
                    backgroundColor: 'transparent',
                };
            default:
                return {};
        }
    });
</script>

<template>
    <span :class="classes" :style="style">
        {{ label }}
    </span>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-badge {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    line-height: 1;
    margin-inline-start: apprem.rem(.375);
    white-space: nowrap;
    border: 1px solid transparent;

    &--pill { border-radius: 9999px; }
    &:not(&--pill) { border-radius: apprem.rem(0.25); }

    // Sizes
    &--size-sm { font-size: apprem.rem(0.75); padding: apprem.rem(0.125) apprem.rem(0.5); height: 1.25rem; }
    &--size-md { font-size: apprem.rem(0.875); padding: apprem.rem(0.125) apprem.rem(0.625); height: 1.5rem; }
    &--size-lg { font-size: apprem.rem(0.875); padding: apprem.rem(0.25) apprem.rem(0.75); height: 1.75rem; }

    // Colors & Variants
    $aliases: primary, secondary, success, danger, warning, info, discovery, caution;

    @each $name in $aliases {
        // Solid
        &--color-#{$name}.genui-badge--variant-solid {
            background-color: var(--genui-#{$name}-60);
            color: var(--genui-#{$name}-5);
        }

        // Soft
        &--color-#{$name}.genui-badge--variant-soft {
            background-color: rgba(var(--genui-#{$name}-60-rgb), 0.1);
            color: var(--genui-#{$name}-60);
        }

        // Outline
        &--color-#{$name}.genui-badge--variant-outline {
            background-color: transparent;
            border-color: var(--genui-#{$name}-30);
            color: var(--genui-#{$name}-60);
        }
    }
}
</style>
