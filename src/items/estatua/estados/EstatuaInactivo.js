import { Estados } from "../../../funciones/automata/Estados.js";

export class EstatuaInactivo extends Estados{
     enter(){
        console.log("Estatua Inactivo");
        this.objeto.scene.hudContainerInteraccion.visible=false;
      
      this.objeto.scene.player.estaGuardando=false;

    }

    execute(){

              
        
  
              if(this.objeto.scene.player.estaGuardando && 
                this.objeto.scene.physics.overlap
                (this.objeto.scene.player,this.objeto.hitbox))
              {


                this.objeto.automata.cambiarEstado("EstatuaActivo");
                
                
              }
        
    }

    exit(){
        console.log("saliendo de EstatuaInactivo");
    }
}