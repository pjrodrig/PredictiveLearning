export class Neuron {
    constructor(neuronTree) {
        this.neuronTree = neuronTree;
        this.neuronTree = neuronTree;
        this.exit = false;
    }
    attach(input) {
    }
    reach(depth) {
        this.search(depth);
    }
    search(depth) {
        this.assignWeightsToNeurons(depth);
        return null;
    }
    assignWeightsToNeurons(depth) {
        return null;
    }
}
