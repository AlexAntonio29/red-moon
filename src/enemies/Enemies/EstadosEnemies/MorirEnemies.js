import { Estados } from "../../../funciones/automata/Estados.js";
import { crearItemsPunto } from "../../../funciones/crearItemsPuntos.js";

export class MorirEnemies extends Estados{

    enter(){

        console.log("this.objeto derrotado");
        

        crearItemsPunto(
            this.objeto.scene,
            this.objeto.dataEnemie.items,
            this.objeto.scene.items_punto,
            this.objeto.getPositionX(),
            this.objeto.getpositionY(),
            false,
            this.objeto.scene.player.getContainer(),
            this.objeto.scene.lights);

             

            console.log(this.objeto);
              if(this.objeto){
                //this.objeto.body.destroy();
                //this.objeto.setMuertethis.objeto();
                this.objeto.sonido.stop(0);
                this.objeto.disableBody(true,true);

                this.objeto.scene.time.delayedCall(50, () => {
                this.objeto.hitbox.destroy();
                this.objeto.body.destroy();
                this.objeto.destroy();


            });

              
           

             
            
            }

            
              //this.objeto.setMuertethis.objeto();
              console.log("this.objeto eliminado");
    }

    execute(){}

    exit(){

    }
}