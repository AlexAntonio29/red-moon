import { cargarPalancas1 } from "../tipoEscenario/escenario1/cargarPalancas1.js";

export const seleccionarPalancas=(scene)=>{

let palancas;

    switch(scene.tipoEscenario){

        case 1:


        palancas= new cargarPalancas1(scene);
        break;

        default:
            palancas= new cargarPalancas1(scene);
        break;

    }


    return palancas;
}