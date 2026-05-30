import { MaquinaEstados } from "../../funciones/automata/MaquinaEstados.js";
import { EstatuaActivo } from "./estados/EstatuaActivo.js";
import { EstatuaInactivo } from "./estados/EstatuaInactivo.js";

export class Estatua extends Phaser.Physics.Arcade.Sprite{



    constructor(scene, x,y,id){

        super(scene,x,y,'sprite_estatua');

        scene.add.existing (this);

        scene.physics.add.existing(this);

        this.quitarMovimiento();

        
        this.id=id
        this.esEncendido=(scene.dataGuardadoRanura!==null)
        ?scene.dataGuardadoRanura[scene.ranura].checkpoints[id].esEncendido
        :false;


        


        this.setOrigin(0,0);
        this.body.setSize(50,16);
        this.body.setOffset(50,100);

        if(!this.scene.anims.exists("checkpoint_desactivado"))
        this.scene.anims.create({
        key: "checkpoint_desactivado",
        frames: this.scene.anims.generateFrameNumbers('sprite_estatua_desactivado', { start: 0, end: 0 }),
        frameRate: 5,
        repeat: -1
          });

          if(!this.scene.anims.exists("checkpoint_activado"))
           this.scene.anims.create({
        key: "checkpoint_activado",
        frames: this.scene.anims.generateFrameNumbers('sprite_estatua', { start: 0, end: 8 }),
        frameRate: 5,
        repeat: -1
          });

        
          
       
          let xBody=this.displayWidth/2;
          let yBody=this.displayHeight/2

          this.light=(scene.lights.addLight(this.x+xBody, this.y+yBody, 150) .setColor(0xffffff) .setIntensity(1));

          //crear cuerpo

          this.hitbox=scene.add.zone(this.x, this.y, this.displayWidth, this.displayHeight);
        scene.physics.add.existing(this.hitbox);
        this.hitbox.body.setAllowGravity(false);
        this.hitbox.setOrigin(0,0);
        this.hitbox.body.setSize(50,60);
        this.hitbox.body.setOffset(50,100);

        

        if(this.esEncendido)this.play("checkpoint_activado");
        else this.play("checkpoint_desactivado");
        //this.scene.physics.overlap()


        this.mensaje="E : Guardar";


        this.automata= new MaquinaEstados(this);
        this.asignarEstados();


    }

    asignarEstados(){

        this.automata.agregarEstado("EstatuaActivo",new EstatuaActivo(this));
        this.automata.agregarEstado("EstatuaInactivo", new EstatuaInactivo(this));

        this.automata.cambiarEstado("EstatuaInactivo");
    }

    quitarMovimiento(){
        this.body.moves=false;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.pushable = false;
        this.body.setMass(Number.MAX_VALUE);

    }


    update(){
       
        this.automata.actualizar();
    }


    esActivado(){

        if(this.anims.currentAnim?.key!=="checkpoint_activado"){
        this.play("checkpoint_activado");
        this.esEncendido=true;
        this.scene.sound.add("soundCheckpoint",{
            loop:false,
            volume:0.3
        }).play();
    }

    }



}