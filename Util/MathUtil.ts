export class MathUtil {

    public static sum(a: number, b: number) {
        return a + b;
    }

    public static weightedRandom(weightedArray: Array<any>, total?: number) {
        total = total || this.getTotalWeight(weightedArray);
        let selection = total - (Math.random() * total);
        for(let i = 0; selection >= 0; i++) {
            selection = selection - weightedArray[i].weight;

        }
    }

    private static getTotalWeight(weightedArray: Array<any>): number {
        return weightedArray.reduce((total: number, item: any) => {
            return total + item.weight;
        }, 0);
    }

}
