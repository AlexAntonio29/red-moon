import { Enemies } from "../enemies/Enemies/Enemies.js";


export class Bosses extends Enemies{

        constructor(scene, dataEnemie, x=0,y=0){

            
        super(scene,dataEnemie,x,y);

      

    }

    setCaminar(player,contacto,contactoAtaque,contactoEnemigo){
        super.setCaminar(player,contacto,contactoAtaque,contactoEnemigo, true )
    }



    
}