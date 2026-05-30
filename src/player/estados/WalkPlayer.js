import { Estados } from "../../funciones/automata/Estados.js";

export class WalkPlayer extends Estados{


    enter(){
        this.objeto.state='walk';
        //console.log("Estoy en Walk");

   // if( this.objeto.scene.physics.overlap(this.objeto.player,this.objeto.scene._above_collider) ) this.objeto.tocandoMuro=false;
   // if( this.objeto.scene.physics.overlap(this.objeto.player,this.objeto.scene.above_collider) ) this.objeto.tocandoMuro=false;
       
  


    }

    execute(){

        //movimientoCaminar


           this.caminarPlayer(false);
            
       

        this.detenerMovimiento();



        if(!this.verificarHerir());
        if(!this.verificarIdle());
        if(!this.verficarCurar());
        if(!this.verificarAtacar());
        if(!this.verificarDash());
        if(!this.verificarInteractuar());
    }

    exit(){
       // console.log("Saliendo de Walk");
       console.log('Saliendo de walk player')
       this.objeto.pisadas.stop();
       
    }


    verificarIdle(){
        if(this.objeto.player.body.velocity.x===0&&this.objeto.player.body.velocity.y===0){
           
            
            this.objeto.automata.cambiarEstado('Idle');
            return true;
        }
            return false;
    }

    verficarCurar(){
        if(Phaser.Input.Keyboard.JustDown(this.objeto.keys.V)){
            this.objeto.automata.cambiarEstado('Healing');
            return true
        }

        return false;
    }

    verificarAtacar(){

            if (this.objeto.keys.J.isDown && !this.objeto.estaAtacando) {
            this.objeto.tiempocarga++; 
          
        }

        if(Phaser.Input.Keyboard.JustUp(this.objeto.keys.J)&&this.objeto.stamina>0){
            this.objeto.automata.cambiarEstado('Attack');
            return true;
        }
        return false;
    }

    verificarHerir(){

                if(this.objeto.atacado){
            this.objeto.automata.cambiarEstado('Hurt');
            return true;
        }
        return false;
    }

