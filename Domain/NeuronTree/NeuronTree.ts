import { Neuron } from "../Neuron/neuron";
import { EntryNeuron } from "../Neuron/EntryNeuron";
import { Tag } from "../Tag/Tag";

class NeuronTree {
    private neuronBag: Array<Neuron>;
    constructor(exits?: Array<Tag>) {
        this.neuronBag = [];
        exits.map(addExit);
    }

    public observe(observation: Observation): Neuron {

    }

    public addExit(tag: Tag) {
        let newExit = new ExitNeuron(tag);
        neuronBag.push(newExit);
        return newExit;
    }

    public add(neuron: Neuron) {
        neuronBag.push(neuron);
    }

    public startTraining() {

    }

    public stopTraining() {
        
    }

    /**
     * Generates a hash with the possibility of range symbolizatio
     *
     */
    // private looseHashInput(input) {
    //
    // }
}
