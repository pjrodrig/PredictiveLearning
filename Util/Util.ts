export class Util {

    public static indexOf(array: Array<any>, obj: any) {
        for(let i = 0; i < array.length; i++) {
            if(array[i].isEqual(obj)) {
                return i;
            }
        }
        return -1;
    }

    public static getLogic(inputs: any, trueStrength?: number, falseStrength?: number, weight?: number): any {
        let logic: any = {};
        for(let key in inputs) {
            logic[key] = {
                check: (currentInputs:any) => {
                    return inputs[key] === currentInputs[key];
                },
                value: inputs[key],
                true: trueStrength || 0.5,
                false: falseStrength || 0.5,
                weight: weight || 0.5
            };
        }
        return logic;
    }

}
