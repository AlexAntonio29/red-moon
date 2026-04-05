import { Estados } from "../../funciones/automata/Estados.js";

export class AttackPlayer extends Estados{


    enter(){
        console.log("Estoy en attack")

       // this.objeto.player.anims.play(this.objeto.combo[this.objeto.posicion_combo].nombre, true);
         this.getAtaque();
    }

    execute(){


        this.cargarAtaque();
        

        this.expandirAtaque();


        this.verificarIdle();

    }

    exit(){

        console.log("Saliendo de attack");
    }


    verificarIdle(){
        this.objeto.player.once("animationcomplete", (anim)=>{

            this.objeto.automata.cambiarEstado('Idle');
        });

    }

    cargarAtaque(){

    }

    expandirAtaque(){

                    if(this.objeto.spriteAtaque){

                      if(this.objeto.spriteAtaque.visible){
                        

              let velocidad=this.objeto.combo[this.objeto.posicion_combo].velocidad_radio_ataque;

              

              let radio=this.objeto.spriteAtaque.body.radius+velocidad;


              this.objeto.spriteAtaque.body.setCircle(radio,(this.objeto.spriteAtaque.width/2-radio),(this.objeto.spriteAtaque.height/2-radio));

              

                        


              
                      }
                      else{
                        let radio=this.objeto.spriteAtaque.body.radius;

                        
                        this.objeto.spriteAtaque.body.setCircle(1,(this.objeto.spriteAtaque.width/2-1),(this.objeto.spriteAtaque.height/2-1));
                        
                        //this.objeto.spriteAtaque.setDisplaySize(0,0);
                        
             

            }

            }
    }



    
  contactoAtaque(player,enemigo){

    try{


        if (!enemigo) return;

            if(enemigo.golpeado) {
              
              return;}

              

              
               enemigo.golpeado=true;

               let multiplicador=1;

               if(this.objeto.esAtaqueFuerte) multiplicador=3;
        
            enemigo.setVida(parseInt((this.objeto.arma.ataque)*(this.objeto.arma.nivel)*multiplicador));

            this.objeto.atacado_espada.play();

            
            
             if(enemigo.getVida()>0){

                       
            //empujar(this.objeto.spriteAtaque,enemigo.getContainer(),1,this.objeto.contacto,this.objeto.scene,this.objeto.arma.fuerza);
            
          
             }
          else {

            

              
                


              //AQUI ESTO COLOCA EN POSICION ALEATORIA ERA PARA OPTIMIZAR AHORA COMO LOS ENEMIGOS SE REPOSICIONAN, ENTONCES SI SE ELIMINAN


              /*
              let x=Math.floor(Math.random() * ((this.objeto.widthEscenario-30) - 0 + 1)) + 0;
              let y=Math.floor(Math.random() * ((this.objeto.heightEscenario-30) - 0 + 1)) + 0;
              let t=parseInt(enemigo.dataEnemie.id)-1;

              
              enemigo.setFullVida(dataEnemigos[t].vida);
              enemigo.setEnemiePosition(x,y);

              */

              //console.log(listaEnemigos);
             




              //enemigo
 
                //this.objeto.habilitarCollision=true;
        //console.log("Enemigo Eliminado - Cantidad: " + listaEnemigos.length);

          }



         
          enemigo.setGolpeado();

          // contacto[n]=false;

           
    }catch(e){

      console.log("ERROR: "+e);
    }
   

            

              
  }


