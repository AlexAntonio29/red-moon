import { Estados } from "../../../funciones/automata/Estados.js";
import { empujar } from "../../../funciones/empujar.js";

export class GolpeadoEnemies extends Estados{

    enter(){
        
        if(this.objeto.vida>0){

            
        this.objeto.scene.time.delayedCall(this.objeto.tiempoAturdido,()=>{
         
             if(this.objeto.scene)
            if(this.objeto.getDistanciaPlayer()<this.objeto.dataEnemie.distancia_vista){
            this.objeto.maquina.cambiarEstado('Seguir');
            }else{
            this.objeto.maquina.cambiarEstado('Idle');
        }


        })

       
        
        console.log(this.objeto.scene);
        empujar(
            this.objeto.scene.player.spriteAtaque,
            this.objeto.getContainer(),
            1,
            this.objeto.scene.player.contacto,
            this.objeto.scene,
            this.objeto.fuerzaResistencia);
        
        

         //empujar(this.spriteAtaque,enemigo.getContainer(),1,this.contacto,this.scene,this.arma.fuerza);
            
    
    }
       


    }


    execute(){

        if(this.objeto.vida<=0){
           this.objeto.maquina.cambiarEstado('Morir');
        }



    }


    exit(){

    }
}