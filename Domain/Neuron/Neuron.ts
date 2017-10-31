import { NeuronTree } from "../NeuronTree/NeuronTree";
import { WeightedNeuronTree } from "../NeuronTree/WeightedNeuronTree";

export class Neuron {

    private neuronTree: NeuronTree
    private exit: boolean;

    constructor(private neuronTree: NeuronTree){
        this.neuronTree = neuronTree;
        this.exit = false;
    }

    public attach(input): void {

    }

    private reach(depth): void {
        this.search(depth);
    }

    private search(depth): Neuron {
        this.assignWeightsToNeurons(depth);
        return null;
    }

    private assignWeightsToNeurons(depth): WeightedNeuronTree {
        return null;
    }
}
