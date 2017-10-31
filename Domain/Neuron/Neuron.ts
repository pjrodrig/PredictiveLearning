import { NeuronTree } from "../NeuronTree/NeuronTree";
import { WeightedNeuronTree } from "../NeuronTree/WeightedNeuronTree";
import { Detail } from "../Detail/Detail";

export class Neuron {
    protected exit: boolean;
    private connections: Array<Neuron>;
    private relatedTags: any;

    constructor(private neuronTree: NeuronTree){
        this.neuronTree = neuronTree;
        this.exit = false;
        this.connections = [];
        this.relatedTags = {};
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

    public getDetailWeight(detail: Detail): number {
        let weight = 0;
        for(let key in this.relatedTags) {
            if(this.relatedTags.hasOwnProperty(key)) {
                let tag = this.relatedTags[key];

            }
        }
        return weight;
    }
}
