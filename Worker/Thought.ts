import { Neuron, ActionNeuron, DecisionNeuron, Goal } from "./Domain/index";
import {PredictionNeuron} from "./Domain/Neuron/PredictionNeuron";

export class Thought {

    private static MIN_CONSIDER_THRESHOLD = 0;

    private neurons: Array<Neuron>;

    constructor(){
        this.neurons = [];
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
        if(checkIfGoalExists(goal, value, )) {
            
        }
    }

    private checkIfGoalExist(goal: Goal): boolean {

    }

    public observe(inputs: any, actions?: any): void {
        // given inputs
        /**
        input: {
            name: value //later will support more identifiers than name
        }
        **/
        //could maybe cache this for short term use for related or equal inputs
        let weightedNeurons: Array<any> = this.searchNeuronsForRelationToInputs(inputs); //Array<{weight: number, neuron: Neuron}>
        let neuronFound = false;
        let choice;
        //while an action has not been taken loop through neurons
        for(let i = 0; !neuronFound && i < weightedNeurons.length; i++) {
        //TODO:
            //check the neuron's memory for anything that may be related to these inputs
            //if choices have been made in the past, explore them to decide what to do
            //if an uncertain but predictable choice exists, choose it
            //if a certain choice exists, evaluate if it is good or bad
            //if the choice is good, then choose it, if it is bad, then move to the next neuron
        }
        if(!neuronFound) {
            // Base case for a new/untrained neural network
            // pick random action
            let action = actions[Math.floor(Math.random() * actions.length)],
                predictions = makePredictions();
            choice = new DecisionNeuron(inputs, [new ActionNeuron(action, predictions)];
            this.neurons.push(choice);
            //TODO:
            //create a new neuron and make a prediction neuron
            //if the prediction comes true, then keep the prediction neuron as a next step before deciding on choosing this action, otherwise delete it
            //the creation of prediction neurons can be multi threaded and can be multiple
            //the creation of the prediction neurons will then use the outcome to determine whether they stay or go
            // predictions that were made when another prediction came true are also enforced, but not as heavily
            // predictions that are realized later up to a threshold become more valuable as the future was predicted
        }
        //take action
        choice.takeAction();
        //TODO
        // asynchronously wait for outcome
        // save choices and wait for responce. if responce never comes, then forget choices
        // time or iterations waiting for a good or bad outcome should increase over time until solutions are found

        //not only does bad/good matter, but so does change. if change happens, then we can predict that the change may happen again next time
        //the network would not know what the outcome of an action is before choosing it.
        //something as simple as choosing x:1 and y:1 to place an X in tic tac toe can predict that the next input will show an x in that position
        // the temporary neurons are like a short term memory
        // the short term memory will be limited and will grow over time. TODO: OBTIMIZABLE

        // TODO need to handle adding actual outcome as a future prediction
    }

    /**
    Should eventually search a ordered neuron tree based on related neurons. there will be a smaller group of neurons responsible for searching for an entry point when problems get more complex
    Once neurons are related, then a depth can start to be provided to determine how far to search
    **/
    private searchNeuronsForRelationToInputs(inputs: any, depth?: number): Array<Neuron> {
        let weightedNeurons: Array<any> = this.neurons.map((neuron: Neuron) => { //{weight: number, neuron: Neuron}
            return {
                weight: neuron.getWeight(inputs),
                neuron: neuron
            };
        }).reduce((overThreshold: Array<any>, weightedNeuron: any) => {
            if(weightedNeuron.weight > this.MIN_CONSIDER_THRESHOLD) {
                overThreshold.push(weightedNeuron);
            }
            return overThreshold;
        }, []);
        //could probably make this return something more useful at some point TODO: OBTIMIZABLE
        // should sort based on whether it is good or bad, and certain or uncertain with some randomness
        return weightedNeurons.sort((a: any, b: any) => {
            return a.weight - b.weight;
        });
    }

    private makePredictions(): Promise<PredictionNeuron> {
        //TODO: figure this out
        return null;
    }
}
