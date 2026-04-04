import { Estados } from "../../../funciones/automata/Estados.js";

export class IdleEnemies extends Estados{


    enter(){

    this.objeto.setVelocity(0);
    this.objeto.play(this.objeto.dataEnemie.diseno+"_idle");
    //this.objeto.sonido.play();
    }

    execute(){

    
        if(this.objeto.getDistanciaPlayer()<this.objeto.dataEnemie.distancia_vista){
            this.objeto.maquina.cambiarEstado('Seguir');
        }

        this.objeto.setDistanciaSonido();



    }

    exit(){
       // this.objeto.sonido.stop();

    }
}