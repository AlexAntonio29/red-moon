import { Estatua } from "../Estatua.js";



export const crearCheckpoint =(x,y,id,scene)=>{

  let checkpoint=new Estatua(scene,x,y,id);
    checkpoint.setPipeline('Light2D');
 

  scene.physics.add.collider(scene.player.getContainer(),checkpoint,()=>{
  
   
  });



  scene.physics.add.overlap(scene.player.getContainer(),checkpoint.hitbox,()=>{
    if(!scene.player.estaGuardando)
  scene.player.estaGuardando=true;
  })

   scene.listaCheckpoints.add(checkpoint);

}