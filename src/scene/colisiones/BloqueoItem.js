import { CondicionBloqueo } from "./CondicionBloqueo.js";

export class BloqueoItem extends CondicionBloqueo {
    constructor(itemRequerido,id) {
        super();
        this.id=id;
        this.objetoRecogido=false;
        this.itemRequerido = itemRequerido;
        // Si el jugador tiene el ítem, la puerta se destruye (se abre)
        this.destruirBloque = true; 
    }

    puedePasar(playerInstance) {
        // Verificamos si la mochila existe y si tiene el ítem
        if (playerInstance.inventario && playerInstance.inventario.includes(this.itemRequerido)) {
            console.log(`¡Puerta desbloqueada con: ${this.itemRequerido}!`);
            return true; // Déjalo pasar (y la escena destruirá el tile)
        } else {
            console.log(`La puerta está cerrada. Necesitas: ${this.itemRequerido}`);
            return false; // Funciona como pared sólida
        }
    }
} 