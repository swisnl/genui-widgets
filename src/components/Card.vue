<script setup lang="ts">
    import Box from './Box.vue';
    import Button from './Button.vue';

    const props = defineProps({
        size: {
            type: String,
            default: 'md', // 'xs' to 'xl'
        },
        background: {
            type: String,
            default: 'var(--genui-surface)',
        },
        radius: {
            type: String,
            default: '3xl',
        },
        padding: {
            type: [String, Number],
            default: 4,
        },
        confirm: {
            type: Object,
            default: null,
            validator: (value) => value && 'label' in value && 'action' in value,
        },
        cancel: {
            type: Object,
            default: null,
            validator: (value) => value && 'label' in value && 'action' in value,
        },
    });
</script>

<template>
    <div class="genui-card-wrapper">
        <Box
            class="genui-card"
            :class="`genui-card--${size}`"
            :background="background"
            :radius="radius"
            :padding="padding"
            :border="true"
        >
            <slot />
        </Box>
        <div
            v-if="confirm || cancel"
            class="genui-card-wrapper__actions"
        >
            <Button
                v-if="confirm"
                :label="confirm.label"
                :on-click-action="confirm.action"
                variant="solid"
            />
            <Button
                v-if="cancel"
                :label="cancel.label"
                :on-click-action="cancel.action"
                variant="outline"
            />
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-card-wrapper {
    display: flex;
    flex-direction: column;
    gap: apprem.rem(1);
    align-items: flex-start;
}

.genui-card {
    width: 100%;
    box-shadow: 0 apprem.rem(.25) apprem.rem(.5) 0 #0000001A;
    overflow: hidden;
}

.genui-card > *:not(:first-child) {
    margin-block-start: apprem.rem(1);
}

.genui-card-wrapper__actions {
    display: flex;
}

.genui-card.genui-card--xs { width: apprem.rem(16); }
.genui-card.genui-card--sm { width: apprem.rem(22.5); }
.genui-card.genui-card--md { width: apprem.rem(26.25); }
.genui-card.genui-card--lg { width: apprem.rem(32); }
.genui-card.genui-card--xl { width: apprem.rem(40); }
</style>
