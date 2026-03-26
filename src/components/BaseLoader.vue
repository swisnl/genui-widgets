<template>
    <span class="genui-loader" />
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-loader {
    margin: apprem.rem(.125);
    width: apprem.rem(1);
    height: apprem.rem(1);
    border: apprem.rem(.125) solid color-mix(in srgb, currentColor 50%, transparent);
    border-bottom-color: currentColor;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: genui-rotation 1s linear infinite;
}

@keyframes genui-rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
