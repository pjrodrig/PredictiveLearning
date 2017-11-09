"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MathUtil {
    static sum(a, b) {
        return a + b;
    }
    static weightedRandom(weightedArray, total) {
        total = total || this.getTotalWeight(weightedArray);
        let selection = total - (Math.random() * total);
        for (let i = 0; selection >= 0; i++) {
            selection = selection - weightedArray[i].weight;
        }
    }
    static getTotalWeight(weightedArray) {
        return weightedArray.reduce((total, item) => {
            return total + item.weight;
        }, 0);
    }
}
exports.MathUtil = MathUtil;
