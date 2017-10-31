import { Neuron } from "../Neuron/neuron"
import { EntryNeuron } from "../Neuron/EntryNeuron"

class NeuronTree {
    private neuronBag: Array<Neuron>;
    constructor(exits?: Array<string>) {
        this.neuronBag = [];
        exits.map(addExit);
    }

    public addEntry(input): EntryNeuron {
        return new EntryNeuron(input);
    }

    public addExit() {

    }

    public add(neuron: Neuron) {
        neuronBag.push(neuron);
    }
}
