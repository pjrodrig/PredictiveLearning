import { Neuron } from "./Neuron";

export class ActionNeuron extends Neuron {

    private action: string;

    constructor(parent: Neuron, signalModifier: number, action: string, logic?: any, logicMutationSeverity?: number) {
        super(parent, signalModifier, logic, logicMutationSeverity);
        this.action = action;
    }

    public connect(inputs: any, signalStrength: number, callback: any): any {
        callback({signalStrength: signalStrength * this.signalModifier, actionName: this.action, neuron: this});
    }

    public mutate(reinforceStrength: number, decay: number) {
        if((reinforceStrength >= 0.5 && this.signalModifier < reinforceStrength)
            || (reinforceStrength < 0.5 && this.signalModifier > reinforceStrength)) {
            this.signalModifier = (reinforceStrength + this.signalModifier)/2;
        }
        this.parent.mutate((reinforceStrength + decay) / 2, decay);
        if(Math.random() > 0.8) {
            new ActionNeuron(this.parent, 0.5, this.action, this.logic, 1 - this.signalModifier);
        }
        if(Math.random() > 0.8) {
            this.getCopy(new Neuron(this.parent, 0.5));
        }
        if(this.signalModifier < 0.2) {
            this.parent.removeChild(this);
        }
    }

    public getAction(): string {
        return this.action;
    }

    public getCopy(parent: Neuron) {
        return new ActionNeuron(parent, this.signalModifier, this.action, this.logic);
    }

    public printTree(depth: number) {
        return `"${depth}-${this.signalModifier}-${this.action}"`;
    }

}
