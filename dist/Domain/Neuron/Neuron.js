export class Neuron {
    constructor(neuronTree) {
        this.neuronTree = neuronTree;
        this.neuronTree = neuronTree;
        this.exit = false;
    }
    attach() {
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
    getWeight(details) {
        let weight = 0;
        details.map(this.getWeight);
        return weight;
    }
    getWeight(detail) {
        console.log('detail', detail);
    }
}
