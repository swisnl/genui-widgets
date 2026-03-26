<script setup lang="ts">

    import Box from './Box.vue';
    import { useActionDispatcher } from '../composables/useActionDispatcher';
    import type { WidgetAction } from '../types/widget';

    const props = defineProps({
        onSubmitAction: {
            type: Object,
            default: null,
        },
    });

    const { dispatchAction } = useActionDispatcher();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        if (props.onSubmitAction) {
            await dispatchAction(props.onSubmitAction as WidgetAction);
        }
    };
</script>

<template>
    <Box as="form"
         class="genui-form"
         @submit="handleSubmit"
    >
        <slot />
    </Box>
</template>

<style lang="scss">
.genui-form {
    width: 100%;
}
</style>
