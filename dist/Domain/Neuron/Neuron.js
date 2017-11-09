"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtil_1 = require("../../Util/MathUtil");
class Neuron {
    constructor(neuronTree) {
        this.neuronTree = neuronTree;
        this.neuronTree = neuronTree;
        this.exit = false;
        this.connections = [];
        this.relatedTags = [];
    }
    attach(observation) {
        MathUtil_1.MathUtil.weightedRandom(this.search(observation, 3));
        return null;
    }
    search(observation, depth) {
        let result = [];
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
    getWeight(observation) {
        return observation.getDetails().map(this.getDetailWeight).reduce(MathUtil_1.MathUtil.sum, 0);
    }
    getDetailWeight(detail) {
        const detailTags = detail.getTags(), detailValue = detail.getValue();
        return this.relatedTags.map((tagInfo) => {
            return detailTags.map((tag) => {
                return tagInfo.tag.getWeight(tag, detailValue);
            }).reduce((max, current) => {
                return max > current ? max : current;
            }, Number.NEGATIVE_INFINITY);
        }).reduce(MathUtil_1.MathUtil.sum, 0);
    }
}
exports.Neuron = Neuron;
