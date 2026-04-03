import { Estados } from "../../../funciones/automata/Estados.js";

export class IdleEnemies extends Estados{


    enter(){
    this.objeto.setVelocity(0);
    this.objeto.play(this.objeto.dataEnemie.diseno+"_idle");
    }

    execute(){

    
        if(this.objeto.DistanciaPlayer()<this.objeto.dataEnemie.distancia_vista){
            this.objeto.maquina.cambiarEstado('Seguir');
        }



    }

    exit(){

    }
}