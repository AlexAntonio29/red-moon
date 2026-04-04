import { Estados } from "../../funciones/automata/Estados.js";

export class HealingPlayer extends Estados{

    enter(){
        console.log("Estoy En Healing");
    }

    execute(){}

    exit(){

        console.log("Saliendo de Healing");
    }
}