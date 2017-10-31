export class Tag {
    constructor(name, tagBag) {
        this.name = name;
        this.tagBag = tagBag;
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
