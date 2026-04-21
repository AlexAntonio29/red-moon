import { BloqueoAtaqueFuerte } from "../scene/colisiones/BloqueoAtaqueFuerte.js";
import { BloqueoDash } from "../scene/colisiones/BloqueoDash.js";
import { BloqueoItem } from "../scene/colisiones/BloqueoItem.js";
import { RecogerItem } from "../scene/colisiones/RecogerItem.js";



export const checkCondicionBloque =(objeto, tile,scene)=>{

  let idLlave=0;
    // 1. Si el que choca no es el player (ej. un enemigo), funciona como pared normal
    if (objeto !== scene.player.getContainer()) {
        return true; 
    }
   

    // 2. Leemos la propiedad que se puso en Tiled para saber que tipo de obstáculo es
    // Si no tiene la propiedad "tipoBloqueo", es una pared normal e impenetrable
    if (!tile.properties || !tile.properties.tipoBloqueo) {
        return true; 
    }

    let manejadorBloqueo = null;
    let tipo = tile.properties.tipoBloqueo;


    console.log(tipo);


    // 3. EL SWITCH: Asignamos la clase hija correcta segun el tipo de tile en Tiled
   switch (tipo) {
        case "roca_fuerte":
            manejadorBloqueo = new BloqueoAtaqueFuerte();
            break;

        case "foso":
            manejadorBloqueo = new BloqueoDash();
            break;

        case "puerta_llave":

            // Esta es la puerta. Exige la "llave_roja"
            manejadorBloqueo = new BloqueoItem("llave_roja"); 

            
            break;

        // ==========================================
        // NUEVO CASO: ESTE SIRVE PARA CUANDO RECOGA LA LLAVE DEL SUELO
        // ==========================================
        case "recoger_item":
            // Esta es la llave. Te regala la "llave_roja"
            manejadorBloqueo = new RecogerItem("llave_puerta");

            break;
       
        default:
            console.log('NO PASA');
            return true;
    }

    // 4. se verifica si el jugador cumple la condicion mandando a la clase Player
    // (Usamos scene.player porque 'objeto' es el container
    let permisoConcedido = manejadorBloqueo.puedePasar(scene.player);

    if (permisoConcedido) {
        // Si la clase dice que el bloque se debe destruir (ej. la roca que rompiste)
        if (manejadorBloqueo.destruirBloque) {
            scene.map.removeTileAt(tile.x, tile.y, true, true, scene.blockLayer);
            
            // Aqui se puede agregar un sonido:
        }
        console.log('SI PASA');
        // Retornamos FALSE para decirle a Phaser: "IGNORA LA COLISIÓN, DÉJALO PASAR"
        return false; 
        
    } else {
        console.log('NO PASA');
        // Retornamos TRUE para decirle a Phaser: "APLICA FISICAS"
        return true; 
    }
}