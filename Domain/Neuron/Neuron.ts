//Basic Neuron
class Neuron {

    private neuronTree: NeuronTree;

    constructor(private neuronTree: NeuronTree){
        this.neuronTree = neuronTree;
    }

    public attach(input): void {

    }

    private reach(depth): void {
        _search(depth);
    }

    private search(depth): Neuron {
        _assignWeightsToNeurons(depth);
    }

    private _assignWeightsToNeurons(depth): WeightNeuronTree {

    }
}
