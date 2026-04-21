import { Estados } from "../../funciones/automata/Estados.js";

export class HurtPlayer extends Estados{

    enter(){

        this.objeto.setPipeline('MultiPipeline');
        //console.log("Estoy En Hurt")

        this.objeto.player.play("hurt_sword");
        

        


    }

    execute(){

        if(this.objeto.getVida()<=0){  
            this.objeto.atacado=false;
           
            this.objeto.automata.cambiarEstado('Dead');}


            else this.verificarIdle();

    }

    exit(){

        this.objeto.setPipeline('Light2D');

        //console.log("Estoy Saliendo de Hurt")
    }

        verificarIdle(){

          console.log(this.objeto.player.alpha);
         //if(this.objeto.player.alpha===0.5)  
        this.objeto.player.once("animationcomplete", (anim)=>{

            this.objeto.automata.cambiarEstado('Idle');
            this.objeto.atacado=false;
            
        });

    }
}