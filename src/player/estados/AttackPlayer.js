import { Estados } from "../../funciones/automata/Estados.js";

export class AttackPlayer extends Estados{


    enter(){
        console.log("Estoy en attack");
    }

    execute(){}

    exit(){

        console.log("Saliendo de attack");
    }
}