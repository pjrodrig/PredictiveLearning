class Detail {

    private value: any;
    private tags: Array<string>;
    constructor(value: any, tags: Array<string>) {
        this.value = value;
        this.tags = tags;
    }

    public getValue(): any {
        return this.value;
    }

    public getTags(): Array<string> {
        return this.tags;
    }
}
