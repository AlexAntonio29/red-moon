

export const evento1_5=(scene)=>{

   console.log("Ejecutando Evento1_5");



      agregarObjeto(scene.bloqueoTemporal,8026,5777,480,48,scene);
      agregarObjeto(scene.bloqueoTemporal2,8026,6620,700,48,scene);



   

    //activar o desactivar input player

    



    

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