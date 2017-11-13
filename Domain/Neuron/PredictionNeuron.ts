import { Neuron } from "./Neuron";

export class PredictionNeuron extends Neuron {

    private inputs: any; //groups of inputs and single inputs that have been seen before

    constructor(inputs: any) {
        super();
        this.initInputs(inputs);
    }

    private initInputs(inputs: any): void {
        this.inputs = inputs
    }

    public getInputs(): Array<any> {
        return this.inputs;
    }

    public getRelationWeight() {

    }

    public isEqual(other: PredictionNeuron): boolean {
        let equal = true;
        const otherInputs = other.getInputs();
        if(equal) {
            for(let key in otherInputs) {
                if(otherInputs.hasOwnProperty(key)
                    && (!(this.inputs.hasOwnPropety(key)
                        && this.inputs[key] === otherInputs[key]))) {
                    equal = false;
                    break;
                }
            }
        }
        return equal;
    }
}
