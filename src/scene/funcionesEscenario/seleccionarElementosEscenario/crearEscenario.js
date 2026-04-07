import { mapa1 } from "../tipoEscenario/escenario1/mapa1.js";

export const  crearEscenario=(scene)=> {

    
        let mapa
        switch(scene.tipoEscenario){

            case 1:

                mapa= new mapa1(scene);

                break;


                default:
                mapa= new mapa1(scene);
                break;
            
        }


    return mapa;


}