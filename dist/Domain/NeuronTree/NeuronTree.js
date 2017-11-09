"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Neuron_1 = require("../Neuron/Neuron");
const ExitNeuron_1 = require("../Neuron/ExitNeuron");
class NeuronTree {
    constructor(exits) {
        this.neuronBag = [];
        this.training = false;
        if (exits) {
            exits.map(this.addExit);
        }
        this.root = new Neuron_1.Neuron(this);
    }
    addExit(tags) {
        let newExit = new ExitNeuron_1.ExitNeuron(this);
        newExit.addTags(tags);
        this.neuronBag.push(newExit);
        return newExit;
    }
    observe(observation) {
        return this.root.attach(observation);
    }
    getWeightedNeurons(details) {
        this.neuronBag.map((neuron) => {
            //neuron.getWeight();
        });
    }
    add(neuron) {
        this.neuronBag.push(neuron);
    }
    setTraining(training) {
        this.training = training;
    }
}
exports.NeuronTree = NeuronTree;
