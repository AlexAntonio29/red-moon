import { cargarNpcs1 } from "../tipoEscenario/escenario1/cargarNpcs1.js";

export const seleccionarNpc=(scene)=>{


    let npcs;


    switch(scene.tipoEscenario){

        case 1:

        npcs= new cargarNpcs1(scene);
        break;

        default:

        npcs= new cargarNpcs1(scene);
        break;
    }


    return npcs;

}