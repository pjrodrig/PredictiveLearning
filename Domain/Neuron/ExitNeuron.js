import { Neuron } from "./Neuron";
import { NeuronTree } from "../NeuronTree/NeuronTree";
import { WeightedNeuronTree } from "../NeuronTree/WeightedNeuronTree";

class ExitNeuron extends Neuron {

    private neuronTree: NeuronTree
    private exit: boolean;

    constructor(private neuronTree: NeuronTree){
        super(neuronTree);
        this.neuronTree = neuronTree;
        this.exit = true;
    }
}
