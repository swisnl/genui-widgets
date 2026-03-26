<script setup lang="ts">
    import { computed } from 'vue';
    import { blockModifier, cx } from '../styling/classes';

    const emit = defineEmits(['update:modelValue', 'input']);

    const props = defineProps({
        modelValue: {
            type: [String, Number],
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
        inputType: {
            type: String,
            default: 'text',
        },
        variant: {
            type: String,
            default: 'outline', // 'soft', 'outline'
            validator: (value) => ['soft', 'outline'].includes(value),
        },
        size: {
            type: String,
            default: 'md', // '3xs' to '3xl'
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        pattern: {
            type: String,
            default: null,
        },
        error: {
            type: Boolean,
            default: false,
        },
    });

    const handleInput = (event) => {
        const value = (event.target as HTMLInputElement).value;
        emit('update:modelValue', value);
        emit('input', value);
    };

    const classes = computed(() => cx(
        'genui-input-wrapper',
        blockModifier('genui-input-wrapper', props.size),
        blockModifier('genui-input-wrapper', props.variant),
        blockModifier('genui-input-wrapper', props.error ? 'error' : null),
        blockModifier('genui-input-wrapper', props.disabled ? 'disabled' : null),
    ));
</script>

<template>
    <div
        :class="classes"
    >
        <component
            :is="'input'"
            class="genui-input"
            :type="inputType"
            :name="name"
            :value="modelValue"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :pattern="pattern"
            @input="handleInput"
        />
    </div>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    border-radius: apprem.rem(.375);
    transition: all 0.2s ease;
    overflow: hidden;
}

.genui-input {
    all: unset;
    width: 100%;
    font-family: inherit;
    color: var(--genui-text-primary);
    background: transparent;

    &::placeholder {
        color: var(--genui-text-tertiary);
    }
}

/* Variants */
.genui-input-wrapper--outline {
    border: 1px solid var(--genui-border-default);
    background: var(--genui-surface);

    &:focus-within {
        border-color: var(--genui-primary-60);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
}

.genui-input-wrapper--soft {
    border: none;
    background: var(--genui-surface-secondary);

    &:focus-within {
        background: var(--genui-surface-tertiary);
    }
}

.genui-input-wrapper--error {
    border-color: var(--genui-danger-60);
}

.genui-input-wrapper--disabled {
    opacity: 0.6;
    background-color: var(--genui-disabled-bg);
    cursor: not-allowed;

    .genui-input {
        cursor: not-allowed;
        color: var(--genui-disabled-text);
    }
}

/* Sizes */
.genui-input-wrapper--3xs { padding: apprem.rem(.125) apprem.rem(.25); font-size: apprem.rem(.625); }
.genui-input-wrapper--2xs { padding: apprem.rem(.25) apprem.rem(.375); font-size: apprem.rem(.75); }
.genui-input-wrapper--xs { padding: apprem.rem(.375) apprem.rem(.5); font-size: apprem.rem(.75); }
.genui-input-wrapper--sm { padding: apprem.rem(.375) apprem.rem(.625); font-size: apprem.rem(.875); }
.genui-input-wrapper--md { padding: apprem.rem(.5) apprem.rem(.75); font-size: apprem.rem(.875); }
.genui-input-wrapper--lg { padding: apprem.rem(.625) apprem.rem(.875); font-size: apprem.rem(1); }
.genui-input-wrapper--xl { padding: apprem.rem(.75) apprem.rem(1); font-size: apprem.rem(1.125); }
.genui-input-wrapper--2xl { padding: apprem.rem(1) apprem.rem(1.25); font-size: apprem.rem(1.25); }
.genui-input-wrapper--3xl { padding: apprem.rem(1.25) apprem.rem(1.5); font-size: apprem.rem(1.5); }

</style>
