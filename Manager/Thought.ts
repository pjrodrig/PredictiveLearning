export class Thought {

    private static MIN_CONSIDER_THRESHOLD = 0;

    private neurons: Array<Neuron>;

    constructor(){

    }

    public observe(inputs) {
        // given inputs
        /**
        input: {
            name: value //later will support more identifiers than name
        }
        **/
        //could maybe cache this for short term use for related or equal inputs
        let weightedNeurons: Array<any> this.searchNeuronsForRelationToInputs(inputs: any); //Array<{weight: number, neuron: Neuron}>
        let neuronFound = false;
        //while an action has not been taken loop through neurons
        for(let i = 0; !neuronFound && i < weightedNeurons.length; i++) {
            //check the neuron's memory for anything that may be related to these inputs
            //if choices have been made in the past, explore them to decide what to do
            //if an uncertain but predictable choice exists, choose it
            //if a certain choice exists, evaluate if it is good or bad
            //if the choice is good, then choose it, if it is bad, then move to the next neuron
        }
        if(!actionFound) {
            //create a new neuron and make a prediction neuron
            //if the prediction comes true, then keep the prediction neuron as a next step before deciding on choosing this action, otherwise delete it
            //the creation of prediction neurons can be multi threaded and can be multiple
            //the creation of the prediction neurons will then use the outcome to determine whether they stay or go
        }
        //take action

        // asynchronously wait for outcome
        // save choices and wait for responce. if responce never comes, then forget choices
        // time or iterations waiting for a good or bad outcome should increase over time until solutions are found
    }

    /**
    Should eventually search a ordered neuron tree based on related neurons. there will be a smaller group of neurons responsible for searching for an entry point when problems get more complex
    Once neurons are related, then a depth can start to be provided to determine how far to search
    **/
    private searchNeuronsForRelationToInputs(inputs: any, depth?: number) {
        let weigthedNeurons: Array<any> = this.neurons.map((neuron: Neuron) => { //{weight: number, neuron: Neuron}
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
        //could probably make this return something more useful at some point
        // should sort based on whether it is good or bad, and certain or uncertain with some randomness
        return weightedNeurons.sort((a: any, b: any) => {
            return a.weight - b.weight;
        });
    }
}
