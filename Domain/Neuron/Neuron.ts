//Basic Neuron
class Neuron {

    private neuronTree: NeuronTree
    private exit: boolean;

    constructor(private neuronTree: NeuronTree){
        this.neuronTree = neuronTree;
        this.exit = false;
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
