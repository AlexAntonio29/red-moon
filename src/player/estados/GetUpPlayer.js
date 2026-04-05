import { Estados } from "../../funciones/automata/Estados.js";

export class GetUpPlayer extends Estados{

    enter(){

        this.objeto.player.play("getUp-player");  
        
        this.verificarIdle();
    }

    execute(){}

    exit(){}


        verificarIdle(){
        this.objeto.player.once("animationcomplete", (anim)=>{

            this.objeto.automata.cambiarEstado('Idle');
        });

    }
}