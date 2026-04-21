import { Enemies } from "../enemies/Enemies/Enemies.js";


export class Bosses extends Enemies{

        constructor(scene, dataEnemie, x=0,y=0){

            
        super(scene,dataEnemie,x,y);

        this.mostrarBarraVida=true;
        this.activarBarraVida=false;
        this.estaMuerto=false;

      

    }

    setCaminar(player,contacto,contactoAtaque,contactoEnemigo){
        super.setCaminar(player,contacto,contactoAtaque,contactoEnemigo, true )
    }



    
}