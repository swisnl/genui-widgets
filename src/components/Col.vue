<script setup lang="ts">

    import Box from './Box.vue';

    const props = defineProps({
        gap: {
            type: [String, Number],
            default: 2,
        },
    });
</script>

<template>
    <Box direction="col"
         class="genui-col"
         :gap="gap"
    >
        <slot />
    </Box>
</template>
