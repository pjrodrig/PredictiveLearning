export class Detail {
    constructor(value, tags, strength) {
        this.value = value;
        this.tags = tags;
        this.strength = strength;
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
