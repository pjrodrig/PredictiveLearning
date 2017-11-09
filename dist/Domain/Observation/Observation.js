"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Observation {
    constructor(details, actions, tags) {
        this.tags = tags || [];
        this.details = details;
        this.actions = actions;
    }
    getDetails() {
        return this.details;
    }
    getActions() {
        return this.actions;
    }
    getTags() {
        return this.tags;
    }
}
exports.Observation = Observation;
