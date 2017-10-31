export class Observation {
    constructor(details, exits, tags) {
        this.tags = tags || [];
        this.details = details;
    }
    getDetails() {
        return this.details;
    }
    getExits() {
        return this.exits;
    }
    getTags() {
        return this.tags;
    }
}
