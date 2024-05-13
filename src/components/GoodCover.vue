<template>
    <div class="flex w-fit flex-col">
        <a :href="refToGood">
            <div class="flex h-[520px] w-[360px]">
                <img class="h-full w-full object-cover" :src="photo" alt="" />
            </div>
        </a>
        <div class="mt-5 flex flex-row justify-between">
            <div class="flex-col font-bold">
                <p>
                    {{ name }}
                </p>
                <p>{{ price }}₽</p>
            </div>
            <Flag class="h-fit w-[18px]" />
        </div>
    </div>
</template>

<script lang="ts">
import Flag from "./Flag.vue";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
    components: {
        Flag,
    },
    props: {
        name: Object as PropType<string>,
        price: Object as PropType<number | string>,
        photo: Object as PropType<string>,
        refToGood: Object as PropType<string>,
    },
});
</script>
