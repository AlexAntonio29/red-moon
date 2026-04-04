import { Estados } from "../../funciones/automata/Estados.js";

export class DeadPlayer extends Estados{

    enter(){
        console.log("Estoy en Dead");
    }

    execute(){}

    exit(){

        console.log("Saliendo de Dead");
    }
}