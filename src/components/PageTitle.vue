<template>
    <div class="flex w-fit flex-col gap-[18px]">
        <h5 class="m-0 text-[36px] uppercase leading-[0.9] text-gray-400">
            <slot name="category"></slot>/
        </h5>
        <h5 class="m-0 text-[52px] uppercase leading-[0.9]">
            <slot name="endpoint"></slot>
        </h5>
        <div class="m-0 h-[2px] bg-gray-400"></div>
    </div>
</template>
