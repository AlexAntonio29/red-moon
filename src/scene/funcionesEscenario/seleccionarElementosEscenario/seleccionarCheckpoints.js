import { cargarCheckpoint1 } from "../tipoEscenario/escenario1/cargarCheckpoint1.js";

export const seleccionarCheckpoints=(scene)=>{


    let checkpoints;

    switch(scene.tipoEscenario){

        case 1:
            checkpoints= new cargarCheckpoint1(scene);
        break;

        default:
            checkpoints= new cargarCheckpoint1(scene);
        break;
    }

    return checkpoints

}