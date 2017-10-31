class Neuron {
    constructor(private neuronTree: NeuronTree){
        this.neuronTree = neuronTree;
    }

    _reach(depth) {
        _search(depth);
    }

    _search(depth) {
        _assignWeightsToNeurons(depth);
    }

    _assignWeightsToNeurons(depth) {
        
    }
}
