import { Palanca } from "./Palanca.js";


export const crearPalanca=(x,y,id,idPuerta,scene)=>{

  let palanca= new Palanca(scene,x,y,id,idPuerta);



  palanca.setPipeline('Light2D');

  scene.physics.add.collider(scene.player.getContainer(),palanca.hitbox);
  scene.physics.add.overlap(scene.player.getContainer(),palanca,()=>{
    
    scene.player.estaActivandoPalanca=true;
    scene.hudContainerInteraccion.visible=true;
  });

 
  scene.listaPalancas.add(palanca);


  



}