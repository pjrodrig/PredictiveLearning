/*
a single thought/neural network should make choices for what they think is right
this is enforced over time and written into the dna

a goal is given a score
this score represents the number of games/operations the thought has left
there should be a maximum number of total thoughts that can survive
and a maximum amount of memory that can be consumed
the number of generations would be specified at the start

start with base game. every time a decision is made, split the game into x number
of possible choices

should track lifetime wins

those that live longer breed more often

start with x number of new thoughts
all play the game with a weighted random for decisions
every x rounds they breed
after breeding, sort by youngest to oldest thought
remove oldest down to maxium nubmer of entities
*/
export class PopulationManager {

    private entities: Array<Thought>;
    constructor(private maxTicks: number, privatemaxEntities: number, maxMemory: number) {
        this.entities = [];
        this.start();
    }

    private start(): void {
        tick();
    }

    private tick(): void {

    }

    private sortEntitiesBy() {
        //sort array by remaining lifespan
        //slice array down to the total or maxium
        //--maybe remove randomly from the lowest pool
        //normalize (or semi normalize) lifespan
        //start a new generation

    }


}
