<script setup lang="ts">
    import { computed } from 'vue';
    import { cx } from '../styling/classes';
    import { dimensionStyles, resolveRadius } from '../styling/styles';

    const props = defineProps({
        src: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default: '',
        },
        frame: {
            type: Boolean,
            default: false,
        },
        fit: {
            type: String, // 'none', 'cover', 'contain', 'fill', 'scale-down'
            default: 'cover',
        },
        position: {
            type: String, // 'center', 'top', 'bottom', 'left', 'right' etc.
            default: 'center',
        },
        flush: {
            type: Boolean,
            default: false,
        },
        height: {
            type: [String, Number],
            default: null,
        },
        width: {
            type: [String, Number],
            default: null,
        },
        size: {
            type: [String, Number], // Sets both width and height
            default: null,
        },
        aspectRatio: {
            type: [String, Number],
            default: null,
        },
        radius: {
            type: String,
            default: null, // "sm", "md", "lg", "2xs", "xs", "xl", "2xl", "3xl", "4xl", "full", "100%", "none"
        },
    });

    const classes = computed(() => {
        return cx('genui-image', {
            'genui-image--frame': props.frame,
            'genui-image--flush': props.flush,
        });
    });

    const styles = computed(() => {
        const styles = {
            objectFit: props.fit,
            objectPosition: props.position,
            ...dimensionStyles({
                width: props.width,
                height: props.height,
                size: props.size,
                aspectRatio: props.aspectRatio,
            }),
        };

        const borderRadius = resolveRadius(props.radius);
        if (borderRadius) {
            styles.borderRadius = borderRadius;
        }

        return styles;
    });
</script>

<template>
    <img :src="src"
         :alt="alt"
         :class="classes"
         :style="styles"
    >
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-image {
    display: block;
    max-width: 100%;
    border-radius: apprem.rem(0.375); // Default radius

    &--frame {
        border: 1px solid #E4E4E7; // Zinc-200
        padding: apprem.rem(0.25);
        background-color: #fff;
    }

    &--flush {
        border-radius: 0;
        margin: 0 -1.5rem; // Negative margin to flush with container if container has 1.5rem padding
        max-width: calc(100% + 3rem);
        width: calc(100% + 3rem);

        &:first-child {
            margin-top: -1.5rem;
        }

        &:last-child {
            margin-bottom: -1.5rem;
        }
    }
}
</style>
