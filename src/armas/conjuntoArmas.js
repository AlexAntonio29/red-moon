import { armas } from "../items/DataItemsArmas.js";

export class conjuntoArmas{

    constructor(){
        this.armas = armas.map(a => ({ ...a }));
    }

    setArmas(){


    }

    getArmas(){

        return this.armas;

    }
}