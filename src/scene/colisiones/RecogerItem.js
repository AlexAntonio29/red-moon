import { CondicionBloqueo } from "./CondicionBloqueo.js";

export class RecogerItem extends CondicionBloqueo {
    constructor(nombreDelItem,id) {

        super();
        this.id=id;
        this.recogido=false;//agregar JSON
        this.nombreDelItem = nombreDelItem;
        // Cuando el jugador la pisa, el tile desaparece del mapa
        this.destruirBloque = true; 
    }

    puedePasar(playerInstance) {
        // Metemos el ítem a la mochila del jugador
        // Siempre retornamos true para que Phaser te deje atravesarlo y la escena lo borre
        return false; 
    }
} 