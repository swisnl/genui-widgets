<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import BaseLoader from './BaseLoader.vue';
    import Icon from './Icon.vue';
    import { useActionDispatcher } from '../composables/useActionDispatcher';
    import { blockModifier, blockVariant, cx } from '../styling/classes';
    import { isTailwindToken, resolveTailwindToken, adjustAlpha } from '../styling/tailwind';
    import type { WidgetAction } from '../types/widget';

    const props = defineProps({
        submit: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        onClickAction: {
            type: Object,
            default: null,
        },
        iconStart: {
            type: String,
            default: null,
        },
        iconEnd: {
            type: String,
            default: null,
        },
        color: {
            type: String,
            default: 'primary',
            // Allows both semantic colors and Tailwind tokens (e.g., 'red-400')
        },
        variant: {
            type: String,
            default: 'solid',
            validator: (value) => ['solid', 'soft', 'outline', 'ghost'].includes(value),
        },
        size: {
            type: String,
            default: 'lg',
            validator: (value) => ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(value),
        },
        pill: {
            type: Boolean,
            default: true,
        },
        uniform: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        // Legacy prop support for template-driven widgets where "style" collides
        // with Vue's special style attribute handling.
        legacyStyle: {
            type: String,
            default: null,
        },
        iconSize: {
            type: String,
            default: 'md',
        },
    });

    const buttonRef = ref<HTMLButtonElement | null>(null);
    const isLoading = ref(false);
    const fixedWidth = ref<string | null>(null);
    const { dispatchAction } = useActionDispatcher();

    const isTailwind = computed(() => isTailwindToken(props.color));

    const resolvedColor = computed(() => {
        if (isTailwind.value) {
            return resolveTailwindToken(props.color);
        }
        return props.color;
    });

    const computedClass = computed(() => {
        const effectiveColor = props.legacyStyle === 'secondary'
            ? 'primary'
            : (props.legacyStyle ?? props.color);
        const effectiveVariant = props.legacyStyle === 'secondary' ? 'outline' : props.variant;

        return cx(
            !isTailwind.value && blockVariant('genui-button', 'color', effectiveColor),
            blockVariant('genui-button', 'variant', effectiveVariant),
            blockVariant('genui-button', 'size', props.size),
            blockModifier('genui-button', props.pill ? 'pill' : null),
            blockModifier('genui-button', props.uniform ? 'uniform' : null),
            blockModifier('genui-button', props.block ? 'block' : null),
        );
    });

    const tailwindStyle = computed(() => {
        if (!isTailwind.value || !resolvedColor.value) {
            return null;
        }

        const color = resolvedColor.value;
        switch (props.variant) {
            case 'solid':
                return {
                    backgroundColor: color,
                    color: '#ffffff',
                    borderColor: 'transparent',
                };
            case 'soft':
                return {
                    backgroundColor: adjustAlpha(color, 0.1),
                    color: color,
                    borderColor: 'transparent',
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    color: color,
                    borderColor: color,
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    color: color,
                    borderColor: 'transparent',
                };
            default:
                return null;
        }
    });

    const handleClick = async () => {
        if (props.disabled || isLoading.value) return;

        if (buttonRef.value) {
            const { width } = buttonRef.value.getBoundingClientRect();
            fixedWidth.value = props.block ? '100%' : `${width}px`;
        }

        isLoading.value = true;

        if (props.onClickAction) {
            try {
                await dispatchAction(props.onClickAction as WidgetAction);
            } catch (err) {
                console.error('Error executing action hooks:', err);
            } finally {
                isLoading.value = false;
            }
        } else {
            isLoading.value = false;
        }
    };

    watch(isLoading, (loading) => {
        if (loading) {
            if (buttonRef.value) {
                const { width } = buttonRef.value.getBoundingClientRect();
                fixedWidth.value = props.block ? '100%' : `${width}px`;
            }
        } else {
            fixedWidth.value = null;
        }
    });

    const buttonStyle = computed(() => {
        const base = fixedWidth.value ? { width: fixedWidth.value } : null;
        const tailwind = tailwindStyle.value;

        if (!base && !tailwind) return null;
        return { ...base, ...tailwind };
    });
</script>

