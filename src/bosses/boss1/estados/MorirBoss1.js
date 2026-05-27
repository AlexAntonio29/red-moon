import { MorirEnemies } from "../../../enemies/Enemies/EstadosEnemies/MorirEnemies.js";
import { Estados } from "../../../funciones/automata/Estados.js";
import { crearItemsPunto } from "../../../funciones/crearItemsPuntos.js";

export class MorirBoss1 extends Estados{


    enter(){

        console.log(this.objeto.state);

        
        this.objeto.state='morir';
         this.objeto.play('boss1_muerto');

        this.objeto.sound_blood.play();
        this.objeto.scene.musicaFondo.volume=0.5;
        this.objeto.soundtrack.stop();
        this.objeto.estaMuerto=true;
        this.objeto.body.setEnable(false);
        this.objeto.hitbox.destroy();
        this.objeto.body.enable=false;
        
        this.objeto.sonido.stop();

        this.objeto.contenedorVida.destroy();

       

        console.log('execute antes de terminar animacion')

    
        this.objeto.once('animationcomplete',()=>{
            if(this.objeto.state==='morir'){
                //this.objeto.anims.stop();
                   /*   crearItemsPunto(
            this.objeto.scene,
            this.objeto.dataEnemie.items,
            this.objeto.scene.items_punto,
            this.objeto.x+this.objeto.displayWidth/2,
            this.objeto.y+this.objeto.displayHeight/2,
            false,
            this.objeto.scene.player.getContainer(),
            this.objeto.scene.lights);
            */
                   crearItemsPunto(
            this.objeto.scene,
            this.objeto.dataEnemie.items,
            this.objeto.scene.items_punto,
            this.objeto.x+this.objeto.displayWidth/2,
            this.objeto.y+this.objeto.displayHeight/2,
            false,
            this.objeto.dataEnemie.puntos,
            this.objeto.scene.lights
          );
          console.log('Animacion terminada');
            }
        })



        

    }

    execute(){

        
    }

    exit(){
        console.log('salir MORIR');

        console.log(this.objeto.state);


    }

}