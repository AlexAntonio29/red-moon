import { Estados } from "../../../funciones/automata/Estados.js"

export class DescansandoBoss1 extends Estados{

    enter(){




                    this.objeto.state='descansando';

        console.log("ENTER DESCANSANDO")
        this.objeto.play("boss1_agotado");
        

        

    }



    execute(){

        if(this.objeto.vida<=0){
            this.objeto.maquina.cambiarEstado('Morir')

            
        }else{

                    this.objeto.setVelocity(0);

        if(this.objeto.scene.physics.overlap(
            this.objeto,
            this.objeto.scene.player.spriteAtaque
        )){
            console.log("contacto ataque con enemigo")
            this.objeto.maquina.cambiarEstado('Golpeado')

        }else
        if(this.objeto.stamina>=50)
            this.objeto.maquina.cambiarEstado('Idle');

        }




    }


    exit(){
        console.log("FINALIZAR DESCANSANDO")
    }

}