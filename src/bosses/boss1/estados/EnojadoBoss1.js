import { Estados } from "../../../funciones/automata/Estados.js"
import { empujar } from "../../../funciones/empujar.js";


export class EnojadoBoss1 extends Estados{

    enter(){

        console.log("Enojado")
        this.objeto.play("boss1_enojado");

        this.objeto.scream.play();
        this.objeto.scene.cameras.main.shake(3000, 0.02);
        
        let aleatorio = Math.floor(Math.random() *2)+1;


        //generar un if

        if(aleatorio==1){
            //ir a idel
            this.verificarIdle();
        }
        else{
            //ir a run
            this.verificarRun();

        }
    }



    execute(){
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

        this.objeto.setVelocity(0);

        if(this.objeto.scene.physics.overlap(
            this.objeto,
            this.objeto.scene.player.spriteAtaque
        )){
            console.log("golpeado")
            //this.objeto.maquina.cambiarEstado('Golpeado')

        }


    }


    exit(){
        console.log("FINALIZAR enojado")
    }

        verificarIdle(){
            
                this.objeto.off('animationcomplete');

        this.objeto.on("animationcomplete", (anim)=>{

            this.objeto.maquina.cambiarEstado('Idle');
        });

    }

            verificarRun(){
            
                this.objeto.off('animationcomplete');

        this.objeto.on("animationcomplete", (anim)=>{

            this.objeto.maquina.cambiarEstado('Run');
        });

    }

}