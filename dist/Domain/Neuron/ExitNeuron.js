import { Neuron } from "./Neuron";
export class ExitNeuron extends Neuron {
    constructor(neuronTree, tags) {
        super(neuronTree);
        this.neuronTree = neuronTree;
        this.tags = tags;
        this.neuronTree = neuronTree;
        this.exit = true;
        this.tags = tags;
    }
}
