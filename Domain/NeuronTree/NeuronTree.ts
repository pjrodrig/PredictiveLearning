import { Neuron } from "../Neuron/Neuron";
import { ExitNeuron } from "../Neuron/ExitNeuron";
import { Observation } from "../Observation/Observation";
import { Detail } from "../Detail/Detail";
import { Tag } from "../Tag/Tag";

export class NeuronTree {
    private neuronBag: Array<Neuron>;
    private training: boolean;

    constructor(exits?: Array<Array<Tag>>) {
        this.neuronBag = [];
        this.training = false;
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
        const details = observation.getDetails();

        return null;
    }

    public getWeightedNeurons(details: Array<Detail>) {
        this.neuronBag.map((neuron) => {
            //neuron.getWeight();
        });
    }

    public add(neuron: Neuron) {
        this.neuronBag.push(neuron);
    }

    public setTraining(training) {
        this.training = training;
    }

    /**
     * Generates a hash with the possibility of range symbolizatio
     *
     */
    // private looseHashInput(input) {
    //
    // }
}
