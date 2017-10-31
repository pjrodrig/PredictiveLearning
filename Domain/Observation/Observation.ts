import { Detail } from "../Detail/Detail";

export class Observation {

    private details: Array<Detail>;
    private exits: Array<Array<Tag>>;
    private tags: Array<string>;

    constructor(details: Array<Detail>, exits: Array<Array<Tag>>, tags?: Array<string>) {
        this.tags = tags || [];
        this.details = details;
    }

    public getDetails() {
        return this.details;
    }

    public getExits() {
        return this.exits;
    }

    public getTags() {
        return this.tags;
    }
}
