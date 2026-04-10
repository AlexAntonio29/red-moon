import { crearEnemigo } from "../../enemies/crearEnemigo.js";


export class evento1_5{

constructor(scene,movePlayer){

  //this.scene,this.player,movePlayer,this.lights
     console.log("Ejecutando Evento1_5");

      this.scene=scene;
      this.nombre='evento1_5';
      this.camera=scene.camera;
      this.player=scene.player;
      

      


      this.player.isInputActive=movePlayer;



      this.bloqueoTemporal;
      this.bloqueoTemporal2;


      this.agregarObjeto(scene);

      this.agregarCollision(scene.player,this.bloqueoTemporal,scene);
      this.agregarCollision(scene.player,this.bloqueoTemporal2,scene);

      this.crearBoss1(scene);

    //activar o desactivar input player

    //console.log(scene.listaNpc);


    
   


}


crearBoss1(scene){


      scene.listaNpc.getChildren().forEach((npc)=>{

        if(npc.dataNpc.nombre==='cuidadora'){
            console.log(npc.dataNpc);

            npc.getEliminarNpc();
        }


    });


  this.boss1=crearEnemigo(1,7860,5900,10,scene);

    this.scene.physics.add.overlap(this.boss1,this.bloqueoTemporal,()=>{
      this.boss1.setVelocity(0);
      console.log('Boss1 tocando muro');
    })

    this.scene.physics.add.overlap(this.boss1,this.bloqueoTemporal2,()=>{
      this.boss1.setVelocity(0);
      console.log('Boss1 tocando muro');
    })



  this.agregarCollision(this.boss1,this.bloqueoTemporal,scene);
  this.agregarCollision(this.boss1,this.bloqueoTemporal2,scene);

      scene.time.delayedCall(12501,()=>{



      this.aplicarCamara(scene);
    })


      for(let i=scene.listaLucesObjetos.length-1;i>=0;i--){
          const luz=scene.listaLucesObjetos[i];

          if(luz.x===8052&&luz.y===6161){
            //luz.destroy();
            scene.lights.removeLight(luz);
            scene.listaLucesObjetos.splice(i,1);
          }
      }

      scene.time.delayedCall(500,()=>{

        scene.listaLucesObjetos.push(
      scene.lights.addLight(8052, 6161, 1000) 
    .setColor(0xFF0000) 
    .setIntensity(1.5)
      );
      })

      
   

}



aplicarCamara(scene){

 scene.cameras.main.setBounds(7600,5750,500,850);


}





crearSonido(scene){

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


agregarObjeto(scene){

        //this.agregarObjeto(this.bloqueoTemporal,8026,5777,480,48,scene);
      //this.agregarObjeto(this.bloqueoTemporal2,8026,6620,700,48,scene);

   

            this.bloqueoTemporal=scene.add.zone(
            8026, 
            5777, 
            480, 
            48);

            this.bloqueoTemporal2=scene.add.zone(
            8026, 
            6620, 
            700, 
            48);


        this.quitarMovimiento(this.bloqueoTemporal);
        this.quitarMovimiento(this.bloqueoTemporal2);


        

}

quitarMovimiento(objeto){

        this.scene.physics.add.existing(objeto);
          
        objeto.body.setAllowGravity(false);

        objeto.body.moves=false;
        objeto.body.setAllowGravity(false);
        objeto.body.setImmovable(true);
        objeto.body.pushable = false;
        objeto.body.setMass(Number.MAX_VALUE);
    }

agregarCollision(objeto1,objeto2 ,scene){

      console.log("Boss1 "+objeto1);
      console.log("bloqueo "+objeto2)

        this.collisionTemporal = scene.physics.add.collider(objeto1,objeto2,()=>{
         
        });


}


update(){
  //aqui se ejecuta un evento en tiempo real, esto sirve para eliminar las condiciones de una accion del evento
  //por ejemplo en este activas al boss1 y cuando se muere aqui se ejecuta el update y se elimina las condiciones
}


}


