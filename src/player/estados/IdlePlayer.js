import { Estados } from "../../funciones/automata/Estados.js";

export class IdlePlayer extends Estados{


    enter(){

        console.log('Entrando en Idle');
        this.objeto.player.setVelocity(0);
        
    }

    execute(){

        
    }

    exit(){
        console.log("saliendo de idle");
    }
}