import { Util } from "../../Util/index"

export class Neuron {

    private children: Array<Neuron>;
    protected parent: Neuron;
    protected signalModifier: number;
    private logic: any; //{inputKey: function(inputValue): boolean true if matches pattern

    constructor(parent: Neuron, signalModifier: number, logic?: any, children?: Array<Neuron>) {
        this.parent = parent;
        this.logic = logic || null;
        this.signalModifier = signalModifier;
        if(children) {
            for(let i = 0; i < children.length; i++) {
                children[i].setParent(this);
            }
        }
        this.children = children || [];
    }

    public connect(inputs: any, signalStrength: number, callback: any): void {
        signalStrength = signalStrength * this.signalModifier;
        let child;
        for(let i = 0; i < this.children.length; i++) {
            child = this.children[i];
            if(child.checkLogic(inputs)) {
                child.connect(inputs, signalStrength, callback);
            }
        }
    }

    public checkLogic(inputs: any): boolean {
        if(!this.logic) {
            this.logic = Util.getRandomLogic(inputs);
        }
        let follows = true;
        for(let key in this.logic) {
            if(!this.logic[key](inputs)) {
                follows = false;
                break;
            }
        }
        return follows;
    }
    
    public mutate(signalStrength: number): void { //TODO: OPTIMIZE I guessed what to do here
        this.signalModifier = this.signalModifier + signalStrength;
        if(this.signalModifier < 0.5) {
            if(Math.random() > 0.5) {
                this.parent.addChild(new Neuron(this.parent, 0.5, this.children));
            }
        } else {
            if(Math.random() > 0.5) {
                this.parent.addChild(new Neuron(this.parent, 0.5, this.children));
            }
        }
        //TODO: destroy if under a threshold
        this.parent.mutate(this.signalModifier * signalStrength);
    }
    
    public removeChild(child: Neuron): void {
        for(let i = 0; i < this.children.length; i++) {
            if(child === this.children[i]) {
                this.children.splice(i, 1);
                break;
            }
        }
    }

    public addChild(child: Neuron): void {
        this.children.push(child);
    }

    public setParent(parent: Neuron): void {
        this.parent = parent;
    }

}
