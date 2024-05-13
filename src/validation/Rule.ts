import ValidationError from "./ValidationError";

interface Rule<T> {
    validate(value: T): true | ValidationError;
}

export type { Rule};