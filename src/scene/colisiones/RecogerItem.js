import { CondicionBloqueo } from "./CondicionBloqueo.js";

export class RecogerItem extends CondicionBloqueo {
    constructor(nombreDelItem) {
        super();
        this.nombreDelItem = nombreDelItem;
        // Cuando el jugador la pisa, el tile desaparece del mapa
        this.destruirBloque = true; 
    }

    puedePasar(playerInstance) {
        // Metemos el ítem a la mochila del jugador
        if (playerInstance.inventario) {
            playerInstance.inventario.push(this.nombreDelItem);
            console.log(`¡Recogiste: ${this.nombreDelItem}! Inventario actual:`, playerInstance.inventario);
        }
        
        // Siempre retornamos true para que Phaser te deje atravesarlo y la escena lo borre
        return true; 
    }
} 