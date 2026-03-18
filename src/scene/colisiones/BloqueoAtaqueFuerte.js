import { CondicionBloqueo } from "./CondicionBloqueo.js";

export class BloqueoAtaqueFuerte extends CondicionBloqueo {
    constructor() {
        super();
        this.destruirBloque = true; 
    }

    puedePasar(playerInstance) {
        
        
        if (playerInstance.esAtaqueFuerte && playerInstance.state === "attack") {
            return true;
        }
        return false;
    }
    
}