import { Estados } from "../../funciones/automata/Estados.js";

export class HurtPlayer extends Estados{

    enter(){
        console.log("Estoy En Hurt")

        this.objeto.player.play("hurt_sword");

        this.verificarIdle();


    }

    execute(){

        if(this.objeto.getVida()<=0){  
            this.objeto.atacado=false;
           
            this.objeto.automata.cambiarEstado('Dead');}

    }

    exit(){



        console.log("Estoy Saliendo de Hurt")
    }

        verificarIdle(){

         if(this.objeto.getVida()>=0) 
        this.objeto.player.once("animationcomplete", (anim)=>{

            this.objeto.automata.cambiarEstado('Idle');
            this.objeto.atacado=false;
        });

    }
}