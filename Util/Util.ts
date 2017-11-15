export class Util {

    public static indexOf(array: Array<any>, obj: any) {
        for(let i = 0; i < array.length; i++) {
            if(array[i].isEqual(obj)) {
                return i;
            }
        }
        return -1;
    }

    public static getRandomLogic(inputs: any): any {
        let randomLogic: any = {},
            keys: Array<string> = Object.keys(inputs),
            key: string;
        for(let i = Math.floor(Math.random() * keys.length); i > 0; i--) {
            key = keys.splice(Math.floor(Math.random() * keys.length), 1)[0];
            randomLogic[key] = (currentInputs: any) => {
                return inputs[key] === currentInputs[key];
            }
        }
        return randomLogic;
    }

}
