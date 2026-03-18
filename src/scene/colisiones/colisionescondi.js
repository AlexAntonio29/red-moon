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
    [this.tileset1, this.tileset2, this.tileset3, this.tileset4, this.tileset5, this.tileset6, this.tileset7, this.tileset8, this.tileset9, this.tileset10,], 
    0, 0
);
        this.blockLayer.setPipeline('Light2D');
    }

    
    collisionMurosObjetos(objeto) {
        //  los colliders actual de BLOCK relacianado con las fisicas

        // se agrega nuevo collider para BLOCK
        if (objeto && this.blockLayer) {
            if (this.blockLayer.layer.properties.find(p => p.name === "collider" && p.value === true)) {
                this.blockLayer.setCollisionByExclusion([-1]);
            }
            this.physics.add.collider(objeto, this.blockLayer, this.eliminarRebote, this.checkCondicionBloque, this);
        }
    }

   
   
    checkCondicionBloque(objeto, tile) {
        // ¿El jugador tiene el item?
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