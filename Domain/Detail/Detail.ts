import { Tag } from "../Tag/Tag";

export class Detail {

    private value: any;
    private tags: Array<Tag>;
    private strength: number;
    constructor(value: any, tags: Array<Tag>) {
        this.value = value;
        this.tags = tags;
    }

    public getValue(): any {
        return this.value;
    }

    public getTags(): Array<Tag> {
        return this.tags;
    }

    public getStrength(): number {
        return this.strength;
    }
}
