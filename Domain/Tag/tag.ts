export class Tag {

    private name: string;
    private relationDictionary: any;

    constructor(name: string) {
        this.name = name;
    }

    public getWeight(tag: Tag, value: any): number {
        //TODO: use value in calculation
        return this.relationDictionary[tag.getName()] || 0;
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
