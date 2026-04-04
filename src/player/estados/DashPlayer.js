import { Estados } from "../../funciones/automata/Estados.js";

export class DashPlayer extends Estados{

    enter(){
        console.log("Estoy en Dash")
    }

    execute(){}

    exit(){

        console.log("Estoy Saliendo de Dash");
    }
}