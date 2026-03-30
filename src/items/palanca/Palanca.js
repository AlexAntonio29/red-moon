export class Palanca extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x,y,id,idPuerta){
        super(scene,x,y,'palanca');

        this.id=id;
        this.idPuerta=idPuerta;
        this.esActivado=false;//JSON

        scene.add.existing (this);

        scene.physics.add.existing(this);

        this.quitarMovimiento(this.body);
        this.cargarAnimaciones();

        this.hitbox=scene.add.zone(x,y,40,48)
        scene.physics.add.existing(this.hitbox);
        this.hitbox.body.setAllowGravity(false);
        this.hitbox.setOrigin(0.5,0.5);
        //this.hitbox.body.setSize(50,60);
        this.hitbox.body.setOffset(0,0);
        this.quitarMovimiento(this.hitbox.body);



        if(this.esActivado){
            this.play("palanca_activada");
        }else{
            this.play("palanca_desactivada");
        }

    }

        quitarMovimiento(body){
        body.moves=false;
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.pushable = false;
        body.setMass(Number.MAX_VALUE);

    }

    cargarAnimaciones(){
        this.scene.anims.create({
        key: "palanca_activada",
        frames: this.scene.anims.generateFrameNumbers('palanca', { start: 2, end: 2 }),
        frameRate: 5,
        repeat: 0
          
        });

            this.scene.anims.create({
        key: "palanca_desactivada",
        frames: this.scene.anims.generateFrameNumbers('palanca', { start: 0, end: 0 }),
        frameRate: 5,
        repeat: 0
          
        });

        this.scene.anims.create({
        key: "palanca_move",
        frames: this.scene.anims.generateFrameNumbers('palanca', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: 0
          
        });
    }


    activar(){

    }



}