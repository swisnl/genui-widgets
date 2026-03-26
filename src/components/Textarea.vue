<script setup lang="ts">
    import { computed } from 'vue';
    import { blockModifier, cx } from '../styling/classes';

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
        rows: {
            type: Number,
            default: 3,
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
        gutterSize: {
            type: String,
            default: null,
        },
        autoFocus: {
            type: Boolean,
            default: false,
        },
        autoSelect: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits(['update:modelValue']);

    const handleInput = (event) => {
        emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
    };

    // Auto-select logic could be added in onMounted if needed, but basic implementation for now.
    const classes = computed(() => cx(
        'genui-textarea-wrapper',
        blockModifier('genui-textarea-wrapper', props.size),
        blockModifier('genui-textarea-wrapper', props.variant),
        blockModifier('genui-textarea-wrapper', props.disabled ? 'disabled' : null),
    ));
</script>

<template>
    <div
        :class="classes"
    >
        <textarea
            class="genui-textarea"
            :name="name"
            :value="modelValue"
            :placeholder="placeholder"
            :rows="rows"
            :required="required"
            :disabled="disabled"
            :autofocus="autoFocus"
            @input="handleInput"
        />
    </div>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-textarea-wrapper {
    width: 100%;
    box-sizing: border-box;
    border-radius: apprem.rem(.375);
    transition: all 0.2s ease;
    display: flex;
}

.genui-textarea {
    all: unset;
    width: 100%;
    font-family: inherit;
    color: var(--genui-text-primary);
    background: transparent;
    resize: vertical;
    line-height: 1.5;

    &::placeholder {
        color: var(--genui-text-secondary);
    }
}

/* Variants - Reusing similar styles to Input for consistency */
.genui-textarea-wrapper--outline {
    border: 1px solid var(--genui-border-default);
    background: var(--genui-surface);

    &:focus-within {
        border-color: var(--genui-primary-60);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
}

.genui-textarea-wrapper--soft {
    border: none;
    background: var(--genui-surface-secondary);

    &:focus-within {
        background: var(--genui-surface-tertiary);
    }
}

.genui-textarea-wrapper--disabled {
    opacity: 0.6;
    background-color: var(--genui-disabled-bg);
    cursor: not-allowed;

    .genui-textarea {
        cursor: not-allowed;
        color: var(--genui-disabled-text);
    }
}

/* Sizes - Padding around the textarea */
.genui-textarea-wrapper--3xs { padding: apprem.rem(.125) apprem.rem(.25); font-size: apprem.rem(.625); }
.genui-textarea-wrapper--2xs { padding: apprem.rem(.25) apprem.rem(.375); font-size: apprem.rem(.75); }
.genui-textarea-wrapper--xs { padding: apprem.rem(.375) apprem.rem(.5); font-size: apprem.rem(.75); }
.genui-textarea-wrapper--sm { padding: apprem.rem(.375) apprem.rem(.625); font-size: apprem.rem(.875); }
.genui-textarea-wrapper--md { padding: apprem.rem(.5) apprem.rem(.75); font-size: apprem.rem(.875); }
.genui-textarea-wrapper--lg { padding: apprem.rem(.625) apprem.rem(.875); font-size: apprem.rem(1); }
.genui-textarea-wrapper--xl { padding: apprem.rem(.75) apprem.rem(1); font-size: apprem.rem(1.125); }
.genui-textarea-wrapper--2xl { padding: apprem.rem(1) apprem.rem(1.25); font-size: apprem.rem(1.25); }
.genui-textarea-wrapper--3xl { padding: apprem.rem(1.25) apprem.rem(1.5); font-size: apprem.rem(1.5); }

</style>
