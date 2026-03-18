export class CondicionBloqueo {
    constructor() {
        this.destruirBloque = false;
    }

    puedePasar(playerInstance) {
        return false;
    }
}