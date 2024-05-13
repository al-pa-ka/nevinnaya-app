<template>
    <div class="main-container">
        <section class="hero-container">
            <TheHeader :count-of-goods-in-cart="0" />
            <div class="hero__header-container">
                <h1 class="hero__header">
                    <span class="hero__header-text hero__header-text">
                        <span class="hero__header-text-bold">new</span>
                        <br />collection
                    </span>
                    <span class="hero__header-arrow"><img src="../assets/images/arrow.svg" alt="" srcset="" /></span>
                    <span class="hero__header-text hero__header-text_light"> WW' 21 </span>
                </h1>
            </div>
        </section>
        <section class="campaign-altay lg:p-24 lg:pb-10 lg:pt-10">
            <div class="p-4 sm:p-6">
                <div class="flex flex-row justify-between">
                    <h2 class="flex flex-col font-[Arkhip] text-[25px] text-white">
                        <span>CAMPAIGN</span>
                        <span class="flex flex-row items-center gap-2 text-[25px]"
                            >ALTAY
                            <div class="long-delimetr"></div>
                            <span class="">2021</span></span
                        >
                        <span class="campaign-altay__header-lookbook">Смотреть/Lookbook</span>
                    </h2>
                    <img ref="control" :onclick="playVideo" class="campaign-altay__play-button" src="../assets/images/play.svg" alt="" />
                </div>
            </div>
            <div class="relative mt-[20px] box-border flex h-fit flex-col p-5 sm:mt-[100px]">
                <div class="absolute top-[-20px] z-0 box-border w-[calc(100%-40px)] sm:top-[-100px] sm:w-[calc(100%-40px)]">
                    <video
                        ref="video1"
                        class="campaign-altay__video"
                        src="https://video-previews.elements.envatousercontent.com/files/dc7757a6-d907-4ffa-8fe9-998e6d18da83/video_preview_h264.mp4"
                    ></video>
                    <div class="campaign-altay__video-dimmer"></div>
                </div>
                <div class="z-10 w-full">
                    <video
                        ref="video2"
                        class="campaign-altay__video"
                        src="https://video-previews.elements.envatousercontent.com/files/dc7757a6-d907-4ffa-8fe9-998e6d18da83/video_preview_h264.mp4"
                    ></video>
                </div>
            </div>
        </section>
        <section class="new-goods overflow-visible p-4 md:p-4">
            <NewGoods />
            <div class="mt-12 flex flex-col justify-between gap-4 md:flex-row">
                <div class="new-goods__photo-base flex-1">
                    <img class="new-goods__photo cursor-pointer" src="../assets/images/women.png" alt="" />
                    <div class="new-goods__animation-black cursor-pointer"></div>
                    <p class="new-goods__photo-caption">Женщины</p>
                </div>
                <div class="new-goods__photo-base flex-1">
                    <img class="new-goods__photo" src="../assets/images/man.png" alt="" />
                    <p class="new-goods__photo-caption">Мужчины</p>
                </div>
            </div>
        </section>
        <section class="flex flex-col bg-black p-5 lg:p-10">
            <h5 class="for-buisness__title">Для бизнеса</h5>
            <div class="flex w-full flex-col gap-10">
                <div class="box-border flex w-full flex-col items-end gap-5 overflow-hidden lg:flex-row">
                    <div class="w-full flex-1 text-white">
                        <h5 class="w-full text-[35px] font-bold lg:text-[40px]">Оптовикам</h5>
                        <p class="w-full text-[30px] lg:text-[25px]">Оптовые предложения для ваших шоурумов/магазинов/маркетплейсов.</p>
                    </div>
                    <div class="flex-shrink-1 w-full flex-[1.5]"><img class="w-full object-cover" src="../assets/images/wholesale.png" alt="" /></div>
                </div>

                <div class="box-border flex w-full flex-col items-end gap-5 overflow-hidden lg:flex-row-reverse">
                    <div class="w-full flex-1 text-white">
                        <h5 class="w-full text-[35px] font-bold lg:text-[40px]">Под заказ</h5>
                        <p class="w-full text-[30px] lg:text-[25px]">Пошив униформы/мерча/индивидуальных вещей для вас и вашего бизнеса.</p>
                    </div>
                    <div class="flex-shrink-1 w-full flex-[1.5]"><img class="w-full object-cover" src="../assets/images/uniform.png" alt="" /></div>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-14 p-5 pl-0 pr-0">
            <div class="ml-2 flex flex-col items-end gap-5 sm:ml-20 lg:flex-row">
                <div class="w-full flex-1">
                    <h5 class="about-us__title-header title">О нас</h5>
                    <div class="about-us__delimetr"></div>
                    <p class="about-us__title-text text">Про концепт бренда и заботе о вашем уюте</p>
                </div>
                <div class="flex-[1.5]"><img class="object-cover" src="../assets/images/about-us.png" alt="" /></div>
            </div>

            <div class="ml-5 mr-10 flex flex-col items-end gap-10">
                <div class="flex flex-col items-end">
                    <h5 class="title text-end">Следи за нами</h5>
                    <p class="text">Находи нас @nevinnaya_store</p>
                </div>
                <div class="flex flex-row flex-wrap gap-5">
                    <div class="min-w-48 max-w-72 flex-1"><img src="../assets/images/follow-us-1.png" alt="" class="w-full object-cover" /></div>
                    <div class="min-w-48 max-w-72 flex-1"><img src="../assets/images/follow-us-2.png" alt="" class="w-full object-cover" /></div>
                    <div class="min-w-48 max-w-72 flex-1"><img src="../assets/images/follow-us-3.png" alt="" class="w-full object-cover" /></div>
                    <div class="min-w-48 max-w-72 flex-1"><img src="../assets/images/follow-us-1.png" alt="" class="w-full object-cover" /></div>
                </div>
            </div>
        </section>
        <TheFooter />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import NewGoods from "@/components/NewGoods.vue";
