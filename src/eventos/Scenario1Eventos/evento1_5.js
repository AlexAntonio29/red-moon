import { crearEnemigo } from "../../enemies/crearEnemigo.js";


export class evento1_5{

constructor(scene,movePlayer){

  //this.scene,this.player,movePlayer,this.lights
     console.log("Ejecutando Evento1_5");

      this.scene=scene;
      this.nombre='evento1_5';
      this.camera=scene.camera;
      this.player=scene.player;
      this.finalizado=false;


      this.player.isInputActive=movePlayer;

      agregarObjeto(scene.bloqueoTemporal,8026,5777,480,48,scene);
      agregarObjeto(scene.bloqueoTemporal2,8026,6620,700,48,scene);

    //activar o desactivar input player

    //console.log(scene.listaNpc);


    crearBoss1(scene);

   
    scene.time.delayedCall(12501,()=>{
      aplicarCamara(scene);
    })

}
}


const aplicarCamara=(scene)=>{

 scene.cameras.main.setBounds(7600,5750,500,850);


}

const crearBoss1=(scene)=>{


      scene.listaNpc.getChildren().forEach((npc)=>{

        if(npc.dataNpc.nombre==='cuidadora'){
            console.log(npc.dataNpc);

            npc.getEliminarNpc();
        }
    })

  crearEnemigo(1,7860,5900,10,scene);



}



const crearSonido=(scene)=>{

    const sound_sky= scene.sound.add('skyF1', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });


      const sound_roar= scene.sound.add('roarF1', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });


  sound_roar.play();

  sound_sky.play();
}


const agregarObjeto=(objeto,x,y,width,height,scene)=>{


   
            objeto=scene.add.zone(
            x, 
            y, 
            width, 
            height);

        scene.physics.add.existing(objeto);
          
        objeto.body.setAllowGravity(false);

        quitarMovimiento(objeto);
        agregarCollision(objeto,scene);

}

const quitarMovimiento=(objeto)=>{
        objeto.body.moves=false;
        objeto.body.setAllowGravity(false);
        objeto.body.setImmovable(true);
        objeto.body.pushable = false;
        objeto.body.setMass(Number.MAX_VALUE);
    }

const agregarCollision =(objeto ,scene)=>{

        scene.collisionTemporal = scene.physics.add.collider(scene.player.getContainer(),objeto);


}