<script setup lang="ts">
    import { computed } from 'vue';
    import { blockVariant, cx } from '../styling/classes';
    import { textStyles } from '../styling/text';

    const props = defineProps({
        value: {
            type: String,
            required: true,
        },
        size: {
            type: String, // 'sm', 'md', 'lg'
            default: 'md',
        },
        weight: {
            type: String, // 'normal', 'medium', 'semibold', 'bold'
            default: 'normal',
        },
        color: {
            type: [String, Object],
            default: 'secondary',
        },
        textAlign: {
            type: String, // 'start', 'center', 'end'
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
    });

    const classes = computed(() => {
        return cx(
            'genui-caption',
            blockVariant('genui-caption', 'size', props.size),
            blockVariant('genui-caption', 'weight', props.weight),
            blockVariant('genui-caption', 'align', props.textAlign),
            { 'genui-caption--truncate': props.truncate },
        );
    });

    const styles = computed(() => textStyles({
        color: typeof props.color === 'string' ? props.color : null,
        defaultColor: 'secondary',
        maxLines: props.maxLines,
    }));
</script>

<template>
    <div :class="classes"
         :style="styles"
    >
        {{ value }}
    </div>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-caption {
    margin: 0;
    line-height: 1.5;
    color: var(--genui-text-secondary);
}

.genui-caption--truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Alignments */
.genui-caption--align-start { text-align: start; }
.genui-caption--align-center { text-align: center; }
.genui-caption--align-end { text-align: end; }

/* Weights */
.genui-caption--weight-normal { font-weight: 400; }
.genui-caption--weight-medium { font-weight: 500; }
.genui-caption--weight-semibold { font-weight: 600; }
.genui-caption--weight-bold { font-weight: 700; }

/* Sizes */
.genui-caption--size-sm { font-size: apprem.rem(.625); }
.genui-caption--size-md { font-size: apprem.rem(.75); }
.genui-caption--size-lg { font-size: apprem.rem(.875); }

</style>
