
import { Scenario1Eventos } from "../../../eventos/Scenario1Eventos.js";
import { cargarEventos } from "../tipoEscenario/escenario1/cargarEventos1.js";

export const seleccionarEventos =(scene)=>{
    
    let eventos;

    switch(scene.tipoEscenario){
        case 1:

        eventos= new cargarEventos(scene,Scenario1Eventos);
        
        break

       
        default:

        eventos= new cargarEventos(scene,Scenario1Eventos);
        
        break;
    }

    return eventos;
}