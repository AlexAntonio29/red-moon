import { Estados } from "../../funciones/automata/Estados.js";

export class HurtPlayer extends Estados{

    enter(){
        console.log("Estoy En Hurt")
    }

    execute(){}

    exit(){

        console.log("Estoy Saliendo de Hurt")
    }
}