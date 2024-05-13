<template>
    <div class="flex w-full flex-col">
        <span
            ref="input"
            class="w-full border-b-2 text-center outline-none"
            :contenteditable="editable"
            v-on:focus="opened = true"
            v-on:blur="opened = false"
            v-on:click="opened = (!editable && true) || opened"
            :class="{ 'h-[26px]': !editable }"
        ></span>

        <ul v-show="opened" ref="options" class="absolute left-0 top-0 z-30 flex h-max w-full flex-col overflow-visible border-b-2 bg-white">
            <li
                v-for="selectOption in selectOptions"
                :key="selectOption"
                class="w-full text-center hover:bg-gray-200"
                v-on:mousedown.prevent="onMouseDown"
            >
                {{ selectOption }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { type PropType, defineComponent } from "vue";

export default defineComponent({
    emits: ["select-input"],
    props: {
        editable: {
            default: true,
            type: Object as PropType<boolean>,
        },
        selectOptions: Object as PropType<string[]>,
    },
    data() {
        return {
            opened: false,
            clickedElem: null as null | HTMLElement,
        };
    },
    methods: {
        setupSelect() {
            const options = this.$refs.options as HTMLUListElement;
            const input = this.$refs.input as HTMLSpanElement;
            if (!options || !input) return;
            options.style.left = input.getBoundingClientRect().x + "px";
            options.style.width = input.clientWidth + "px";
            options.style.top = input.getBoundingClientRect().y + input.clientHeight + "px";
        },
        onMouseDown(event: MouseEvent) {
            this.clickedElem = event.target as HTMLElement;
        },
        onMouseUp(event: Event) {
            const spanInput = this.$refs.input as HTMLSpanElement;
            if (this.clickedElem == event.target && (this.$refs.options as HTMLUListElement).contains(event.target as HTMLElement)) {
                this.opened = false;
                spanInput.textContent = this.clickedElem?.textContent?.trim() || "";
                this.$refs.input = spanInput.blur();
                this.$emit("select-input", event);
            }
        },
        getValue() {
            const spanInput = this.$refs.input as HTMLSpanElement;
            return spanInput?.textContent?.trim() || "";
        },
        clear() {
            (this.$refs.input as HTMLSpanElement).textContent = "";
        },
    },

    mounted() {
        this.setupSelect();
        const polling = setInterval(() => {
            this.setupSelect();
        }, 100);
        window.addEventListener("resize", this.setupSelect);
        window.addEventListener("mouseup", (e) => {
            this.onMouseUp(e);
        });
    },
});
</script>

<style scoped>
span[contentEditable="true"]:empty::before {
    content: attr(placeholder);
    color: gray;
}
</style>
