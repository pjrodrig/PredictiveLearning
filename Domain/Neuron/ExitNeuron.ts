import { Neuron } from "./Neuron";
import { NeuronTree } from "../NeuronTree/NeuronTree";
import { WeightedNeuronTree } from "../NeuronTree/WeightedNeuronTree";
import { Tag } from "../Tag/Tag";

export class ExitNeuron extends Neuron {

    private tags: Array<Tag>;
    private active: boolean;

    constructor(neuronTree: NeuronTree){
        super(neuronTree);
        this.exit = true;
    }

    public addTags(tags: Array<Tag>): void {
        this.tags.concat(tags);
    }

    public setActive(active: boolean): void {
        this.active = active;
    }
}
