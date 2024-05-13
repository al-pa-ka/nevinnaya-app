<template>
    <div>
        <div class="flex h-fit flex-row bg-black">
            <div class="hidden aspect-square h-full flex-1 md:block">
                <img class="h-full object-cover" src="../assets/images/showcase hero.png" alt="" />
            </div>
            <div
                class="flex aspect-square h-fit w-full max-w-full flex-1 items-center justify-center overflow-hidden"
            >
                <div class="flex h-full w-full flex-row items-end justify-center gap-6 p-5">
                    <div class="text-white">
                        <h5>
                            {{ name }}
                        </h5>
                        <p>{{ price }}₽</p>
                    </div>

                    <img
                        class="aspect-[1/2] h-full object-cover"
                        src="../assets/images/showcase hero 1.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
    props: {
        name: Object as PropType<string>,
        price: Object as PropType<number>,
    },
});
</script>

<style></style>
