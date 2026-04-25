import  {empujar}  from "../funciones/empujar.js";
import { crearItemsPunto } from "../funciones/crearItemsPuntos.js";
import { armas } from "../items/DataItemsArmas.js";
import {dataEnemigos} from "../enemies/DataEnemies.js";
import { DataComboEspada } from "./combo/DataCombo.js";
import { GuardarEnStorage } from "../funciones/GuardarEnStorage.js";
import { guardarPartida } from "../guardarPartida.js";
import { MaquinaEstados } from "../funciones/automata/MaquinaEstados.js";

import {IdlePlayer} from "./estados/IdlePlayer.js";
import {WalkPlayer} from "./estados/WalkPlayer.js";
import {AttackPlayer} from "./estados/AttackPlayer.js";
import {DashPlayer} from "./estados/DashPlayer.js";
import {HurtPlayer} from "./estados/HurtPlayer.js";
import {DeadPlayer} from "./estados/DeadPlayer.js";
import {HealingPlayer} from "./estados/HealingPlayer.js";
import {InteractuarPlayer} from "./estados/InteractuarPlayer.js";
import { GetUpPlayer } from "./estados/GetUpPlayer.js"; 

export class player extends Phaser.Physics.Arcade.Sprite{

  constructor(scene, texture, x = 25, y = 25, joystick,controles, keys,listaEnemigos,lights,camera) {

    
    //this.player=this;

    //CARGAR VALORES POR BD PARA OBTENER DATOS
    super(scene,x,y,texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.player = this;

    this.player.setOrigin(0);
    this.player.setDisplaySize(x, y);
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.nombre="player";
    this.player.setSize((x/5), (y/5));
    this.player.setOffset(x/3,y/1.6);



    this.pluginScene=scene.scene;
    this.vida=250; //llamar datos player de BD
    this.vidaActualMax=this.vida;
    this.curando=false;
    this.cantidadPociones=3;//llamar por BD
    this.cantidadPocionesMaximo=this.cantidadPociones;
    this.camera=camera;
    this.stateCamera="follow"


    this.stamina=250;//llamar datos player de Bd
    this.staminaMax=this.stamina;
    this.velocidad_recuperacion=1;


    this.scene = scene;
    this.texture = texture;
    this.x=x;
    this.y=y;
    this.arma;
    this.lights=lights

    //Interaccion con objetos
    this.estaGuardando=false;
    this.estaActivandoPalanca=false;
    this.atacado=false;

    

    //inputActive esto es para verificar si el input esta activo para evitar accion
    this.isInputActive=true;
    //aqui despues agregar una clase que busque en la BD que armas tiene para cargarlo sino hay nada 
    //entonces carga por defecto las armas principales
    this.setArma(armas[0]);



    //codigo de ian para el progrmar ataque fuerte o cargado

    this.tiempocarga = 0; //esto sirve para contar los frames que lleva cargando
    this.esAtaquefuerte = false; //se coloca para para saber que ataque se debera a hacer

  //INVENTARIO
     this.equipo = (this.scene.dataGuardadoRanura !== null) ?
    this.scene.dataGuardadoRanura[this.scene.ranura].player.equipo :
    { arma: null, armadura: null, consumible: null };



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

     this.puedeMoverse = true;
     

    // Crear sprite físico directamente



    


    this.componentesAtaque={
      'textura':'ataqueLateralArriba',
      'anims': "ataqueArriba",
      'width':this.player.displayWidth*2,
      'height':this.player.displayHeight,
      'x':0.5,
      'y':0
    }

    this.ataque=5;
        this.tipo_piso = "tierra";
        this.ultimo_tipo_procesado = null; // Flag para evitar procesamiento múltiple
        this.tiempo_ultimo_cambio = 0;
        this.tiempo_minimo = 150;

   this.animaciones();
   this.cargarSonidosPlayer();


    
    // ESCUCHADOR ÚNICO (Solo se crea una vez aquí)
    this.player.on("animationcomplete", (anim) => {
        
        // Si la animación que terminó fue la del dash...
        if (this.state === "dash") {
            this.state = "idle";
            //this.verificarTrampaDash(); // <--- MANDAMOS A REVISAR EL PISO
        } 
        // Para las demás animaciones normales...
        else if (this.state === "attack" || this.state === "hurt" || this.state === "healing") {
            this.state = "idle";
        }
    });


    this.automata=new MaquinaEstados(this);

    this.asignarEstados();


}


asignarEstados(){

  
  this.automata.agregarEstado('getUp',new GetUpPlayer(this));
  this.automata.agregarEstado('Idle',new IdlePlayer(this));
  this.automata.agregarEstado('Walk',new WalkPlayer(this) );
  this.automata.agregarEstado('Attack',new AttackPlayer(this));
  this.automata.agregarEstado('Dash',new DashPlayer(this));
  this.automata.agregarEstado('Hurt',new HurtPlayer(this));
  this.automata.agregarEstado('Dead',new DeadPlayer(this));
  this.automata.agregarEstado('Healing',new HealingPlayer(this));
  this.automata.agregarEstado('Interactuar',new InteractuarPlayer(this));

  this.automata.cambiarEstado('getUp');


}

    // ==========================================
    // SISTEMA DE INVENTARIO DINÁMICO
    // ==========================================

    agregarItem(idItem) {
        this.inventario.push(idItem);
        console.log(`[Inventario] Agregaste: ${idItem}. Mochila:`, this.inventario);
        // Aquí a futuro puedes reproducir un sonido de "Ítem obtenido"
    }

    tieneItem(idItem) {
        // Devuelve true si el ID está en la mochila, false si no lo tiene
        return this.inventario.includes(idItem);
    }

    usarItem(idItem) {
        // Buscamos en qué posición de la mochila está el ítem
        const indice = this.inventario.indexOf(idItem);
        
        // Si el índice es mayor a -1, significa que SÍ lo tiene
        if (indice > -1) {
            this.inventario.splice(indice, 1); // Lo eliminamos de la mochila
            console.log(`[Inventario] Usaste y consumiste: ${idItem}. Mochila:`, this.inventario);
            return true; // Se usó con éxito
        }
        return false; // No lo tenía
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

        this.pisadas = this.scene.sound.add('pisada_player_tierra', {
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


    this.golpeToPlayer=this.scene.sound.add("golpeToPlayer",{
    loop:false,
    volume:1
  });



  }

        getSoundPiso(n) {
        const ahora = Date.now();
        
        // Si ya estamos procesando este mismo tipo, ignorar
        if (this.ultimo_tipo_procesado === n) {
            return;
        }
        
        // Si el tiempo desde el último cambio es muy pequeño, ignorar
        if (ahora - this.tiempo_ultimo_cambio < this.tiempo_minimo) {
            return;
        }
        
        // Si el tipo no cambió realmente, ignorar
        if (this.tipo_piso === n) {
            return;
        }
        
        // Marcar como procesado antes de hacer el cambio
        this.ultimo_tipo_procesado = n;
        this.tiempo_ultimo_cambio = ahora;
        
     
        
        // Actualizar tipo
        this.tipo_piso = n;
        
        // Resto de tu código de cambio de sonido...
        let sonido_anterior;
        switch(n) {
            case "pasto":
                if(this.pisadas.key !== "pisada_player_pasto") {
                    sonido_anterior = this.pisadas.key;
                    this.pisadas.stop();
                    this.pisadas = this.scene.sound.add("pisada_player_pasto", {
                        loop: false,
                        volume: 2
                    });
                  
                }
                break;
            case "concreto_azul":
                if(this.pisadas.key !== "pisada_player_concreto_azul") {
                    sonido_anterior = this.pisadas.key;
                    this.pisadas.stop();
                    this.pisadas = this.scene.sound.add("pisada_player_concreto_azul", {
                        loop: false,
                        volume: 0.5
                    });
                    
                }
                break;
            case "tierra":
                if(this.pisadas.key !== "pisada_player_tierra") {
                    sonido_anterior = this.pisadas.key;
                    this.pisadas.stop();
                    this.pisadas = this.scene.sound.add("pisada_player_tierra", {
                        loop: false,
                        volume: 0.5
                    });
                  
                }
                break;
            case "concreto":
                if(this.pisadas.key !== "pisada_player_concreto") {
                    sonido_anterior = this.pisadas.key;
                    this.pisadas.stop();
                    this.pisadas = this.scene.sound.add("pisada_player_concreto", {
                        loop: false,
                        volume: 2
                    });
                    
                }
                break;
        }
        
        // Resetear el flag después de un tiempo
        setTimeout(() => {
            if (this.ultimo_tipo_procesado === n) {
                this.ultimo_tipo_procesado = null;
            }
        }, this.tiempo_minimo);
    }


  getSound(n){
    //1 correr
    switch(n){
      case 1:
        return this.pisadas;
      break
    }
  }

  animaciones(){

    if(!this.scene.anims.exists('player_estatico'))
    this.scene.anims.create({
        key: "player_estatico",
        frames: this.scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
          });
    //this.sprite.play("player_estatico");
    if(!this.scene.anims.exists('player_camina'))
    this.scene.anims.create({
        key: "player_camina",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
          });

          if(!this.scene.anims.exists('player_camina_inverso'))
          this.scene.anims.create({
        key: "player_camina_inverso",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
          });

          if(!this.scene.anims.exists("player_camina_up"))
          this.scene.anims.create({
        key: "player_camina_up",
        frames: this.scene.anims.generateFrameNumbers('player_walk_up', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
          });


        if(!this.scene.anims.exists("player_camina_down"))
        this.scene.anims.create({
        key: "player_camina_down",
        frames: this.scene.anims.generateFrameNumbers('player_walk_down', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
          });


          if(!this.scene.anims.exists("player_estatico_inverso"))
          this.scene.anims.create({
        key: "player_estatico_inverso",
        frames: this.scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
          });

          if(!this.scene.anims.exists(this.combo[0].nombre))
            this.scene.anims.create({
            key: this.combo[0].nombre,
            frames: this.scene.anims.generateFrameNumbers(this.combo[0].sprite,{start:0, end:this.combo[1].frame_end }),
            frameRate:this.combo[0].velocidad_frames,
            repeat:0
          })


          if(!this.scene.anims.exists(this.combo[1].nombre))
          this.scene.anims.create({
            key: this.combo[1].nombre,
            frames: this.scene.anims.generateFrameNumbers(this.combo[1].sprite,{start:0, end:this.combo[1].frame_end }),
            frameRate:this.combo[1].velocidad_frames,
            repeat:0
          })

          if(!this.scene.anims.exists(this.combo[2].nombre))
          this.scene.anims.create({
            key: this.combo[2].nombre,
            frames: this.scene.anims.generateFrameNumbers(this.combo[2].sprite,{start:0, end:this.combo[1].frame_end }),
            frameRate:this.combo[2].velocidad_frames,
            repeat:0
          })


          if(!this.scene.anims.exists("hurt_sword"))
          this.scene.anims.create({
            key:"hurt_sword",
            frames:this.scene.anims.generateFrameNumbers("player_golpeado_espada",{start:0, end:1}),
            frameRate:6,
            repeat:0
          })

          if(!this.scene.anims.exists("player_curar_anim"))
      this.scene.anims.create({
    key: "player_curar_anim",
    frames: this.scene.anims.generateFrameNumbers('player_heal', { start: 0, end: 8 }), // Ajusta los frames según tu sprite
    frameRate: 10,
    repeat: 0 
});


if(!this.scene.anims.exists("dash-reverso"))
   this.scene.anims.create({
     key:"dash-reverso",
     frames: this.scene.anims.generateFrameNumbers("player_dash_reverso",{start:0,end:7}),
     frameRate:12,
     repeat:0
 });


          if(!this.scene.anims.exists("dash-delantero"))
          this.scene.anims.create({
            key:"dash-delantero",
            frames: this.scene.anims.generateFrameNumbers("player_dash_adelante",{start:0,end:7}),
            frameRate:12,
            repeat:0
          });


          if(!this.scene.anims.exists("dead-player"))
          this.scene.anims.create({
            key:"dead-player",
            frames: this.scene.anims.generateFrameNumbers("player_dead",{start:0,end:5}),
            frameRate:5,
            repeat:0
          });


          if(!this.scene.anims.exists("getUp-player"))
          this.scene.anims.create({
            key:"getUp-player",
            frames: this.scene.anims.generateFrameNumbers("player_levantarse",{start:0,end:6}),
            frameRate:5,
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
    return this;
  }

  setVida(n){
    console.log(n);
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
        frameRate: 12,
        repeat: 0
          });

          this.scene.anims.create({
        key: "ataqueAbajo",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralAbajo", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 12,
        repeat: 0
          });

          this.scene.anims.create({
        key: "ataqueDerecha",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralDerecha", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 12,
        repeat: 0
          });

          this.scene.anims.create({
        key: "ataqueIzquierda",
        frames: this.scene.anims.generateFrameNumbers("ataqueLateralIzquierda", { start: this.arma.inicioAnim, end: (parseInt(this.arma.inicioAnim)+3) }),
        frameRate: 12,
        repeat: 0
          });



  }

  getCameraPosition(offsetX,offsetY,sub_estado="arriba",tiempoTraslado=1000,lerp=0.03){

    
    //console.log("xCamera: "+this.camera.scrollX);
    //console.log("yCamera: "+this.camera.scrollY);
    

    
    if(this.stateCamera==="follow"){

    

        let destinoX=this.player.x+offsetX;
        let destinoY=this.player.y+offsetY;

        this.camera.followOffset.set(-offsetX,-offsetY);
        this.camera.lerp.set(lerp,lerp);
        
        //this.camera.stopFollow();

        this.stateCamera=sub_estado;

           /* this.camera.pan(destinoX,destinoY,tiempoTraslado,'Sine.easeInOut',true,
        (camera,progress)=>{
          if(progress===1){
           
             
          }

        }
      )*/

    }else if(this.stateCamera!==sub_estado ){
       this.stateCamera="follow";
        //this.camera.startFollow(this.player,true,lerp,lerp,offsetX,offsetY);
      
      }

    

     
    
  }

  // --- AÑADE ESTOS DOS MÉTODOS JUSTO AQUÍ (Antes de cerrar la clase) ---
  congelarParaDialogo() {
    this.puedeMoverse = false;
    if (this.player.body) this.player.body.setVelocity(0, 0);
    this.player.play('player_estatico', true); // Ponemos animación quieta
  }

  descongelarParaDialogo() {
    this.puedeMoverse = true;
  }

cargarDepth(){
  this.scene.listaCheckpoints.children.iterate(checkpoint=>{

  
    if(this.player.y>(checkpoint.y+30)){checkpoint.setDepth(4)}
      else {
       
        checkpoint.setDepth(6);}
  })
}



    contactoPlayerEnemigo(player,enemigo,scene){



      console.log(player);
      console.log(enemigo);
      console.log(scene);
      if(player.getVida()>0){

        
      let tiempo_invisivilidad=1000;
      let parpadeo=100;
      let n=10;
      player.atacado=true;

      


       //console.log(this.golpeToPlayer);
       player.golpeToPlayer.play();
          

        if(enemigo!==null){

          empujar(
          enemigo.getContainer(),
          player.getContainer(),
          0,
          null,
          scene,
          200);//
          

               player.setVida(enemigo.dataEnemie.ataque); //desactivar para el contacto player enemigo

                scene.physics.world.removeCollider(scene.colisionEnemigoPlayer);

                }

                
          scene.time.delayedCall(tiempo_invisivilidad,()=>{

            console.log("regresa");
            player.setAlpha(1);
            player.setVisible(true);
            scene.collisionPlayerEnemigo();
            
          });


        scene.time.addEvent({
        
        delay: parpadeo, 
        callback: () => {
        player.setVisible(!player.visible); 
                        },
         repeat: n // número de parpadeos
                          });


          

          console.log("Contacto Player Enemigo: "+player.getVida());

          scene.getBarraVida();




        player.setAlpha(0.5)
        


      }




          

    }


  setMovimientoPlayer(){
      this.cargarDepth();
      this.automata.actualizar();
  }


  detectarBloqueCercano(capa){

    
          // 2. Obtenemos el centro exacto del jugador
          let px = this.player.x + (this.player.displayWidth / 2);
          let py = this.player.y + (this.player.displayHeight / 2);

          // 3. Creamos una "caja de búsqueda" a su alrededor (50 píxeles hacia cada lado)
          let radioBusqueda = 50; 
          
          // Le pedimos a Phaser TODOS los cuadritos (tiles) que estén dentro de esa caja
          let tilesCercanos = capa.getTilesWithinWorldXY(
              px - radioBusqueda, 
              py - radioBusqueda, 
              radioBusqueda * 2, 
              radioBusqueda * 2
          );

          let tileObjetivo = null;
          let distanciaMinima = 99999; // Empezamos con un número gigante para irlo reduciendo

          // 4. Analizamos cada cuadrito que encontró en la zona
          tilesCercanos.forEach(tile => {
              
              // Filtro 1: ¿Tiene la propiedad tipoBloqueo de Tiled?
              if ((tile && tile.properties && tile.properties.tipoBloqueo
                ||(capa===this.scene.blockAbove&&tile.index!==-1))) {
                  
                  // Calculamos el centro matemático de ese bloque
                  let tileCenterX = tile.pixelX + (tile.width / 2);
                  let tileCenterY = tile.pixelY + (tile.height / 2);
                  
                  // Filtro 2: Medimos la distancia exacta usando el motor de matemáticas de Phaser
                  let dist = Phaser.Math.Distance.Between(px, py, tileCenterX, tileCenterY);

                  // Nos quedamos SOLO con el bloque que esté más cerca
                  if (dist < distanciaMinima) {
                      distanciaMinima = dist;
                      tileObjetivo = tile;
                  }
              }

          });

          return tileObjetivo;

  }


  getArma(){
    //console.log("GetArma: ");
    //console.log(this.arma);
    return this.arma;
  }

  setAtaque(){

  }




}
