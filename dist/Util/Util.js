"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static indexOf(array, obj) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].isEqual(obj)) {
                return i;
            }
        }
        return -1;
    }
}
exports.Util = Util;
