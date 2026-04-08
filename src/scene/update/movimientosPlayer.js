export const movimientosPlayer =(scene)=>{


     scene.player.setMovimientoPlayer();
    
     //scene.player.getAtaque(scene.listaEnemigos,scene.contactoSprites,scene.items_punto);

     //pausar juego

     if(Phaser.Input.Keyboard.JustDown(scene.keys.ESC))scene.pausarEscena();


     
    if(scene.player.getHabilitarCollision()){
        //console.log("Habilitando Collsion ITEM NUEVO");
        // scene.collisionRecogerItemBasura(); 
         scene.player.setHabilitarCollision(false);
        }



   
    if(scene.player.curando) {
      console.log("subiendo barra de salud");
      scene.getBarraVida();
      scene.getCuraciones();
      scene.player.curando=false;
    
    }

    //estamina

    
    if(scene.player.stamina<scene.player.staminaMax){

      //console.log("recuperando");

      scene.player.stamina+=scene.player.velocidad_recuperacion;


      scene.getBarraStamina();
      
      if(scene.player.stamina>=scene.player.staminaMax){
        scene.player.stamina=scene.player.staminaMax;
        scene.player.recuperando=false;
      }
    }



    //Crear vista de player con item


}