import { Estados } from "../../../funciones/automata/Estados.js"
import { empujar } from "../../../funciones/empujar.js";


export class AturdidoBoss1 extends Estados{

    enter(){

        this.objeto.state='aturdido';

        console.log("aturdido")
        this.objeto.play("boss1_aturdido");
        
        this.objeto.scene.time.delayedCall(3000,()=>{
            this.verificarIdle();
        })
    }



    execute(){

        this.objeto.setVelocity(0);

        this.objeto.scene.time.delayedCall(80,()=>{this.objeto.setPipeline('Light2D');})


        if(this.objeto.vida<=0){
            this.objeto.maquina.cambiarEstado('Morir')
        }



        if(this.objeto.scene.physics.overlap(
            this.objeto,
            this.objeto.scene.player.spriteAtaque
        )){
            console.log("golpeado")
            empujar(
                        this.objeto.scene.player.spriteAtaque,
                        this.objeto.getContainer(),
                        1,
                        this.objeto.scene.player.contacto,
                        this.objeto.scene,
                        this.objeto.fuerzaResistencia);
                        this.objeto.seleccionarAnimacionAtaque();
                        this.objeto.setPipeline('MultiPipeline');
            //this.objeto.maquina.cambiarEstado('Golpeado')

        }




    }


    exit(){
        console.log("FINALIZAR aturdido")
        this.objeto.setPipeline('Light2D');
    }

        verificarIdle(){
       
            if(!this.objeto.estaMuerto)
            this.objeto.maquina.cambiarEstado('Idle');
       

    }

}