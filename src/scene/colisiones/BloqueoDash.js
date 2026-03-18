import { CondicionBloqueo } from "./CondicionBloqueo.js";

export class BloqueoDash extends CondicionBloqueo {
    constructor() {
        super();
        // El foso no se destruye como la roca, se queda en el mapa
        this.destruirBloque = false; 
    }

    puedePasar(playerInstance) {
        // En la función movimientoDash(), se puso this.state="dash"
        // Aquí leemos exactamente ese estado
        if (playerInstance.state === "dash") {
            return true; // Ignora la colision, el jugador "vuela" sobre el foso
        }
        
        return false; // Si está en "idle", "walk" o "attack", choca como pared
    }
}