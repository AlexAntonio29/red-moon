export const movimientoItemToPlayer=(scene)=>{



  scene.items_punto.children.iterate(item=>{
    if(item.moveToPlayer){
      let velocidad=Math.floor(Math.random() * (500 - 300 + 1)) + 300;
   // scene.time.delayedCall(1000, () => {
   

    item.light.setPosition((item.x)+item.displayWidth/2,(item.y)+item.displayHeight/2)
    
    scene.physics.moveToObject(item, scene.player.getContainer().body, velocidad);
    //});
    }

  });
}