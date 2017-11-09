"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Neuron_1 = require("./Neuron");
class ExitNeuron extends Neuron_1.Neuron {
    constructor(neuronTree) {
        super(neuronTree);
        this.exit = true;
    }
    addTags(tags) {
        this.tags.concat(tags);
    }
    setActive(active) {
        this.active = active;
    }
}
exports.ExitNeuron = ExitNeuron;
