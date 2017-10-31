class Tag {

    private name: string;
    private tagBag;
    private relationDictionary;

    constructor(name: string, tagBag) {
        this.name = name;
        this.tagBag = tagBag;
    }

    enforceRelations(tags: Array<Tag>) {
        tags.map(enforceRelations);
    }

    enforceRelation(tag: Tag) {
        const tagName = tag.getName();
        const relation = relationDictionary[tagName] : 0;
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
