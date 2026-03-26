<script setup lang="ts">
    import { computed } from 'vue';
    import { blockVariant, cx } from '../styling/classes';
    import { textStyles } from '../styling/text';

    const props = defineProps({
        value: {
            type: String,
            default: '',
        },
        size: {
            type: String, // 'xs', 'sm', 'md', 'lg', 'xl'
            default: 'md',
        },
        weight: {
            type: String,
            default: 'normal',
        },
        width: {
            type: [String, Number],
            default: null,
        },
        color: {
            type: String,
            default: 'prose',
        },
        textAlign: {
            type: String,
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
            default: 'p',
        },
    });

    const classes = computed(() => {
        return cx(
            'genui-text',
            blockVariant('genui-text', 'size', props.size),
            blockVariant('genui-text', 'weight', props.weight),
            blockVariant('genui-text', 'align', props.textAlign),
            { 'genui-text--truncate': props.truncate },
        );
    });

    const styles = computed(() => textStyles({
        color: props.color,
        defaultColor: 'prose',
        maxLines: props.maxLines,
        width: props.width,
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

.genui-text {
    margin: 0;
    line-height: 1.5;
    color: var(--genui-text-primary);
}

.genui-text--truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Alignments */
.genui-text--align-start { text-align: start; }
.genui-text--align-center { text-align: center; }
.genui-text--align-end { text-align: end; }
.genui-text--align-justify { text-align: justify; }

/* Weights */
.genui-text--weight-normal { font-weight: 400; }
.genui-text--weight-medium { font-weight: 500; }
.genui-text--weight-semibold { font-weight: 600; }
.genui-text--weight-bold { font-weight: 700; }

/* Sizes */
.genui-text--size-xs { font-size: apprem.rem(.75); }
.genui-text--size-sm { font-size: apprem.rem(.875); }
.genui-text--size-md { font-size: apprem.rem(1); }
.genui-text--size-lg { font-size: apprem.rem(1.125); }
.genui-text--size-xl { font-size: apprem.rem(1.25); }

</style>
