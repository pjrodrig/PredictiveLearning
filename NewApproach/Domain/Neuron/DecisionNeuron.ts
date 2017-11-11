export class DecisionNeuron extends Neuron {

    private inputs: Array<any>; //groups of inputs and single inputs that have been seen before
    //Neurons will purge their predictions once a cap has been reached or a time limit has been reached TODO: OPTIMIZABLE
    constructor(inputs: any, children: Array<Neuron>, preditionsPromise: Promise<any>) {
        super();
        this.initInputs(inputs);
        this.children = children;
        predictionsPromise.then(updatePredictions);
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

    private updatePredictions(predictions: Array<PredictionNeuron>): void {
        for(let i = 0; i < predictions.length; i++) {
            let prediction = predictions[i];
            // Remove prediction from prediction queue
            this.removePrediction(prediction);
            // push the prediction into the prediction array
            this.predictions.push(prediction);
            // this maintains that each prediction is unique,
            // and older predictions will be removed first as they will be in
            // the front of the array
        }
    }

    private removePrediction(prediction: PredictionNeuron): void {
        for(let i = 0; i < this.predictions.length; i++) {
            if(this.predictions[i].isEqual(prediction)) {
                this.predictions.splice(i, 1);
            }
        }
    }
}
