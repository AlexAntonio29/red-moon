export const movimientosEnemigo=(scene)=>{
     
     scene.listaEnemigos.children.iterate(enemigo=>{
      
      enemigo.setMovimientoEnemigo(scene.player.getContainer(),scene.contactoSprites[0],scene.contactoSprites[1],scene.contactoSprites[2]);
     });
   

}