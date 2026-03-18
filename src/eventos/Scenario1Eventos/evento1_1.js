

export const evento1_1=(scene,player,lights,movePlayer=true, playerAtributos)=>{

   

    console.log("Ejecutando Evento1_1");

    //activar o desactivar input player

    

    playerAtributos.isInputActive=movePlayer;



    /*
    En este evento estas en una zona donde aparece desde la vista larga un dragon enorme
    */

    crearDragon(scene,player,lights);

    crearSonido(scene);

    //mov camera

    scene.cameras.main.shake(3000, 0.02);


    

}


const crearDragon=(scene,player,lights)=>{

    console.log(scene);

    const dragon= scene.physics.add.sprite(player.x,player.y,'enemieF1');


      scene.anims.create({
        key: "mov_dragon",
        frames: scene.anims.generateFrameNumbers('enemieF1', { start: 0, end: 3 }),
        frameRate: 3,
        repeat: -1
          });


    dragon.setDepth(20);
    dragon.setScale(2);
    dragon.setPosition(player.x+(dragon.width/2),player.y+(dragon.height));

    dragon.setVelocityY(-620);

    dragon.setPipeline('Light2D');

    dragon.play('mov_dragon');
    

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