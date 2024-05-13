<template>
    <div class="main-container">
        <TheHeader :count-of-goods-in-cart="0" />
        <section class="hero-section">
            <div class="hero__container">
                <div class="hero__dimmer">
                    <h5 class="hero__dimmer-title">шоурумам</h5>
                </div>
                <div class="hero__image-layout">
                    <img src="../assets/images/wholesale-2.png" alt="" srcset="" />
                </div>
            </div>
        </section>
        <section class="info-and-advantages-section">
            <p class="info__text">
                Мы выполняем заказы на производство одежды до 500 единиц в месяц. Но, как и в случае
                с ритейлом, мы хотим не просто продать товар, а найти своего покупателя, партнёра
                и единомышленника. Мы хотим расти вместе с вами и делиться своим видением
            </p>
            <div class="advantages">
                <h4 class="advantages__title">Преимущества</h4>
                <div class="advantages__item first">
                    <h5 class="advantages__item-title">Текущий ассортимент</h5>
                    <p class="advantages__item-text">
                        Мы создаем базовую оверсайз одежду. Наши коллекции – более 40 позиций –
                        позволят вам дополнить и разнообразить ассортимент вашего магазина.
                    </p>
                </div>
                <div class="advantages__item">
                    <h5 class="advantages__item-title">Качество продукции</h5>
                    <p class="advantages__item-text">
                        Это наша страсть, кредо и принцип, которому мы никогда не изменим — делать
                        работу качественно, несмотря ни на что. Поэтому мы являемся одним из самых
                        популярных брендов в регионе.
                    </p>
                </div>
                <div class="advantages__item">
                    <h5 class="advantages__item-title">Локальное производство</h5>
                    <p class="advantages__item-text">
                        Мы строго и ответственно соблюдаем сроки выполнения заказов и контролируем
                        производственные процессы.
                    </p>
                </div>
                <div class="advantages__item">
                    <h5 class="advantages__item-title">Гибкая ценовая политика</h5>
                    <p class="advantages__item-text">
                        Сырьё для нашей продукции мы закупаем напрямую у поставщиков, это позволяет
                        нам устанавливать и сохранять доступные цены.
                    </p>
                </div>
            </div>
            <div class="contact-us">
                <p class="contact-us__text">
                    Для оформления заказа и обсуждения деталей свяжитесь с нашим менеджером
                </p>
                <div class="contact-us__links">
                    <a class="contact-us__link">What’s App</a>
                    <a class="contact-us__link">Telegram</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default defineComponent({
    components: {
        TheFooter,
        TheHeader,
    },
});
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

.hero-section {
    padding-top: 155px;
    height: 100dvh;
    /* overflow: hidden; */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.hero__container {
    height: 100%;
    overflow: hidden;
}

.hero__dimmer {
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Roboto;
    color: white;
    flex: 1;
    height: 100%;
}

.hero__dimmer-title {
    font-size: 64px;
    text-transform: capitalize;
}

.hero__image-layout {
    flex: 2;
}

.hero__container {
    display: flex;
    flex-direction: row;
}

.info__text {
    margin-top: 120px;
    font-size: 28px;
    font-family: Roboto-Light;
    margin-left: 160px;
    margin-right: 160px;
}

.advantages {
    display: flex;
    flex-direction: column;
    padding: 0 160px 0 160px;
    font-family: Roboto;
}

.first {
    padding-top: 40px;
}

.first::before {
    position: absolute;
    height: 2px;
    width: 100%;
    top: 0;
    content: "";
    background-color: #eaeaea;
}

.advantages__title {
    font-size: 48px;
}

.advantages__item {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    align-items: start;
    flex: 1;
    padding-bottom: 40px;
    position: relative;
}

.advantages__item::after {
    bottom: 0;
    content: "";
    width: 100%;
    position: absolute;
    height: 2px;
    background-color: #eaeaea;
}

.advantages__item-text {
    font-family: Roboto-Light;
    font-size: 28px;
    margin: 0;
    flex: 1;
    color: #4d4d4d;
}

.advantages__item-title {
    margin: 0;
    font-family: Roboto;
    font-weight: 300;
    font-size: 36px;
    flex: 1;
}

.contact-us {
    display: flex;
    flex-direction: column;
    margin-left: 160px;
    margin-right: 160px;
    margin-bottom: 100px;
}

.contact-us__text {
    font-size: 28px;
    font-family: Roboto;
}

.contact-us__links {
    display: flex;
    gap: 70px;
}

.contact-us__link {
    box-sizing: border-box;
    font-family: Roboto;
    padding: 16px 44px 16px 44px;
    font-size: 20px;
    width: fit-content;
    height: 55px;
    background-color: #222322;
    color: white;
}
</style>
