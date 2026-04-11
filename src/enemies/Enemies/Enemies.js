import {MaquinaEstados} from "../../funciones/automata/MaquinaEstados.js"
import { GolpeadoEnemies } from "./EstadosEnemies/GolpeadoEnemies.js";
import { IdleEnemies } from "./EstadosEnemies/IdleEnemies.js";
import { MorirEnemies } from "./EstadosEnemies/MorirEnemies.js";
import { SeguirEnemies } from "./EstadosEnemies/SeguirEnemies.js";


export class Enemies extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, dataEnemie, x=0,y=0){

      
     // console.log(dataEnemie);
      super(scene,x,y,dataEnemie.diseno+"_idle");
      scene.add.existing(this);
      scene.physics.add.existing(this);

        this.scene=scene;
        this.dataEnemie=dataEnemie;
        this.velocidad=Math.floor(Math.random() * ((Number(this.dataEnemie.velocidad)) - (Number(this.dataEnemie.velocidad)-30) + 1)) + (Number(this.dataEnemie.velocidad)-30);
        this.vida=Number(dataEnemie.vida);
        this.vidaCompleta=this.vida;

        this.tiempoAturdido=150;
        this.fuerzaResistencia=100;

        this.stamina=50;


        



        
        this
        .setOrigin(0)
        .setDisplaySize(this.dataEnemie.width,this.dataEnemie.height)
        .setCollideWorldBounds(true)
        .setBounce(0);
        //.body.setCircle(20)
        ;

 

        this.body.setSize((this.dataEnemie.width/5), (this.dataEnemie.height/5));
        this.body.setOffset(this.dataEnemie.width/4,this.dataEnemie.height/2);

        //this.body.setOffset(0, 0);

        

        this.cargarAnimaciones();
        this.cargarSonidos();

        this.state="walk";
        this.subState="walk_right";

        //crear un body para cuerpo de ataque
        this.hitbox = scene.add.zone(this.x, this.y, this.displayWidth, this.displayHeight);
        scene.physics.add.existing(this.hitbox);
        this.hitbox.body.setAllowGravity(false);
        this.hitbox.setOrigin(0,0);



        this.state="idle";
        this.nombre='enemie';
        

        this.spriteAtacado=this.scene.add.sprite(0,0,'golpear_enemigo1');
        this.scene.physics.add.existing(this.spriteAtacado);
        this.spriteAtacado.body.setCollideWorldBounds(true);

       // this.spriteAtacado.setOrigin(0,0)
        this.spriteAtacado.setDepth(20);

        this.spriteAtacado.setVisible(false);

