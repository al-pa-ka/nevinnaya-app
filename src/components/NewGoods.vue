<template>
    <div class="flex flex-col overflow-visible">
        <h5 class="new-goods__carousel-title">новинки</h5>
        <div class="new-goods__carousel-content overflow-visible">
            <div v-for="(good, id) in goods" :key="id" class="new-goods__good-card">
                <div class="new-goods__image-base">
                    <img :src="good.cover" alt="" />
                </div>
                <span class="new-goods__good-name">{{ good.name }}</span>
                <span class="new-goods__good-price">{{ good.price }} Р</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { GoodCover } from "@/goods/GoodCover";
export default defineComponent({
    data() {
        return {
            goods: [
                {
                    cover: "",
                    name: "ШОРТЫ KORRY",
                    price: 2490,
                },
                {
                    cover: "",
                    name: "ШОРТЫ KORRY",
                    price: 2490,
                },
                {
                    cover: "",
                    name: "ШОРТЫ KORRY",
                    price: 2490,
                },
                {
                    cover: "",
                    name: "ШОРТЫ KORRY",
                    price: 2490,
                },
            ] as GoodCover[],
        };
    },
});
</script>

<style scoped>
.new-goods__carousel {
    padding-bottom: 105px;
}

.new-goods__carousel {
    margin-left: 160px;
    margin-right: 160px;
}

.new-goods__carousel-content {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 105px;
    padding-bottom: 35px;
}

.new-goods__carousel-content::-webkit-scrollbar {
    width: 15px;
    height: 15px;
}

.new-goods__carousel-content::-webkit-scrollbar:horizontal {
    height: 8px;
}

.new-goods__carousel-content::-webkit-scrollbar-track:horizontal {
    background: #707070;
    border: 3px solid transparent;
    background-clip: content-box;
}

.new-goods__carousel-content::-webkit-scrollbar-thumb:horizontal {
    background: #707070;
    border: 1px solid #707070;
    border-radius: 20px;
}

.new-goods__carousel-title {
    font-family: Arkhip;
    font-size: 50px;
}

.new-goods__good-card {
    display: flex;
    flex-direction: column;
}

.new-goods__image-base {
    width: 238px;
    height: 332px;
    background-color: lightgray;
}

.new-goods__good-name,
.new-goods__good-price {
    font-family: Roboto;
    text-transform: uppercase;
    font-size: 20px;
}
</style>
