<script setup lang="ts">
    import { computed } from 'vue';
    import { useActionDispatcher } from '../composables/useActionDispatcher';
    import { blockModifier, cx } from '../styling/classes';
    import type { WidgetAction } from '../types/widget';

    const props = defineProps({
        modelValue: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        min: {
            type: String,
            default: '',
        },
        max: {
            type: String,
            default: '',
        },
        variant: {
            type: String,
            default: 'outline',
            validator: (value) => ['solid', 'soft', 'outline', 'ghost'].includes(value),
        },
        size: {
            type: String,
            default: 'md',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        onChangeAction: {
            type: Object,
            default: null,
        },
    });

    const emit = defineEmits(['update:modelValue', 'change']);
    const { dispatchAction } = useActionDispatcher();

    const handleInput = async (event) => {
        const value = (event.target as HTMLInputElement).value;
        emit('update:modelValue', value);
        emit('change', value);

        if (props.onChangeAction) {
            await dispatchAction(props.onChangeAction as WidgetAction);
        }
    };

    const classes = computed(() => cx(
        'genui-datepicker-wrapper',
        blockModifier('genui-datepicker-wrapper', props.size),
        blockModifier('genui-datepicker-wrapper', props.variant),
        blockModifier('genui-datepicker-wrapper', props.disabled ? 'disabled' : null),
    ));
</script>

<template>
    <div
        :class="classes"
    >
        <input
            class="genui-datepicker"
            type="date"
            :name="name"
            :value="modelValue"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            :disabled="disabled"
            @input="handleInput"
        >
        <!-- Custom calendar icon can be added here if we hide the default one, but default is accessible -->
    </div>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-datepicker-wrapper {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: apprem.rem(.375);
    transition: all 0.2s ease;
    overflow: hidden;
    width: 100%; /* Or auto if not blocked */
}

.genui-datepicker {
    all: unset;
    width: 100%;
    font-family: inherit;
    color: var(--genui-text-primary);
    background: transparent;
    cursor: text;

    &::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.6;
        transition: 0.2s;

        &:hover {
            opacity: 1;
        }
    }
}

/* Variants - Reusing similar styles */
.genui-datepicker-wrapper--outline {
    border: 1px solid var(--genui-border-default);
    background: var(--genui-surface);

    &:focus-within {
        border-color: var(--genui-primary-60);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
}

.genui-datepicker-wrapper--soft {
    border: none;
    background: var(--genui-surface-secondary);

    &:focus-within {
        background: var(--genui-surface-tertiary);
    }
}

.genui-datepicker-wrapper--ghost {
    border: none;
    background: transparent;

    &:hover {
        background: var(--genui-surface-secondary);
    }
}

.genui-datepicker-wrapper--solid {
    background: var(--genui-primary-60);
    color: var(--genui-surface);

    .genui-datepicker {
        color: var(--genui-surface);
    }
}

.genui-datepicker-wrapper--disabled {
    opacity: 0.6;
    background-color: var(--genui-disabled-bg);
    cursor: not-allowed;

    .genui-datepicker {
        cursor: not-allowed;
        color: var(--genui-disabled-text);
    }
}

/* Sizes */
.genui-datepicker-wrapper--3xs { padding: apprem.rem(.125) apprem.rem(.25); font-size: apprem.rem(.625); }
.genui-datepicker-wrapper--2xs { padding: apprem.rem(.25) apprem.rem(.375); font-size: apprem.rem(.75); }
.genui-datepicker-wrapper--xs { padding: apprem.rem(.375) apprem.rem(.5); font-size: apprem.rem(.75); }
.genui-datepicker-wrapper--sm { padding: apprem.rem(.375) apprem.rem(.625); font-size: apprem.rem(.875); }
.genui-datepicker-wrapper--md { padding: apprem.rem(.5) apprem.rem(.75); font-size: apprem.rem(.875); }
.genui-datepicker-wrapper--lg { padding: apprem.rem(.625) apprem.rem(.875); font-size: apprem.rem(1); }
.genui-datepicker-wrapper--xl { padding: apprem.rem(.75) apprem.rem(1); font-size: apprem.rem(1.125); }
.genui-datepicker-wrapper--2xl { padding: apprem.rem(1) apprem.rem(1.25); font-size: apprem.rem(1.25); }
.genui-datepicker-wrapper--3xl { padding: apprem.rem(1.25) apprem.rem(1.5); font-size: apprem.rem(1.5); }

</style>
