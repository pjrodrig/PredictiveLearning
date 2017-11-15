import { Neuron } from "./Neuron";

export class RootNeuron extends Neuron {

    constructor() {
        super(null, 1);
    }

    public mutate(signalStrength: number) {
        //no op
    }

}