  getAtacando(contacto,listaItems,listaEnemigos){

        
    
            // A. Decidir si es Fuerte o Normal
            if (this.objeto.tiempocarga > 30) {
                this.objeto.esAtaqueFuerte = true;
                console.log("¡SE LANZÓ ATAQUE FUERTE!");

            } else {
                this.objeto.esAtaqueFuerte = false;
                console.log("Ataque Normal");
            }

            
            this.objeto.tiempocarga = 0;

          // ===================================================
            // INICIO DEL CÓDIGO REUTILIZADO PARA EL GOLPE
            // ===================================================
            this.objeto.estaAtacando = true;

            this.objeto.contacto = contacto;

            // Crear el sprite si no existe
            if(this.objeto.spriteAtaque === undefined){
                this.objeto.spriteAtaque = this.objeto.scene.add.sprite(0, 0, this.objeto.componentesAtaque.textura)
                    .setOrigin(this.objeto.componentesAtaque.x, this.objeto.componentesAtaque.y);
                    
                
                this.objeto.scene.physics.add.existing(this.objeto.spriteAtaque);
                this.objeto.spriteAtaque.body.setCollideWorldBounds(true);
                //this.objeto.spriteAtaque.body.setCircle(0);

                
                
                this.objeto.listaItems = listaItems;
                this.objeto.scene.physics.add.overlap(this.objeto.spriteAtaque, this.objeto.listaEnemigos, this.contactoAtaque, null, this);

              //this.objeto.spriteAtaque.body.setSize(0,0);
              //this.objeto.spriteAtaque.setDisplaySize(0,0);
              
             /*
                this.objeto.scene.physics.add.overlap(this.objeto.spriteAtaque, listaEnemigos, (player, enemy) => {
                 
                  this.objeto.contactoAtaque(listaEnemigos,enemy);
                 

                });*/
                
            }

            // Si es ataque fuerte, multiplicamos por 2. Si es normal, por 1.
            let multiplicadorFuerza = this.objeto.esAtaqueFuerte ? 1.5 : 1;
            let sonido_ataque = this.objeto.esAtaqueFuerte ? this.objeto.ataque_cargado
            : this.objeto.scene.sound.add(this.objeto.combo[this.objeto.posicion_combo].sound,{
        loop:false,
        volume:1
      });;
          

            

            this.objeto.spriteAtaque
                .setOrigin(this.objeto.componentesAtaque.x, this.objeto.componentesAtaque.y)
                // Usamos el multiplicador en el ancho y el alto

                
                .setDisplaySize(
                    Number(this.objeto.arma.width) * (this.objeto.arma.nivel) * multiplicadorFuerza, 
                    Number(this.objeto.arma.heigth) * (this.objeto.arma.nivel) * multiplicadorFuerza
                )

                 
                .setPosition(this.objeto.player.x + this.objeto.player.displayWidth / 2, this.objeto.player.y + this.objeto.player.displayHeight / 2)
                .setTexture(this.objeto.componentesAtaque.textura)

              this.objeto.spriteAtaque.body.setCircle(1);
          
            //AQUI EL GOLPE EMPIEZA EN VALOR 0 0 

            this.objeto.spriteAtaque.body.setVelocity(0);
            this.objeto.spriteAtaque.setVisible(true);
            this.objeto.spriteAtaque.body.enable = true;
            this.objeto.spriteAtaque.play(this.objeto.componentesAtaque.anims);


 
 


            
            if(this.objeto.state !== "attack"){
                this.objeto.state = "attack";
            this.objeto.player.anims.play(this.objeto.combo[this.objeto.posicion_combo].nombre, true);
            }


            
            this.objeto.player.setVelocity(0);
            sonido_ataque.play();
            
            if((this.objeto.arma.largoAtaque)){
                switch(this.objeto.componentesAtaque.textura){
                    case 'ataqueLateralArriba':
                        this.objeto.spriteAtaque.body.setVelocityY(-this.objeto.arma.tiempoDisparo * (this.objeto.arma.nivel));
                        break;
                    case 'ataqueLateralAbajo':
                        this.objeto.spriteAtaque.body.setVelocityY(this.objeto.arma.tiempoDisparo * (this.objeto.arma.nivel));
                        break;
                    case 'ataqueLateralDerecha':
                        this.objeto.spriteAtaque.body.setVelocityX(this.objeto.arma.tiempoDisparo * (this.objeto.arma.nivel));
                        break;
                    case 'ataqueLateralIzquierda':
                        this.objeto.spriteAtaque.body.setVelocityX(-this.objeto.arma.tiempoDisparo * (this.objeto.arma.nivel));
                        break;
                    default:
                        break;
                }
            }
            
            this.objeto.scene.time.delayedCall(this.objeto.combo[this.objeto.posicion_combo].tiempo_ataque, () => {
                this.objeto.estaAtacando = false;
                this.objeto.spriteAtaque.setVisible(false);
                this.objeto.spriteAtaque.body.enable = false;

            });//this.objeto.combo[this.objeto.posicion_combo].tiempo_ataque



                //agregacion del stamina
             this.objeto.stamina=this.objeto.stamina-(this.objeto.combo[this.objeto.posicion_combo].stamina*multiplicadorFuerza);


             //adiciones para colisiones condicionales
    if (this.objeto.scene.blockLayer) {
        this.objeto.scene.physics.add.overlap(this.objeto.spriteAtaque, this.objeto.scene.blockLayer, (arma, tile) => {
            
  
            
            if (tile && tile.properties && tile.properties.tipoBloqueo) {
                this.objeto.scene.checkCondicionBloque(this.objeto.getContainer(), tile);
            }
        }, null, this);
    }
        
          
            

  }
 


  getAtaque(
    listaEnemigos=this.objeto.scene.listaEnemigos,
    contacto=false,
    listaItems=this.objeto.scene.items_punto

){


   

      //console.log(listaEnemigos);
    if (this.objeto.arma != undefined) {

       
        
        if (!this.objeto.estaAtacando ) {


          console.log("X: "+this.objeto.player.x);
          console.log("Y: "+this.objeto.player.y);


         


          this.getAtacando(contacto,listaItems,listaEnemigos);

 





            if(this.objeto.posicion_combo>=this.objeto.limiteCombo){
                      //console.log("antes de..."+ this.objeto.posicion_combo);
                    // console.log("antes de..."+ this.objeto.combo[this.objeto.posicion_combo].tiempo_ataque);
                    // console.log(this.objeto.limiteCombo)
                        this.objeto.posicion_combo=0;
                         }else{
                     //console.log("antes de..."+ this.objeto.posicion_combo);
                     //console.log("antes de..."+ this.objeto.combo[this.objeto.posicion_combo].tiempo_ataque);
                     //console.log(this.objeto.limiteCombo)
                    this.objeto.posicion_combo++;
                      }




                if(this.objeto.timer_combo)      
              this.objeto.timer_combo.remove();
              this.objeto.timer_combo=this.objeto.scene.time.delayedCall(this.objeto.arma.tiempo_combo, () => {
                  this.objeto.posicion_combo=0;
            });
          
          


            

            









 



        }
      
  } 

  



       

  

  }
    
}