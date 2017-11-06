import { NeuronTree } from "../NeuronTree/NeuronTree";
import { WeightedNeuronTree } from "../NeuronTree/WeightedNeuronTree";
import { Detail } from "../Detail/Detail";
import { MathUtil } from "../../Util/MathUtil";

export class Neuron {
    protected exit: boolean;
    private connections: Array<any>;
    private relatedTags: Array<any>;

    constructor(private neuronTree: NeuronTree){
        this.neuronTree = neuronTree;
        this.exit = false;
        this.connections = [];
        this.relatedTags = [];
    }

    public attach(): void {

    }

    public getWeight(details: Array<Detail>): number {
        let totalWeight = 0;
        details.map(this.getDetailWeight).reduce(MathUtil.sum, 0);
        return totalWeight;
    }

    private getDetailWeight(detail: Detail): number {
        const
            detailTags = detail.getTags(),
            detailValue = detail.getValue();
        return this.relatedTags.map((tagInfo) => {
            detailTags.map((tag) => {
                return tagInfo.tag.getRelationWeight(tag, detailValue);
            }).reduce(Math.max, Number.NEGATIVE_INFINITY);
        }).reduce(MathUtil.sum, 0);
    }
}
