<script setup lang="ts">

    import { useActionDispatcher } from '../composables/useActionDispatcher';
    import type { WidgetAction } from '../types/widget';

    const props = defineProps({
        modelValue: {
            type: [Boolean, Array],
            default: false,
        },
        name: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        required: {
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

    const handleChange = async (event) => {
        const target = event.target as HTMLInputElement;
        const value = Array.isArray(props.modelValue)
            ? props.modelValue
            : target.checked;

        emit('update:modelValue', value);
        emit('change', value);

        if (props.onChangeAction) {
            await dispatchAction(props.onChangeAction as WidgetAction);
        }
    };
</script>

<template>
    <label class="genui-checkbox"
           :class="{ 'genui-checkbox--disabled': disabled }"
    >
        <input
            type="checkbox"
            class="genui-checkbox__input"
            :name="name"
            :checked="modelValue"
            :disabled="disabled"
            :required="required"
            @change="handleChange"
        >
        <span class="genui-checkbox__control">
            <svg class="genui-checkbox__icon"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
            >
                <path d="M20 6L9 17L4 12"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                />
            </svg>
        </span>
        <span v-if="label"
              class="genui-checkbox__label"
        >{{ label }}</span>
    </label>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-checkbox {
    display: inline-flex;
    align-items: center;
    gap: apprem.rem(.5);
    cursor: pointer;
    font-size: apprem.rem(.875);
    color: var(--genui-text-primary);
    user-select: none;

    &--disabled {
        opacity: 0.6;
        cursor: not-allowed;
        color: var(--genui-disabled-text);

        .genui-checkbox__control {
            background: var(--genui-disabled-bg);
        }
    }
}

.genui-checkbox__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .genui-checkbox__control {
        background: var(--genui-primary-60);
        border-color: var(--genui-primary-60);

        .genui-checkbox__icon {
            opacity: 1;
            transform: scale(1);
        }
    }

    &:focus-visible + .genui-checkbox__control {
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
        border-color: var(--genui-primary-60);
    }
}

.genui-checkbox__control {
    width: apprem.rem(1);
    height: apprem.rem(1);
    border: 1px solid var(--genui-border-default);
    border-radius: apprem.rem(.25);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--genui-surface);
    transition: all 0.2s ease;
}

.genui-checkbox__icon {
    width: apprem.rem(.75);
    height: apprem.rem(.75);
    color: var(--genui-surface);
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.2s ease;
}

.genui-checkbox__label {
    line-height: 1.25;
}
</style>
