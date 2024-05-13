import type { Rule } from "./Rule";
import ValidationError from "./ValidationError";
import type { Category, UnisexCategory } from "@/goods/Good";
class NotBlank<T> implements Rule<T> {
    validationError;
    constructor(error: ValidationError = new ValidationError("Поле не должно быть пустым")) {
        this.validationError = error;
    }
    validate(value: T): true | ValidationError {
        console.log(value);
        if (value != false) return true;
        return this.validationError;
    }
}

class IntegerOnly implements Rule<string> {
    validationError;
    constructor(error: ValidationError = new ValidationError("Поле должно содержать только целочисленные значения")) {
        this.validationError = error;
    }
    validate(value: string): true | ValidationError {
        const isOnlyInteger = value.trim().search(/\D/);
        if (isOnlyInteger == -1) return true;
        else return this.validationError;
    }
}

class CategoryValidate implements Rule<UnisexCategory | Category> {
    validationError;
    constructor(error: ValidationError = new ValidationError("Выберите существующую категорию, или создайте новую")) {
        this.validationError = error;
    }
    validate(value: UnisexCategory | Category): true | ValidationError {
        console.log(value, typeof value);
        if (typeof value == "string") {
            if (value) {
                return true;
            }
        } else if (typeof value == "object") {
            if (!value["name"]) return new ValidationError("Нельзя оставлять имя категории пустым");
            if (value.gender == "UNISEX" && (!value.nameForMen || !value.nameForWomen)) {
                return new ValidationError(
                    "Если указана категория UNISEX, то нужно указать имена категории, которые будут отображаться для мужчин и для женщин"
                );
            }
        }
        return true;
    }
}

export { NotBlank, IntegerOnly, CategoryValidate };
