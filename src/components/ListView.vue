<script setup lang="ts">
    import Box from './Box.vue';
</script>

<template>
    <Box direction="column"
         class="genui-list"
         :gap="4"
    >
        <slot />
    </Box>
</template>

<style lang="scss">
.genui-list {
    width: 100%;
}
</style>
