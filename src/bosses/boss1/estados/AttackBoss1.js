import { Estados } from "../../../funciones/automata/Estados.js";

export class AttackBoss1 extends Estados{

    enter(){
        console.log("estoy en ataque boss1");

        let aleatorio=Math.floor(Math.random() * 6) + 1;
        console.log(aleatorio);


        this.desgaste=(aleatorio<=2)?50
        :(aleatorio<=5)?100:200;



        this.ataque='boss1_ataque'+aleatorio

        this.objeto.play(this.ataque);

        

        this.verificarIdle();




    }
    
    execute(){



        if(this.objeto.scene.physics.overlap(
            this.objeto,
            this.objeto.scene.player.spriteAtaque
        )){
            console.log("contacto ataque con enemigo")
            this.objeto.maquina.cambiarEstado('Golpeado')

        }
    }


    exit(){
        console.log("salir ataque boss1");

        this.ataque=null;
        this.desgaste=null;
    }


    verificarIdle(){

        this.objeto.once("animationcomplete", (anim)=>{

            this.objeto.stamina=this.objeto.stamina-this.desgaste;
            if(this.objeto.stamina>0)
            this.objeto.maquina.cambiarEstado('Idle');
            else this.objeto.maquina.cambiarEstado('Descansar');
        });

    }
}