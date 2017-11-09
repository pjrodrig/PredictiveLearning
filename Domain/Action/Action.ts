import { Util } from "../../Util/Util";
import { Tag } from "../Tag/Tag";

export class Action {
    private tags: Array<Tag>;
    constructor(tags: Array<Tag>) {
        this.tags = tags;
    }

    public getTags(): Array<Tag> {
        return this.tags;
    }

    public isEqual(action: Action) {
        let actionTags = action.getTags();
        let equal = true;
        for(let i = 0; equal && i < this.tags.length; i++) {
            equal = Util.indexOf(actionTags, this.tags[i]) > -1;
        }
        return equal;
    }
}
