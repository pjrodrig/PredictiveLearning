export class Instinct {

    constructor(private values: any, private rating: number, private description: string) {}

    public getValues(): Array<any> {
        return this.values;
    }

    public getRating() {
        return this.rating
    }

    public getDescription() {
        return this.description;
    }

    public isEqual(instinct) {
        let equal = this.rating === instinct.rating && this.description === instinct.description;
        const instinctValues = instinct.getValues();
        if(equal) {
            for(let key in instinctValues) {
                if(instinctValues.hasOwnProperty(key)) {
                    if(!(this.values.hasOwnPropety(key) && this.values[key] === instinctValues[key])) {
                        equal = false;
                        break;
                    }
                }
            }
        }
        return equal;
    }
}
