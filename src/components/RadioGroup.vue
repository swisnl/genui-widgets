<script setup lang="ts">

    import { useActionDispatcher } from '../composables/useActionDispatcher';
    import type { WidgetAction } from '../types/widget';

    const props = defineProps({
        modelValue: {
            type: [String, Number, Boolean],
            default: '',
        },
        name: {
            type: String,
            default: () => 'radio-group-' + Math.random().toString(36).substr(2, 9),
        },
        ariaLabel: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
            // Expects [{ label: 'Option 1', value: 'op1' }, ...]
        },
        direction: {
            type: String,
            default: 'row', // 'row', 'col'
            validator: (value) => ['row', 'col'].includes(value),
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

    const handleChange = async (value) => {
        emit('update:modelValue', value);
        emit('change', value);

        if (props.onChangeAction) {
            await dispatchAction(props.onChangeAction as WidgetAction);
        }
    };
</script>

<template>
    <div
        class="genui-radio-group"
        :class="[`genui-radio-group--${direction}`]"
        role="radiogroup"
        :aria-label="ariaLabel"
    >
        <label
            v-for="(option, index) in options"
            :key="index"
            class="genui-radio"
            :class="{ 'genui-radio--disabled': disabled, 'genui-radio--selected': modelValue === option.value }"
        >
            <input
                type="radio"
                class="genui-radio__input"
                :name="name"
                :value="option.value"
                :checked="modelValue === option.value"
                :disabled="disabled"
                :required="required"
                @change="() => handleChange(option.value)"
            >
            <span class="genui-radio__control" />
            <span class="genui-radio__label">{{ option.label }}</span>
        </label>
    </div>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-radio-group {
    display: flex;
    gap: apprem.rem(1);
}

.genui-radio-group--col {
    flex-direction: column;
    gap: apprem.rem(.5);
}

.genui-radio {
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

        .genui-radio__control {
            background: var(--genui-disabled-bg);
        }
    }
}

.genui-radio__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .genui-radio__control {
        border-color: var(--genui-primary-60);

        &::after {
            transform: scale(1);
        }
    }

    &:focus-visible + .genui-radio__control {
         box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
}

.genui-radio__control {
    width: apprem.rem(1);
    height: apprem.rem(1);
    border: 1px solid var(--genui-border-default);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--genui-surface);
    transition: all 0.2s ease;
    position: relative;

    &::after {
        content: '';
        width: apprem.rem(.5);
        height: apprem.rem(.5);
        background: var(--genui-primary-60);
        border-radius: 50%;
        transform: scale(0);
        transition: transform 0.2s ease;
    }
}

.genui-radio__label {
    line-height: 1.25;
}
</style>
