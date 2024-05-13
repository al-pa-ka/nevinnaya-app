import type { Rule } from "./Rule.ts";
import ValidationError from "./ValidationError";

class RuleSet<T> {
    rules: Rule<T>[] = [];
    errorCallback: (e: ValidationError) => void;
    constructor(errorCallback: (e: ValidationError) => void) {
        this.errorCallback = errorCallback;
    }
    addRule(rule: Rule<T>) {
        this.rules.push(rule);
    }
    validate(value: T) {
        for (const rule of this.rules) {
            const resultOfValidation = rule.validate(value);
            if (resultOfValidation !== true) {
                this.errorCallback(resultOfValidation);
                return false;
            }
        }
        return true;
    }
}

export default RuleSet;
