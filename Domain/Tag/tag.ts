class Tag {

    private name: string;
    private tagBag;
    private relationDictionary;

    constructor(name: string, tagBag) {
        this.name = name;
        this.tagBag = tagBag;
    }

    private enforceRelations(tags: Array<Tag>) {
        tags.map(this.enforceRelation);
    }

    private enforceRelation(tag: Tag) {
        const tagName = tag.getName();
        let relation = this.relationDictionary[tagName] || 0;
        this.relationDictionary[tagName] = relation++;
        this.forgetInsignificantRelations();
    }

    /**
     * TODO: forgetInsignificantRelations
     */
    private forgetInsignificantRelations() {
        //Placeholder for future improvements
    }

    public getName(): string {
        return this.name;
    }
}
