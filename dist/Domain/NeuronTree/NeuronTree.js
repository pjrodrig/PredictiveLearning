import { ExitNeuron } from "../Neuron/ExitNeuron";
export class NeuronTree {
    constructor(exits) {
        this.neuronBag = [];
        this.isTraining = false;
        if (exits) {
            exits.map(this.addExit);
        }
    }
    addExit(tags) {
        let newExit = new ExitNeuron(this);
        newExit.addTags(tags);
        this.neuronBag.push(newExit);
        return newExit;
    }
    observe(observation) {
        observation.getExits().map(this.addExit);
        observation.getDetails();
        return null;
    }
    getWeightedNeurons(details) {
        this.neuronBag.map((neuron) => {
            neuron.getWeight();
        });
    }
    add(neuron) {
        this.neuronBag.push(neuron);
    }
    startTraining() {
    }
    stopTraining() {
    }
}