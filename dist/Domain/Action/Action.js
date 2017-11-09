"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../../Util/Util");
class Action {
    constructor(tags) {
        this.tags = tags;
    }
    getTags() {
        return this.tags;
    }
    isEqual(action) {
        let actionTags = action.getTags();
        let equal = true;
        for (let i = 0; equal && i < this.tags.length; i++) {
            equal = Util_1.Util.indexOf(actionTags, this.tags[i]) > -1;
        }
        return equal;
    }
}
exports.Action = Action;
