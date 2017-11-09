"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tag {
    constructor(name) {
        this.name = name;
    }
    getWeight(tag, value) {
        //TODO: use value in calculation
        return this.relationDictionary[tag.getName()] || 0;
    }
    enforceRelations(tags) {
        tags.map(this.enforceRelation);
    }
    enforceRelation(tag) {
        const tagName = tag.getName();
        let relation = this.relationDictionary[tagName] || 0;
        this.relationDictionary[tagName] = relation++;
        this.forgetInsignificantRelations();
    }
    /**
     * TODO: forgetInsignificantRelations
     */
    forgetInsignificantRelations() {
        //Placeholder for future improvements
    }
    getName() {
        return this.name;
    }
}
exports.Tag = Tag;
