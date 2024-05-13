<template>
    <div class="flex h-full w-full flex-col items-center">
        <h5 class="text-[25px] font-bold text-green-600">Панель администратора</h5>
        <div class="flex w-full flex-col mt-[20px]">
            <div class="flex flex-col items-center gap-[15px]">
                <button class="button"><a href="/admin/add-new-good">+ Добавить товар</a></button>
                <button class="button">Редактировать</button>
                <button class="button red">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style>
.button {
    @apply h-[50px] w-[200px] rounded-lg bg-green-500 font-bold text-white;
    @apply hover:bg-green-400;
    @apply duration-500;
}
.red{
    @apply bg-red-500;
    @apply hover:bg-red-600;
}
</style>