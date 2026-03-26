<script setup lang="ts">

    import { computed } from 'vue';

    const props = defineProps({
        minSize: {
            type: [String, Number],
            default: 'auto',
        },
    });

    const style = computed(() => {
        // If it's a number, assume pixels. If it's a string, use as is.
        // The spacer is usually flex-grow: 1, but might have a min-width/height.
        const s = {
            flexGrow: 1,
        };

        if (props.minSize && props.minSize !== 'auto') {
            const size = typeof props.minSize === 'number' ? `${props.minSize}px` : props.minSize;
            s.minWidth = size;
            s.minHeight = size;
        }

        return s;
    });
</script>

<template>
    <div class="genui-spacer"
         :style="style"
    />
</template>

<style lang="scss">
.genui-spacer {
    display: block;
    // By default, it takes up available space in a flex container
    align-self: stretch;
    justify-self: stretch;
}
</style>
