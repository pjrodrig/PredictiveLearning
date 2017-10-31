import { Neuron } from "../Neuron/neuron"
import { EntryNeuron } from "../Neuron/EntryNeuron"

class NeuronTree {
    private neuronBag: Array<Neuron>;
    constructor(exits?: Array<string>) {
        this.neuronBag = [];
        exits.map(addExit);
    }

    public observe(input): Neuron {
        // const inputLooseHash = looseHashInput(input);
        const hash = getHash(input);
    }

    public addEntry {

    }

    public addExit() {

    }

    public add(neuron: Neuron) {
        neuronBag.push(neuron);
    }

    /**
     * Generates a hash with the possibility of range symbolizatio
     *
     */
    // private looseHashInput(input) {
    //
    // }
}
