import { ref } from "vue";

interface HasValue {
    getValue() : string;
}

const multiplyValueInputByEnter = () => {
    const values = ref([] as string[]);
    const onEnter = (e: Event, input: HasValue) => {
        e.preventDefault();
        const value = input.getValue();
        if (value && !values.value.includes(value)) {
            values.value.push(value);
        }
    };
    return { values, onEnter };
};
export default multiplyValueInputByEnter;
export type {HasValue}
