import { Util } from "../../Util/index"

export class Neuron {

    private children: Array<Neuron>;
    protected parent: Neuron;
    protected logic: any;

    private SIGNAL_STRENGTH_MIN = 2;

    constructor(parent: Neuron, logic?: any) {
        this.parent = parent;
        if(this.parent) {
            this.parent.addChild(this);
        }
        this.logic = logic || null;
        this.children = [];
    }

    public connect(inputs: any, signalStrength: number, callback: any): void {
        let child: Neuron,
            childSignalStrength: number;
        for(let i = 0; i < this.children.length; i++) {
            child = this.children[i];
            childSignalStrength = child.checkLogic(inputs) * signalStrength;
            if(signalStrength > this.SIGNAL_STRENGTH_MIN) {
                child.connect(inputs, signalStrength * child.checkLogic(inputs), callback);
            }
        }
    }

    public checkLogic(inputs: any): number {
        if(!this.logic) {
            this.logic = Util.getLogic(inputs);
        }
        let count = 0,
            total = 0,
            current: any;
        for (let key in this.logic) {
            current = this.logic[key];
            total += current[current.check(inputs)] * current.weight;
            count++;
        }
        return total/count;
    }

    public mutate(reinforceStrength: number, decay: number, inputs: any) {
        let current: any,
            follows: string;
        for(let key in this.logic) {
            current = this.logic[key];
            follows = current.check(inputs) + '';
            if(follows) {
                current[follows] = (current[follows] + reinforceStrength)/2;
                if(reinforceStrength > 0.5) {
                    current.weight = (current.weight + reinforceStrength)/2;
                }
            } else if(reinforceStrength > 0.5){
                current.weight = (current.weight + (1 - reinforceStrength))/2;
            }
        }
        if(reinforceStrength > 0.7 && Math.random() > 0.7) {
            this.expand(inputs, Util.getLogic(inputs, 0.7));
        }
        this.parent.mutate((reinforceStrength + decay)/2, decay, inputs);
    }

    protected expand(inputs: any, logic: any) {
        new Neuron(this.parent, logic);
    }

    public copyChildrenToParent(parent: Neuron) {
        this.children.map((child) => {
            return child.getCopy(parent);
        });
    }

    public getCopy(parent: Neuron) {
        let copy = new Neuron(parent, this.logic);
        this.copyChildrenToParent(copy);
        return copy;
    }

    public removeChild(child: Neuron): void {
        for(let i = 0; i < this.children.length; i++) {
            if(child === this.children[i]) {
                this.children.splice(i, 1);
                break;
            }
        }
        if(!this.children.length) {
            this.parent.removeChild(this);
        }
    }

    public addChild(child: Neuron): void {
        this.children.push(child);
    }

    public printTree(depth: number) {
        let treeString = depth ? `"${depth}"` : '';
        for(let i = 0; i < this.children.length; i++) {
            treeString = treeString + `"${depth}"->` + this.children[i].printTree(depth + 1)
        }
        return treeString;
    }

    public printJSON(idObj: any) {
        let jsonString = `"${++idObj.id}":{"id": ${idObj.id}`;
        if(this.logic) {
            for(let key in this.logic) {
                jsonString = jsonString + `, "${key}": "${this.logic[key].value}-${Math.floor(this.logic[key].true * 1000)}-${Math.floor(this.logic[key].false * 1000)}-${Math.floor(this.logic[key].weight * 1000)}"`
            }
        }
        if(this.children.length) {
            for(let i = 0; i < this.children.length; i++) {
                jsonString = jsonString + ', ' + this.children[i].printJSON(idObj);
            }
        }
        return jsonString + '}';
    }

}
