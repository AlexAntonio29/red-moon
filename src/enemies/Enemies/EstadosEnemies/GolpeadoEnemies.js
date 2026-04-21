import { Estados } from "../../../funciones/automata/Estados.js";
import { empujar } from "../../../funciones/empujar.js";

export class GolpeadoEnemies extends Estados{

    enter(){

       

        this.objeto.seleccionarAnimacionAtaque();


        
        this.objeto.setPipeline('MultiPipeline');
        this.objeto.setTint(0xffffff);



        

         console.log(this.objeto.maquina);
                
        empujar(
            this.objeto.scene.player.spriteAtaque,
            this.objeto.getContainer(),
            1,
            this.objeto.scene.player.contacto,
            this.objeto.scene,
            this.objeto.fuerzaResistencia);

        
        
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


        
        

         //empujar(this.spriteAtaque,enemigo.getContainer(),1,this.contacto,this.scene,this.arma.fuerza);
            
    
    }else{
        //this.objeto.spriteAtacado.setVisible(false);
        console.log('Enemigo Muerto')
    this.objeto.maquina.cambiarEstado('Morir');
    }
       


    }


    execute(){




    }


    exit(){

        //this.objeto.spriteAtacado.setVisible(false);
        console.log('SALIR GOLPEADO');
        
        this.objeto.clearTint();
       this.objeto.setPipeline('Light2D');
       // this.objeto.setPipeline(this.pipeline);
        //this.objeto.clearTint();

        console.log(this.objeto.maquina);

    }


    
}