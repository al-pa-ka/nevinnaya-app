<template>
    <div class="main-container">
        <TheHeader :count-of-goods-in-cart="0" />
        <section class="hero__container">
            <div class="hero__video-container">
                <video
                    src="https://video-previews.elements.envatousercontent.com/files/a595e750-8b37-4324-90c5-d7497017288f/video_preview_h264.mp4"
                    autoplay="true"
                    loop="true"
                ></video>
            </div>
            <div class="hero__title">
                <div class="hero__title-header-text-wrapper">
                    <h5 class="hero__title-text">Nevinиaya</h5>
                    <span class="hero__title-caption">store</span>
                </div>
                <span class="hero__about-us-caption"> о нас</span>
            </div>
        </section>
        <section class="feel-free">
            <div class="feel-free__section-text-container">
                <h5 class="feel-free__title">Чувствуй минимализм и свободу в повседневном стиле</h5>
                <div class="feel-free__text-container">
                    <p>
                        Nevinnaya — локальный бренд одежды оверсайз, основанный на стремлении к
                        эстетике, удобству и минимализму. Мы – бренд одежды. Но про одежду мы только
                        наполовину.
                    </p>
                    <p>
                        В нашем сердце уважение к людям, любовь к эстетике и желание дарить комфорт.
                        Наша страсть — создавать настолько актуальную и стильную одежду, чтобы тебе
                        не хотелось её снимать.
                    </p>
                </div>
            </div>
            <div class="feel-free__images">
                <div class="feel-free__image-layout">
                    <img src="../assets/images/sewing-machine.png" alt="" />
                </div>
                <div class="feel-free__image-layout">
                    <img src="../assets/images/fabric.png" alt="" />
                </div>
            </div>
        </section>
        <section class="questions">
            <div class="question">
                <div class="question__box question__box_border-left question__box_black">
                    <h5 class="question__box-title question__box-title_white">Почему?</h5>
                </div>
                <p class="question__answer">
                    Наша миссия — дать качественную комфортную одежду, которая привлекает внимание
                    не к себе, а к её обладателю. Помочь тебе проявляться без брендированных
                    костылей и быть своим в любой ситуации — не отвлекаться на чужое мнение
                </p>
            </div>
            <div class="question">
                <div
                    class="question__box question__box_border-left question__box_border-bottom question__box_black"
                >
                    <h5 class="question__box-title question__box-title_white">Как?</h5>
                </div>
                <p class="question__answer">
                    Универсальный, но продуманный фасон. Поиск вдохновения за пределами страны
                    и на стыке моды с другими сферами. Собственное стремление к комфорту в жизни
                    и простоте в общении. И немного лени, благодаря которой мы стремимся с первого
                    раза делать все качественно — не любим переделывать.
                </p>
            </div>
            <div class="question">
                <div class="question__box question__box_border-right question__box_black">
                    <h5 class="question__box-title question__box-title_white">Что?</h5>
                </div>
                <p class="question__answer">
                    Одежда, с комфортом подчёркивающую ваш характер. Бренд, который призывает тебя
                    создавать свой мир. Ориентироваться на ощущения и внутренние переживания,
                    без использования устоявшихся шаблонов. Мы показываем, что твоя сила
                    в открытости и смелости транслировать то, что рождается внутри тебя
                </p>
            </div>
        </section>
        <TheFooter />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";

export default defineComponent({
    components: {
        TheFooter,
        TheHeader,
    },
});
</script>

<style scoped>
video {
    min-width: 100%;
    min-height: 100%;
}

.hero__container {
    box-sizing: border-box;
    padding-top: 156px;
    width: 100%;
    height: 100dvh;
    position: relative;
}

.hero__video-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.hero__title {
    bottom: 0;
    margin-bottom: 87px;
    position: absolute;
    font-family: Arkhip;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 95px;
    padding-right: 95px;
    box-sizing: border-box;
}

.hero__title-header-text-wrapper {
    font-family: inherit;
    color: inherit;
}

.hero__title-text {
    margin: 0;
    font-family: inherit;
    font-size: 58px;
    color: inherit;
}

.hero__title-caption {
    font-size: 28px;
    color: inherit;
}

.hero__about-us-caption {
    font-family: inherit;
    font-size: 42px;
}

.feel-free {
    display: flex;
    flex-direction: column;
    font-family: Roboto;
}

.feel-free__title {
    margin: 0;
    margin-top: 88px;
    font-size: 36px;
}

.feel-free__section-text-container {
    padding: 0 160px 0 160px;
}

.feel-free__text-container {
    display: flex;
    font-family: Roboto-Light;
    flex-direction: row;
    justify-content: space-between;
    font-size: 24px;
    margin-top: 45px;
    margin-bottom: 88px;
}

.feel-free__text-container > p {
    max-width: 580px;
}

.feel-free__images {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow: hidden;
}

.feel-free__image-layout:nth-child(2) {
    flex: 1;
}

.feel-free__image-layout:nth-child(1) {
    flex: 2;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.questions {
    display: flex;
    flex-direction: column;
    font-family: Roboto-Light;
    padding-left: 160px;
    padding-right: 160px;
    padding-top: 100px;
    padding-bottom: 150px;
    font-size: 24px;
}
.question {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 300px;
}
.question__box {
    background-color: transparent;
    height: 100%;
    width: 630px;
    margin-right: 60px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.question__box_border-left {
    border-left: 1px solid black;
}
.question__box_border-top {
    border-top: 1px solid black;
}
.question__box_border-right {
    border-right: 1px solid black;
}
.question__box_border-bottom {
    border-bottom: 1px solid black;
}
.question__box-title {
    font-family: Roboto;
    font-size: 48px;
    text-transform: uppercase;
}
.question__answer {
    flex-shrink: 1;
    flex: 1;
    flex-basis: 100px;
}
</style>
