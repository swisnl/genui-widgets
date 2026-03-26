<script setup lang="ts">

    import Box from './Box.vue';
</script>

<template>
    <Box direction="row"
         class="genui-list-item"
    >
        <slot />
    </Box>
</template>

<style lang="scss">
.genui-list-item {
    width: 100%;
}
</style>
