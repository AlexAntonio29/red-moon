import { Estados } from "../../funciones/automata/Estados.js";

export class DeadPlayer extends Estados{

    enter(){
        console.log("Estoy en Dead");
        this.objeto.player.setVelocity(0);
        this.objeto.vida=0;
         this.objeto.scene.getBarraVida();
    }

    execute(){
        
    }

    exit(){

        console.log("Saliendo de Dead");
    }
}



