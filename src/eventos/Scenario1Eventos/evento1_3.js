

export const evento1_3=(scene,player,lights,movePlayer=true, playerAtributos)=>{

   

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

 

    const recuerdo= scene.add.image(scene.cameras.main.centerX,
                                    scene.cameras.main.centerY,
                                    'recuerdo_casa_quemada').setScrollFactor(0);


    //recuerdo.setOrigin(0);
    recuerdo.setDepth(30);
    scene.cameras.main.flash(300,255,255,255);
   // recuerdo.setDisplaySize(scene.widthEscenario,scene.heightEscenario);
   

    scene.time.delayedCall(1500,()=>{
    
      scene.cameras.main.flash(300,255,255,255);
      recuerdo.destroy();
    })


    
    

}

const crearSonido=(scene)=>{

    const sound_flashBack= scene.sound.add('flashback', {
    loop: false,
    volume: 2   // volumen entre 0 y 1
  });



  sound_flashBack.play();
}