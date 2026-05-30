import { Estados } from "../../../funciones/automata/Estados.js"

export class EstatuaActivo extends Estados{
    enter(){
        console.log("EstatuaActivo");
                 this.objeto.scene.hudTextoInteraccion.text=this.objeto.mensaje;   
                 this.objeto.scene.hudTextoInteraccion.setPosition(
                    (this.objeto.scene.hudBackgroundInteraccion.x)+(this.objeto.scene.hudBackgroundInteraccion.width/2) - this.objeto.scene.hudTextoInteraccion.width/2,
                    this.objeto.scene.hudTextoInteraccion.y
                 )   
                this.objeto.scene.hudContainerInteraccion.visible=true;
                
                 this.objeto.esActivado();
    }

    execute(){

        

            if(!this.objeto.scene.physics.overlap
                (this.objeto.scene.player,this.objeto.hitbox) ) {
     console.log("Activando Estatua");
      
      this.objeto.automata.cambiarEstado("EstatuaInactivo");
    }
    }

    exit(){
            console.log("Saliendo de estatua activo");
    }
}