import pause from "@/assets/images/pause.svg";
import play from "@/assets/images/play.svg";
export default defineComponent({
    components: {
        TheHeader,
        TheFooter,
        NewGoods,
    },
    data() {
        return {};
    },
    methods: {
        playVideo() {
            ([this.$refs.video1, this.$refs.video2] as HTMLVideoElement[]).forEach((video) => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
            if ((this.$refs.video1 as HTMLVideoElement).paused) {
                (this.$refs.control as HTMLImageElement).src = pause;
            } else {
                (this.$refs.control as HTMLImageElement).src = play;
            }
        },
    },
});
</script>

<style scoped>
.hero__header {
    margin-top: 80px;
    margin-right: 250px;
    margin-bottom: 220px;
    display: flex;
    flex-direction: column;
}

img {
    width: 100%;
}

.hero__header-container {
    display: flex;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
}

.hero__header-arrow {
    max-width: 288px;
}

.hero__header-text {
    width: fit-content;
    font-size: 46px;
    font-family: Helvetica;
    text-transform: uppercase;
    font-weight: 300;
}

.hero__header-text-bold {
    font-weight: 800;
}

.main-container {
    width: 100%;
}

.hero-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100dvh;
    background-image: url("../assets/images/main-page-bg.png");
    background-size: cover;
    background-position: center;
}

.long-delimetr {
    width: 108px;
    height: 2px;
    background-color: white;
}

.campaign-altay {
    background-color: #242424;
}

.campaign-altay__wrapper {
    padding-top: 105px;
    padding-left: 160px;
    padding-right: 260px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.campaign-altay__header {
    display: flex;
    width: 100%;
    overflow: hidden;
    justify-content: space-between;
}

.campaign-altay__play-button {
    width: 108px;
}

.campaign-altay__header-text {
    gap: 20px;
    font-size: 42px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    font-family: Arkhip;
}

.campaign-altay__header-text.thin {
    font-weight: 100;
}

.campaign-altay__header-content {
    display: flex;
    flex-direction: column;
}

.campaign-altay__header-lookbook {
    font-family: Venti-Medium;
    color: white;
    font-size: 26px;
    text-decoration: underline;
    font-weight: 300;
}

.campaign-altay__videos-wrapper {
    padding-bottom: 100px;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.campaign-altay__video-dimmer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
}

.campaign-altay__video-back {
    position: relative;
    /* width: 100%; */
    margin: 0px 160px 0px 160px;
}

.campaign-altay__video-back.campaign-altay__video-main {
    padding-top: 104px;
    position: absolute;
}

.campaign-altay__video {
    width: 100%;
    height: 100%;
}

.new-goods__photos-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 160px 100px 160px;
}

.new-goods__animation-black {
    background-color: black;
    width: 43%;
    height: 100%;
    position: absolute;
    top: 0;
    transition: 0.5s;
}

.new-goods__animation-black:hover,
.new-goods__photo-caption:hover ~ .new-goods__animation-black,
.new-goods__photo:hover ~ .new-goods__animation-black {
    width: 100%;
    transition: 1s ease-in-out;
}

.new-goods__photo-base {
    position: relative;
    display: flex;
    align-items: center;
}

.new-goods__photo {
    height: 100%;
}

.new-goods__photo-caption {
    width: 100%;
    text-align: center;
    font-family: Arkhip;
    text-transform: uppercase;
    position: absolute;
    color: white;
    font-size: 50px;
}

.for-buisness {
    background-color: black;
    padding-right: 160px;
    padding-left: 160px;
}

.for-buisness__title {
    padding-top: 70px;
    padding-bottom: 60px;
    margin: 0;
    font-family: Arkhip;
    font-size: 52px;
    color: white;
}

.for-buisness__info-container {
    width: 100%;
    overflow: hidden;
    padding-bottom: 100px;
    gap: 100px;
    display: flex;
    flex-direction: row;
    align-items: end;
}

.for-buisness__info-container.reverse {
    flex-direction: row-reverse;
}

.for-buisness__info-wrapper {
    display: flex;
    flex-direction: column;
}

.for-buisness__info-title,
.for-buisness__info-text {
    color: white;
    margin: 0;
}

.for-buisness__info-title {
    font-family: Roboto;
    font-size: 46px;
}

.for-buisness__info-text {
    font-family: Roboto-Light;
    font-size: 26px;
}

.text {
    font-family: Roboto-Light;
    font-size: 26px;
    margin: 0;
}

.title {
    font-family: Arkhip;
    font-size: 52px;
    margin: 0;
}

.about-us {
    padding-top: 100px;
}

.about-us__container {
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    padding-left: 160px;
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
}

.about-us__title-wrapper {
    width: 340px;
    display: flex;
    flex-direction: column;
}

.about-us__image {
    width: 900px;
}

.about-us__delimetr {
    background-color: black;
    height: 1px;
    width: 116px;
}

.follow-us__container {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    padding-right: 150px;
}

.follow-us__text-title-wrapper {
    display: flex;
    flex-direction: column;
    align-items: end;
}

.follow-us__carousel-image {
    width: 275px;
    height: 275px;
}

.follow-us__carousel-container {
    margin-top: 65px;
    margin-bottom: 100px;
    display: flex;
    overflow: hidden;
    width: 100%;
    justify-content: space-between;
}
</style>