        this.maquina=new MaquinaEstados(this);
        this.asignarEstados();




    }

    asignarEstados(){

      this.maquina.agregarEstado('Idle', new IdleEnemies(this));
      this.maquina.agregarEstado('Seguir', new SeguirEnemies(this));
      this.maquina.agregarEstado('Golpeado',new GolpeadoEnemies(this));
      this.maquina.agregarEstado('Morir', new MorirEnemies(this));

      this.maquina.cambiarEstado('Idle');


    }

    cargarAnimacionesAtacado(){

            if (!this.scene.anims.exists('golpear_enemigo1')) {
        this.scene.anims.create({
        key:'golpear_enemigo1',
        frames: this.scene.anims.generateFrameNumbers('golpear_enemigo1', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
          });
        }


        if (!this.scene.anims.exists('golpear_enemigo2')) {
        this.scene.anims.create({
        key:'golpear_enemigo2',
        frames: this.scene.anims.generateFrameNumbers('golpear_enemigo2', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
          });
        }

        if (!this.scene.anims.exists('golpear_enemigo3')) {
        this.scene.anims.create({
        key:'golpear_enemigo3',
        frames: this.scene.anims.generateFrameNumbers('golpear_enemigo3', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
          });
        }

    }


    seleccionarAnimacionAtaque(){



      console.log(this.scene.player.posicion_combo);

       this.spriteAtacado.setVisible(true);

        const x=this.x+this.displayWidth/2;
        const y=this.y+this.displayHeight/2;

        let xAdd=0;
        let yAdd=0;

        

        if(this.x>this.scene.player.x){
            this.spriteAtacado.flipX=false;
           // xAdd=this.scene.player.displayWidth/2;

        }
        else {
            this.spriteAtacado.flipX=true;
            // xAdd=-(this.scene.player.displayWidth/2);

        }


        if(this.y>this.scene.player.y){

            //yAdd=this.scene.player.displayHeight/2;
        }
        else{
            //yAdd=-(this.scene.player.displayHeight/2);

        }

        switch(this.scene.player.posicion_combo){
          case 0:

          this.spriteAtacado.play('golpear_enemigo3');
          break;
          case 1:
            this.spriteAtacado.play('golpear_enemigo1');

          break;
          case 2:
            this.spriteAtacado.play('golpear_enemigo2');

          break;

          default:

          this.spriteAtacado.play('golpear_enemigo1');
          break
        }

        
        this.spriteAtacado.setPosition(x+xAdd,y+yAdd);
       
        

    }


    cargarAnimaciones(){

      //avanzando
      if (!this.scene.anims.exists(this.dataEnemie.diseno+"_walk")) {
        this.scene.anims.create({
        key: this.dataEnemie.diseno+"_walk",
        frames: this.scene.anims.generateFrameNumbers(this.dataEnemie.diseno+"_walk", { start: 0, end: this.dataEnemie.end_frame_walk }),
        frameRate: this.dataEnemie.velocidad_frames_walk,
        repeat: -1
          });
        }


        
        //sin movimiento

        //console.log(this.dataEnemie.velocidad_frames_idle);

        if (!this.scene.anims.exists(this.dataEnemie.diseno+"_idle")) {
        this.scene.anims.create({
        key: this.dataEnemie.diseno+"_idle",
        frames: this.scene.anims.generateFrameNumbers(this.dataEnemie.diseno+"_idle", { start: 0, end: this.dataEnemie.end_frame_idle }),
        frameRate: this.dataEnemie.velocidad_frames_idle,
        repeat: -1
          });
        }

        this.cargarAnimacionesAtacado();

    }




    cargarSonidos(){
        this.sonido=this.scene.sound.add(this.dataEnemie.diseno+"_sonido",{
        loop:true,
        volume:0
      });


        this.sound_blood=this.scene.sound.add('boss_blood',{
        loop:false,
        volume:1
      });


      this.sonido.play();


    }


    getContainer(){
        return this;
    }


    getBody(){
      this.hitbox;
    }

    setVida(n){
      this.vida=this.vida-n;

    }

    setFullVida(n){
      this.vida=n;
    }

    getVida(){
      return Number(this.vida);
    }

    setGolpeado(){

      this.scene.time.delayedCall(500,()=>{ 

          this.golpeado=false;
      }
    );
    }

    setEnemiePosition(x,y){
        this.setPosition(x,y).setActive(true).setVisible(true);;
    }

    getPositionX(){
      return this.x;
    }

    getpositionY(){
      return this.y;
    }

    setEnemiesVelocity(n=0){
        this.setVelocity(n);
    }   

    setEnemiesMovementX(n=1){
        this.setVelocityX(n);
    }

    setEnemiesMovementY(n=1){
        this.setVelocityY(n);
    }

    getDistanciaPlayer(){
      if(this)
      return Phaser.Math.Distance.Between(this.x,this.y,this.scene.player.getContainer().x,this.scene.player.getContainer().y);

    }




      setDistanciaSonido(){

            //console.log(player.x-this.x);
      //console.log(player.y -this.y);


      let distancia_sonido=this.dataEnemie.distancia_sonido;

      let raiz=Math.sqrt(Math.pow((this.scene.player.getContainer().x-this.x),2)+Math.pow((this.scene.player.getContainer().y-this.y),2));
      let resultado_parcial=raiz/distancia_sonido;

      let resultado_final=1-resultado_parcial;






     
      
      if(
        (this.scene.player.getContainer().x-this.x)<-distancia_sonido
      ||(this.scene.player.getContainer().x-this.x)> distancia_sonido
      ||(this.scene.player.getContainer().y-this.y)<-distancia_sonido
      ||(this.scene.player.getContainer().y-this.y)>distancia_sonido

      ){
        this.sonido.volume=0;

      }else{

        

        if(!(resultado_final<0)){
        
        this.sonido.volume=resultado_final;
      
      }
        else {
         
          this.sonido.volume=0.01;
        }




      }

      }


    setMovimientoEnemigo(){

  
      //this.getState();
      //this.setCaminar(player,contacto,contactoAtaque,contactoEnemigo);

      this.maquina.actualizar();


    }

    setMuerteEnemigo(){

        //this.sonido.stop();
        //this.body.destroy();
        //this.destroy();





        



    // this.container.destroy();
    }


}