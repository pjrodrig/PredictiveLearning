import { Neuron } from "./Neuron";
export class ExitNeuron extends Neuron {
    constructor(neuronTree) {
        super(neuronTree);
        this.exit = true;
    }
    addTags(tags) {
        this.tags.concat(tags);
    }
}
