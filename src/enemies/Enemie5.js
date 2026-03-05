import { Enemies } from "./Enemies.js";

export class Enemie5 extends Enemies{


    constructor(scene, dataEnemie, x=0,y=0){

        super(scene,dataEnemie,x,y);

        




    }


    cargarAnimaciones(){

        super.cargarAnimaciones();
        

              if (!this.scene.anims.exists(this.dataEnemie.diseno+"_attack1")) {
        this.scene.anims.create({
        key: this.dataEnemie.diseno+"_attack1",
        frames: this.scene.anims.generateFrameNumbers(this.dataEnemie.diseno+"_attack1", { start: 0, end: this.dataEnemie.end_frame_attack1 }),
        frameRate: this.dataEnemie.velocidad_frames_walk,
        repeat: 0
          });
        }
    }



    distanciaAtaque(player){


        


              let distancia_ataque=this.dataEnemie.distancia_ataque;

      if(!(
        (player.x-this.x)<-distancia_ataque
      ||(player.x-this.x)> distancia_ataque
      ||(player.y-this.y)<-distancia_ataque
      ||(player.y-this.y)>distancia_ataque)

      ){
               //this.setVelocity(0);
        if(this.anims.currentAnim?.key!==this.dataEnemie.diseno+"_attack1"){
            console.log("En ataque");
            
            this.state="attack";
            

          this.play(this.dataEnemie.diseno+"_attack1");
          console.log(this.anims.currentAnim?.key);
          
          
        }


      }else{
        if(this.state==="attack")
        {
          //this.play(this.dataEnemie.diseno+"_walk");
          this.state="idle";
        }
       
      }

    }



    setMovimientoEnemigo(player,contacto,contactoAtaque,contactoEnemigo){


        super.setMovimientoEnemigo(player,contacto,contactoAtaque,contactoEnemigo);



        this.distanciaAtaque(player);



    }
}