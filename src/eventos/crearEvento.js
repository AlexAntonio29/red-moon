


export const crearEvento=(
    x,y,width,height,tiempoEvento,tiempoTraslado, 
    xadd,yadd, zoom,ocultarHUD ,accion,movePlayer,
    id,esActivo,scene, ScenarioEvento)=>{


    
      /*
      

       let x=4400;
       let y=8525;
       
       let width=400;
       let height=250;
      */



        

      //aqui el tipo de evento se debe seleccionar del escenario
      let evento = new ScenarioEvento(scene,x,y,width,height,scene.player.getContainer(),scene.camera,scene.lights, scene.player,id, esActivo);

      scene.physics.add.overlap(
        scene.player.getContainer(),
        evento,
        (player, evento)=>{

          
          let xMovCamera=x+(width/2); //-(scene.widthPantalla/2)//
          let yMovCamera=y+(height/2); //-(scene.heightPantalla/2)//

          if(!evento.esActivado&&evento.esActivo){
                evento.setCollisionEvento(xMovCamera+xadd,yMovCamera+yadd,tiempoEvento,tiempoTraslado,zoom,ocultarHUD,accion,movePlayer);
                
              }
              });
      
          
      scene.listaEventos.add(evento);


      



}