export class Goal {

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

    public isReached(inputs: any) {
        let reached = true;
        for(let key in this.values) {
            if(this.values[key] !== inputs[key]) {
                reached = false;
                break;
            }
        }
        return reached;
    }

    public isEqual(other: Goal) {
        let equal = this.rating === other.rating && this.description === other.description;
        const otherValues = other.getValues();
        if(equal) {
            for(let key in otherValues) {
                if(otherValues.hasOwnProperty(key)
                    && !(this.values.hasOwnPropety(key)
                        && this.values[key] === otherValues[key])) {
                    equal = false;
                    break;
                }
            }
        }
        return equal;
    }
}
