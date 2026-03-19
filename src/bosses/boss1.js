
import { Bosses } from "./Bosses.js";

export class boss1 extends Bosses {

        constructor(scene, dataEnemie, x=0,y=0){


            

        super(scene,dataEnemie,x,y);

        //this.distanciaAtaque=scene.physics.add.sprite(0,0,null);

        //this.distanciaAtaque.body.setSize(300,300);
        this.setDisplaySize(256,256);

        this.setOrigin(0,0);
        this.body.setSize(16,16);
        this.body.setOffset(25,32);

    }

    

    setMovimientoEnemigo(player,contacto,contactoAtaque,contactoEnemigo){
        super.setMovimientoEnemigo(player,contacto,contactoAtaque,contactoEnemigo);

        //this.distanciaAtaque.setPosition(this.x,this.y);

    }
}