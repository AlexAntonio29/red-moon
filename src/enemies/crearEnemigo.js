
import {dataEnemigos} from "../enemies/DataEnemies.js"
import {dataBosses} from "../bosses/dataBosses.js"
import { Enemie1 } from "./Enemie1/Enemie1.js";
import { Enemie4 } from "./Enemie4/Enemie4.js";
import { Enemie5 } from "./Enemie5/Enemie5.js";
import { empujar } from "../funciones/empujar.js";
import { boss1 } from "../bosses/boss1/boss1.js";


export const crearEnemigo=(n=1, x,y,selector=0, scene)=>{

 if(n!==0){
    for(let i=0;i<n;i++){
  let enemigo;
  
      if(x===undefined){
        x=Math.floor(Math.random() * ((scene.widthEscenario-30) - 0 + 1)) + 0;
      }

      if(y===undefined){
            y=Math.floor(Math.random() * ((scene.heightEscenario-30) - 0 + 1)) + 0;
      }

    

  switch(selector){

    case 0:

    enemigo=new Enemie1(scene,({...dataEnemigos[selector]}),x,y);

    break;

    case 3:

  
    enemigo=new Enemie4(scene,({...dataEnemigos[selector]}),x,y);

    break;


    case 4:

  
    enemigo=new Enemie5(scene,({...dataEnemigos[selector]}),x,y);

    break;

    case 10:

    enemigo= new boss1(scene,({...dataBosses[0]}),x,y);

    break;

    default:

    enemigo=new Enemie1(scene,({...dataEnemigos[0]}),x,y);
    break;


    
  }




 

      //let valor=Math.floor(Math.random() * 4) + 0;
      //aqui va el valor del tipo de enemigo
      //se debe de modificar con el paso del tiempo para la variacion de enemigo
      //por el momento puse cero ya que es el valor del primero enemigo en el arreglo


      
   
   

      
   




    scene.collisionMurosObjetos(enemigo);



    enemigo.setPipeline('Light2D');

   
    scene.listaEnemigos.add(enemigo);

   
  
    return enemigo;
    

  }

  
   

    // scene.collisionPlayerEnemigo();
     scene.collisionEnemigoEnemigo();
     //scene.colisionesEnemigo();
  } else console.log("Tope al maximo no se crearan enemigo: "+scene.listaEnemigos.countActive(true));
  

   

}