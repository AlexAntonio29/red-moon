
export class evento_palanca1_1 extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,palanca){

        super(scene,8080,6725,'puerta_castillo_p1');

        this.scene=scene;

        scene.add.existing (this);
        scene.physics.add.existing(this);
        this.setPipeline('Light2D');
        //this.setDepth(11);
        this.cargarAnimaciones();


    console.log("Entrando a evento 1 palanca");
    if(palanca.esActivado){

        this.play("puerta_activada_p1");
       console.log("activado");

    }else{
       this.play("puerta_desactivada_p1");

       console.log("desactivado");
    }

    }




    cargarAnimaciones(){
        if(!this.scene.anims.exists("puerta_activada_p1"))
        this.scene.anims.create({
        key: "puerta_activada_p1",
        frames: this.scene.anims.generateFrameNumbers('puerta_castillo_p1', { start: 11, end: 11 }),
        frameRate: 5,
        repeat: 0
          
        });

        if(!this.scene.anims.exists("puerta_desactivada_p1"))
        this.scene.anims.create({
        key: "puerta_desactivada_p1",
        frames: this.scene.anims.generateFrameNumbers('puerta_castillo_p1', { start: 0, end: 0 }),
        frameRate: 5,
        repeat: 0
          
        });

        if(!this.scene.anims.exists("puerta_move_p1"))
        this.scene.anims.create({
        key: "puerta_move_p1",
        frames: this.scene.anims.generateFrameNumbers('puerta_castillo_p1', { start: 0, end: 11 }),
        frameRate: 5,
        repeat: 0
          
        });





    }


    activar(){
        //aqui se crea la animacion de la puerta abriendose
        this.play("puerta_move_p1");
        this.scene.camera
        .getCameraPosition(8080,6725-200, 3000 ,200,true,1,null, this.scene.player);
    }




}