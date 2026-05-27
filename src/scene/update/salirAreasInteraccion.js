export const salirAreasInteraccion=(scene)=>{

  scene.listaCheckpoints.children.iterate(checkpoint=>{
                  
              if(scene.player.estaGuardando&& !scene.physics.overlap(scene.player.getContainer(),checkpoint))
              {
                scene.player.estaGuardando=false;
                
                
              }
           
            
            });

  scene.listaPalancas.children.iterate(palanca=>{
    if(scene.player.estaActivandoPalanca&&!scene.physics.overlap(scene.player.getContainer(),palanca)){
      {
      scene.player.estaActivandoPalanca=false;
    }
    }
  })


          


}
