export const movimientoItems=(scene)=>{

  scene.listaCheckpoints.children.iterate(checkpoint=>{

           

              checkpoint.update();
            
            });

  scene.listaPalancas.children.iterate(palanca=>{
    if(scene.player.estaActivandoPalanca&&!scene.physics.overlap(scene.player.getContainer(),palanca)){
      {
      scene.player.estaActivandoPalanca=false;
    
    }
    }
  })


          


}
