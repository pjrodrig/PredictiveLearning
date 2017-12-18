import { Util } from "../../Util/index"

export class Neuron {

/**
All inputs must at least have the property "value", which is a number. that number can eventually become a list for experimentation

first an input is decided whether to be "good" or not
a prediction is made
if nothing is known about something, then there will be no prediction
if the prediction is wrong look at what changed between this time and the last time(s) and compare what changed

if the prediction is right, look at other things that did not change between this time and last time(s)

prediction should eventually be a function that returns a boolean, but for now it will just be positve, negative, or neutral
0 if it knows nothing, which would mean that we predict nothing will change.
1 if it thinks the value of this neuron will increase
-1 if it thinks the value of this neuron will decrease

the third peice is memory.
fast thread is gathering all possible neurons that fit the provided criteria
medium thread is the search through memory of what happened last time
slow thread is a weighted random based on history only through manipulation of weight

if a good thing appears in all three, then it will be most likely to be picked
if a good neuron appears in memory when making a selection, but is not necessarily reflected in the weight, it is likely to be chosen
if a neuron exists in only the possibilities, then it will be least likely to be chosen, but the choice is still random

tick tack toe inputs would be {x: 1, y: 2: value: null} there would be no labels for the entire input


breeding would consist of definitely including things that are strongly positive or negative in each parent, and picking randomly otherwise for decisions
**/

private inputs: Array<any>;
private prediction: number;
private memory: Array<any>;

    constructor(inputs: Array<any>) {

    }

    public getRelevance(inputs: Array<any>): number {
        let relevance = 0,
            jsonInputs = inputs.map((input) => JSON.stringify(input, Object.keys(input).sort()));
        for(let i = 0; i < jsonInputs.length; i++) {
            if (jsonInputs === JSON.stringify(sortMyObj, Object.keys(sortMyObj).sort())) {
                relevance++;
            }
        }
        return relevance;
    }

    public getWeight(inputs: Array<any>): number {

    }

}
