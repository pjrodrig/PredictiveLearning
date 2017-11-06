export class MathUtil {

    public static sum(a, b) {
        return a + b;
    }

    public static weightedRandom(weightedArray: Array<any>, total?: number) {
        total = total || getTotalWeight(weightedArray);
        let selection = total - (Math.random() * total);
        for(let i = 0; selection >= 0; i++) {
            selection = selection - weightedArray[i].weight;
            
        }
    }

    private static getTotalWeight() {
        weightedArray.reduce((total, item) => {
            return total + item.weight;
        }, 0);
    }

}
