"use strict";
class Tag {
    constructor(name, tagBag) {
        this.name = name;
        this.tagBag = tagBag;
    }
    enforceRelations(tags) {
        tags.map(enforceRelations);
    }
    enforceRelation(tag) {
        const tagName = tag.getName();
        const relation = relationDictionary[tagName];
        0;
        relationDictionary[tagName] = relation++;
        forgetInsignificantRelations();
    }
    /**
     * TODO: forgetInsignificantRelations
     */
    forgetInsignificantRelations() {
        //Placeholder for future improvements
    }
}
