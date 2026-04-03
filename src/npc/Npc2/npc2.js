import { player } from "../../player/player.js";
import { Npc } from "../Npc/Npc.js";

export class npc2 extends Npc{

 

        constructor(scene, data, x=0,y=0){

        super(scene,data,x,y);


        this.cargarSonido()
    }

    cargarSonido(){
        this.sonido=this.scene.sound.add('npc2_llorando',{
        loop:true,
        volume:1
      });


      this.sonido.play();
    }

    cargarAnimaciones(){


        if (!this.scene.anims.exists(this.dataNpc.diseno+"_idle")) {
        this.scene.anims.create({
        key: this.dataNpc.diseno+"_idle",
        frames: this.scene.anims.generateFrameNumbers(this.dataNpc.diseno+"_idle", { start: 0, end: 3 }),
        frameRate: 3,
        repeat: -1
          });
        }


        this.play(this.dataNpc.diseno+"_idle");
        
    }


    setDistanciaSonido(player){

            //console.log(player.x-this.x);
      //console.log(player.y -this.y);


      let distancia_sonido=1500;

      let raiz=Math.sqrt(Math.pow((player.x-this.x),2)+Math.pow((player.y-this.y),2));
      let resultado_parcial=raiz/distancia_sonido;

      let resultado_final=1-resultado_parcial;






     
      
      if(
        (player.x-this.x)<-distancia_sonido
      ||(player.x-this.x)> distancia_sonido
      ||(player.y-this.y)<-distancia_sonido
      ||(player.y-this.y)>distancia_sonido

      ){
        this.sonido.volume=0;

      }else{

        

        if(!(resultado_final<0)){
        
        this.sonido.volume=resultado_final;
      
      }
        else {
         
          this.sonido.volume=0.01;
        }




      }

      }

    setMovimientoNpc(scene, player){
      super.setMovimientoNpc(scene);

      this.setDistanciaSonido(player.getContainer());
    }




    


}