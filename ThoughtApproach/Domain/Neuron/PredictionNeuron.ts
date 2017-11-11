export class PredictionNeuron extends Neuron {

    private inputs: Array<any>; //groups of inputs and single inputs that have been seen before

    constructor(inputs: any) {
        super();
        this.initInputs(inputs);
    }

    private initInputs(inputs: any): void {
        this.inputs = [inputs];
        for(let key in inputs) {
            if(inputs.hasOwnProperty(key)) {
                let newInput = {};
                newInput[key] = inputs[key];
                this.inputs.push(newInput);
            }
        }
    }
}
