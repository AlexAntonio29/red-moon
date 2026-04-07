import { Estados } from "../../../funciones/automata/Estados.js"
import { empujar } from "../../../funciones/empujar.js";


export class AturdidoBoss1 extends Estados{

    enter(){

        console.log("aturdido")
        this.objeto.play("boss1_aturdido");
        
        this.objeto.scene.time.delayedCall(3000,()=>{
            this.verificarIdle();
        })
    }



    execute(){

        this.objeto.setVelocity(0);

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
            //this.objeto.maquina.cambiarEstado('Golpeado')

        }




    }


    exit(){
        console.log("FINALIZAR aturdido")
    }

        verificarIdle(){
       

            this.objeto.maquina.cambiarEstado('Idle');
       

    }

}