import { cargarLucesEstaticas1 } from "../tipoEscenario/escenario1/cargarLucesEstaticas1.js";

export const seleccionarLucesEstaticas =(scene)=>{

let luces;

switch(scene.tipoEscenario){

    case 1:
        luces= new cargarLucesEstaticas1(scene);
    break;


    default:
    luces= new cargarLucesEstaticas1(scene);

    break;
}


return luces;

}