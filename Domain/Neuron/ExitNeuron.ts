import { Neuron } from "./Neuron";
import { NeuronTree } from "../NeuronTree/NeuronTree";
import { WeightedNeuronTree } from "../NeuronTree/WeightedNeuronTree";
import { Tag } from "../Tag/Tag";

export class ExitNeuron extends Neuron {

    private neuronTree: NeuronTree;
    private exit: boolean;
    private tags: Array<Tag>;

    constructor(private neuronTree: NeuronTree, private tags: Array<Tag>){
        super(neuronTree);
        this.neuronTree = neuronTree;
        this.exit = true;
        this.tags = tags;
    }
}
