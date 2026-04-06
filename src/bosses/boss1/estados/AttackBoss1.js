import { Estados } from "../../../funciones/automata/Estados.js";
import { empujar } from "../../../funciones/empujar.js";

export class AttackBoss1 extends Estados{

    enter(){
        console.log("estoy en ataque boss1");

        let aleatorio=Math.floor(Math.random() * 6) + 1;
      


        this.desgaste=(aleatorio<=2)?50
        :(aleatorio<=5)?100:200;



        this.ataque='boss1_ataque'+aleatorio

        this.objeto.play(this.ataque);

        //colision ataque





        this.crearAtaque();
        

        this.verificarIdle();




    }
    
    execute(){






        if(this.objeto.scene.physics.overlap(
            this.objeto,
            this.objeto.scene.player.spriteAtaque
        )){
            
            this.objeto.maquina.cambiarEstado('Golpeado')

        }
    }


    exit(){
       

        this.ataque=null;
        this.desgaste=null;
        if(this.colisionAtaque){
        this.colisionAtaque.destroy();
        this.colisionAtaque=null;}
       
        if(this.contactoAtaque)
        this.objeto.scene.physics.world.removeCollider(this.contactoAtaque);
    }


    crearAtaque(){

        this.objeto.off('animationupdate');
        
        this.objeto.on("animationupdate", (anim,frame)=>{

     
            if(anim.key==="boss1_ataque1"||
                anim.key==="boss1_ataque2"||
                anim.key==="boss1_ataque3"||
                anim.key==="boss1_ataque4"||
                anim.key==="boss1_ataque5"||
                anim.key==="boss1_ataque6"
            ){
                              if(frame.index===4||frame.index===11||frame.index===19){

            if(!this.colisionAtaque){
            this.colisionAtaque= this.objeto.scene.add.zone(
            this.objeto.x, 
            this.objeto.y, 
            this.objeto.displayWidth-100, 
            this.objeto.displayHeight-100);
          
        this.objeto.scene.physics.add.existing(this.colisionAtaque);
          
        this.colisionAtaque.body.setAllowGravity(false);
        this.colisionAtaque.setOrigin(0,0);
    
    
                }

            if(this.contactoAtaque) this.objeto.scene.physics.world.removeCollider(this.contactoAtaque);

            this.contactoAtaque=this.objeto.scene.physics.add.overlap(
            this.objeto.scene.player.getContainer(),this.colisionAtaque, 
            ()=>{this.contactoPlayerEnemigo(
                this.objeto.scene.player.getContainer(),
                this.colisionAtaque) });


                    console.log('Activar ataque Enemigo')
                    this.colisionAtaque.setPosition(this.objeto.x, this.objeto.y);
                    this.colisionAtaque.body.enable = true;


                }else{
                  
                    if(this.contactoAtaque) this.objeto.scene.physics.world.removeCollider(this.contactoAtaque);
                   if(this.colisionAtaque) this.colisionAtaque.body.enable=false;
                }
            }

        });

    }


    verificarIdle(){

                
                this.objeto.off('animationcomplete');





        this.objeto.on("animationcomplete", (anim)=>{

            this.objeto.stamina=this.objeto.stamina-this.desgaste;
            if(this.objeto.stamina>0)
            this.objeto.maquina.cambiarEstado('Idle');
            else this.objeto.maquina.cambiarEstado('Descansar');
        });

    }



    contactoPlayerEnemigo(player,enemigo){
    

          if(this.objeto.scene.player.getVida()>0){
    
            
          let tiempo_invisivilidad=1000;
          let parpadeo=100;
          let n=10;
          this.objeto.scene.player.atacado=true;
    
          
    
    
           //console.log(this.golpeToPlayer);
           this.objeto.scene.player.golpeToPlayer.play();
              
    
            if(enemigo!==null){
              empujar(enemigo,
              player,
              0,
              null,
              this.objeto.scene,
              200);//
              
                

                   this.objeto.scene.player.setVida(this.objeto.dataEnemie.ataque); //desactivar para el contacto player enemigo
    
                   this.objeto.scene.physics.world.removeCollider(this.contactoAtaque);
    
                    }
    
                    
              this.objeto.scene.time.delayedCall(tiempo_invisivilidad,()=>{
    
                console.log("regresa");
                player.setAlpha(1);
                player.setVisible(true);
                
              });
    
    
            this.objeto.scene.time.addEvent({
            
            delay: parpadeo, 
            callback: () => {
            player.setVisible(!player.visible); 
                            },
             repeat: n // número de parpadeos
                              });
    
    
              
    
              //console.log("Contacto Player Enemigo: "+this.objeto.scene.player.getVida());
    
              this.objeto.scene.getBarraVida();
    
    
    
           
            player.setAlpha(0.5)
            
    
    
          }
    
    
    
    
              
    
        }
}