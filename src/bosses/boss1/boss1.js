
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
import { AparecerBoss1 } from "./estados/AparecerBoss1.js";

export class boss1 extends Bosses {

        constructor(scene, dataEnemie, x=0,y=0){





            console.log(x);
            console.log(y);

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
        this.maquina.agregarEstado('Aparecer', new AparecerBoss1(this));
        this.maquina.agregarEstado('Attack', new AttackBoss1(this));
        this.maquina.agregarEstado('Idle', new IdleBoss1(this));
        this.maquina.agregarEstado('Seguir', new SeguirBoss1(this));
        this.maquina.agregarEstado('Golpeado',new GolpeadoBoss1(this));
        this.maquina.agregarEstado('Morir', new MorirBoss1(this));
        this.maquina.agregarEstado('Descansar', new DescansandoBoss1(this));

        this.maquina.agregarEstado('Aturdido', new AturdidoBoss1(this));
        this.maquina.agregarEstado('Enojado', new EnojadoBoss1(this));
        this.maquina.agregarEstado('Run', new RunBoss1(this));
        
        this.maquina.cambiarEstado('Aparecer');

        
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


          if(!this.scene.anims.exists("boss1_aparecer"))
          this.scene.anims.create({
            key:"boss1_aparecer",
            frames: this.scene.anims.generateFrameNumbers('boss1_aparecer',{start:0,end:58}),
            frameRate:5,
            repeat:0 
          });

          if(!this.scene.anims.exists("boss1_muerto"))
          this.scene.anims.create({
            key:"boss1_muerto",
            frames: this.scene.anims.generateFrameNumbers('boss1_muerto',{start:0,end:18}),
            frameRate:5,
            repeat:0,
            //hideOnComplete:false
            
          });

    }

    cargarSonidos(){
      super.cargarSonidos();

       this.soundtrack=this.scene.sound.add('boss_soundtrack',{
        loop:true,
        volume:1
      });


      this.scream=this.scene.sound.add('boss_scream',{
        loop:false,
        volume:1
      });

        this.sound_attack1=this.scene.sound.add('boss_attack1',{
        loop:false,
        volume:1
      });

        this.sound_attack3=this.scene.sound.add('boss_attack3',{
        loop:false,
        volume:1
      });

        this.sound_attack4=this.scene.sound.add('boss_attack4',{
        loop:false,
        volume:1
      });


      this.sound_evento1=this.scene.sound.add('boss_evento1',{
        loop:false,
        volume:1
      });

      this.sound_evento2=this.scene.sound.add('boss_evento2',{
        loop:false,
        volume:1
      });

      this.sound_evento3=this.scene.sound.add('boss_evento3',{
        loop:false,
        volume:1
      });

      this.sound_gritoNpc1=this.scene.sound.add('boss_gritoNpc1',{
        loop:false,
        volume:1
      });

      this.sound_gritoNpc2=this.scene.sound.add('boss_gritoNpc2',{
        loop:false,
        volume:1
      });

//'boss_huesos_rompiendose'

      this.sound_huesos1=this.scene.sound.add('boss_huesos_rompiendose',{
        loop:false,
        volume:1
      });

      this.sound_huesos2=this.scene.sound.add('boss_huesos_rompiendose2',{
        loop:true,
        volume:2
      });

      this.sound_choque=this.scene.sound.add('boss_choque',{
        loop:false,
        volume:2
      });


      this.sound_walk=this.scene.sound.add('boss_walk',{
        loop:true,
        volume:0.3
      });

      this.sound_vidrio=this.scene.sound.add('vidrio',{
        loop:false,
        volume:0.3
      });
//'boss_blood'


    }

    cargarDepth(){

      
        if(this.body.y>this.scene.player.getContainer().y)
            this.setDepth(6);
            else this.setDepth(4);
    }


    getBarraVida(){
    
      if(this.mostrarBarraVida&&this.activarBarraVida&&!this.estaMuerto){
        
        const tamanoBarravida=(this.scene.widthPantalla/10)*8;

        const xBarra=(this.scene.widthPantalla)/10;
        const yBarra=(this.scene.heightPantalla)-30;

 

        const vidaPorcentaje=(this.vida*100)/this.vidaCompleta;

        const vidaActual=(this.vida<=0)?0:(tamanoBarravida*vidaPorcentaje)/100;

    
      if(this.contenedorVida) this.contenedorVida.destroy();
      this.contenedorVida=this.scene.add.container(0,0).setScrollFactor(0);
    
    
    
      if(this.backgroundVida) this.backgroundVida.destroy();
      this.backgroundVida=this.scene.add.rectangle(xBarra,yBarra,vidaActual,10,0xFF0000,1)//cambiar el tercer parametro por la vida del player
      .setOrigin(0)
    
        if(this.backgroundVidaCompleta) this.backgroundVidaCompleta.destroy();
      this.backgroundVidaCompleta=this.scene.add.rectangle(xBarra,yBarra,tamanoBarravida,10,0x9C2007,1)//cambiar el tercer parametro por la vida del player
      .setOrigin(0)
      
      //console.log(this.scene.player.vidaActualMax);
      //cambiar despues el valor por uno que tome de la BD
      const nombreBoss= this.scene.add.text(this.backgroundVida.x,this.backgroundVida.y-20,this.dataEnemie.nombre,{
            fontSize: '18px',
            fontFamily:this.scene.fontText,
            fill: '#fff'
    
        })
    
      this.contenedorVida.add(this.backgroundVidaCompleta);
      this.contenedorVida.add(this.backgroundVida);
      this.contenedorVida.add(nombreBoss)
      this.contenedorVida.setDepth(20);

      

      }

      
      
    }

    

    setMovimientoEnemigo(){

      this.cargarDepth();

      if(this.estaMuerto) return

      this.getBarraVida();
      
       
    
        if(this.stamina<=100)
        this.stamina++;
        
        
        super.setMovimientoEnemigo();

        //this.distanciaAtaque.setPosition(this.x,this.y);

    }
}