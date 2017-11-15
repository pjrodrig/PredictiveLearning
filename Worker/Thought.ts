import {
    Neuron,
    ActionNeuron,
    RootNeuron,
    Goal
} from "../Domain/index";
import {
    MathUtil,
    Util
} from "../Util/index";

export class Thought {

    private root: RootNeuron;
    private goals: Array<Goal>;
    private actionNeurons: Array<ActionNeuron>;

    constructor(){
        this.root = new RootNeuron();
        this.goals = [];
        this.actionNeurons = [];
    }

    /**
    @param instincts: Array of addInstincts
    See documentation for addInstinct for more information
    **/
    public addGoals(goals: Array<Goal>): void {
        for(let i = 0; i < goals.length; i++) {
            this.addGoal(goals[i]);
        }
    }

    /**
    Determines whether an outcome is good or bad.
    Negative values are bad, and positive values are good.
    @param goal: {
        values: object containing possible inputs
        rating: good or bad rating for inputs. negative is bad. positive is good.
        description: optional description of the state for human readability
    }
    **/
    public addGoal(goal: Goal): void {
        if(!this.goalExists(goal)) {
            this.goals.push(goal);
        }
    }

    private checkGoal() {

    }

    private goalExists(goal: Goal): boolean {
        let exists = false;
        for(let i = 0; !exists && i < this.goals.length; i++) {
            exists = this.goals[i].isEqual(goal);
        }
        return exists;
    }

    public observe = (inputs: any, actions?: any): void => {
        if(actions) {
            this.updateActionNeurons(actions, inputs);
            let weightedActions: Array<any> = [];
            let totalSignalStrength = 0;
            this.root.connect(inputs, 1, (weightedAction: any) => {
                weightedActions.push(weightedAction);
                totalSignalStrength += weightedAction.signalStrength;
            });
            let action;
            if (weightedActions.length) {
                let averageSignalStrength = totalSignalStrength / weightedActions.length;
                let actionName = MathUtil.weightedRandom(weightedActions.reduce((aboveAverageActions, weightedAction) => {
                    if (weightedAction.signalStrength >= averageSignalStrength) {
                        aboveAverageActions.push(weightedAction);
                    }
                    return aboveAverageActions;
                }, []));
                action = this.getActionByName(actions, actionName);
            } else {
                action = actions[Math.floor(Math.random() * actions.length)];
                let logic = Util.getRandomLogic(inputs);
                this.root.addChild(new ActionNeuron(this.root, 0.5, logic, action.name));
            }
            action.callback();
        }
        if()
    };

    private getActionByName(actions: Array<any>, actionName: string): any {
        let action;
        for (let i = 0; i < actions.length; i++) {
            action = actions[i];
            if(action.name === actionName) {
                break;
            }
        }
        return action;
    }

    private updateActionNeurons(actions: Array<any>, inputs: any): void {
        let action;
        for(let i = 0; i < actions.length; i++) {
            action = actions[i];
            if(!this.containsActionNeuron(action)) {
                let logic = Util.getRandomLogic(inputs);
                this.root.addChild(new ActionNeuron(this.root, 0.5, logic, action.name));
            }
        }

    }

    private containsActionNeuron(action: any): boolean {
        let found = false;
        for(let i = 0; !found && i < this.actionNeurons.length; i++) {
            found = this.actionNeurons[i].getAction() === action.name;
        }
        return found;
    }
}
