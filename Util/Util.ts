export class Util {

    public static indexOf(array: Array<any>, obj: any) {
        for(let i = 0; i < array.length; i++) {
            if(array[i].isEqual(obj)) {
                return i;
            }
        }
        return -1;
    }

}
