import { Neuron } from "./Neuron";

export class ActionNeuron extends Neuron {

    private action: string;

    constructor(parent: Neuron, action: string, logic?: any) {
        super(parent, logic);
        this.action = action;
    }

    public connect(inputs: any, signalStrength: number, callback: any): any {
        callback({signalStrength: signalStrength, actionName: this.action, neuron: this, inputs: inputs});
    }

    protected expand(inputs: any, logic: any) {
        new ActionNeuron(this.parent, this.action, logic);
    }

    public getAction(): string {
        return this.action;
    }

    public getCopy(parent: Neuron) {
        return new ActionNeuron(parent, this.action, this.logic);
    }

    public printTree(depth: number) {
        return `"${depth}-${this.action}"`;
    }

    public printJSON(idObj: any) {
        let jsonString = `"${++idObj.id}":{"id": ${idObj.id}`;
        if(this.logic) {
            for(let key in this.logic) {
                jsonString = jsonString + `, "${key}": "${this.logic[key].value}"`
            }
        }
        return jsonString + '}';
    }

}
