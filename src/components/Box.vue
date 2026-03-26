<script setup lang="ts">
    import { computed } from 'vue';
    import { useActionDispatcher } from '../composables/useActionDispatcher';
    import { cx } from '../styling/classes';
    import { semanticColorTokens, surfaceColorTokens } from '../styling/tokens';
    import { dimensionStyles, insetStyles, resolveRadius, resolveToken, toBaseSpace } from '../styling/styles';
    import type { WidgetAction } from '../types/widget';

    const props = defineProps({
        as: {
            type: String,
            default: 'div',
        },
        direction: {
            type: String, // 'row', 'col', 'row-reverse', 'col-reverse'
            default: null,
        },
        align: {
            type: String, // 'start', 'end', 'center', 'baseline', 'stretch'
            default: null,
        },
        justify: {
            type: String, // 'start', 'end', 'center', 'between', 'around', 'evenly'
            default: null,
        },
        wrap: {
            type: String, // 'wrap', 'nowrap', 'reverse'
            default: null,
        },
        gap: {
            type: [String, Number],
            default: null,
        },
        padding: {
            type: [String, Number, Object], // shorthand or specific (p-4) style
            default: null,
        },
        margin: {
            type: [String, Number],
            default: null,
        },
        background: {
            type: String,
            default: null,
        },
        border: {
            type: [String, Boolean, Object],
            default: null,
        },
        flex: {
            type: [String, Number], // '1', 'auto', 'none'
            default: null,
        },
        width: {
            type: [String, Number],
            default: null,
        },
        height: {
            type: [String, Number],
            default: null,
        },
        size: {
            type: [String, Number],
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
        onClickAction: {
            type: Object,
            default: null,
            validator: (value) => value && 'type' in value && 'payload' in value,
        },
    });

    const { dispatchAction } = useActionDispatcher();

    const directionMap: Record<string, string> = {
        row: 'row',
        col: 'column',
        'row-reverse': 'row-reverse',
        'col-reverse': 'column-reverse',
    };

    const justifyMap: Record<string, string> = {
        start: 'flex-start',
        end: 'flex-end',
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly',
    };

    const wrapMap: Record<string, string> = {
        wrap: 'wrap',
        nowrap: 'nowrap',
        reverse: 'wrap-reverse',
    };

    const styles = computed(() => {
        const styles: Record<string, string | number> = {
            ...dimensionStyles({
                width: props.width,
                height: props.height,
                size: props.size,
                aspectRatio: props.aspectRatio,
            }),
            ...insetStyles('padding', props.padding),
        };

        if (props.direction) {
            styles.flexDirection = directionMap[props.direction] ?? props.direction;
        }

        if (props.align) {
            styles.alignItems = props.align === 'start' ? 'flex-start' : (props.align === 'end' ? 'flex-end' : props.align);
        }

        if (props.justify) {
            styles.justifyContent = justifyMap[props.justify] ?? props.justify;
        }

        if (props.wrap) {
            styles.flexWrap = wrapMap[props.wrap] ?? props.wrap;
        }

        const gap = toBaseSpace(props.gap);
        if (gap) {
            styles.gap = gap;
        }

        const margin = toBaseSpace(props.margin);
        if (margin) {
            styles.margin = margin;
        }

        const background = resolveToken(props.background, surfaceColorTokens);
        if (background) {
            styles.background = background;
        }

        if (props.border && typeof props.border === 'object') {
            const size = props.border.size ?? 1;
            const style = props.border.style ?? 'solid';
            const color = props.border.color === 'default'
                ? 'var(--genui-border-default)'
                : resolveToken(props.border.color, semanticColorTokens)
                    ?? props.border.color
                    ?? 'var(--genui-border-default)';

            styles.border = `${typeof size === 'number' ? `${size}px` : size} ${style} ${color}`;
        } else if (props.border) {
            styles.border = props.border;
        }

        if (props.flex) {
            styles.flex = props.flex;
        }

        const borderRadius = resolveRadius(props.radius);
        if (borderRadius) {
            styles.borderRadius = borderRadius;
        }

        return styles;
    });

    const classes = computed(() => {
        return cx('genui-box', {
            'genui-box--flex': Boolean(props.direction || props.align || props.justify || props.gap),
            'genui-box--action': props.onClickAction,
            'genui-box--gap': props.gap,
            'genui-box--border': props.border === true,
            'genui-box--row': props.direction === 'row',
            'genui-box--col': props.direction === 'col',
        });
    });

    const handleClick = async () => {
        if (props.onClickAction) {
            await dispatchAction(props.onClickAction as WidgetAction);
        }
    };
</script>

<template>
    <component :is="as"
               :class="classes"
               :style="styles"
               :tabindex="onClickAction ? 0 : null"
               @click="handleClick"
    >
        <slot />
    </component>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-box {
    box-sizing: border-box;
    min-width: 0;
}

.genui-box--border {
    border: 1px solid var(--genui-border-default);
}

.genui-box--flex {
    display: flex;
}

.genui-box--action {
    cursor: pointer;
    outline: transparent solid apprem.rem(.5);
    border-radius: apprem.rem(.25);

    &:hover {
        transition: outline-width .2s;
        background-color: var(--genui-surface-tertiary);
        outline-color: var(--genui-surface-tertiary);
    }

    &:active {
        transition: outline-width .2s;
        outline-width: apprem.rem(.375);
    }

    &:focus-visible {
        outline-color: var(--genui-primary-60);
        outline-width: 1px;
        outline-offset: 2px;
    }
}

.genui-box--row.genui-box--gap .genui-badge,
.genui-box--row.genui-box--gap .genui-button {
    margin-inline-start: 0;
}

.genui-box--row *:first-child {
    margin-inline-start: 0;
}

.genui-image--flush + .genui-box {
    margin-top: apprem.rem(1);
}

</style>
