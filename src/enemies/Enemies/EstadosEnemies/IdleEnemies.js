import { Estados } from "../../../funciones/automata/Estados.js";

export class IdleEnemies extends Estados{


    enter(){
     //aclarar color
     
     //this.objeto.clearTint();

    this.objeto.setVelocity(0);
    this.objeto.play(this.objeto.dataEnemie.diseno+"_idle");
    //this.objeto.sonido.play();
    }

    execute(){

        this.objeto.setDistanciaSonido();

        if(this.objeto.getDistanciaPlayer()<this.objeto.dataEnemie.distancia_vista){
            this.objeto.maquina.cambiarEstado('Seguir');
        }



        



    }

    exit(){
       // this.objeto.sonido.stop();

    }
}