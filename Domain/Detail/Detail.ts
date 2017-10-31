export class Detail {

    private value: any;
    private tags: Array<string>;
    private strength: number;
    constructor(value: any, tags: Array<string>, strength: number) {
        this.value = value;
        this.tags = tags;
        this.strength = strength;
    }

    public getValue(): any {
        return this.value;
    }

    public getTags(): Array<string> {
        return this.tags;
    }

    public getStrength() {
        return this.strength;
    }
}
