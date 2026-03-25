import { Enemies } from "../enemies/Enemies.js";
export class Npc extends Phaser.Physics.Arcade.Sprite{


    constructor(scene, data, x=0,y=0){

        super(scene,x,y,data.diseno+"_idle");

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.scene=scene;
        this.dataNpc=data;

       // console.log(data);

        //hacer que no se mueva el npc

         

        this.cargarAnimaciones();
        this.quitarMovimiento();

        
    }


    quitarMovimiento(){
        this.body.moves=false;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.pushable = false;
        this.body.setMass(Number.MAX_VALUE);

    }


        cargarAnimaciones(){

      if (!this.scene.anims.exists(this.dataNpc+"_walk")) {
        this.scene.anims.create({
        key: this.dataNpc.diseno+"_walk",
        frames: this.scene.anims.generateFrameNumbers(this.dataNpc+"_walk", { start: 0, end: 3}),
        frameRate: 3,
        repeat: -1
          });
        }


        
        //sin movimiento

        //console.log(this.dataEnemie.velocidad_frames_idle);

        if (!this.scene.anims.exists(this.dataNpc.diseno+"_idle")) {
        this.scene.anims.create({
        key: this.dataNpc.diseno+"_idle",
        frames: this.scene.anims.generateFrameNumbers(this.dataNpc+"_idle", { start: 0, end: 1 }),
        frameRate: 6,
        repeat: -1
          });
        }


        this.play(this.dataNpc.diseno+"_idle");
    }



    setMovimientoNpc(scene){

        
        
    }





  





}