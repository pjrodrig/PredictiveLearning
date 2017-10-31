import { Detail } from "../Detail/Detail";

class Observation {

    private tags: Array<string>;

    constructor(details: Array<Detail>, tags?: Array<string>) {
        this.tags = tags || [];
    }
}