    verificarDash(){
        if(Phaser.Input.Keyboard.JustDown
            (this.objeto.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)) 
            && this.objeto.stamina > 0 ){
              console.log("saliendo de walk dash");
            this.objeto.automata.cambiarEstado('Dash');
            return true
        }
        return false;
    }

    verificarInteractuar(){
        if(Phaser.Input.Keyboard.JustDown(this.objeto.keys.E)){
            this.objeto.automata.cambiarEstado('Interactuar');
            return true;
        }

        return false;
    }





      caminarPlayer(contacto){
        //realizar las acciones dependiendo de la posicion del estado de caminata
    
        let subEstado_caminar="";
      
        //velocidad del movimiento del player
        
        const velocidadFinal=300;
        let aceleracion=30;
        let movCam=200;
    
        //let velocidad= 0;
    
       // console.log("player x:"+this.objeto.player.body.velocity.x);
    
        //console.log("player y:"+this.objeto.player.body.velocity.y);
    
        let velocidad={
          "xm":(this.objeto.player.body.velocity.x),
          "xM":(this.objeto.player.body.velocity.x),
          "ym":(this.objeto.player.body.velocity.y),
          "yM":(this.objeto.player.body.velocity.y)
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
    
         
    //if (!contacto && !(this.objeto.estaAtacando)&& this.objeto.state!="attack") {
          if(this.objeto.state==="walk"
          &&this.objeto.puedeMoverse
         // &&(this.objeto.player.body.velocity.x!==0||this.objeto.player.body.velocity.y!==0)
        ){
          
          //if(this.objeto.player.body.velocity.x!==0&&this.objeto.player.body.velocity.y!==0)
          if(!(this.objeto.pisadas.isPlaying))
          this.objeto.pisadas.play();
    
         
        }else {
    
         
          if(!(this.objeto.pisadas.isStoping))
          this.objeto.pisadas.stop();
         
        }
    
    
    
    
       // if(this.objeto.player.body.velocity.x!==0||this.objeto.player.body.velocity.y!==0)
       //   console.log("HERREEEE");
       
    
    
    
        
    if (!contacto && !(this.objeto.estaAtacando) && this.objeto.state !== "attack" && this.objeto.state !== "healing" && this.objeto.state!="dash"  && this.objeto.puedeMoverse) {
    
        //ASIGNAR ESTADOS DE ACUERDO AL MOVIMIENTO
        //Calcular velocidad de movimimiento
    
    
       
    
    
    
    
        //movimiento diagonal respecto a la velocidad de una pendiente con respecto a la suma de fuerzas
        
      
        //DIAGONAL ARRIBA Y LA DERECHA
      if((this.objeto.scene.cursor.up.isDown && 
        this.objeto.scene.cursor.right.isDown)||
        (this.objeto.keys.W.isDown&&this.objeto.keys.D.isDown)
        ||(this.objeto.joystick.up.isDown&&this.objeto.joystick.right.isDown
    
        )){
        // console.log("UP + RIGHT");  
    
        if(!(this.objeto.keys.S.isDown||this.objeto.scene.cursor.down.isDown||this.objeto.joystick.down.isDown)&&
           !(this.objeto.scene.cursor.left.isDown||this.objeto.keys.A.isDown||this.objeto.joystick.left.isDown)
      )
    
        { this.objeto.state="walk";
          subEstado_caminar="arriba-derecha";}
    
        //this.objeto.sprite.play('player_camina');
         
         
      }
    //DIAGONAL ARRIBA IZQUIERDA
      else if((this.objeto.scene.cursor.up.isDown 
        && this.objeto.scene.cursor.left.isDown)||
        (this.objeto.keys.W.isDown&&this.objeto.keys.A.isDown)||
        (this.objeto.joystick.up.isDown&&this.objeto.joystick.left.isDown)
      ){
       // console.log("UP + LEFT");
        //this.objeto.sprite.play('player_camina');
    
        if(
          !(this.objeto.keys.S.isDown||this.objeto.scene.cursor.down.isDown||this.objeto.joystick.down.isDown)&&
          !(this.objeto.scene.cursor.right.isDown||this.objeto.keys.D.isDown||this.objeto.joystick.right.isDown)
        )
    
        { this.objeto.state="walk";
          subEstado_caminar="arriba-izquierda";}
     
    
    
         
      }//DIAGONAL ABAJO IZQUIERDA
      else if((this.objeto.scene.cursor.down.isDown && 
        this.objeto.scene.cursor.left.isDown)||(this.objeto.keys.S.isDown&&this.objeto.keys.A.isDown)||
        (this.objeto.joystick.down.isDown&&this.objeto.joystick.left.isDown)){
       // console.log("DOWN + LEFT");
       
    
        if(
          !(this.objeto.scene.cursor.right.isDown||this.objeto.keys.D.isDown||this.objeto.joystick.right.isDown)&&
          !(this.objeto.scene.cursor.up.isDown||this.objeto.keys.W.isDown||this.objeto.joystick.up.isDown)
        )
    
        { this.objeto.state="walk";
          subEstado_caminar="abajo-izquierda";}
         
    
    
         
      }
      //DIAGONAL ABAJO DERECHA
      else if((this.objeto.scene.cursor.down.isDown && 
        this.objeto.scene.cursor.right.isDown)||(this.objeto.keys.S.isDown&&this.objeto.keys.D.isDown)||
        (this.objeto.joystick.down.isDown&&this.objeto.joystick.right.isDown)){
         //console.log("DOWN + RIGHT");
         //this.objeto.sprite.play('player_camina');
          if(
            !(this.objeto.scene.cursor.up.isDown||this.objeto.keys.W.isDown||this.objeto.joystick.up.isDown)&&
            !(this.objeto.scene.cursor.left.isDown||this.objeto.keys.A.isDown||this.objeto.joystick.left.isDown)
          )
        { this.objeto.state="walk";
          subEstado_caminar="abajo-derecha";}
    
         
      }
      else
    //movimientos normales
    
        //ARIBA
     if(this.objeto.scene.cursor.up.isDown||this.objeto.keys.W.isDown||this.objeto.joystick.up.isDown){
    
      if(!(this.objeto.keys.S.isDown||this.objeto.scene.cursor.down.isDown||this.objeto.joystick.down.isDown)
        &&!(this.objeto.scene.cursor.right.isDown||this.objeto.keys.D.isDown||this.objeto.joystick.right.isDown)
        &&!(this.objeto.scene.cursor.left.isDown||this.objeto.keys.A.isDown||this.objeto.joystick.left.isDown)
      )
        { this.objeto.state="walk";
          subEstado_caminar="arriba";}
     }  //ABAJO
     else if(this.objeto.keys.S.isDown||this.objeto.scene.cursor.down.isDown||this.objeto.joystick.down.isDown){
      if(!(this.objeto.scene.cursor.up.isDown||this.objeto.keys.W.isDown||this.objeto.joystick.up.isDown)
        &&!(this.objeto.scene.cursor.right.isDown||this.objeto.keys.D.isDown||this.objeto.joystick.right.isDown)
        &&!(this.objeto.scene.cursor.left.isDown||this.objeto.keys.A.isDown||this.objeto.joystick.left.isDown)
      )
        { this.objeto.state="walk";
          subEstado_caminar="abajo";}
     }  //DERECHA
     else if(this.objeto.scene.cursor.right.isDown||this.objeto.keys.D.isDown||this.objeto.joystick.right.isDown){
    
      if(
          !(this.objeto.keys.S.isDown||this.objeto.scene.cursor.down.isDown||this.objeto.joystick.down.isDown)
        &&!(this.objeto.scene.cursor.up.isDown||this.objeto.keys.W.isDown||this.objeto.joystick.up.isDown)
        &&!(this.objeto.scene.cursor.left.isDown||this.objeto.keys.A.isDown||this.objeto.joystick.left.isDown)
      )
        { this.objeto.state="walk";
          subEstado_caminar="derecha";}
     }  //IZQUIERDA
     else if(this.objeto.scene.cursor.left.isDown||this.objeto.keys.A.isDown||this.objeto.joystick.left.isDown){
    
      if(
          !(this.objeto.keys.S.isDown||this.objeto.scene.cursor.down.isDown||this.objeto.joystick.down.isDown)
        &&!(this.objeto.scene.cursor.right.isDown||this.objeto.keys.D.isDown||this.objeto.joystick.right.isDown)
        &&!(this.objeto.scene.cursor.up.isDown||this.objeto.keys.W.isDown||this.objeto.joystick.up.isDown)
      )
        { this.objeto.state="walk";
          subEstado_caminar="izquierda";}
     }else{
    
        this.objeto.getCameraPosition(0,0,subEstado_caminar);
        this.objeto.state="idle";
        
    
          //this.objeto.player.setVelocity(0);
    
        /*
        Aqui utilizare los sub_estados de movimiento idle, si esta en derecha se quedad en posicion derecha quieto, 
        si esta en izquierda invierte los valores
        */
    
    
    /*
      switch(this.objeto.subEstado_posicionEstatico){
        case "derecha":
    
        if (this.objeto.player.anims.currentAnim?.key !== 'player_estatico'&&this.objeto.state==="idle") {
          this.objeto.player.flipX=false;
          this.objeto.player.play('player_estatico');
          this.objeto.state="idle";
          
        }
        break;
    
        case "izquierda":
    
        if (this.objeto.player.anims.currentAnim?.key !== 'player_estatico'&&this.objeto.state==="idle") {
          this.objeto.player.flipX=true;
          this.objeto.player.play('player_estatico');
          this.objeto.state="idle";
          
        }
        break;
    
        default:
          if (this.objeto.player.anims.currentAnim?.key !== 'player_estatico'&&this.objeto.state==="idle") {
          
          this.objeto.player.play('player_estatico');
          this.objeto.state="idle";
          
        }
        break;
    
      }*/
    
      
     }
           // console.log("subEstadoCaminar: "+subEstado_caminar);
            //if(subEstado_caminar!=="") 
     
    }
    
    
    
    
    
    
    
    
      //console.log("SubEstadoCaminar: "+subEstado_caminar);
    
      
    
     switch(subEstado_caminar){
      case "arriba":
    
        //.setOrigin(0.5,1)//arriba
      //this.objeto.sprite.play('player_camina');
    
      //movCamara
    
      this.objeto.getCameraPosition(0,-movCam,subEstado_caminar);
    
     // velocidad.ym=velocidad.ym-aceleracion;
       
      this.objeto.subEstado_posicionEstatico="arriba";
      this.objeto.componentesAtaque.x=0.5;
      this.objeto.componentesAtaque.y=1;
      this.objeto.player.flipX=false;
    
      
      
    
    
      this.objeto.componentesAtaque.textura="ataqueLateralArriba";
      this.objeto.componentesAtaque.anims="ataqueAbajo";
      //cambio de tamaño
       this.objeto.componentesAtaque.width=this.objeto.player.displayWidth*2;
       this.objeto.componentesAtaque.height=this.objeto.player.displayHeight;
    
       //this.objeto.componentesAtaque.x=-1*this.objeto.componentesAtaque.x;
       //this.objeto.componentesAtaque.y=-1*this.objeto.componentesAtaque.y;
    
      
    
      if(velocidad.ym>(-velocidadFinal))
        this.objeto.player.setVelocityY(velocidad.ym-aceleracion);
      else this.objeto.player.setVelocityY(-velocidadFinal);
    
        //console.log(this.objeto.player.body.velocity.y);
        //console.log(this.objeto.player.body.velocity.x);
        /*  if(this.objeto.player.body.velocity.y===-aceleracion) {
            this.objeto.player.anims.play('player_estatico',true);
            this.objeto.state="idle";
          }
           else*/ if (this.objeto.player.anims.currentAnim?.key !== 'player_camina_up') 
          this.objeto.player.anims.play('player_camina_up',true);
    
    
    
      break;
    
      case "abajo":
        // .setOrigin(0.5,0)//abajo
      //this.objeto.sprite.play('player_camina');
    
       //movCamara
    
      this.objeto.getCameraPosition(0,movCam,subEstado_caminar);
    
      this.objeto.player.flipX=false;
     
      this.objeto.subEstado_posicionEstatico="abajo";
    
     // velocidad.yM=velocidad.yM+aceleracion;
    
    
      
       this.objeto.componentesAtaque.x=0.5;
      this.objeto.componentesAtaque.y=0;
     
    
       //cambio de tamaño
       this.objeto.componentesAtaque.width=this.objeto.player.displayWidth*2;
       this.objeto.componentesAtaque.height=this.objeto.player.displayHeight;
    
       
       this.objeto.componentesAtaque.textura="ataqueLateralAbajo";
       this.objeto.componentesAtaque.anims="ataqueArriba";
    
       
    
         //console.log("DOWN");
          if(velocidad.yM<velocidadFinal)
        this.objeto.player.setVelocityY(velocidad.yM+aceleracion);
      else this.objeto.player.setVelocityY(velocidadFinal);
    
        //console.log(this.objeto.player.body.velocity.y);
        //console.log(this.objeto.player.body.velocity.x);
    
       /* if(this.objeto.player.body.velocity.y===aceleracion) {
            this.objeto.player.anims.play('player_estatico',true);
          this.objeto.state="idle";
          }
        else */if (this.objeto.player.anims.currentAnim?.key !== 'player_camina_down') 
          this.objeto.player.play('player_camina_down');
    
      break;
    
      case "derecha":
      
    
      //.setOrigin(0,0.5)//derecha
      //this.objeto.state="moveRight";
    
       //movCamara
    
      this.objeto.getCameraPosition(movCam,0,subEstado_caminar);
    
      this.objeto.subEstado_posicionEstatico="derecha";
      
      //velocidad.xM=velocidad.xM+aceleracion;
      //this.objeto.player.flipX=false;
    
      this.objeto.componentesAtaque.x=0;
      this.objeto.componentesAtaque.y=0.5;
    
       this.objeto.componentesAtaque.textura="ataqueLateralDerecha";
       this.objeto.componentesAtaque.anims="ataqueDerecha";
    
       //cambio del tamaño
       
       this.objeto.componentesAtaque.width=this.objeto.player.displayHeight;
       this.objeto.componentesAtaque.height=this.objeto.player.displayWidth*2;
    
    
       //velocidad=this.objeto.sprite.body.velocity.x+aceleracion;
        // console.log("RIGHT");
    
        //console.log(velocidad.xM);
         if(velocidad.xM<velocidadFinal){
    
        this.objeto.player.setVelocityX(velocidad.xM+aceleracion);}
         else {this.objeto.player.setVelocityX(velocidadFinal);
    
    
         }
    
           //console.log(this.objeto.player.body.velocity.y);
        //console.log(this.objeto.player.body.velocity.x);
    
       /* if(this.objeto.player.body.velocity.x===aceleracion) {
            this.objeto.player.anims.play('player_estatico',true);
          this.objeto.state="idle";
          }
    
        else*/ if (this.objeto.player.anims.currentAnim?.key !== 'player_camina') {
        //  console.log("cambio derecha");
          this.objeto.player.flipX=false;
          this.objeto.player.play('player_camina');
        }
    
    
      break;
    
      case "izquierda":
        
      
      this.objeto.subEstado_posicionEstatico="izquierda";
    
      
     
      //velocidad.xm=velocidad.xm-aceleracion;
         //movCamara
    
      this.objeto.getCameraPosition(-movCam,0,subEstado_caminar);
    
    
    
      this.objeto.componentesAtaque.x=1;
      this.objeto.componentesAtaque.y=0.5;
    
    
       this.objeto.componentesAtaque.textura="ataqueLateralIzquierda";
       this.objeto.componentesAtaque.anims="ataqueIzquierda";
       //cambio del tamaño
       
       this.objeto.componentesAtaque.width=this.objeto.player.displayHeight;
       this.objeto.componentesAtaque.height=this.objeto.player.displayWidth*2;
       
       //  console.log("LEFT");
       //velocidad=-this.objeto.sprite.body.velocity.x-aceleracion;
        //  350 - 0  -450<-350   -200<-350
        if(velocidad.xm>(-velocidadFinal))
        this.objeto.player.setVelocityX(velocidad.xm-aceleracion);
      else this.objeto.player.setVelocityX(-velocidadFinal);
      
    
          // console.log(this.objeto.sprite.body.velocity.y);
        //console.log(this.objeto.player.body.velocity.x);
    
            /*if(this.objeto.player.body.velocity.x===-aceleracion) {
            this.objeto.player.anims.play('player_estatico',true);
            this.objeto.state="idle";
          }
          else*/  if (this.objeto.player.anims.currentAnim?.key !== 'player_camina_inverso') {
            //  console.log("cambio izquierda");
         
          this.objeto.player.play('player_camina_inverso');
        }
         this.objeto.player.flipX=true;
    
      break;
    
      case "arriba-derecha":
    
      this.objeto.subEstado_posicionEstatico="arriba-derecha";
    
         //movCamara
    
      this.objeto.getCameraPosition(movCam/2,-movCam/2,subEstado_caminar);
    
    
    
        
    
    
    
              if(velocidadDiagonal.ymd>(-velocidadFinalDiagonal))
          this.objeto.player.setVelocityY(velocidadDiagonal.ymd-aceleracion);
        else this.objeto.player.setVelocityY(-velocidadFinalDiagonal);
    
        if(velocidadDiagonal.xMd<velocidadFinalDiagonal)
         this.objeto.player.setVelocityX(velocidadDiagonal.xMd+aceleracion);
        else this.objeto.player.setVelocityX(velocidadFinalDiagonal);
    
    
    
    
              /*if(this.objeto.player.body.velocity.y===-aceleracion&&this.objeto.player.body.velocity.x===aceleracion) 
            {
              //this.objeto.player.setVelocity(0);
              this.objeto.player.anims.play('player_estatico',true);
              this.objeto.state="idle";
            }
            else*/ if (this.objeto.player.anims.currentAnim?.key !== 'player_camina') {
         
          
          this.objeto.player.play('player_camina');
        }
        this.objeto.player.flipX=false;
      break;
    
      case "arriba-izquierda":
    
    
           //movCamara
    
          this.objeto.getCameraPosition(-movCam/2,-movCam/2,subEstado_caminar);
    
    
        this.objeto.subEstado_posicionEstatico="arriba-izquierda";
        if(velocidadDiagonal.ymd>(-velocidadFinalDiagonal))
          this.objeto.player.setVelocityY(velocidadDiagonal.ymd-aceleracion);
        else this.objeto.player.setVelocityY(-velocidadFinalDiagonal);
    
        if(velocidadDiagonal.xmd>(-velocidadFinalDiagonal))
         this.objeto.player.setVelocityX(velocidadDiagonal.xmd-aceleracion);
        else this.objeto.player.setVelocityX(-velocidadFinalDiagonal);
    
    
            /*if(this.objeto.player.body.velocity.y===-aceleracion&&this.objeto.player.body.velocity.x===-aceleracion) 
            {
              this.objeto.player.anims.play('player_estatico',true);
              this.objeto.state="idle";
              //this.objeto.player.setVelocity(0);
            }
        else*/  if (this.objeto.player.anims.currentAnim?.key !== 'player_camina') {
         // console.log("cambio izquierda");
          
          this.objeto.player.play('player_camina');
        }
        this.objeto.player.flipX=true;
      break;
    
      case "abajo-derecha":
    
           //movCamara
    
      this.objeto.getCameraPosition(movCam/2,movCam/2,subEstado_caminar);
    
      this.objeto.subEstado_posicionEstatico="abajo-derecha";
        if(velocidadDiagonal.yMd<velocidadFinalDiagonal)
          this.objeto.player.setVelocityY(velocidadDiagonal.yMd+aceleracion);
        else this.objeto.player.setVelocityY(velocidadFinalDiagonal);
    
        if(velocidadDiagonal.xMd<velocidadFinalDiagonal)
         this.objeto.player.setVelocityX(velocidadDiagonal.xMd+aceleracion);
        else this.objeto.player.setVelocityX(velocidadFinalDiagonal);
    
           /* if(this.objeto.player.body.velocity.y===aceleracion&&this.objeto.player.body.velocity.x===aceleracion) 
            {
             // this.objeto.player.setVelocity(0);
              this.objeto.player.anims.play('player_estatico',true);
              this.objeto.state="idle";
            }
            else*/ if (this.objeto.player.anims.currentAnim?.key !== 'player_camina') {
          //console.log("cambio derecha");
          
          this.objeto.player.play('player_camina');
        }
    
    
        this.objeto.player.flipX=false;
    
      break;
    
      case "abajo-izquierda":
    
             //movCamara
    
      this.objeto.getCameraPosition(-movCam/2,movCam/2,subEstado_caminar);
    
        this.objeto.subEstado_posicionEstatico="abajo-izquierda";
      //this.objeto.subEstado_posicionEstatico="abajo-derecha";
        if(velocidadDiagonal.yMd<velocidadFinalDiagonal)
          this.objeto.player.setVelocityY(velocidadDiagonal.yMd+aceleracion);
        else this.objeto.player.setVelocityY(velocidadFinalDiagonal);
    
        if(velocidadDiagonal.xmd>(-velocidadFinalDiagonal))
         this.objeto.player.setVelocityX(velocidadDiagonal.xmd-aceleracion);
        else this.objeto.player.setVelocityX(-velocidadFinalDiagonal);
    
           /* if(this.objeto.player.body.velocity.y===aceleracion&&this.objeto.player.body.velocity.x===-aceleracion) 
           { 
           // this.objeto.player.setVelocity(0);
            this.objeto.player.anims.play('player_estatico',true);
            this.objeto.state="idle";
          }
        else*/ if (this.objeto.player.anims.currentAnim?.key !== 'player_camina') {
              //console.log("cambio izquierda");
          
          this.objeto.player.play('player_camina');
        }
        this.objeto.player.flipX=true;
      break;
        default:
    
    
        this.objeto.getCameraPosition(0,0,subEstado_caminar);
         
        /*
        switch(this.objeto.subEstado_posicionEstatico){
        case "derecha":
    
        if (this.objeto.player.anims.currentAnim?.key !== 'player_estatico'&&(this.objeto.state==="idle"||this.objeto.state==="walk")) {
          this.objeto.player.flipX=false;
          this.objeto.player.play('player_estatico');
          this.objeto.state="idle";
        }
        break;
    
        case "izquierda":
    
        if (this.objeto.player.anims.currentAnim?.key !== 'player_estatico'&&(this.objeto.state==="idle"||this.objeto.state==="walk")) {
          this.objeto.player.flipX=true;
          this.objeto.player.play('player_estatico');
          this.objeto.state="idle";
        }
        break;
    
        default:
          if (this.objeto.player.anims.currentAnim?.key !== 'player_estatico'&&(this.objeto.state==="idle"||this.objeto.state==="walk")) {
          
          this.objeto.player.play('player_estatico');
          this.objeto.state="idle";
        }
        break;
    
      }*/
    
        break;
    
    
     }
    
    
    
    // console.log(subEstado_caminar);
    
    
     //console.log(subEstado_caminar);
     
    
      }

        detenerMovimiento(){
      
          if (this.objeto.state === "dash") {
              return; // Salimos de la función sin frenar al jugador
          }
      
          let desaceleracion=20;//apenas probando entre 18 a 20
          let desalerar;
      
      
      
              let velocidad={
            "xm":(this.objeto.player.body.velocity.x)+desaceleracion,
            "xM":(this.objeto.player.body.velocity.x)-desaceleracion,
            "ym":(this.objeto.player.body.velocity.y)+desaceleracion,
            "yM":(this.objeto.player.body.velocity.y)-desaceleracion
          }
      
      
      
          if((this.objeto.player.body.velocity.x!==0
            ||this.objeto.player.body.velocity.y!==0 )
            ){
      
      
      
            //console.log(this.objeto.player.body.velocity);
            //console.log("x: "+this.objeto.player.body.velocity.x);
            //console.log("y: "+this.objeto.player.body.velocity.y);
      
      
            
      
            //en eje x
            if(this.objeto.player.body.velocity.x>0){
      
      
      
              
               desalerar=(
                this.objeto.player.body.velocity.x<desaceleracion&&
                this.objeto.player.body.velocity.x>-desaceleracion
               )?0:velocidad.xM;
      
               //console.log(desalerar);
              this.objeto.player.setVelocityX(desalerar);
            }else if(this.objeto.player.body.velocity.x<0){
      
              desalerar=(
                this.objeto.player.body.velocity.x<desaceleracion&&
                this.objeto.player.body.velocity.x>-desaceleracion
               )?0:velocidad.xm;
              
              this.objeto.player.setVelocityX(desalerar);
            }
      
            //en eje y
      
      
                  if(this.objeto.player.body.velocity.y>0){
                desalerar=(
                this.objeto.player.body.velocity.y<desaceleracion&&
                this.objeto.player.body.velocity.y>-desaceleracion
               )?0:velocidad.yM;
              this.objeto.player.setVelocityY(desalerar);
            }else if(this.objeto.player.body.velocity.y<0){
                desalerar=(
                this.objeto.player.body.velocity.y<desaceleracion&&
                this.objeto.player.body.velocity.y>-desaceleracion
               )?0:velocidad.ym;
              this.objeto.player.setVelocityY(desalerar);
            }
            
            
          }
      
      
      
      
      
      
      
      
      
      
        }
}