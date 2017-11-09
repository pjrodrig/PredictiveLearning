import { NeuronTree } from "../NeuronTree/NeuronTree";
import { Detail } from "../Detail/Detail";
import { MathUtil } from "../../Util/MathUtil";
import { Observation } from "../Observation/Observation";
import { Tag } from "../Tag/Tag";

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

    public attach(observation: Observation): any {
        MathUtil.weightedRandom(this.search(observation, 3));
        return null;
    }

    private search(observation: Observation, depth: number): Array<Neuron> {
        let result: Array<Neuron> = [];
        this.connections.map((connection) => {
            result.push(connection);
            return depth ? connection.search(observation, depth - 1) : [
                {
                    neuron: connection,
                    weight: connection.getWeight(observation)
                }
            ];
        }).reduce((previous, current) => {
            return previous.concat(current);
        }, result);
        return result;
    }

    public getWeight(observation: Observation): number {
        return observation.getDetails().map(this.getDetailWeight).reduce(MathUtil.sum, 0);
    }

    private getDetailWeight(detail: Detail): number {
        const
            detailTags: Array<Tag> = detail.getTags(),
            detailValue: any = detail.getValue();
        return this.relatedTags.map((tagInfo): number => {
            return detailTags.map((tag): number => {
                return tagInfo.tag.getWeight(tag, detailValue);
            }).reduce((max, current) => {
                return max > current ? max : current;
            }, Number.NEGATIVE_INFINITY);
        }).reduce(MathUtil.sum, 0);
    }
}
