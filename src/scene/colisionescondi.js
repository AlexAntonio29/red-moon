class colisionescondi extends Phaser.Scene {
    constructor() {
        super("colisionescondi");
    }

    create() {
        // ... inicialización de tu jugador, etc ...
        
        this.crearEscenario();
        // this.collisionMurosObjetos(this.player); 
    }

    // 1. METODO ACTUAL (MODIFICADO)
    crearEscenario() {
     
        
        // Aquí agregas la creación de la capa BLOCK
        this.blockLayer = this.map.createLayer('BLOCK', 
    [this.tileset1, this.tileset2, this.tileset3, this.tileset4, this.tileset5, this.tileset6, this.tileset7, this.tileset8, this.tileset9, this.tileset10, this.tileset11, this.tileset12], 
    0, 0
);
        this.blockLayer.setPipeline('Light2D');
    }

    // 2. METODO ACTUAL (MODIFICADO)
    collisionMurosObjetos(objeto) {
        // ... tus colliders actuales (fondo, above_collider, etc) ...

        // se agrega nuevo collider para BLOCK
        if (objeto && this.blockLayer) {
            if (this.blockLayer.layer.properties.find(p => p.name === "collider" && p.value === true)) {
                this.blockLayer.setCollisionByExclusion([-1]);
            }
            this.physics.add.collider(objeto, this.blockLayer, this.eliminarRebote, this.checkCondicionBloque, this);
        }
    }

    // 3. NUEVO MÉTODO!
    // Al mismo nivel que los demás métodos de la clase
    checkCondicionBloque(objeto, tile) {
        // ¿El jugador tiene el ítem?
        let tieneItemRequerido = false; // Cambia esto por tu variable real

        if (tieneItemRequerido) {
            return false; // Ignora la colisión, el jugador atraviesa el bloque
        } else {
            return true;  // Aplica la colisión, funciona como pared
        }
    }

    
   eliminarRebote(objeto){

    

    if(objeto.name==="player"){
    this.player.setCambiarEstado("idle");
    objeto.setVelocity(0);
  }


   // player.this.state="idle";

  }

}