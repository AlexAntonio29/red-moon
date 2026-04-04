import { Estados } from "../../funciones/automata/Estados.js";

export class WalkPlayer extends Estados{


    enter(){
        console.log("Estoy en Walk");
    }

    execute(){}

    exit(){
        console.log("Saliendo de Walk");
    }
}