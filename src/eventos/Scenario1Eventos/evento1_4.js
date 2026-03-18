

export const evento1_4=(scene,player,lights,movePlayer=true, playerAtributos)=>{

   

    console.log("Ejecutando Evento1_3");

    //activar o desactivar input player

    

    playerAtributos.isInputActive=movePlayer;



    /*
    En este evento estas en una zona donde aparece desde la vista larga un dragon enorme
    */

    crearRecuerdo(scene,player,lights);

    crearSonido(scene);

    //mov camera

    



    

}


const crearRecuerdo=(scene,player,lights)=>{

 

    const lov1= scene.physics.add.sprite(player.x,player.y+1500,'enemieF2');

    lov1.setAngularVelocity(-10);

    scene.anims.create({
        key: "mov_lov1",
        frames: scene.anims.generateFrameNumbers('enemieF2', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
          });

   


    //recuerdo.setOrigin(0);
    lov1.setDepth(19);
    lov1.setScale(4);//lov1.setScale(5);
    
   // recuerdo.setDisplaySize(scene.widthEscenario,scene.heightEscenario);
   lov1.play("mov_lov1");
   

    scene.time.delayedCall(300,()=>{
    
      
      //recuerdo.destroy();
      lov1.setVelocityY(80);
    })

    lov1.setPipeline('Light2D');

    scene.cameras.main.shake(6000, 0.01);

    
    

}

const crearSonido=(scene)=>{

    const sound_roar= scene.sound.add('roarF2', {
    loop: false,
    volume: 1  // volumen entre 0 y 1
  });

   const sound_sismo= scene.sound.add('sismoF2', {
    loop: false,
    volume: 2  // volumen entre 0 y 1
  });



  sound_roar.play();
  sound_sismo.play();
}