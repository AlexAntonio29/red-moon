import  {empujar}  from "../funciones/empujar.js";
import { crearItemsPunto } from "../funciones/crearItemsPuntos.js";
import { armas } from "../items/DataItemsPotenciadores.js";
import {dataEnemigos} from "../enemies/DataEnemies.js"
import { DataComboEspada } from "./combo/DataCombo.js";
export class player {

  constructor(scene, texture, x = 25, y = 25, joystick,controles, keys,listaEnemigos) {


    //CARGAR VALORES POR BD PARA OBTENER DATOS

    this.vida=3;
    this.scene = scene;
    this.texture = texture;
    this.x=x;
    this.y=y;
    this.arma;
    //aqui despues agregar una clase que busque en la BD que armas tiene para cargarlo sino hay nada 
    //entonces carga por defecto las armas principales
    this.setArma(armas[0]);



    //codigo de ian para el progrmar ataque fuerte o cargado

    this.tiempocarga = 0; //esto sirve para contar los frames que lleva cargando
    this.esAtaquefuerte = false; //se coloca para para saber que ataque se debera a hacer



    //console.log(this.arma);

    this.sonidoAtaque;
    this.spriteAtaque;

    this.listaEnemigos=listaEnemigos;

    this.joystick=joystick;
    this.controles=controles;
   
   

  
    this.keys=keys;
    //para cambiar de estado segun la accion
    this.state="idle";
    this.subEstado_posicionEstatico="derecha";

    //aqui tambien cambiar por BD para agregar arma disponible
    this.combo=DataComboEspada;
    this.posicion_combo=0;
    //this.posicion_combo_after=0;//esto sirve para que compare los combos y si el anterior es igual ha donde se quedo entonces
    //el actual entonces se ejecuta el proceso de reiniciar combo sino entonces no hace nada 

    this.limiteCombo=this.combo.length-1;
    this.regresaCombo=true;

    

    

    this.habilitarCollision=false;

   

     this.estaAtacando=false;//para determinar que no genere muchos ataques sin limites

    // Crear sprite físico directamente
    this.player = scene.physics.add.sprite(0, 0, texture);
    this.player.setOrigin(0);
    this.player.setDisplaySize(x, y);
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.name="player";
    this.player.setSize((x/5), (y/5));
    this.player.setOffset(x/3,y/1.6);
    


    this.componentesAtaque={
      'textura':'ataqueLateralArriba',
      'anims': "ataqueArriba",
      'width':this.player.displayWidth*2,
      'height':this.player.displayHeight,
      'x':0.5,
      'y':0
    }

    this.ataque=5;

   this.animaciones();
   this.cargarSonidosPlayer();

    // ESCUCHADOR ÚNICO (Solo se crea una vez aquí)
    this.player.on("animationcomplete", (anim) => {
        if (this.state === "attack" || this.state === "hurt" || this.state === "healing") {
            this.state = "idle";
        }
    });



}


  cargarSonidosPlayer(){

    

    this.health_sound = this.scene.sound.add('health', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });

