

export const evento1_3=(scene,player,lights,movePlayer=true, playerAtributos)=>{

   

    console.log("Ejecutando Evento1_2");

    //activar o desactivar input player

    

    playerAtributos.isInputActive=movePlayer;



    /*
    En este evento estas en una zona donde aparece desde la vista larga un dragon enorme
    */

    crearChild(scene,player,lights);

    crearSonido(scene);

    //mov camera

    



    

}


const crearChild=(scene,player,lights)=>{

    console.log(scene);

    const child= scene.physics.add.sprite(player.x,player.y,'npc1_idle');


      scene.anims.create({
        key: "idle",
        frames: scene.anims.generateFrameNumbers('npc1_idle', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
          });

    scene.anims.create({
        key: "walk",
        frames: scene.anims.generateFrameNumbers('npc1_walk', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
          });


    child.setPipeline('Light2D');

    child.play('idle');

   
    child.setPosition(player.x+200,player.y+600);

    child.flipX=true;
     child.setDepth(5);

    scene.time.delayedCall(1500,()=>{


      child.flipX=false;
      child.setVelocityX(350);
      child.play('walk');
     

    })

    //child.setVelocityY(-620);

    
    

}

const crearSonido=(scene)=>{

    const sound_suspenso= scene.sound.add('suspenso', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });



  sound_suspenso.play();
}