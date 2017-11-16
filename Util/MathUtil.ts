export class MathUtil {

    public static sum(a: number, b: number) {
        return a + b;
    }

    public static weightedRandom(weightedArray: Array<any>, total?: number, weightKey?: string): any {
        weightKey = weightKey || 'weight';
        total = total || this.getTotalWeight(weightedArray, weightKey);
        let selection = total - (Math.random() * total);
        let random;
        for(let i = 0; selection >= 0; i++) {
            random = weightedArray[i];
            selection = selection - random[weightKey];
            if(selection <= 0) {
                break;
            }
        }
        return random;
    }

    private static getTotalWeight(weightedArray: Array<any>, weightKey: string): number {
        return weightedArray.reduce((total: number, item: any) => {
            return total + item[weightKey];
        }, 0);
    }

}
