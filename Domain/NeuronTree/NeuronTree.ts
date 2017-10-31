import { Neuron } from "../Neuron/Neuron";
import { ExitNeuron } from "../Neuron/ExitNeuron";
import { Observation } from "../Observation/Observation";
import { Detail } from "../Detail/Detail";
import { Tag } from "../Tag/Tag";

export class NeuronTree {
    private neuronBag: Array<Neuron>;
    private isTraining: boolean;

    constructor(exits?: Array<Array<Tag>>) {
        this.neuronBag = [];
        this.isTraining = false;
        if(exits) {
            exits.map(this.addExit);
        }
    }

    public addExit(tags: Array<Tag>) {
        let newExit = new ExitNeuron(this);
        newExit.addTags(tags);
        this.neuronBag.push(newExit);
        return newExit;
    }

    public observe(observation: Observation): ExitNeuron {
        observation.getExits().map(this.addExit);
        observation.getDetails();
        return null;
    }

    public getWeightedNeurons(details: Array<Detail>) {
        this.neuronBag.map((neuron) => {
            neuron.getWeight();
        });
    }

    public add(neuron: Neuron) {
        this.neuronBag.push(neuron);
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
