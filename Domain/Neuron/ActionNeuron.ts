import { Neuron } from "./Neuron";

export class ActionNeuron extends Neuron {

    private action: string;

    constructor(parent: Neuron, signalModifier: number, logic: any, action: string) {
        super(parent, signalModifier, logic);
        this.action = action;
    }

    public connect(inputs: any, signalStrength: number, callback: any): any {
        callback({signalStrength: signalStrength * this.signalModifier, actionName: this.action, neuron: this});
    }

    public mutate(signalStrength: number) {
        if(signalStrength < 0.5) {
            if(Math.random() > 0.5) {
                let newParent = new Neuron(this.parent, 0.5);
                this.parent.addChild(newParent);
                newParent.addChild(new ActionNeuron(newParent, 0.5, null, this.action));
            }
        }
        if(signalStrength < 0.1) {
            this.parent.removeChild(this);
        }
        this.signalModifier = this.signalModifier = this.signalModifier * signalStrength;
        this.parent.mutate(signalStrength);
    }

    public getAction(): string {
        return this.action;
    }

    public printTree(depth: number) {
        return `"${depth}-${this.signalModifier}-${this.action}"`;
    }

}
