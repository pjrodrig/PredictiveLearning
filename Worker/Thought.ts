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
    private memory: Array<any>;

    private EFFORT: number = 10;

    constructor(){
        this.root = new RootNeuron();
        this.goals = [];
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
            let weightedActions: Array<any> = [],
                totalSignalStrength = 0;
            this.root.connect(inputs, this.EFFORT, (weightedAction: any) => {
                weightedAction.action = this.getActionByName(actions, weightedAction.actionName);
                if(weightedAction.action) {
                    weightedActions.push(weightedAction);
                    totalSignalStrength += weightedAction.signalStrength;
                }
            });
            let action;
            if (weightedActions.length) {
                let averageSignalStrength = totalSignalStrength / weightedActions.length;
                let max = 0,
                    oldLength = weightedActions.length;
                weightedActions = weightedActions.reduce((aboveAverageActions, weightedAction) => {
                    if (weightedAction.signalStrength >= averageSignalStrength) {
                        if(weightedAction.signalStrength > max) {
                            max = weightedAction.signalStrength;
                        }
                        aboveAverageActions.push(weightedAction);
                    }
                    return aboveAverageActions;
                }, []);
                if(!(weightedActions.length/oldLength > 0.6 && Math.random() > 0.5)) {
                    let chosenWeightedAction = MathUtil.weightedRandom(weightedActions, null, 'signalStrength');
                    action = chosenWeightedAction.action;
                    this.memory.push({action: chosenWeightedAction.neuron, inputs: inputs});
                }
            }

            if(!action) {
                action = actions[Math.floor(Math.random() * actions.length)];
                let logic = Util.getLogic(inputs),
                    newActionNeuron = new ActionNeuron(this.root, action.name, logic);
                this.root.addChild(newActionNeuron);
                this.memory.push({action: newActionNeuron, inputs: inputs});
            }

            action.callback();
        }
    };

    private mutate(goal: Goal) {
        let rating = goal.getRating()/this.memory.length,
            modifier,
            current: any;
        for(let i = 0; i < this.memory.length; i++) {
            modifier = (this.memory.length - i);
            current = this.memory[i];
            current.action.mutate(((rating * i) + ((modifier - 1) * 0.5))/ modifier, 0.5, current.inputs);
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

    public printTree() {
        return this.root.printTree(0);
    }

    public printJSON() {
        let idObj = {id: 0},
            result = `[{${this.root.printJSON(idObj)}}]`;
        console.log('Neurons: ', idObj.id);
        return result;
    }
}
