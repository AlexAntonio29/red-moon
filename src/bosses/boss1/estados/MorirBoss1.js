import { MorirEnemies } from "../../../enemies/Enemies/EstadosEnemies/MorirEnemies.js";
import { Estados } from "../../../funciones/automata/Estados.js";

export class MorirBoss1 extends Estados{


    enter(){

   

        
        this.objeto.state='dead';

 
        this.objeto.scene.musicaFondo.volume=0.5;
        this.objeto.soundtrack.stop();
        this.objeto.estaMuerto=true;
        this.objeto.hitbox.destroy();
        this.objeto.body.enable=false;
        this.objeto.body.setEnable(false);
        this.objeto.sonido.stop();

        this.objeto.contenedorVida.destroy();

        this.objeto.play('boss1_muerto');

    

        

    }

    execute(){

        
    }

    exit(){


    }

}