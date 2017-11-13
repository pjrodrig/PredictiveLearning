import { Neuron } from "./Neuron";
import { PredictionNeuron } from "./PredictionNeuron";

export class DecisionNeuron extends Neuron {

    private children: Array<Neuron>;
    //Neurons will purge their predictions once a cap has been reached or a time limit has been reached TODO: OPTIMIZABLE
    private predictions: Array<PredictionNeuron>;

    constructor(children: Array<Neuron>, predictions: Array<PredictionNeuron>) {
        super();
        this.children = children;
        this.predictions = predictions;
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

    public getWeight(inputs: any, goal: any): number {
        let mostLikelyPredictions = this.predictions.map((prediction: PredictionNeuron) => {
            return {
                weight: prediction.getRelationWeight(inputs),
                prediction: prediction
            };
        }).reduce((mostLikely: Array<any>, weightedPrediction: any) => {
            if(weightedPrediction.weight > 0) {
                mostLikely.push(weightedPrediction);
            }
            return mostLikely;
        }, []);
        return 0;
    }

    public takeAction() {}
}
