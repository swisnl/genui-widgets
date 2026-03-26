<script setup lang="ts">
    import { computed } from 'vue';
    import { useActionDispatcher } from '../composables/useActionDispatcher';
    import { blockModifier, cx } from '../styling/classes';
    import type { WidgetAction } from '../types/widget';

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
        options: {
            type: Array,
            default: () => [],
            // Expects [{ label: 'Option 1', value: 'op1' }, ...] or simple array
        },
        variant: {
            type: String,
            default: 'outline', // 'solid', 'soft', 'outline', 'ghost'
            validator: (value) => ['solid', 'soft', 'outline', 'ghost'].includes(value),
        },
        size: {
            type: String,
            default: 'md',
        },
        block: {
            type: Boolean,
            default: false,
        },
        pill: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
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

    const handleChange = async (event) => {
        const target = event.target as HTMLSelectElement;
        const value = target.value;
        emit('update:modelValue', value);
        emit('change', value);

        if (props.onChangeAction) {
            await dispatchAction(props.onChangeAction as WidgetAction);
        }
    };

    const classes = computed(() => cx(
        'genui-select-wrapper',
        blockModifier('genui-select-wrapper', props.size),
        blockModifier('genui-select-wrapper', props.variant),
        blockModifier('genui-select-wrapper', props.block ? 'block' : null),
        blockModifier('genui-select-wrapper', props.pill ? 'pill' : null),
        blockModifier('genui-select-wrapper', props.disabled ? 'disabled' : null),
    ));
</script>

<template>
    <div
        :class="classes"
    >
        <select
            class="genui-select"
            :name="name"
            :value="modelValue"
            :disabled="disabled"
            @change="handleChange"
        >
            <option v-if="placeholder"
                    value=""
                    disabled
                    selected
            >
                {{ placeholder }}
            </option>
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="typeof option === 'object' ? option.value : option"
            >
                {{ typeof option === 'object' ? option.label : option }}
            </option>
        </select>
        <div class="genui-select-arrow">
            <svg width="12"
                 height="12"
                 viewBox="0 0 12 12"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                />
            </svg>
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-select-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: apprem.rem(.375);
    transition: all 0.2s ease;
    background: var(--genui-surface);

    &--block {
        display: flex;
        width: 100%;
    }

    &--pill {
        border-radius: apprem.rem(999);
    }
}

.genui-select {
    all: unset;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
    color: var(--genui-text-primary);
    background: transparent;
    appearance: none;
    padding-right: apprem.rem(2); /* Space for arrow */
    cursor: pointer;

    &::placeholder {
        color: var(--genui-text-secondary);
    }
}

.genui-select-arrow {
    position: absolute;
    right: apprem.rem(.75);
    pointer-events: none;
    display: flex;
    align-items: center;
    color: var(--genui-text-secondary);
}

/* Variants */
.genui-select-wrapper--outline {
    border: 1px solid var(--genui-border-default);
    background: var(--genui-surface);

    &:focus-within {
        border-color: var(--genui-primary-60);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
}

.genui-select-wrapper--soft {
    border: none;
    background: var(--genui-surface-secondary);

    &:focus-within {
        background: var(--genui-surface-tertiary);
    }
}

.genui-select-wrapper--ghost {
    border: none;
    background: transparent;

    &:hover {
        background: var(--genui-surface-secondary);
    }
}

.genui-select-wrapper--solid {
    background: var(--genui-primary-60);
    color: var(--genui-surface);

    .genui-select {
        color: var(--genui-surface);
    }

    .genui-select-arrow {
        color: var(--genui-surface-secondary);
    }
}

.genui-select-wrapper--disabled {
    opacity: 0.6;
    background-color: var(--genui-disabled-bg);
    cursor: not-allowed;

    .genui-select {
        cursor: not-allowed;
        color: var(--genui-disabled-text);
    }

    .genui-select-arrow {
        color: var(--genui-disabled-text);
    }
}

.genui-select option {
    background: var(--genui-surface);
    color: var(--genui-text-primary);
}

/* Sizes */
.genui-select-wrapper--3xs .genui-select { padding: apprem.rem(.125) apprem.rem(.25); font-size: apprem.rem(.625); }
.genui-select-wrapper--2xs .genui-select { padding: apprem.rem(.25) apprem.rem(.375); font-size: apprem.rem(.75); }
.genui-select-wrapper--xs .genui-select { padding: apprem.rem(.375) apprem.rem(.5); font-size: apprem.rem(.75); }
.genui-select-wrapper--sm .genui-select { padding: apprem.rem(.375) apprem.rem(.625); font-size: apprem.rem(.875); }
.genui-select-wrapper--md .genui-select { padding: apprem.rem(.5) apprem.rem(.75); font-size: apprem.rem(.875); }
.genui-select-wrapper--lg .genui-select { padding: apprem.rem(.625) apprem.rem(.875); font-size: apprem.rem(1); }
.genui-select-wrapper--xl .genui-select { padding: apprem.rem(.75) apprem.rem(1); font-size: apprem.rem(1.125); }
.genui-select-wrapper--2xl .genui-select { padding: apprem.rem(1) apprem.rem(1.25); font-size: apprem.rem(1.25); }
.genui-select-wrapper--3xl .genui-select { padding: apprem.rem(1.25) apprem.rem(1.5); font-size: apprem.rem(1.5); }
/* Adjust arrow pos for smaller sizes if needed, but relative usually works */

</style>
