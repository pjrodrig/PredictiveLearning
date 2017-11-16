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
    private memory: Array<ActionNeuron>;

    constructor(){
        this.root = new RootNeuron();
        this.goals = [];
        this.actionNeurons = [];
        this.memory = [];
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

    private checkGoals(inputs: any): Goal {
        let goal = null,
            current;
        for(let i = 0; !goal && i < this.goals.length; i++) {
            current = this.goals[i];
            if(current.isReached(inputs)) {
                goal = current;
            }
        }
        return goal;
    }

    private goalExists(goal: Goal): boolean {
        let exists = false;
        for(let i = 0; !exists && i < this.goals.length; i++) {
            exists = this.goals[i].isEqual(goal);
        }
        return exists;
    }

    public observe = (inputs: any, actions?: any): void => {
        let goalReached = this.checkGoals(inputs);
        if(goalReached) {
            this.mutate(goalReached);
            this.memory = [];
        }
        if(actions) {
            this.updateActionNeurons(actions, inputs);
            let weightedActions: Array<any> = [],
                totalSignalStrength = 0;
            this.root.connect(inputs, 1, (weightedAction: any) => {
                weightedAction.action = this.getActionByName(actions, weightedAction.actionName);
                if(weightedAction.action) {
                    weightedActions.push(weightedAction);
                    totalSignalStrength += weightedAction.signalStrength;
                }
            });
            let action;
            if (weightedActions.length) {
                let averageSignalStrength = totalSignalStrength / weightedActions.length;
                weightedActions = weightedActions.reduce((aboveAverageActions, weightedAction) => {
                    if (weightedAction.signalStrength >= averageSignalStrength) {
                        aboveAverageActions.push(weightedAction);
                    }
                    return aboveAverageActions;
                }, []);
                let chosenWeightedAction = MathUtil.weightedRandom(weightedActions, null, 'signalStrength');
                action = chosenWeightedAction.action;
                this.memory.push(chosenWeightedAction.neuron);
            } else {
                action = actions[Math.floor(Math.random() * actions.length)];
                let logic = Util.getRandomLogic(inputs),
                    newActionNeuron = new ActionNeuron(this.root, 0.5, logic, action.name);
                this.root.addChild(newActionNeuron);
                this.memory.push(newActionNeuron);
            }
            action.callback();
        }
    };

    private mutate(goal: Goal) {
        let ratingFraction = goal.getRating()/this.memory.length;
        for(let i = 0; i < this.memory.length; i++) {
            this.memory[i].mutate(1 + (ratingFraction * i));
        }
    }

    private getActionByName(actions: Array<any>, actionName: string): any {
        let action = null,
            current;
        for (let i = 0; i < actions.length; i++) {
            current = actions[i];
            if(current.name === actionName) {
                action = current;
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
                let actionNeuron = new ActionNeuron(this.root, 0.5, logic, action.name);
                this.root.addChild(actionNeuron);
                this.actionNeurons.push(actionNeuron);
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

    public printTree() {
        return this.root.printTree(0);
    }
}
