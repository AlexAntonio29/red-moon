export class Estatua extends Phaser.Physics.Arcade.Sprite{


    constructor(scene, x,y){

        super(scene,x,y,'sprite_estatua');

        scene.add.existing (this);

        scene.physics.add.existing(this);

        this.quitarMovimiento();


        this.setOrigin(0,0);
        this.body.setSize(50,16);
        this.body.setOffset(50,100);


        this.scene.anims.create({
        key: "checkpoint_desactivado",
        frames: this.scene.anims.generateFrameNumbers('sprite_estatua', { start: 0, end: 0 }),
        frameRate: 5,
        repeat: -1
          });

           this.scene.anims.create({
        key: "checkpoint_activado",
        frames: this.scene.anims.generateFrameNumbers('sprite_estatua', { start: 1, end: 9 }),
        frameRate: 5,
        repeat: -1
          });

        
          this.play("checkpoint_activado");
       
          let xBody=this.displayWidth/2;
          let yBody=this.displayHeight/2

          this.light=(scene.lights.addLight(this.x+xBody, this.y+yBody, 150) .setColor(0xffffff) .setIntensity(1));

          

        




    }

    quitarMovimiento(){
        this.body.moves=false;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.pushable = false;
        this.body.setMass(Number.MAX_VALUE);

    }



}