"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Detail {
    constructor(value, tags) {
        this.value = value;
        this.tags = tags;
    }
    getValue() {
        return this.value;
    }
    getTags() {
        return this.tags;
    }
    getStrength() {
        return this.strength;
    }
}
exports.Detail = Detail;
