import { Neuron } from "./Neuron";

export class ActionNeuron extends Neuron {

    private action: string;

    constructor(parent: Neuron, signalModifier: number, logic: any, action: string) {
        super(parent, signalModifier, logic);
        this.action = action;
    }

    public connect(inputs: any, signalStrength: number, callback: any): any {
        callback({signalStrength: signalStrength * this.signalModifier, action: this.action});
    }

    public mutate(signalStrength: number) {
        if(signalStrength < 0.5) {
            if(Math.random() > 0.5) {

            }
        }
        this.signalModifier = this.signalModifier = this.signalModifier + signalStrength; //TODO: should probably be some type of multiplication
        this.parent.mutate(signalStrength);
    }

    public getAction(): string {
        return this.action;
    }

}
