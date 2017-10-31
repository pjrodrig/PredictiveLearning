import { ExitNeuron } from "../Neuron/ExitNeuron";
export class NeuronTree {
    constructor(exits) {
        this.neuronBag = [];
        this.isTraining = false;
        if (exits) {
            exits.map(this.addExit);
        }
    }
    observe(observation) {
        observation.getExits().map(this.addExit);
        observation.getDetails();
        return null;
    }
    addExit(tags) {
        let newExit = new ExitNeuron(tags);
        this.neuronBag.push(newExit);
        return newExit;
    }
    add(neuron) {
        this.neuronBag.push(neuron);
    }
    startTraining() {
    }
    stopTraining() {
    }
    getNeuronBag() {
    }
}
