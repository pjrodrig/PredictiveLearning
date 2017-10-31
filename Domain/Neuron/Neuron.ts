import { NeuronTree } from "../NeuronTree/NeuronTree";
import { WeightedNeuronTree } from "../NeuronTree/WeightedNeuronTree";
import { Detail } from "../Detail/Detail";

export class Neuron {
    protected exit: boolean;

    constructor(private neuronTree: NeuronTree){
        this.neuronTree = neuronTree;
        this.exit = false;
    }

    public attach(): void {

    }

    private reach(depth: number): void {
        this.search(depth);
    }

    private search(depth: number): Neuron {
        this.assignWeightsToNeurons(depth);
        return null;
    }

    private assignWeightsToNeurons(depth: number): WeightedNeuronTree {
        return null;
    }

    public getWeight(details: Array<Detail>): number {
        let weight = 0;
        details.map(this.getWeight);
        return weight;
    }

    public getDetailWeight(detail: Detail) {

    }
}
