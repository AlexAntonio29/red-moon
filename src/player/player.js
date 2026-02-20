import  {empujar}  from "../funciones/empujar.js";
import { crearItemsPunto } from "../funciones/crearItemsPuntos.js";
import { armas } from "../items/DataItemsPotenciadores.js";
import {dataEnemigos} from "../enemies/DataEnemies.js"
export class player {

  constructor(scene, texture, x = 25, y = 25, joystick,controles, keys,listaEnemigos) {

    this.vida=3;
    this.scene = scene;
    this.texture = texture;
    this.x=x;
    this.y=y;
    this.arma;
    this.setArma(armas[0]);

    //codigo de ian para el progrmar ataque fuerte o cargado

    this.tiempocarga = 0; //esto sirve para contar los frames que lleva cargando
    this.esAtaquefuerte = false; //se coloca para para saber que ataque se debera a hacer



    console.log(this.arma);

    this.sonidoAtaque;
    this.spriteAtaque;

    this.listaEnemigos=listaEnemigos;

    this.joystick=joystick;
    this.controles=controles;
   
   

  
    this.keys=keys;
    //para cambiar de estado segun la accion
    this.state="idle";
     this.subEstado_posicionEstatico="derecha";

    

    this.habilitarCollision=false;

   

     this.estaAtacando=false;//para determinar que no genere muchos ataques sin limites

    // Crear sprite físico directamente
    this.sprite = scene.physics.add.sprite(0, 0, texture);
    this.sprite.setOrigin(0);
    this.sprite.setDisplaySize(x, y);
    this.sprite.setBounce(1);
    this.sprite.setCollideWorldBounds(true);

    this.componentesAtaque={
      'textura':'ataqueLateralArriba',
      'anims': "ataqueArriba",
      'width':this.sprite.displayWidth*2,
      'height':this.sprite.displayHeight,
      'x':0.5,
      'y':0
    }

    this.ataque=5;

    this.animaciones();


   
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
        frames: this.scene.anims.generateFrameNumbers('player_walk_up', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
          });

                    this.scene.anims.create({
        key: "player_camina_down",
        frames: this.scene.anims.generateFrameNumbers('player_walk_down', { start: 0, end: 5 }),
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
            key: "ataque-horizontal",
            frames: this.scene.anims.generateFrameNumbers('attack_right',{start:0, end:4 }),
            frameRate:15,
            repeat:0
          })