  this.atacado_espada = this.scene.sound.add('atacado_espada', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });

        this.pisadas_player_tierra = this.scene.sound.add('pisada_player_tierra', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });


  this.slide = this.scene.sound.add('slide', {
    loop: false,
    volume: 5   // volumen entre 0 y 1
  });

    this.ataque_cargado = this.scene.sound.add('ataque5', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });

  this.ataque1=this.scene.sound.add(this.combo[0].sound,{
        loop:false,
        volume:1
      });

   this.ataque2=this.scene.sound.add(this.combo[1].sound,{
        loop:false,
        volume:1
      });


         this.ataque3=this.scene.sound.add(this.combo[2].sound,{
        loop:false,
        volume:1
      });



  }


  getSound(n){
    //1 correr
    switch(n){
      case 1:
        return this.pisadas_player_tierra;
      break
    }
  }

  animaciones(){

    this.scene.anims.create({
        key: "player_estatico",
        frames: this.scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
          });
    //this.sprite.play("player_estatico");

    this.scene.anims.create({
        key: "player_camina",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
          });
          this.scene.anims.create({
        key: "player_camina_inverso",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
          });

          this.scene.anims.create({
        key: "player_camina_up",
        frames: this.scene.anims.generateFrameNumbers('player_walk_up', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
          });

                    this.scene.anims.create({
        key: "player_camina_down",
        frames: this.scene.anims.generateFrameNumbers('player_walk_down', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
          });
          this.scene.anims.create({
        key: "player_estatico_inverso",
        frames: this.scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
          });

            this.scene.anims.create({
            key: this.combo[0].nombre,
            frames: this.scene.anims.generateFrameNumbers(this.combo[0].sprite,{start:0, end:this.combo[1].frame_end }),
            frameRate:this.combo[0].velocidad_frames,
            repeat:0
          })


          this.scene.anims.create({
            key: this.combo[1].nombre,
            frames: this.scene.anims.generateFrameNumbers(this.combo[1].sprite,{start:0, end:this.combo[1].frame_end }),
            frameRate:this.combo[1].velocidad_frames,
            repeat:0
          })

          this.scene.anims.create({
            key: this.combo[2].nombre,
            frames: this.scene.anims.generateFrameNumbers(this.combo[2].sprite,{start:0, end:this.combo[1].frame_end }),
            frameRate:this.combo[2].velocidad_frames,
            repeat:0
          })



          this.scene.anims.create({
            key:"hurt_sword",
            frames:this.scene.anims.generateFrameNumbers("player_golpeado_espada",{start:0, end:1}),
            frameRate:6,
            repeat:0
          })

this.scene.anims.create({
    key: "player_curar_anim",
    frames: this.scene.anims.generateFrameNumbers('player_heal', { start: 0, end: 9 }), // Ajusta los frames según tu sprite
    frameRate: 10,
    repeat: 0 
});

   this.scene.anims.create({
     key:"dash-reverso",
     frames: this.scene.anims.generateFrameNumbers("player_dash_reverso",{start:0,end:7}),
     frameRate:12,
     repeat:0
 });

          this.scene.anims.create({
            key:"dash-delantero",
            frames: this.scene.anims.generateFrameNumbers("player_dash_adelante",{start:0,end:7}),
            frameRate:12,
            repeat:0
          });




   
  }

  getHabilitarCollision(){
    return this.habilitarCollision;
  }

  setHabilitarCollision(n){
      this.habilitarCollision=n;
  }


  setCambiarEstado(estado){

    this.state=estado;

  }


  getCaminar(){


    //console.log("Caminando");

     this.scene.anims.create({
        key: "player_camina",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
          });
    this.player.play('player_camina');
  }

  getNoCaminar(){
   // console.log("NO Caminando");
     this.scene.anims.create({
        key: "player_estatico",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
        frameRate: 6,
        repeat: -1
          });
    //this.sprite.play("player_estatico");
  }

  getChangeSprite(){
    

     this.keys.W.on('down', () => {
    this.player.play('player_caminar');
    //console.log("AQUI en caminar");
  });

  this.keys.W.on('up', () => {
    this.player.play('player_estatico');
    //console.log("AQUI en estatico")
  });
  }




  getContainer() {
    return this.player;
  }

  setVida(n){

      this.vida=this.vida-n;
  }

  getVida(){
    return this.vida;
  }


  getGolpeado(){
    
  }

  setGolpeado(){

    //console.log("EN GOLPEADO");
    this.state="hurt";

    if(this.player.anims.currentAnim?.key!=="hurt_sword")

      this.player.play("hurt_sword");
   

  }

  setPositionInitial(x, y) {
    this.player.setPosition(x, y);
    
  }

  getPositionX(){
    return this.player.x;
  }
  getPositionY(){
    return this.player.y;
  }

  setMovementX(n = 1) {
    this.player.setVelocityX(n);
  }

  setMovementY(n = 1) {
    this.player.setVelocityY(n);
  }

    setArma(arma){

    this.arma=arma;
    this.sonidoAtaque=this.scene.sound.add(arma.sonido,{
        loop:false,
        volume:1
      });

      //console.log(this.arma.inicioAnim+" "+(parseInt(this.arma.inicioAnim)+3 ));

      if((this.scene.anims.exists("ataqueArriba"))){
          this.scene.anims.remove("ataqueArriba");
      }
      if (this.scene.anims.exists("ataqueAbajo")) {
          this.scene.anims.remove("ataqueAbajo");
        }
      if (this.scene.anims.exists("ataqueDerecha")) {
          this.scene.anims.remove("ataqueDerecha");
        }
      if (this.scene.anims.exists("ataqueIzquierda")) {
          this.scene.anims.remove("ataqueIzquierda");
        }



      this.scene.anims.create({
        key: "ataqueArriba",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralArriba", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 25,
        repeat: -1
          });

          this.scene.anims.create({
        key: "ataqueAbajo",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralAbajo", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 25,
        repeat: -1
          });

          this.scene.anims.create({
        key: "ataqueDerecha",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralDerecha", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 25,
        repeat: -1
          });

          this.scene.anims.create({
        key: "ataqueIzquierda",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralIzquierda", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 25,
        repeat: -1
          });



  }

  caminarPlayer(contacto,subEstado_caminar){
    //realizar las acciones dependiendo de la posicion del estado de caminata


  
    //velocidad del movimiento del player
    
    const velocidadFinal=300;
    let aceleracion=25;

    //let velocidad= 0;

   // console.log("player x:"+this.player.body.velocity.x);

    //console.log("player y:"+this.player.body.velocity.y);

    let velocidad={
      "xm":(this.player.body.velocity.x),
      "xM":(this.player.body.velocity.x),
      "ym":(this.player.body.velocity.y),
      "yM":(this.player.body.velocity.y)
    }


   // console.log(velocidad);

    
    let velocidadFinalDiagonal=velocidadFinal/Math.sqrt(2);


 
    let velocidadDiagonal={
      'xmd':velocidad.xm,
      'xMd':velocidad.xM,
      'ymd':velocidad.ym,
      'yMd':velocidad.yM
    };

       // console.log(velocidadDiagonal);


//if (!contacto && !(this.estaAtacando)&& this.state!="attack") {


    if(this.state==="walk"){
      if(!(this.pisadas_player_tierra.isPlaying))
      this.pisadas_player_tierra.play();

    }else{
      this.pisadas_player_tierra.stop();
    }
    
if (!contacto && !(this.estaAtacando) && this.state !== "attack" && this.state !== "healing"  &&this.state!="dash") {


    //ASIGNAR ESTADOS DE ACUERDO AL MOVIMIENTO
    //Calcular velocidad de movimimiento


   




    //movimiento diagonal respecto a la velocidad de una pendiente con respecto a la suma de fuerzas
    
  
    //DIAGONAL ARRIBA Y LA DERECHA
  if((this.scene.cursor.up.isDown && 
    this.scene.cursor.right.isDown)||
    (this.keys.W.isDown&&this.keys.D.isDown)
    ||(this.joystick.up.isDown&&this.joystick.right.isDown

    )){
    // console.log("UP + RIGHT");  

    if(!(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown)&&
       !(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown)
  )

    { this.state="walk";
      subEstado_caminar="arriba-derecha";}

    //this.sprite.play('player_camina');
     
     
  }
//DIAGONAL ARRIBA IZQUIERDA
  else if((this.scene.cursor.up.isDown 
    && this.scene.cursor.left.isDown)||
    (this.keys.W.isDown&&this.keys.A.isDown)||
    (this.joystick.up.isDown&&this.joystick.left.isDown)
  ){
   // console.log("UP + LEFT");
    //this.sprite.play('player_camina');

    if(
      !(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown)&&
      !(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown)
    )

    { this.state="walk";
      subEstado_caminar="arriba-izquierda";}
 


     
  }//DIAGONAL ABAJO IZQUIERDA
  else if((this.scene.cursor.down.isDown && 
    this.scene.cursor.left.isDown)||(this.keys.S.isDown&&this.keys.A.isDown)||
    (this.joystick.down.isDown&&this.joystick.left.isDown)){
   // console.log("DOWN + LEFT");
   

    if(
      !(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown)&&
      !(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown)
    )

    { this.state="walk";
      subEstado_caminar="abajo-izquierda";}
     


     
  }
  //DIAGONAL ABAJO DERECHA
  else if((this.scene.cursor.down.isDown && 
    this.scene.cursor.right.isDown)||(this.keys.S.isDown&&this.keys.D.isDown)||
    (this.joystick.down.isDown&&this.joystick.right.isDown)){
     //console.log("DOWN + RIGHT");
     //this.sprite.play('player_camina');
      if(
        !(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown)&&
        !(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown)
      )
    { this.state="walk";
      subEstado_caminar="abajo-derecha";}

     
  }
  else
//movimientos normales

    //ARIBA
 if(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown){

  if(!(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown)
    &&!(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown)
    &&!(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown)
  )
    { this.state="walk";
      subEstado_caminar="arriba";}
 }  //ABAJO
 else if(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown){
  if(!(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown)
    &&!(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown)
    &&!(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown)
  )
    { this.state="walk";
      subEstado_caminar="abajo";}
 }  //DERECHA
 else if(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown){

  if(
      !(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown)
    &&!(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown)
    &&!(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown)
  )
    { this.state="walk";
      subEstado_caminar="derecha";}
 }  //IZQUIERDA
 else if(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown){

  if(
      !(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown)
    &&!(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown)
    &&!(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown)
  )
    { this.state="walk";
      subEstado_caminar="izquierda";}
 }else{


    this.state="idle";

      //this.player.setVelocity(0);

    /*
    Aqui utilizare los sub_estados de movimiento idle, si esta en derecha se quedad en posicion derecha quieto, 
    si esta en izquierda invierte los valores
    */



  switch(this.subEstado_posicionEstatico){
    case "derecha":

    if (this.player.anims.currentAnim?.key !== 'player_estatico'&&this.state==="idle") {
      this.player.flipX=false;
      this.player.play('player_estatico');
      this.state="idle";
    }
    break;

    case "izquierda":

    if (this.player.anims.currentAnim?.key !== 'player_estatico'&&this.state==="idle") {
      this.player.flipX=true;
      this.player.play('player_estatico');
      this.state="idle";
    }
    break;

    default:
      if (this.player.anims.currentAnim?.key !== 'player_estatico'&&this.state==="idle") {
      
      this.player.play('player_estatico');
      this.state="idle";
    }
    break;

  }

  
 }
       // console.log("subEstadoCaminar: "+subEstado_caminar);
        //if(subEstado_caminar!=="") 
 
}




  //console.log("SubEstadoCaminar: "+subEstado_caminar);

  

 switch(subEstado_caminar){
  case "arriba":

    //.setOrigin(0.5,1)//arriba
  //this.sprite.play('player_camina');

 // velocidad.ym=velocidad.ym-aceleracion;
   
  this.subEstado_posicionEstatico="arriba";
  this.componentesAtaque.x=0.5;
  this.componentesAtaque.y=1;
  this.player.flipX=false;
  


  this.componentesAtaque.textura="ataqueLateralArriba";
  this.componentesAtaque.anims="ataqueAbajo";
  //cambio de tamaño
   this.componentesAtaque.width=this.player.displayWidth*2;
   this.componentesAtaque.height=this.player.displayHeight;

   //this.componentesAtaque.x=-1*this.componentesAtaque.x;
   //this.componentesAtaque.y=-1*this.componentesAtaque.y;

  

  if(velocidad.ym>(-velocidadFinal))
    this.player.setVelocityY(velocidad.ym-aceleracion);
  else this.player.setVelocityY(-velocidadFinal);

    //console.log(this.player.body.velocity.y);
    //console.log(this.player.body.velocity.x);
      if(this.player.body.velocity.y===-aceleracion) 
        this.player.anims.play('player_estatico',true);
       else if (this.player.anims.currentAnim?.key !== 'player_camina_up') 
      this.player.anims.play('player_camina_up',true);



  break;

  case "abajo":
    // .setOrigin(0.5,0)//abajo
  //this.sprite.play('player_camina');
  this.player.flipX=false;
 
  this.subEstado_posicionEstatico="abajo";

 // velocidad.yM=velocidad.yM+aceleracion;


  
   this.componentesAtaque.x=0.5;
  this.componentesAtaque.y=0;
 

   //cambio de tamaño
   this.componentesAtaque.width=this.player.displayWidth*2;
   this.componentesAtaque.height=this.player.displayHeight;

   
   this.componentesAtaque.textura="ataqueLateralAbajo";
   this.componentesAtaque.anims="ataqueArriba";

   

     //console.log("DOWN");
      if(velocidad.yM<velocidadFinal)
    this.player.setVelocityY(velocidad.yM+aceleracion);
  else this.player.setVelocityY(velocidadFinal);

    //console.log(this.player.body.velocity.y);
    //console.log(this.player.body.velocity.x);

    if(this.player.body.velocity.y===aceleracion) 
        this.player.anims.play('player_estatico',true);
    else if (this.player.anims.currentAnim?.key !== 'player_camina_down') 
      this.player.play('player_camina_down');

  break;

  case "derecha":
  

  //.setOrigin(0,0.5)//derecha
  //this.state="moveRight";
  this.subEstado_posicionEstatico="derecha";
  
  //velocidad.xM=velocidad.xM+aceleracion;
  //this.player.flipX=false;

  this.componentesAtaque.x=0;
  this.componentesAtaque.y=0.5;

   this.componentesAtaque.textura="ataqueLateralDerecha";
   this.componentesAtaque.anims="ataqueDerecha";

   //cambio del tamaño
   
   this.componentesAtaque.width=this.player.displayHeight;
   this.componentesAtaque.height=this.player.displayWidth*2;


   //velocidad=this.sprite.body.velocity.x+aceleracion;
    // console.log("RIGHT");

    //console.log(velocidad.xM);
     if(velocidad.xM<velocidadFinal){

    this.player.setVelocityX(velocidad.xM+aceleracion);}
     else {this.player.setVelocityX(velocidadFinal);


     }

       //console.log(this.player.body.velocity.y);
    //console.log(this.player.body.velocity.x);

    if(this.player.body.velocity.x===aceleracion) 
        this.player.anims.play('player_estatico',true);

    else if (this.player.anims.currentAnim?.key !== 'player_camina') {
    //  console.log("cambio derecha");
      this.player.flipX=false;
      this.player.play('player_camina');
    }


  break;

  case "izquierda":
    
  
  this.subEstado_posicionEstatico="izquierda";

  
 
  //velocidad.xm=velocidad.xm-aceleracion;



  this.componentesAtaque.x=1;
  this.componentesAtaque.y=0.5;


   this.componentesAtaque.textura="ataqueLateralIzquierda";
   this.componentesAtaque.anims="ataqueIzquierda";
   //cambio del tamaño
   
   this.componentesAtaque.width=this.player.displayHeight;
   this.componentesAtaque.height=this.player.displayWidth*2;
   
   //  console.log("LEFT");
   //velocidad=-this.sprite.body.velocity.x-aceleracion;
    //  350 - 0  -450<-350   -200<-350
    if(velocidad.xm>(-velocidadFinal))
    this.player.setVelocityX(velocidad.xm-aceleracion);
  else this.player.setVelocityX(-velocidadFinal);
  

      // console.log(this.sprite.body.velocity.y);
    //console.log(this.player.body.velocity.x);

        if(this.player.body.velocity.x===-aceleracion) 
        this.player.anims.play('player_estatico',true);
      else  if (this.player.anims.currentAnim?.key !== 'player_camina_inverso') {
        //  console.log("cambio izquierda");
      this.player.flipX=true;
      this.player.play('player_camina_inverso');
    }

  break;

  case "arriba-derecha":

  this.subEstado_posicionEstatico="arriba-derecha";



    
    if(velocidadDiagonal.ymd<velocidadFinalDiagonal&&velocidadDiagonal.xMd<velocidadFinalDiagonal){
      this.player.setVelocityX(velocidadDiagonal.xMd+aceleracion);
      this.player.setVelocityY(velocidadDiagonal.ymd-aceleracion);

      let sum= (velocidadDiagonal.xMd*velocidadDiagonal.xMd)+((velocidadDiagonal.ymd)*(velocidadDiagonal.ymd));
      //console.log("operacion: "+(Math.sqrt(sum)));
    }
      
    else{ 
      this.player.setVelocityY(-velocidadFinalDiagonal)
      this.player.setVelocityX(velocidadFinalDiagonal);
    };


          if(this.player.body.velocity.y===-aceleracion&&this.player.body.velocity.x===aceleracion) 
        {
          //this.player.setVelocity(0);
          this.player.anims.play('player_estatico',true);
        }
        else if (this.player.anims.currentAnim?.key !== 'player_camina') {
      console.log("cambio derecha");
      this.player.flipX=false;
      this.player.play('player_camina');
    }
  break;

  case "arriba-izquierda":
    this.subEstado_posicionEstatico="arriba-izquierda";
    if(velocidadDiagonal.ymd>(-velocidadFinalDiagonal))
      this.player.setVelocityY(velocidadDiagonal.ymd-aceleracion);
    else this.player.setVelocityY(-velocidadFinalDiagonal);

    if(velocidadDiagonal.xmd>(-velocidadFinalDiagonal))
     this.player.setVelocityX(velocidadDiagonal.xmd-aceleracion);
    else this.player.setVelocityX(-velocidadFinalDiagonal);


        if(this.player.body.velocity.y===-aceleracion&&this.player.body.velocity.x===-aceleracion) 
        {
          this.player.anims.play('player_estatico',true);
          //this.player.setVelocity(0);
        }
    else  if (this.player.anims.currentAnim?.key !== 'player_camina') {
     // console.log("cambio izquierda");
      this.player.flipX=true;
      this.player.play('player_camina');
    }
  break;

  case "abajo-derecha":

  this.subEstado_posicionEstatico="abajo-derecha";
    if(velocidadDiagonal.yMd<velocidadFinalDiagonal)
      this.player.setVelocityY(velocidadDiagonal.yMd+aceleracion);
    else this.player.setVelocityY(velocidadFinalDiagonal);

    if(velocidadDiagonal.xMd<velocidadFinalDiagonal)
     this.player.setVelocityX(velocidadDiagonal.xMd+aceleracion);
    else this.player.setVelocityX(velocidadFinalDiagonal);

        if(this.player.body.velocity.y===aceleracion&&this.player.body.velocity.x===aceleracion) 
        {
         // this.player.setVelocity(0);
          this.player.anims.play('player_estatico',true);
        }
        else if (this.player.anims.currentAnim?.key !== 'player_camina') {
      //console.log("cambio derecha");
      this.player.flipX=false;
      this.player.play('player_camina');
    }

  break;

  case "abajo-izquierda":
    this.subEstado_posicionEstatico="abajo-izquierda";
  //this.subEstado_posicionEstatico="abajo-derecha";
    if(velocidadDiagonal.yMd<velocidadFinalDiagonal)
      this.player.setVelocityY(velocidadDiagonal.yMd+aceleracion);
    else this.player.setVelocityY(velocidadFinalDiagonal);

    if(velocidadDiagonal.xmd>(-velocidadFinalDiagonal))
     this.player.setVelocityX(velocidadDiagonal.xmd-aceleracion);
    else this.player.setVelocityX(-velocidadFinalDiagonal);

        if(this.player.body.velocity.y===aceleracion&&this.player.body.velocity.x===-aceleracion) 
       { 
       // this.player.setVelocity(0);
        this.player.anims.play('player_estatico',true);
      }
    else if (this.player.anims.currentAnim?.key !== 'player_camina') {
          //console.log("cambio izquierda");
      this.player.flipX=true;
      this.player.play('player_camina');
    }
  break;
    default:



      switch(this.subEstado_posicionEstatico){
    case "derecha":

    if (this.player.anims.currentAnim?.key !== 'player_estatico'&&(this.state==="idle"||this.state==="walk")) {
      this.player.flipX=false;
      this.player.play('player_estatico');
      this.state="idle";
    }
    break;

    case "izquierda":

    if (this.player.anims.currentAnim?.key !== 'player_estatico'&&(this.state==="idle"||this.state==="walk")) {
      this.player.flipX=true;
      this.player.play('player_estatico');
      this.state="idle";
    }
    break;

    default:
      if (this.player.anims.currentAnim?.key !== 'player_estatico'&&(this.state==="idle"||this.state==="walk")) {
      
      this.player.play('player_estatico');
      this.state="idle";
    }
    break;

  }

    break;


 }



// console.log(subEstado_caminar);


 

  }




  movimientoDash(){

    if((Phaser.Input.Keyboard.JustDown((this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT))))){

      let velocidadDash=500;






     // console.log(this.state);

      if(this.state==="idle"){

        this.slide.play();

        this.player.play("dash-reverso");

        switch(this.subEstado_posicionEstatico){

          case "derecha":


          this.player.flipX=false;
          console.log("derecha dash");
          //console.log(this.player.body.velocity);
          this.player.setVelocityX(-velocidadDash);
        
          
          break;

          case "izquierda":

          console.log("izquierda dash");
          this.player.flipX=true;
          this.player.setVelocityX(velocidadDash);

          break;

          case "arriba":

          console.log("arriba dash");
          this.player.setVelocityY(velocidadDash);

          break;

          case "abajo":

          console.log("abajo dash");
          this.player.setVelocityY(-velocidadDash);

          break;

          case "arriba-derecha":


          this.player.flipX=false;
          console.log("arriba-derecha dash");
          //console.log(this.player.body.velocity);
          this.player.setVelocityX(-velocidadDash);
          this.player.setVelocityY(velocidadDash);
        
          
          break;

          case "arriba-izquierda":

          console.log("arriba-izquierda dash");
          this.player.flipX=true;
          this.player.setVelocityX(velocidadDash);
          this.player.setVelocityY(velocidadDash);

          break;

          case "abajo-izquierda":

          //console.log("izquierda dash");
          console.log("abajo-izquierda");
          this.player.flipX=true;
          this.player.setVelocityX(velocidadDash);
          this.player.setVelocityY(-velocidadDash);

          break;

          case "abajo-derecha":

          console.log("abajo-derecha dash");
          this.player.flipX=false;
          this.player.setVelocityX(-velocidadDash);
          this.player.setVelocityY(-velocidadDash);

          break;


          default:

          break;

        }

        

      }
      else if(this.state==="walk"){
        this.slide.play();

        this.player.play("dash-delantero")

        let potenciador=1.0;

        
      //  console.log(subEstado_caminar);
        switch(this.subEstado_posicionEstatico){



          case "derecha":


          this.player.flipX=false;
          console.log("derecha dash");
          //console.log(this.player.body.velocity);
          this.player.setVelocityX(velocidadDash*potenciador);
        
          
          break;

          case "izquierda":

          console.log("izquierda dash");
          this.player.flipX=true;
          this.player.setVelocityX(-velocidadDash*potenciador);

          break;

          case "arriba":

          console.log("arriba dash");
          this.player.setVelocityY(-velocidadDash*potenciador);

          break;

          case "abajo":

          console.log("abajo dash");
          this.player.setVelocityY(velocidadDash*potenciador);

          break;

          
          case "derecha":


          this.player.flipX=false;
          console.log("derecha dash");
          //console.log(this.player.body.velocity);
          this.player.setVelocityX(velocidadDash*potenciador);
          
        
          
          break;

          case "arriba-derecha":


          this.player.flipX=false;
          console.log("arriba-derecha dash");
          //console.log(this.player.body.velocity);
          this.player.setVelocityX(velocidadDash*potenciador);
          this.player.setVelocityY(-velocidadDash*potenciador);
        
          
          break;

          case "arriba-izquierda":

          console.log("arriba-izquierda dash");
          this.player.flipX=true;
          this.player.setVelocityX(-velocidadDash*potenciador);
          this.player.setVelocityY(-velocidadDash*potenciador);

          break;

          case "abajo-izquierda":

          //console.log("izquierda dash");
          console.log("abajo-izquierda");
          this.player.flipX=true;
          this.player.setVelocityX(-velocidadDash*potenciador);
          this.player.setVelocityY(velocidadDash*potenciador);

          break;

          case "abajo-derecha":

          console.log("abajo-derecha dash");
          this.player.flipX=false;
          this.player.setVelocityX(velocidadDash*potenciador);
          this.player.setVelocityY(velocidadDash*potenciador);

          break;

          default:

          break;

        }

       

      }


      this.state="dash";
    }

  }


  detenerMovimiento(){
    let desaceleracion=18;
    let desalerar;

        let velocidad={
      "xm":(this.player.body.velocity.x),
      "xM":(this.player.body.velocity.x),
      "ym":(this.player.body.velocity.y),
      "yM":(this.player.body.velocity.y)
    }
    if(this.player.body.velocity.x!==0||this.player.body.velocity.y!==0){

      //console.log(this.player.body.velocity);
      //console.log("hay movimiento");

      //en eje x
      if(this.player.body.velocity.x>0){
         desalerar=velocidad.xM-desaceleracion;
        this.player.setVelocityX(desalerar);
      }else if(this.player.body.velocity.x<0){
        desalerar=velocidad.xm+desaceleracion;
        this.player.setVelocityX(desalerar);
      }

      //en eje y

            if(this.player.body.velocity.y>0){
         desalerar=velocidad.yM-desaceleracion;
        this.player.setVelocityY(desalerar);
      }else if(this.player.body.velocity.y<0){
        desalerar=velocidad.ym+desaceleracion;
        this.player.setVelocityY(desalerar);
      }
      
    }


  }


  Curar() {
    // 1. Verificamos la tecla V y que el jugador no esté ya haciendo otra acción (ataque o cura)
    if (Phaser.Input.Keyboard.JustDown(this.keys.V) && this.state !== "healing" && this.state !== "attack") {
        
        this.vidaActualMax = 3; // Definimos el límite máximo


        if (this.vida < this.vidaActualMax) {
            // AUMENTO DE VIDA

            this.vida++;
            if (this.vida > this.vidaActualMax) {
                this.vida = this.vidaActualMax;
            }

            // --- LÓGICA DE ANIMACIÓN ---
            this.state = "healing";      // Cambiamos el estado para bloquear otras acciones
            this.player.setVelocity(0);  // Frenamos al jugador para que no se mueva mientras se cura
            this.player.play("player_curar_anim"); // Reproducimos la animación que creaste
            this.health_sound.play();
            console.log("Caballero curado. Vida actual: " + this.vida);
        } else {
            console.log("La vida ya está al máximo");
        }
    }
}

  setMovimientoPlayer(contacto){


       // console.log(this.player.x);
       // console.log(this.player.y);
        let subEstado_caminar="";

    //console.log("Estado Principal: "+this.state);



    


    //cuando termine la animacion
    this.player.on("animationcomplete", (anim)=>{
      if(
        this.state==="attack"
      ||this.state==="hurt"
      ||this.state==="dash"
      ||this.state === "healing"
      ){
        
        this.state="idle";
      }
    })



      this.caminarPlayer(contacto,subEstado_caminar);


      this.movimientoDash();

      this.detenerMovimiento();

      this.Curar();
      
      


  

  }

  getArma(){
    //console.log("GetArma: ");
    //console.log(this.arma);
    return this.arma;
  }

  setAtaque(){

  }


  contactoAtaque(listaEnemigos,enemigo){

    
   

              if (!enemigo) return;

            if(enemigo.golpeado) return;
               enemigo.golpeado=true;

               let multiplicador=1;

               if(this.esAtaqueFuerte) multiplicador=3;
        
            enemigo.setVida(parseInt((this.arma.ataque)*(this.arma.nivel)*multiplicador));

            this.atacado_espada.play();

            
            
             if(enemigo.getVida()<=0){

              
                crearItemsPunto(this.scene,enemigo.dataEnemie.items,this.listaItems,enemigo.getPositionX(),enemigo.getpositionY(),false,this.player);
             


              //AQUI ESTO COLOCA EN POSICION ALEATORIA ERA PARA OPTIMIZAR AHORA COMO LOS ENEMIGOS SE REPOSICIONAN, ENTONCES SI SE ELIMINAN


              /*
              let x=Math.floor(Math.random() * ((this.widthEscenario-30) - 0 + 1)) + 0;
              let y=Math.floor(Math.random() * ((this.heightEscenario-30) - 0 + 1)) + 0;
              let t=parseInt(enemigo.dataEnemie.id)-1;

              
              enemigo.setFullVida(dataEnemigos[t].vida);
              enemigo.setEnemiePosition(x,y);

              */

              //console.log(listaEnemigos);
              enemigo.sonido.stop(0);

              console.log(enemigo);
              if(enemigo){
                //enemigo.body.destroy();
                enemigo.disableBody(true,true);

                this.scene.time.delayedCall(50, () => {
                enemigo.hitbox.destroy();
                listaEnemigos.remove(enemigo,true,true);

            });

              
            
            }
              //enemigo.setMuerteEnemigo();
              console.log("Enemigo eliminado");


              //enemigo
 
                this.habilitarCollision=true;
        //console.log("Enemigo Eliminado - Cantidad: " + listaEnemigos.length);
             }
          else {

            
            empujar(this.spriteAtaque,enemigo.getContainer(),1,this.contacto,this.scene);
            
          
          }

         
          enemigo.setGolpeado();

          // contacto[n]=false;

           

              
  }




  getAtacando(contacto,listaItems,listaEnemigos){


    
            // A. Decidir si es Fuerte o Normal
            if (this.tiempocarga > 30) {
                this.esAtaqueFuerte = true;
                console.log("¡SE LANZÓ ATAQUE FUERTE!");
            } else {
                this.esAtaqueFuerte = false;
                console.log("Ataque Normal");
            }

            
            this.tiempocarga = 0;

          // ===================================================
            // INICIO DEL CÓDIGO REUTILIZADO PARA EL GOLPE
            // ===================================================
            this.estaAtacando = true;

            this.contacto = contacto;

            // Crear el sprite si no existe
            if(this.spriteAtaque === undefined){
                this.spriteAtaque = this.scene.add.sprite(0, 0, this.componentesAtaque.textura)
                    .setOrigin(this.componentesAtaque.x, this.componentesAtaque.y);
                    
                
                this.scene.physics.add.existing(this.spriteAtaque);
                this.spriteAtaque.body.setCollideWorldBounds(true);
                //this.spriteAtaque.body.setCircle(0);

                
                
                this.listaItems = listaItems;
              //  this.scene.physics.add.overlap(this.spriteAtaque, this.listaEnemigos, this.contactoAtaque, null, this);

              //this.spriteAtaque.body.setSize(0,0);
              //this.spriteAtaque.setDisplaySize(0,0);
              
             
                this.scene.physics.add.overlap(this.spriteAtaque, listaEnemigos, (player, enemy) => {
                 
                  this.contactoAtaque(listaEnemigos,enemy);
                 

                });
                
            }

            // Si es ataque fuerte, multiplicamos por 2. Si es normal, por 1.
            let multiplicadorFuerza = this.esAtaqueFuerte ? 2 : 1;
            let sonido_ataque = this.esAtaqueFuerte ? this.ataque_cargado
            : this.scene.sound.add(this.combo[this.posicion_combo].sound,{
        loop:false,
        volume:1
      });;
          

            

            this.spriteAtaque
                .setOrigin(this.componentesAtaque.x, this.componentesAtaque.y)
                // Usamos el multiplicador en el ancho y el alto

                
                .setDisplaySize(
                    Number(this.arma.width) * (this.arma.nivel) * multiplicadorFuerza, 
                    Number(this.arma.heigth) * (this.arma.nivel) * multiplicadorFuerza
                )

                 
                .setPosition(this.player.x + this.player.displayWidth / 2, this.player.y + this.player.displayHeight / 2)
                .setTexture(this.componentesAtaque.textura)

              this.spriteAtaque.body.setCircle(1);
          
            //AQUI EL GOLPE EMPIEZA EN VALOR 0 0 

            this.spriteAtaque.body.setVelocity(0);
            this.spriteAtaque.setVisible(true);
            this.spriteAtaque.body.enable = true;
            this.spriteAtaque.play(this.componentesAtaque.anims);


 
 


            
            if(this.state !== "attack"){
                this.state = "attack";
                this.player.anims.play(this.combo[this.posicion_combo].nombre, true);
            }


            
            this.player.setVelocity(0);
            sonido_ataque.play();
            
            if((this.arma.largoAtaque)){
                switch(this.componentesAtaque.textura){
                    case 'ataqueLateralArriba':
                        this.spriteAtaque.body.setVelocityY(-this.arma.tiempoDisparo * (this.arma.nivel));
                        break;
                    case 'ataqueLateralAbajo':
                        this.spriteAtaque.body.setVelocityY(this.arma.tiempoDisparo * (this.arma.nivel));
                        break;
                    case 'ataqueLateralDerecha':
                        this.spriteAtaque.body.setVelocityX(this.arma.tiempoDisparo * (this.arma.nivel));
                        break;
                    case 'ataqueLateralIzquierda':
                        this.spriteAtaque.body.setVelocityX(-this.arma.tiempoDisparo * (this.arma.nivel));
                        break;
                    default:
                        break;
                }
            }
            
            this.scene.time.delayedCall(this.combo[this.posicion_combo].tiempo_ataque, () => {
                this.estaAtacando = false;
                this.spriteAtaque.setVisible(false);
                this.spriteAtaque.body.enable = false;

            });



        
          
            

  }
 


  getAtaque(listaEnemigos,contacto,listaItems){


   

      //console.log(listaEnemigos);
    if (this.arma != undefined) {

       
        if (this.keys.J.isDown && !this.estaAtacando) {
            this.tiempocarga++; 
          
        }


             if(this.spriteAtaque){

                      if(this.spriteAtaque.visible){
                        

              let velocidad=this.combo[this.posicion_combo].velocidad_radio_ataque;

              

              let width=this.spriteAtaque.displayWidth+velocidad;
              let height=this.spriteAtaque.displayHeight+velocidad;
              let multiplicador=0;
              if(this.esAtaqueFuerte) multiplicador=2;
              let radio=this.spriteAtaque.body.radius+velocidad+multiplicador;





              this.spriteAtaque.setDisplaySize(radio*2,radio*2);
              this.spriteAtaque.body.setCircle(radio,(this.spriteAtaque.width/2-radio),(this.spriteAtaque.height/2-radio));


                        


              
                      }
                      else{
                        let radio=this.spriteAtaque.body.radius;

                        
                        this.spriteAtaque.body.setCircle(1,(this.spriteAtaque.width/2-1),(this.spriteAtaque.height/2-1));
                        
                        //this.spriteAtaque.setDisplaySize(0,0);
                        
             

            }

            }


        
        if (Phaser.Input.Keyboard.JustUp(this.keys.J) && !this.estaAtacando && this.state !== "attack") {






          this.getAtacando(contacto,listaItems,listaEnemigos);

 





            if(this.posicion_combo>=this.limiteCombo){
                      //console.log("antes de..."+ this.posicion_combo);
                    // console.log("antes de..."+ this.combo[this.posicion_combo].tiempo_ataque);
                    // console.log(this.limiteCombo)
                        this.posicion_combo=0;
                         }else{
                     //console.log("antes de..."+ this.posicion_combo);
                     //console.log("antes de..."+ this.combo[this.posicion_combo].tiempo_ataque);
                     //console.log(this.limiteCombo)
                    this.posicion_combo++;
                      }




                if(this.timer_combo)      
              this.timer_combo.remove();
              this.timer_combo=this.scene.time.delayedCall(this.arma.tiempo_combo, () => {
                  this.posicion_combo=0;
            });
          
          

















        }


        //cambiar combo 



/*
   if (Phaser.Input.Keyboard.JustDown(this.keys.J) && !this.estaAtacando && this.state !== "attack") {

    //this.getAtacando(contacto,listaItems,listaEnemigos);

}*/

        
       

  


   
  } 

  



       

  

  }


}
