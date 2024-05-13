<template>
    <div class="relative w-fit">
        <input v-model="value" class="w-full" type="text" />
        <div class="flex flex-col w-full">
            <span class="w-full" v-for="option in options">
                {{ option }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
export default defineComponent({
    props: {
        options: Object as PropType<string[]>,
    },
    data() {
        return {
            value: ''
        }
    }
});
</script>
<style></style>
