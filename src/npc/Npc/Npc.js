
export class Npc extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, data, x=0,y=0){
        super(scene,x,y,data.diseno+"_idle");



        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene=scene;

        
        this.dataNpc=data;

      // --- AGREGA ESTAS 3 LÍNEAS ---
    this.yaHabloTodo = false; 
    this.sonidoHablaKey = 'sonido_habla_npc'; // El nombre que pusimos en el Paso 1
    this.musicaFondoKey = null; // Por defecto ninguno tiene música
    // ----------------------------

    this.cargarAnimaciones();
    this.quitarMovimiento();
}

   // --- AGREGA ESTAS 2 FUNCIONES AL FINAL (Antes de la última llave }) ---
obtenerDialogos() {
    return this.dialogos || ["..."]; 
}
estaCercaParaHablar(player) {
    let distancia = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    return distancia < 80; 
}
    quitarMovimiento(){
        this.body.moves=false;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.pushable = false;
        this.body.setMass(Number.MAX_VALUE);
    }

    cargarAnimaciones(){
        if (!this.scene.anims.exists(this.dataNpc.diseno+"_walk")) {
            this.scene.anims.create({
                key: this.dataNpc.diseno+"_walk",
                frames: this.scene.anims.generateFrameNumbers(this.dataNpc.diseno+"_walk", { start: 0, end: 3}),
                frameRate: 3,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists(this.dataNpc.diseno+"_idle")) {
            this.scene.anims.create({
                key: this.dataNpc.diseno+"_idle",
                frames: this.scene.anims.generateFrameNumbers(this.dataNpc.diseno+"_idle", { start: 0, end: 1 }),
                frameRate: 6,
                repeat: -1
            });
        }
        this.play(this.dataNpc.diseno+"_idle");
    }

    setMovimientoNpc(scene){}


    getEliminarNpc(){
        if(this.sonido){
            this.sonido.stop();
        }

        this.destroy();
    }
}