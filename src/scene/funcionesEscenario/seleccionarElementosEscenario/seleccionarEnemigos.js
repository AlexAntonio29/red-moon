import { cargarEnemigos1 } from "../tipoEscenario/escenario1/cargarEnemigos1.js";

export const seleccionarEnemigos=(scene)=>{
    
    let enemigos;

    switch(scene.tipoEscenario){
        case 1:

        enemigos= new cargarEnemigos1(scene);
        
        break

       
        default:

        enemigos= new cargarEnemigos1(scene);
        break;
    }

    return enemigos;
}