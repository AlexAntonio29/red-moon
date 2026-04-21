import { npc1 } from "./Npc1/npc1.js";
import { npc2 } from "./Npc2/npc2.js";
import { npc3 } from "./Npc3/npc3.js";



export const crearNpc=(n,x,y,scene)=>{

  let npc;
    if(scene.dataNpc[n-1]){
      switch(n){
        case 1:

        npc= new npc1(scene,scene.dataNpc[n-1],x,y);

        break;

        case 2:

        npc= new npc2(scene,scene.dataNpc[n-1],x,y);
        break;

        case 3:

        npc = new npc3(scene, scene.dataNpc[n-1], x, y);
              
                
                break;
        }

        // Tus físicas y luces originales
        scene.physics.add.collider(scene.player.getContainer(), npc, () => {
           
            
        });

        npc.setPipeline('Light2D');
        scene.listaNpc.add(npc);
    }



}