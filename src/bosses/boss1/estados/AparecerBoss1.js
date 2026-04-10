import { Estados } from "../../../funciones/automata/Estados.js";

export class AparecerBoss1 extends Estados{

    enter(){

        this.objeto.play('boss1_aparecer');

        this.objeto.sound_evento1.play();
        this.objeto.sound_evento2.play();
        this.objeto.sound_evento3.play();

        //this.objeto.sound_gritoNpc1.play();
        this.objeto.sound_gritoNpc2.play();

        this.objeto.sound_huesos1.play();
        this.objeto.sound_huesos2.play();

        //colocar varios sonidos para la transformacion


        //sonido grito

        this.objeto.scene.time.delayedCall(9000,()=>{
            
            this.objeto.sound_huesos2.stop();

            this.objeto.scream.play();
            this.objeto.scene.cameras.main.shake(3000, 0.02);
        })

        this.verificarIdle();


    }

    execute(){

        this.objeto.setVelocity(0);
    }

    exit(){
        this.objeto.scene.musicaFondo.volume=0.1;
        this.objeto.soundtrack.play();
        //this.objeto.getBarraVida();
        this.objeto.activarBarraVida=true;
        
    }


        verificarIdle(){

                
        this.objeto.off('animationcomplete');
        this.objeto.on("animationcomplete", (anim)=>{
             this.objeto.maquina.cambiarEstado('Idle');
        });

    }
}