          this.scene.anims.create({
            key:"hurt_sword",
            frames:this.scene.anims.generateFrameNumbers("player_golpeado_espada",{start:0, end:1}),
            frameRate:6,
            repeat:0
          })





   
  }

  getHabilitarCollision(){
    return this.habilitarCollision;
  }

  setHabilitarCollision(n){
      this.habilitarCollision=n;
  }



  getCaminar(){


    //console.log("Caminando");

     this.scene.anims.create({
        key: "player_camina",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
          });
    this.sprite.play('player_camina');
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
    this.sprite.play('player_caminar');
    //console.log("AQUI en caminar");
  });

  this.keys.W.on('up', () => {
    this.sprite.play('player_estatico');
    //console.log("AQUI en estatico")
  });
  }




  getContainer() {
    return this.sprite;
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

    if(this.sprite.anims.currentAnim?.key!=="hurt_sword")

      this.sprite.play("hurt_sword");
   

  }

  setPositionInitial(x, y) {
    this.sprite.setPosition(x, y);
    
  }

  getPositionX(){
    return this.sprite.x;
  }
  getPositionY(){
    return this.sprite.y;
  }

  setMovementX(n = 1) {
    this.sprite.setVelocityX(n);
  }

  setMovementY(n = 1) {
    this.sprite.setVelocityY(n);
  }

    setArma(arma){

    this.arma=arma;
    this.sonidoAtaque=this.scene.sound.add(arma.sonido,{
        loop:false,
        volume:1
      });

      console.log(this.arma.inicioAnim+" "+(parseInt(this.arma.inicioAnim)+3 ));

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
        frameRate: 12,
        repeat: -1
          });

          this.scene.anims.create({
        key: "ataqueAbajo",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralAbajo", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 12,
        repeat: -1
          });

          this.scene.anims.create({
        key: "ataqueDerecha",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralDerecha", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 12,
        repeat: -1
          });

          this.scene.anims.create({
        key: "ataqueIzquierda",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralIzquierda", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 12,
        repeat: -1
          });



  }

  caminarPlayer(contacto){
    //realizar las acciones dependiendo de la posicion del estado de caminata
    let subEstado_caminar="";

  
    //velocidad del movimiento del player
    let velocidad=250;


    

 
    let velocidadDiagonal=velocidad/Math.sqrt(2);
   if (!contacto && !(this.estaAtacando)&& this.state!="attack") {


    //ASIGNAR ESTADOS DE ACUERDO AL MOVIMIENTO
    //Calcular velocidad de movimimiento
    this.sprite.setVelocity(0);

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

     subEstado_caminar="arriba-derecha";

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

    subEstado_caminar="arriba-izquierda";
 


     
  }//DIAGONAL ABAJO IZQUIERDA
  else if((this.scene.cursor.down.isDown && 
    this.scene.cursor.left.isDown)||(this.keys.S.isDown&&this.keys.A.isDown)||
    (this.joystick.down.isDown&&this.joystick.left.isDown)){
   // console.log("DOWN + LEFT");
   

    if(
      !(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown)&&
      !(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown)
    )

    subEstado_caminar="abajo-izquierda";
     


     
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
    subEstado_caminar="abajo-derecha";

     
  }
  else
//movimientos normales

    //ARIBA
 if(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown){

  if(!(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown)
    &&!(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown)
    &&!(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown)
  )
    subEstado_caminar="arriba";
 }  //ABAJO
 else if(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown){
  if(!(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown)
    &&!(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown)
    &&!(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown)
  )
    subEstado_caminar="abajo"
 }  //DERECHA
 else if(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown){

  if(
      !(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown)
    &&!(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown)
    &&!(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown)
  )
    subEstado_caminar="derecha";
 }  //IZQUIERDA
 else if(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown){

  if(
      !(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown)
    &&!(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown)
    &&!(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown)
  )
    subEstado_caminar="izquierda";
 }else{
    this.state="idle";

    /*
    Aqui utilizare los sub_estados de movimiento idle, si esta en derecha se quedad en posicion derecha quieto, 
    si esta en izquierda invierte los valores
    */



  switch(this.subEstado_posicionEstatico){
    case "derecha":

    if (this.sprite.anims.currentAnim?.key !== 'player_estatico'&&this.state==="idle") {
      this.sprite.flipX=false;
      this.sprite.play('player_estatico');
      this.state="idle";
    }
    break;

    case "izquierda":

    if (this.sprite.anims.currentAnim?.key !== 'player_estatico'&&this.state==="idle") {
      this.sprite.flipX=true;
      this.sprite.play('player_estatico');
      this.state="idle";
    }
    break;

    default:
      if (this.sprite.anims.currentAnim?.key !== 'player_estatico'&&this.state==="idle") {
      this.sprite.flipX=false;
      this.sprite.play('player_estatico');
      this.state="idle";
    }
    break;

  }

  
 }
       // console.log("subEstadoCaminar: "+subEstado_caminar);
        //if(subEstado_caminar!=="") 
 
}

 switch(subEstado_caminar){
  case "arriba":

    //.setOrigin(0.5,1)//arriba
  //this.sprite.play('player_camina');


   
  this.subEstado_posicionEstatico="arriba";
  this.componentesAtaque.x=0.5;
  this.componentesAtaque.y=1;
  


  this.componentesAtaque.textura="ataqueLateralArriba";
  this.componentesAtaque.anims="ataqueAbajo";
  //cambio de tamaño
   this.componentesAtaque.width=this.sprite.displayWidth*2;
   this.componentesAtaque.height=this.sprite.displayHeight;

   //this.componentesAtaque.x=-1*this.componentesAtaque.x;
   //this.componentesAtaque.y=-1*this.componentesAtaque.y;

    //console.log("UP");
    this.sprite.setVelocityY(-velocidad);

      if (this.sprite.anims.currentAnim?.key !== 'player_camina_up') 
      this.sprite.anims.play('player_camina_up',true);
  break;

  case "abajo":
    // .setOrigin(0.5,0)//abajo
  //this.sprite.play('player_camina');
 
  this.subEstado_posicionEstatico="abajo";


  
   this.componentesAtaque.x=0.5;
  this.componentesAtaque.y=0;
 

   //cambio de tamaño
   this.componentesAtaque.width=this.sprite.displayWidth*2;
   this.componentesAtaque.height=this.sprite.displayHeight;

   
   this.componentesAtaque.textura="ataqueLateralAbajo";
   this.componentesAtaque.anims="ataqueArriba";
  
     //console.log("DOWN");
    this.sprite.setVelocityY(velocidad);

    if (this.sprite.anims.currentAnim?.key !== 'player_camina_down') 
      this.sprite.play('player_camina_down');

  break;

  case "derecha":
  

  //.setOrigin(0,0.5)//derecha
  //this.state="moveRight";
  this.subEstado_posicionEstatico="derecha";
  


  this.componentesAtaque.x=0;
  this.componentesAtaque.y=0.5;

   this.componentesAtaque.textura="ataqueLateralDerecha";
   this.componentesAtaque.anims="ataqueDerecha";

   //cambio del tamaño
   
   this.componentesAtaque.width=this.sprite.displayHeight;
   this.componentesAtaque.height=this.sprite.displayWidth*2;
    // console.log("RIGHT");
    this.sprite.setVelocityX(velocidad);

    if (this.sprite.anims.currentAnim?.key !== 'player_camina') {
      console.log("cambio derecha");
      this.sprite.flipX=false;
      this.sprite.play('player_camina');
    }


  break;

  case "izquierda":
    
  
  this.subEstado_posicionEstatico="izquierda";
 



  this.componentesAtaque.x=1;
  this.componentesAtaque.y=0.5;


   this.componentesAtaque.textura="ataqueLateralIzquierda";
   this.componentesAtaque.anims="ataqueIzquierda";
   //cambio del tamaño
   
   this.componentesAtaque.width=this.sprite.displayHeight;
   this.componentesAtaque.height=this.sprite.displayWidth*2;
   
   //  console.log("LEFT");
   
    this.sprite.setVelocityX(-velocidad);

        if (this.sprite.anims.currentAnim?.key !== 'player_camina_inverso') {
          console.log("cambio izquierda");
      this.sprite.flipX=true;
      this.sprite.play('player_camina_inverso');
    }

  break;

  case "arriba-derecha":

  this.subEstado_posicionEstatico="arriba-derecha";
      this.sprite.setVelocityY(-velocidadDiagonal);
     this.sprite.setVelocityX(velocidadDiagonal);

         if (this.sprite.anims.currentAnim?.key !== 'player_camina') {
      console.log("cambio derecha");
      this.sprite.flipX=false;
      this.sprite.play('player_camina');
    }
  break;

  case "arriba-izquierda":
    this.subEstado_posicionEstatico="arriba-izquierda";
     this.sprite.setVelocityY(-velocidadDiagonal);
     this.sprite.setVelocityX(-velocidadDiagonal);

     if (this.sprite.anims.currentAnim?.key !== 'player_camina') {
      console.log("cambio izquierda");
      this.sprite.flipX=true;
      this.sprite.play('player_camina');
    }
  break;

  case "abajo-derecha":

  this.subEstado_posicionEstatico="abajo-derecha";
    this.sprite.setVelocityY(velocidadDiagonal);
     this.sprite.setVelocityX(velocidadDiagonal);

         if (this.sprite.anims.currentAnim?.key !== 'player_camina') {
      console.log("cambio derecha");
      this.sprite.flipX=false;
      this.sprite.play('player_camina');
    }

  break;

  case "abajo-izquierda":
    this.subEstado_posicionEstatico="abajo-izquierda";
    this.sprite.setVelocityY(velocidadDiagonal);
     this.sprite.setVelocityX(-velocidadDiagonal);

     if (this.sprite.anims.currentAnim?.key !== 'player_camina') {
          console.log("cambio izquierda");
      this.sprite.flipX=true;
      this.sprite.play('player_camina');
    }
  break;
    default:

      switch(this.subEstado_posicionEstatico){
    case "derecha":

    if (this.sprite.anims.currentAnim?.key !== 'player_estatico'&&this.state==="idle") {
      this.sprite.flipX=false;
      this.sprite.play('player_estatico');
      this.state="idle";
    }
    break;

    case "izquierda":

    if (this.sprite.anims.currentAnim?.key !== 'player_estatico'&&this.state==="idle") {
      this.sprite.flipX=true;
      this.sprite.play('player_estatico');
      this.state="idle";
    }
    break;

    default:
      if (this.sprite.anims.currentAnim?.key !== 'player_estatico'&&this.state==="idle") {
      this.sprite.flipX=false;
      this.sprite.play('player_estatico');
      this.state="idle";
    }
    break;

  }

    break;


 }




 

  }



  setMovimientoPlayer(contacto){
    //console.log("Estado Principal: "+this.state);


    

    //cuando termine la animacion
    this.sprite.on("animationcomplete", (anim)=>{
      if(
        this.state==="attack"
        ||this.state==="hurt"
      
      ){
        
        this.state="idle";
      }
    })

      this.caminarPlayer(contacto);

  

  }

  getArma(){
    //console.log("GetArma: ");
    //console.log(this.arma);
    return this.arma;
  }

  setAtaque(){

  }


  contactoAtaque(ataque,enemigo){

    

              if (!enemigo) return;

            if(enemigo.golpeado) return;
               enemigo.golpeado=true;
        
            enemigo.setVida(parseInt((this.arma.ataque)*(this.arma.nivel)));
            this.soundGolpe.play();
            
             if(enemigo.getVida()<=0){
                crearItemsPunto(this.scene,enemigo.dataEnemie.items,this.listaItems,enemigo.getPositionX(),enemigo.getpositionY(),false,this.sprite);
             

              let x=Math.floor(Math.random() * ((this.widthEscenario-30) - 0 + 1)) + 0;
              let y=Math.floor(Math.random() * ((this.heightEscenario-30) - 0 + 1)) + 0;
              let t=parseInt(enemigo.dataEnemie.id)-1;

              
              enemigo.setFullVida(dataEnemigos[t].vida);
              enemigo.setEnemiePosition(x,y);
              //enemigo
 
                this.habilitarCollision=true;
        //console.log("Enemigo Eliminado - Cantidad: " + listaEnemigos.length);
             }
          else empujar(this.spriteAtaque,enemigo.getContainer(),1,this.contacto,this.scene);
          enemigo.setGolpeado();

          // contacto[n]=false;

              
  }


  getAtaque(listaEnemigos,contacto,n,listaItems,widthEscenario,heightEscenario,contactoMov,sound){


   

    if (this.arma != undefined) {

       
        if (this.keys.J.isDown && !this.estaAtacando) {
            this.tiempocarga++; 
            console.log("Cargando fuerza: " + this.tiempocarga);
        }

        
        if (Phaser.Input.Keyboard.JustUp(this.keys.J) && !this.estaAtacando) {

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
            this.widthEscenario = widthEscenario;
            this.heightEscenario = heightEscenario;
            this.contacto = contacto;

            // Crear el sprite si no existe
            if(this.spriteAtaque === undefined){
                this.spriteAtaque = this.scene.add.sprite(0, 0, this.componentesAtaque.textura)
                    .setOrigin(this.componentesAtaque.x, this.componentesAtaque.y);
                
                this.scene.physics.add.existing(this.spriteAtaque);
                this.spriteAtaque.body.setCollideWorldBounds(true);
                
                this.listaItems = listaItems;
                this.scene.physics.add.overlap(this.spriteAtaque, this.listaEnemigos, this.contactoAtaque, null, this);
                this.soundGolpe = sound;
            }

            // Si es ataque fuerte, multiplicamos por 2. Si es normal, por 1.
            let multiplicadorFuerza = this.esAtaqueFuerte ? 2 : 1;

            this.spriteAtaque
                .setOrigin(this.componentesAtaque.x, this.componentesAtaque.y)
                // Usamos el multiplicador en el ancho y el alto
                .setDisplaySize(
                    Number(this.arma.width) * (this.arma.nivel) * multiplicadorFuerza, 
                    Number(this.arma.heigth) * (this.arma.nivel) * multiplicadorFuerza
                )
                .setPosition(this.sprite.x + this.sprite.displayWidth / 2, this.sprite.y + this.sprite.displayHeight / 2)
                .setTexture(this.componentesAtaque.textura);

          
         

            this.spriteAtaque.body.setVelocity(0);
            this.spriteAtaque.setVisible(true);
            this.spriteAtaque.body.enable = true;
            this.spriteAtaque.play(this.componentesAtaque.anims);
            
            if(this.state !== "attack"){
                this.state = "attack";
                this.sprite.anims.play("ataque-horizontal", true);
            }
            
            this.sprite.setVelocity(0);
            this.sonidoAtaque.play();
            
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
            
            this.scene.time.delayedCall(this.arma.velocidad, () => {
                this.estaAtacando = false;
                this.spriteAtaque.setVisible(false);
                this.spriteAtaque.body.enable = false;
            });
        
          
            
        }


   if (Phaser.Input.Keyboard.JustDown(this.keys.J) && !this.estaAtacando) {

    
    //ataque normal
      
      this.estaAtacando=true;
        this.widthEscenario=widthEscenario;
        this.heightEscenario=heightEscenario;
         
         this.contacto=contacto;
        if(this.spriteAtaque===undefined){

        this.spriteAtaque=this.scene.add.sprite(0,0,this.componentesAtaque.textura)
        .setOrigin(this.componentesAtaque.x,this.componentesAtaque.y)
        .setDisplaySize(Number(this.arma.width)*(this.arma.nivel),Number(this.arma.heigth)*(this.arma.nivel))
        .setPosition(this.sprite.x+this.sprite.displayWidth/2, this.sprite.y+this.sprite.displayHeight/2);


        
        this.scene.physics.add.existing(this.spriteAtaque);
        this.spriteAtaque.body.setCollideWorldBounds(true);

        this.listaItems=listaItems;

         this.scene.physics.add.overlap(this.spriteAtaque, this.listaEnemigos, this.contactoAtaque, null, this);

          this.soundGolpe=sound;


      
      } else{
        this.spriteAtaque
        .setOrigin(this.componentesAtaque.x,this.componentesAtaque.y)
        .setDisplaySize(Number(this.arma.width)*(this.arma.nivel),Number(this.arma.heigth)*(this.arma.nivel))
        .setPosition(this.sprite.x+this.sprite.displayWidth/2, this.sprite.y+this.sprite.displayHeight/2)
        .setTexture(this.componentesAtaque.textura);
             ;



             //this.scene.physics.add.existing(this.spriteAtaque);
        //this.spriteAtaque.body.setCollideWorldBounds(true);
      }

      



      this.spriteAtaque.body.setVelocity(0);


      this.spriteAtaque.setVisible(true);
    this.spriteAtaque.body.enable = true;

    this.spriteAtaque.play(this.componentesAtaque.anims);

    
      if(this.state!=="attack"){
        this.state="attack";
    this.sprite.anims.play("ataque-horizontal",true);
  }



        //this.ataque.setPosition((this.sprite.x)+this.componentesAtaque.x,this.sprite.y+this.componentesAtaque.y);

       
        this.sprite.setVelocity(0);

        //cargarSonido
        this.sonidoAtaque.play();
        



        if((this.arma.largoAtaque)){
           
          switch(this.componentesAtaque.textura){

             
            case 'ataqueLateralArriba':
              this.spriteAtaque.body.setVelocityY(-this.arma.tiempoDisparo*(this.arma.nivel));
             

            break;
            case 'ataqueLateralAbajo':
              this.spriteAtaque.body.setVelocityY(this.arma.tiempoDisparo*(this.arma.nivel));
             
            break;
            case 'ataqueLateralDerecha':
              this.spriteAtaque.body.setVelocityX(this.arma.tiempoDisparo*(this.arma.nivel));
              
            break;
            case 'ataqueLateralIzquierda':
              this.spriteAtaque.body.setVelocityX(-this.arma.tiempoDisparo*(this.arma.nivel));
              

            break;
            default:
              break;
        }}


                 //contacto[n]=false;
      

       this.scene.time.delayedCall(this.arma.velocidad, () => {
       this.estaAtacando=false;
       this.spriteAtaque.setVisible(false);
       this.spriteAtaque.body.enable = false;
    
  });

}
        
       

  


   
  } 

  

  

  

  }


}
