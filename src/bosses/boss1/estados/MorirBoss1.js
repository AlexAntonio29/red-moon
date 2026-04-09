import { MorirEnemies } from "../../../enemies/Enemies/EstadosEnemies/MorirEnemies.js";

export class MorirBoss1 extends MorirEnemies{


    enter(){
        this.objeto.scene.musicaFondo.volume=0.5;
        this.objeto.soundtrack.stop();

    }

    execute(){

    }

    exit(){

    }

}