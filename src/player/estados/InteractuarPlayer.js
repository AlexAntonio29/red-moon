import { Estados } from "../../funciones/automata/Estados.js";

export class InteractuarPlayer extends Estados{

    enter(){
        console.log("Estoy en Interactuar");
    }

    execute(){}

    exit(){
        console.log("Saliendo Interactuar");
    }
}