<script setup lang="ts">
    import { computed } from 'vue';
    import { blockVariant, cx } from '../styling/classes';
    import { textStyles } from '../styling/text';

    const props = defineProps({
        value: {
            type: String,
            required: true,
        },
        fieldName: {
            type: String,
            required: true,
        },
        size: {
            type: String, // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
            default: 'sm',
        },
        weight: {
            type: String, // 'normal' | 'medium' | 'semibold' | 'bold'
            default: 'medium',
        },
        textAlign: {
            type: String, // 'start' | 'center' | 'end'
            default: 'start',
        },
        color: {
            type: [String, Object],
            default: 'secondary',
        },
    });

    const classes = computed(() => {
        return cx(
            'genui-label',
            blockVariant('genui-label', 'size', props.size),
            blockVariant('genui-label', 'weight', props.weight),
            blockVariant('genui-label', 'align', props.textAlign),
        );
    });

    const styles = computed(() => textStyles({
        color: typeof props.color === 'string' ? props.color : null,
        defaultColor: 'secondary',
    }));
</script>

<template>
    <label :for="fieldName"
           :class="classes"
           :style="styles"
    >
        {{ value }}
    </label>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-label {
    display: block;
    margin-bottom: apprem.rem(0.25);
    line-height: 1.25;
    color: var(--genui-text-secondary);
}

/* Alignments */
.genui-label--align-start { text-align: start; }
.genui-label--align-center { text-align: center; }
.genui-label--align-end { text-align: end; }

/* Weights */
.genui-label--weight-normal { font-weight: 400; }
.genui-label--weight-medium { font-weight: 500; }
.genui-label--weight-semibold { font-weight: 600; }
.genui-label--weight-bold { font-weight: 700; }

/* Sizes */
.genui-label--size-xs { font-size: apprem.rem(0.75); }
.genui-label--size-sm { font-size: apprem.rem(0.875); }
.genui-label--size-md { font-size: apprem.rem(1); }
.genui-label--size-lg { font-size: apprem.rem(1.125); }
.genui-label--size-xl { font-size: apprem.rem(1.25); }

</style>
