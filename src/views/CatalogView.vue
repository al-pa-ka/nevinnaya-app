<template>
    <div class="h-screen">
        <TheHeader />
        <div class="mt-14 w-full">
            <div class="flex flex-col pl-5 pr-5 pt-[100px] uppercase xl:pl-[20px] xl:pr-[20px]">
                <PageTitle>
                    <template v-slot:category>{{ ($route.params.gender as string).replace(/&/, "/") }}</template>
                    <template v-slot:endpoint>{{ ($route.params.category as string).replace(/&/, "/") }}</template>
                </PageTitle>
                <div class="mt-[100px] flex flex-row gap-[5px]">
                    <Filter class="ml-[-19px]" :title="'цвет'" :values="['белый', 'слоновая кость', 'серо-бежевый', 'кирпич', 'черный']" />
                    <Filter :is-radio="true" :title="'цена'" :values="['по возрастанию', 'по убыванию']" />
                    <Filter :title="'размер'" :values="['XS', 'S', 'M', 'L', 'XL']" />
                </div>
                <ShowcaseHero class="mt-9" name="neo" />
                <div class="mt-7 flex flex-row flex-wrap gap-8">
                    <GoodCover
                        v-for="good in goods"
                        :ref-to-good="`./${good.pk}`"
                        :name="good.goodName"
                        :price="good.price"
                        :photo="good.photos[0]"
                    />
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<script lang="ts">
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import Filter from "@/components/Filter.vue";
import PageTitle from "@/components/PageTitle.vue";
import ShowcaseHero from "@/components/ShowcaseHero.vue";
import { defineComponent } from "vue";
import GoodCover from "@/components/GoodCover.vue";
import type { Good } from "@/goods/Good";
import { DOMAIN } from "@/constants";
import GetGoods from "@/api/GetGoods";

export default defineComponent({
    data() {
        return {
            goods: [] as Good[],
        };
    },
    components: {
        TheHeader,
        TheFooter,
        Filter,
        PageTitle,
        ShowcaseHero,
        GoodCover,
    },
    async mounted() {
        this.goods = await this.getGoods();
    },
    methods: {
        async getGoods() {
            return await new GetGoods().getGoods({
                category: (this.$route.params.category as string).replace("&", "/"),
            });
        },
    },
});
</script>

<style></style>
