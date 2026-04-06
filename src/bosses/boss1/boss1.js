
import { Bosses } from "../Bosses.js";
import { AttackBoss1 } from "./estados/AttackBoss1.js";
import { IdleBoss1 } from "./estados/IdleBoss1.js";
import {GolpeadoBoss1} from "./estados/GolpeadoBoss1.js"
import {MorirBoss1} from "./estados/MorirBoss1.js"
import { SeguirBoss1 } from "./estados/SeguirBoss1.js";
import { DescansandoBoss1 } from "./estados/DescansandoBoss1.js";
import { RunBoss1 } from "./estados/RunBoss1.js";
import { AturdidoBoss1 } from "./estados/AturdidoBoss1.js";
import { EnojadoBoss1 } from "./estados/EnojadoBoss1.js";

export class boss1 extends Bosses {

        constructor(scene, dataEnemie, x=0,y=0){


            

        super(scene,dataEnemie,x,y);
        this.tiempoAturdido=100;
        this.fuerzaResistencia=10;

        //this.distanciaAtaque=scene.physics.add.sprite(0,0,null);

        //this.distanciaAtaque.body.setSize(300,300);
        this.setDisplaySize(374,374);

        this.setOrigin(0,0);
        this.body.setSize(50,50);
        this.body.setOffset(150,150);

        this.hitbox.body.setSize(this.displayWidth-100,this.displayHeight-100);
        this.hitbox.setOrigin(0,0);
        this.hitbox.body.setOffset(25,25);



        this.stamina=100;

        this.nombre='boss1';

        this.tocandoMuro=false;

    }


    asignarEstados(){

        this.maquina.agregarEstado('Attack', new AttackBoss1(this));
        this.maquina.agregarEstado('Idle', new IdleBoss1(this));
        this.maquina.agregarEstado('Seguir', new SeguirBoss1(this));
        this.maquina.agregarEstado('Golpeado',new GolpeadoBoss1(this));
        this.maquina.agregarEstado('Morir', new MorirBoss1(this));
        this.maquina.agregarEstado('Descansar', new DescansandoBoss1(this));

        this.maquina.agregarEstado('Aturdido', new AturdidoBoss1(this));
        this.maquina.agregarEstado('Enojado', new EnojadoBoss1(this));
        this.maquina.agregarEstado('Run', new RunBoss1(this));
        
        this.maquina.cambiarEstado('Idle');

        
    }


    cargarAnimaciones(){
        super.cargarAnimaciones();

        if(!this.scene.anims.exists("boss1_ataque1"))
          this.scene.anims.create({
            key:"boss1_ataque1",
            frames: this.scene.anims.generateFrameNumbers('boss1_attack',{start:0,end:7}),
            frameRate:8,
            repeat:0
          });


        if(!this.scene.anims.exists("boss1_ataque2"))
          this.scene.anims.create({
            key:"boss1_ataque2",
            frames: this.scene.anims.generateFrameNumbers('boss1_attack',{start:7,end:13}),
            frameRate:8,
            repeat:0
          });


        if(!this.scene.anims.exists("boss1_ataque3"))
          this.scene.anims.create({
            key:"boss1_ataque3",
            frames: this.scene.anims.generateFrameNumbers('boss1_attack',{start:13,end:22}),
            frameRate:8,
            repeat:0
          });


        if(!this.scene.anims.exists("boss1_ataque4"))
          this.scene.anims.create({
            key:"boss1_ataque4",
            frames: this.scene.anims.generateFrameNumbers('boss1_attack',{start:0,end:13}),
            frameRate:8,
            repeat:0
          });

        if(!this.scene.anims.exists("boss1_ataque5"))
          this.scene.anims.create({
            key:"boss1_ataque5",
            frames: this.scene.anims.generateFrameNumbers('boss1_attack',{start:7,end:22}),
            frameRate:8,
            repeat:0
          });

        if(!this.scene.anims.exists("boss1_ataque6"))
          this.scene.anims.create({
            key:"boss1_ataque6",
            frames: this.scene.anims.generateFrameNumbers('boss1_attack',{start:0,end:22}),
            frameRate:8,
            repeat:0
          });

          //'boss1_agotado'

          if(!this.scene.anims.exists("boss1_agotado"))
          this.scene.anims.create({
            key:"boss1_agotado",
            frames: this.scene.anims.generateFrameNumbers('boss1_agotado',{start:0,end:3}),
            frameRate:4,
            repeat:-1
          });


          if(!this.scene.anims.exists("boss1_run"))
          this.scene.anims.create({
            key:"boss1_run",
            frames: this.scene.anims.generateFrameNumbers('boss1_run',{start:0,end:3}),
            frameRate:10,
            repeat:-1
          });


          if(!this.scene.anims.exists("boss1_enojado"))
          this.scene.anims.create({
            key:"boss1_enojado",
            frames: this.scene.anims.generateFrameNumbers('boss1_enojado',{start:0,end:13}),
            frameRate:6,
            repeat:0
          });


            if(!this.scene.anims.exists("boss1_aturdido"))
          this.scene.anims.create({
            key:"boss1_aturdido",
            frames: this.scene.anims.generateFrameNumbers('boss1_aturdido',{start:0,end:3}),
            frameRate:4,
            repeat:-1
          });

    }

    cargarDepth(){
        if(this.body.y>this.scene.player.getContainer().y)
            this.setDepth(6);
            else this.setDepth(4);
    }

    

    setMovimientoEnemigo(){


       this.cargarDepth();
    
        if(this.stamina<=100)
        this.stamina++;
        
        super.setMovimientoEnemigo();

        //this.distanciaAtaque.setPosition(this.x,this.y);

    }
}