<template>
    <button
        ref="buttonRef"
        class="genui-button"
        :class="computedClass"
        :type="submit ? 'submit' : 'button'"
        :disabled="disabled || isLoading"
        :style="buttonStyle"
        @click="handleClick"
    >
        <BaseLoader v-if="isLoading" />
        <template v-else>
            <span v-if="iconStart"
                  class="genui-button__icon-start"
            >
                <Icon :name="iconStart"
                      :size="iconSize"
                />
            </span>
            <span v-if="label">{{ label }}</span>
            <slot />
            <span v-if="iconEnd"
                  class="genui-button__icon-end"
            >
                <Icon :name="iconEnd"
                      :size="iconSize"
                />
            </span>
        </template>
    </button>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-button {
    all: unset;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid transparent;
    margin: 0;
    margin-inline-start: apprem.rem(.375);
    cursor: pointer;
    font-weight: 400;
    line-height: 1;
    transition: all .2s ease;
    white-space: nowrap;

    &:disabled {
        opacity: .5;
        cursor: not-allowed;
    }

    &:focus-visible {
        transition: none;
        outline: var(--genui-primary-50) solid 1px;
        outline-offset: 2px;
    }

    // Sizes
    &--size-3xs { height: 22px; font-size: apprem.rem(.625);  padding: 0 apprem.rem(.25);   gap: apprem.rem(.25); }
    &--size-2xs { height: 24px; font-size: apprem.rem(.625);  padding: 0 apprem.rem(.375);  gap: apprem.rem(.25); }
    &--size-xs  { height: 26px; font-size: apprem.rem(.75);   padding: 0 apprem.rem(.5);    gap: apprem.rem(.375); }
    &--size-sm  { height: 28px; font-size: apprem.rem(.75);   padding: 0 apprem.rem(.625);  gap: apprem.rem(.375); }
    &--size-md  { height: 32px; font-size: apprem.rem(.875);  padding: 0 apprem.rem(.75);   gap: apprem.rem(.5); }
    &--size-lg  { height: 36px; font-size: apprem.rem(.875);  padding: 0 apprem.rem(1);     gap: apprem.rem(.5); }
    &--size-xl  { height: 40px; font-size: apprem.rem(1);     padding: 0 apprem.rem(1.25);  gap: apprem.rem(.625); }
    &--size-2xl { height: 44px; font-size: apprem.rem(1.125); padding: 0 apprem.rem(1.5);   gap: apprem.rem(.75); }
    &--size-3xl { height: 48px; font-size: apprem.rem(1.25);  padding: 0 apprem.rem(1.75);  gap: apprem.rem(.875); }

    // Shape
    &--pill { border-radius: 9999px; }
    &:not(&--pill) { border-radius: apprem.rem(.375); } // Default radius

    // Block
    &--block { display: flex; width: 100%; }

    // Uniform (Square/Circle)
    &--uniform {
        padding: 0;
        &.genui-button--size-3xs { width: 22px; }
        &.genui-button--size-2xs { width: 24px; }
        &.genui-button--size-xs  { width: 26px; }
        &.genui-button--size-sm  { width: 28px; }
        &.genui-button--size-md  { width: 32px; }
        &.genui-button--size-lg  { width: 36px; }
        &.genui-button--size-xl  { width: 40px; }
        &.genui-button--size-2xl { width: 44px; }
        &.genui-button--size-3xl { width: 48px; }
    }

    // Color Variants
    $aliases: primary, secondary, success, danger, warning, info, discovery, caution;

    @each $name in $aliases {
        // Solid Variant
        &--color-#{$name}.genui-button--variant-solid {
            background-color: var(--genui-#{$name}-60);
            color: var(--genui-#{$name}-5);
            border-color: transparent;

            &:hover:not(:disabled) {
                background-color: var(--genui-#{$name}-70);
            }
        }

        // Outline Variant
        &--color-#{$name}.genui-button--variant-outline {
            background-color: transparent;
            color: var(--genui-#{$name}-60);
            border-color: var(--genui-#{$name}-30);

            &:hover:not(:disabled) {
                border-color: var(--genui-#{$name}-40);
                background-color: rgba(var(--genui-#{$name}-60-rgb), 0.06);
            }
        }

        // Soft Variant
        &--color-#{$name}.genui-button--variant-soft {
            background-color: rgba(var(--genui-#{$name}-60-rgb), 0.1);
            color: var(--genui-#{$name}-60);
            border-color: transparent;

            &:hover:not(:disabled) {
                background-color: rgba(var(--genui-#{$name}-60-rgb), 0.15);
            }
        }

        // Ghost Variant
        &--color-#{$name}.genui-button--variant-ghost {
            background-color: transparent;
            color: var(--genui-#{$name}-60);
            border-color: transparent;

            &:hover:not(:disabled) {
                background-color: rgba(var(--genui-#{$name}-60-rgb), 0.08);
            }
        }
    }

    // Primary buttons intentionally use the outer edge of the scale rather
    // than the shared mid-scale mapping used by the other semantic colors.
    &--color-primary.genui-button--variant-solid {
        background-color: var(--genui-primary-90);

        &:hover:not(:disabled) {
            background-color: var(--genui-primary-80);
        }
    }

    &--color-primary.genui-button--variant-outline {
        color: var(--genui-primary-90);
        border-color: var(--genui-primary-40);

        &:hover:not(:disabled) {
            border-color: var(--genui-primary-50);
            background-color: rgba(var(--genui-primary-90-rgb), 0.06);
        }
    }

    &--color-primary.genui-button--variant-soft {
        background-color: rgba(var(--genui-primary-90-rgb), 0.1);
        color: var(--genui-primary-90);
        border-color: transparent;

        &:hover:not(:disabled) {
            background-color: rgba(var(--genui-primary-90-rgb), 0.15);
        }
    }

    &--color-primary.genui-button--variant-ghost {
        color: var(--genui-primary-90);

        &:hover:not(:disabled) {
            background-color: rgba(var(--genui-primary-90-rgb), 0.08);
        }
    }
}

.genui-button--block {
  margin-inline-start: 0;
}
</style>
