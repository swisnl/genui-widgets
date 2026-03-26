<script setup lang="ts">
    import { computed } from 'vue';
    import { blockVariant, cx } from '../styling/classes';
    import { textStyles } from '../styling/text';

    const props = defineProps({
        value: {
            type: String, // Can also use default slot, but ChatKit docs specified 'value' prop
            default: '',
        },
        size: {
            type: String, // 'sm' to '5xl'
            default: 'md',
        },
        weight: {
            type: String, // 'normal', 'medium', 'semibold', 'bold'
            default: 'medium',
        },
        color: {
            type: String,
            default: 'prose', // standard text color
        },
        textAlign: {
            type: String, // 'left', 'center', 'right', 'justify', 'start', 'end'
            default: 'start',
        },
        truncate: {
            type: Boolean,
            default: false,
        },
        maxLines: {
            type: Number,
            default: null,
        },
        as: {
            type: String,
            default: 'h2', // Default heading element
        },
    });

    const classes = computed(() => {
        return cx(
            'genui-title',
            blockVariant('genui-title', 'size', props.size),
            blockVariant('genui-title', 'weight', props.weight),
            blockVariant('genui-title', 'align', props.textAlign),
            { 'genui-title--truncate': props.truncate },
        );
    });

    const styles = computed(() => textStyles({
        color: props.color,
        defaultColor: 'prose',
        maxLines: props.maxLines,
    }));
</script>

<template>
    <component :is="as"
               :class="classes"
               :style="styles"
    >
        <slot>{{ value }}</slot>
    </component>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-title {
    margin: 0;
    line-height: 1.25;
    color: var(--genui-text-primary);
}

.genui-title--truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Alignments */
.genui-title--align-start { text-align: start; }
.genui-title--align-center { text-align: center; }
.genui-title--align-end { text-align: end; }
.genui-title--align-justify { text-align: justify; }

/* Weights */
.genui-title--weight-normal { font-weight: 400; }
.genui-title--weight-medium { font-weight: 500; }
.genui-title--weight-semibold { font-weight: 600; }
.genui-title--weight-bold { font-weight: 700; }

/* Sizes */
.genui-title--size-sm { font-size: apprem.rem(1.125); }
.genui-title--size-md { font-size: apprem.rem(1.25); }
.genui-title--size-lg { font-size: apprem.rem(1.5); }
.genui-title--size-xl { font-size: apprem.rem(1.875); }
.genui-title--size-2xl { font-size: apprem.rem(2.25); }
.genui-title--size-3xl { font-size: apprem.rem(3); }
.genui-title--size-4xl { font-size: apprem.rem(4); }
.genui-title--size-5xl { font-size: apprem.rem(5); }

</style>
