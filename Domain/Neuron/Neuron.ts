import { Util } from "../../Util/index"

export class Neuron {

    private children: Array<Neuron>;
    protected parent: Neuron;
    protected signalModifier: number;
    protected logic: any; //{inputKey: function(inputValue): boolean true if matches pattern
    private logicMutationSeverity: number;

    constructor(parent: Neuron, signalModifier: number, logic?: any, logicMutationSeverity?: number) {
        this.parent = parent;
        if(this.parent) {
            this.parent.addChild(this);
        }
        this.logic = logic || null;
        this.signalModifier = signalModifier;
        this.children = [];
        this.logicMutationSeverity = logicMutationSeverity;
    }

    public connect(inputs: any, signalStrength: number, callback: any): void {
        signalStrength = signalStrength * this.signalModifier;
        if(signalStrength > ) {
            let child;
            for(let i = 0; i < this.children.length; i++) {
                child = this.children[i];
                if(child.checkLogic(inputs)) {
                    child.connect(inputs, signalStrength, callback);
                }
            }
        }
    }

    public checkLogic(inputs: any): boolean {
        if(!this.logic) {
            this.logic = Util.getRandomLogic(inputs);
        }
        if(this.logicMutationSeverity) {
            this.mutateLogic(inputs);
        }
        let follows = true;
        for(let key in this.logic) {
            if(this.logic[key] && !this.logic[key](inputs)) {
                follows = false;
                break;
            }
        }
        return follows;
    }

    private mutateLogic(inputs: any) {
        let keys = Object.keys(this.logic),
            mutations = Math.floor(keys.length * this.logicMutationSeverity),
            key: string;
        while(mutations) {
            key = keys.splice(Math.floor(Math.random() * keys.length), 1)[0];
            this.logic[key] = (currentInputs: any) => {
                return inputs[key] === currentInputs[key];
            };
            mutations--;
        }
        this.logicMutationSeverity = 0;
    }

    public mutate(reinforceStrength: number, decay: number): void { //TODO: OPTIMIZE I guessed what to do here
        if((reinforceStrength >= 0.5 && this.signalModifier < reinforceStrength)
            || (reinforceStrength < 0.5 && this.signalModifier > reinforceStrength)) {
            this.signalModifier = (reinforceStrength + this.signalModifier)/2;
        }
        this.parent.mutate((reinforceStrength + decay) / 2, decay);
        if(Math.random() > 0.8) {
            this.copyChildrenToParent(new Neuron(this.parent, 0.5, this.logic, 1 - this.signalModifier));
        }
        if(Math.random() > 0.8) {
            this.getCopy(new Neuron(this.parent, 0.5, this.logic, 1 - this.signalModifier));
        }
        if(this.signalModifier < 0.2) {
            this.parent.removeChild(this);
        }
    }

    public copyChildrenToParent(parent: Neuron) {
        this.children.map((child) => {
            return child.getCopy(parent);
        });
    }

    public getCopy(parent: Neuron) {
        let copy = new Neuron(parent, this.signalModifier, this.logic);
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
        let treeString = depth ? `"${depth}-${this.signalModifier}"` : '';
        for(let i = 0; i < this.children.length; i++) {
            treeString = treeString + `"${depth}-${this.signalModifier}"->` + this.children[i].printTree(depth + 1)
        }
        return treeString;
    }

}
