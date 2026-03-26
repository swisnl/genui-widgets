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
    <Box direction="row"
         class="genui-row"
         :gap="gap"
    >
        <slot />
    </Box>
</template>

<style lang="scss">
.genui-row {
    align-items: center;
}
</style>
