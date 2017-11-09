import { Detail } from "../Detail/Detail";
import { Tag } from "../Tag/Tag";
import { Action } from "../Action/Action";

export class Observation {

    private details: Array<Detail>;
    private actions: Array<Action>;
    private tags: Array<Tag>;

    constructor(details: Array<Detail>, actions: Array<Action>, tags?: Array<Tag>) {
        this.tags = tags || [];
        this.details = details;
        this.actions = actions
    }

    public getDetails(): Array<Detail> {
        return this.details;
    }

    public getActions(): Array<Action> {
        return this.actions;
    }

    public getTags(): Array<Tag> {
        return this.tags;
    }
}
