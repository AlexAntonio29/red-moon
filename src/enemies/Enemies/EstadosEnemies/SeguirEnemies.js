import { Estados } from "../../../funciones/automata/Estados.js"

export class SeguirEnemies extends Estados{


    enter(){

       //aplica el sprite de movimiento
        this.objeto.play(this.objeto.dataEnemie.diseno+"_walk");

    }

    execute(){

        
        this.setCaminar();


        if(this.objeto.scene.physics.overlap(
            this.objeto,
            this.objeto.scene.player.spriteAtaque
        )){
            console.log("contacto ataque con enemigo")
            this.objeto.maquina.cambiarEstado('Golpeado')

        } 
        else if(this.objeto.getDistanciaPlayer()>this.objeto.dataEnemie.distancia_vista){
            this.objeto.maquina.cambiarEstado('Idle');
        } 

       


    }

    exit(){
        this.objeto.setVelocity(0);
    }



      setCaminar(){


      
      

      //console.log(`!contacto:${!contacto}, !this.vida${!(this.vida<=0)}, !contractoAtaque:${!contactoAtaque} !contactoEnemigo:${!contactoEnemigo}`)
    

        

        this.objeto.hitbox.setPosition(this.objeto.x,this.objeto.y);



        //console.log('DENTRO');
         
        let vel=this.objeto.velocidad;



        //console.log("Velocidad enemigo: "+vel);

     //this.player.getContainer().setVelocity(0); BLOQUEADO POR EL MOMENTO

        //se hace el llamado a la clase "player"
     //movimientos diagonales

    // const longitud = Math.hypot(velocidad, velocidad);
    let rango_enemigo_movimiento=Number(this.objeto.dataEnemie.movimiento);//es el rango que tendra el enemigo con el player para cambio de movimiento

    let playerX=this.objeto.scene.player.getContainer().body.x;
    let playerY=this.objeto.scene.player.getContainer().body.y;

    let enemigoX=this.objeto.body.x;
    let enemigoY=this.objeto.body.y;

     







        //para generar la vista 
    if(enemigoX>playerX){
      this.objeto.flipX=true
    }else this.objeto.flipX=false;

    if(enemigoY>playerY){
      this.objeto.setDepth(6);
    }
    else{
      this.objeto.setDepth(4);
    }

    //console.log(`Posicion Player: x:${playerX} y:${playerY}`);
    //console.log(`Posicion Enemigo: x:${enemigoX} y:${enemigoY}`);

   
      
      let velocidadDiagonal=vel/Math.sqrt(2);
  
      
      // console.log("velocidadparteDiagonal: "+velocidadDiagonal);

      //player esta arriba y derecha

      if(playerX===enemigoX&&playerY===enemigoY) this.objeto.setVelocity(0);


      
//movimientos normales
 if(playerY<enemigoY && ((playerX-rango_enemigo_movimiento<=enemigoX&&(playerX+rango_enemigo_movimiento)>=enemigoX))){
 
    //console.log("ESTOY EN MOV NORMAL -Y");

    this.objeto.setVelocityY(-vel);
   if(!(this.objeto.dataEnemie.ofzigzag))
    this.objeto.setVelocityX(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
 }else if(playerY>enemigoY && ((playerX-rango_enemigo_movimiento<=enemigoX&&(playerX+rango_enemigo_movimiento)>=enemigoX))){
     //console.log("DOWN");
    this.objeto.setVelocityY(vel);
  if(!(this.objeto.dataEnemie.ofzigzag))
    this.objeto.setVelocityX(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
     //console.log("ESTOY EN MOV NORMAL Y");
 }else if(((playerY-rango_enemigo_movimiento<=enemigoY&&(playerY+rango_enemigo_movimiento)>=enemigoY)) && playerX>enemigoX){
   //  console.log("LEFT");
  // console.log("ESTOY EN MOV NORMAL -X");
    this.objeto.setVelocityX(vel);
    if(!(this.objeto.dataEnemie.ofzigzag))
    this.objeto.setVelocityY(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
 }else if(((playerY-rango_enemigo_movimiento<=enemigoY&&(playerY+rango_enemigo_movimiento)>=enemigoY))&& playerX<enemigoX){
    // console.log("RIGHT");
    this.objeto.setVelocityX(-vel);
  if(!(this.objeto.dataEnemie.ofzigzag))
    this.objeto.setVelocityY(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
     //console.log("ESTOY EN MOV NORMAL X");
 }
  else

  if(playerY<enemigoY&& playerX>enemigoX){
    // console.log("UP + RIGHT");

    this.objeto.setVelocityY(-velocidadDiagonal);
   this.objeto.setVelocityX(velocidadDiagonal);
  }

  
//player esta arriba e izquierda
  else if(playerY<enemigoY&& playerX<enemigoX){
   // console.log("UP + LEFT");
    this.objeto.setVelocityY(-velocidadDiagonal);
    this.objeto.setVelocityX(-velocidadDiagonal);
  }

  //player esta debajo e izquierda
  else if(playerY>enemigoY && playerX<enemigoX){
   // console.log("DOWN + LEFT");
    this.objeto.setVelocityY(velocidadDiagonal);
    this.objeto.setVelocityX(-velocidadDiagonal);
  }

  //player esta debajo y derecha
  else if(playerY>enemigoY && playerX>enemigoX){
     //console.log("DOWN + RIGHT");
     
    this.objeto.setVelocityY(velocidadDiagonal);
    this.objeto.setVelocityX(velocidadDiagonal);
  }
 
    
    this.objeto.setDistanciaSonido();

    }
}