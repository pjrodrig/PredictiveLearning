import { Neuron } from "./Neuron";

export class RootNeuron extends Neuron {

    constructor() {
        super(null);
    }

    public mutate(signalStrength: number) {
        //no op
    }

}
