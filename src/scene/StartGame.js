
import {player} from "../player/player.js";

import { crearItemsPunto } from "../funciones/crearItemsPuntos.js";
import {cargarAssets} from "./cargar/cargarAssets.js"
import {cargarSonido} from "./cargar/cargarSonido.js"
import { cargarVariablesGlobales } from "./cargar/cargarVariablesGlobales.js";

import { CamaraPersonalizada } from "../camera/CamaraPersonalizada.js";
import { cargarLucesEstaticas } from "../funciones/cargarLucesEstaticas.js";



import {npc1} from '../npc/Npc1/npc1.js'
import {npc2} from '../npc/Npc2/npc2.js'
import { npc3 } from '../npc/Npc3/npc3.js'//agrego sneyder npc dialogos -nota- bug de la mayuscula de npc3 al crear el archivo, revisar eso para evitar errores de importacion es npc3 original





import { BloqueoAtaqueFuerte } from "./colisiones/BloqueoAtaqueFuerte.js";
import { BloqueoDash } from "./colisiones/BloqueoDash.js";
import { BloqueoItem } from "./colisiones/BloqueoItem.js";
import { RecogerItem } from "./colisiones/RecogerItem.js"; 
import { Estatua } from "../items/estatua/Estatua.js";
import { Palanca } from "../items/palanca/Palanca.js";
import { crearEscenario } from "./funcionesEscenario/seleccionarElementosEscenario/crearEscenario.js";
import { colisiones } from "./funcionesEscenario/crearColisiones/Colisiones.js";
import { hud } from "./funcionesEscenario/hud/hud.js";
import { seleccionarEnemigos } from "./funcionesEscenario/seleccionarElementosEscenario/seleccionarEnemigos.js";
import { seleccionarEventos } from "./funcionesEscenario/seleccionarElementosEscenario/SeleccionarEventos.js";
import { seleccionarNpc } from "./funcionesEscenario/seleccionarElementosEscenario/seleccionarNpc.js";
import { seleccionarCheckpoints } from "./funcionesEscenario/seleccionarElementosEscenario/seleccionarCheckpoints.js";
import { seleccionarPalancas } from "./funcionesEscenario/seleccionarElementosEscenario/seleccionarPalancas.js";

export class StartGame extends Phaser.Scene{//cuando inicia la partida

    constructor(){
        super('StartGame');
        this.nameScene='StartGame';
       
    }
    

  



//aqui cargo todos los archivos y objetos necesarios antes de que inicie el escenario
    preload(){

      //cargar Imagenes y animaciones
      this.loadAnimations=new cargarAssets(this);
        //cargar Sonidos
      this.loadSounds=new cargarSonido(this);
          //aqui se cargan las variables globales desde preload()
      this.loadVariablesGlobales=new cargarVariablesGlobales(this);


      this.mapa=crearEscenario(this);

      this.colisiones= new colisiones(this);

      this.hud= new hud(this);

      this.enemigos= seleccionarEnemigos(this);

      this.eventos=seleccionarEventos(this);

      this.npcs=seleccionarNpc(this);
      
      this.checkpoints=seleccionarCheckpoints(this);

      this.palancas= seleccionarPalancas(this);
      

      
}


//CREACION DE TILES (Son las texturas que no son sprites como tal sino que actua como escenario)
//ESPECIFICO
//metodo que crea y modifica el escenario
crearEscenario(){
    
  this.mapa.crearEscenario();

}


//GLOBAL
//Aqui se generaran los items
crearItems(n){
    

   //this.crearItemsPunto(n); 
   crearItemsPunto(this,n,this.items_punto,this.widthEscenario,this.heightEscenario,true,null,this.lights);

  
}

//METODOS DEL ENEMIGO

//GLOBAL
//Crear enemigo

//Movimientos Enemigo
//GLOBAL
movimientosEnemigo(){
     
     this.listaEnemigos.children.iterate(enemigo=>{
      
      enemigo.setMovimientoEnemigo(this.player.getContainer(),this.contactoSprites[0],this.contactoSprites[1],this.contactoSprites[2]);
     });
   

}


//GLOBAL
movimientosNpc(){
  this.listaNpc.children.iterate(npc=>{

    npc.setMovimientoNpc(this, this.player)
  })
}


//METODOS DEL PLAYER

//GLOBAL
getPlayer(){


  
    
  let x=(this.dataGuardadoRanura!==null)?this.dataGuardadoRanura[this.ranura].player.x:2100//8000;//x=2100;
  let y=(this.dataGuardadoRanura!==null)?this.dataGuardadoRanura[this.ranura].player.y:8500
    this.player=new player(this, 'player',80,80,this.joystickCursors, this.controles, this.keys,this.listaEnemigos,this.lights,this.cameras.main);

    this.player.getContainer().setTint(0x555555);//para ver si se oscurece mas
    this.player.getContainer().setPipeline('Light2D');


    //curando

  

  

  

    this.player.setPositionInitial(x,y);

    this.lightToPlayer=this.lights.addLight(x, y, 150) .setColor(0xffaa00) .setIntensity(2);

     this.cursor=this.input.keyboard.createCursorKeys();//flechas

     //collision del jugador

   
}

//Moviemientos Player
//GLOBAL
pausarEscena(){
this.scene.pause();

this.scene.launch('ScenePause',{scene:this.scene,puntos:this.puntos,player:this.player,puntaje:this.puntaje,armas:this.armas, keys:this.keys});


}

//GLOBAL
movimientosPlayer(){


     this.player.setMovimientoPlayer();
    
     //this.player.getAtaque(this.listaEnemigos,this.contactoSprites,this.items_punto);

     //pausar juego

     if(Phaser.Input.Keyboard.JustDown(this.keys.ESC))this.pausarEscena();


     
    if(this.player.getHabilitarCollision()){
        //console.log("Habilitando Collsion ITEM NUEVO");
        // this.collisionRecogerItemBasura(); 
         this.player.setHabilitarCollision(false);
        }



   
    if(this.player.curando) {
      console.log("subiendo barra de salud");
      this.getBarraVida();
      this.getCuraciones();
      this.player.curando=false;
    
    }

    //estamina

    
    if(this.player.stamina<this.player.staminaMax){

      //console.log("recuperando");

      this.player.stamina+=this.player.velocidad_recuperacion;


      this.getBarraStamina();
      
      if(this.player.stamina>=this.player.staminaMax){
        this.player.stamina=this.player.staminaMax;
        this.player.recuperando=false;
      }
    }



    //Crear vista de player con item




   



}

//GLOBAL
//LLAMAR A TODAS LAS COLISIONES
crearColisiones(){
 
  this.colisiones.crearColisiones();
  
}


//FUNCIONES DE LAS COLISIONES

//GLOBAL
  //colision al contacto del player con el enemigo
 collisionPlayerEnemigo(){
        
  this.colisiones.collisionPlayerEnemigo();
}

//GLOBAL
//colision entre los enemigos para que no transpasen
      collisionEnemigoEnemigo(){
 // this.physics.collider();

    this.colisiones.collisionEnemigoEnemigo();

}
//colision de arboles para que el player no las pase


//GLOBAL
      collisionMurosObjetos(objeto){//el collider llegara por un parametro

        this.colisiones.collisionMurosObjetos(objeto);

      }

      //colisiones Enemigos Tiles

      //GLOBAL
      collisionEnemigosMuros(){
        

      this.colisiones.collisionEnemigosMuros();
                  
      }



      //GLOBAL  
//colision para cuando el player recoge el itemBasura
      collisionRecogerItemPuntos(){

       this.colisiones.collisionRecogerItemPuntos();
}  












//GLOBAL
//solo sirve para testear
depurarColisiones() {
  const debugGraphics = this.add.graphics().setAlpha(0.75);


  if (this.above_collider) {
    this.above_collider.renderDebug(debugGraphics, {
      tileColor: null, // tiles sin colisión (transparentes)
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // naranja
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // bordes
    });
  }


}




//GLOBAL
//creacion de la camara
crearCamera(){
    this.camera= new CamaraPersonalizada(this, this.player.getContainer(), this.hudContainer);
}






//=============================================
//GLOBAL
//Crear HUD del juego

getBarraStamina(){

  this.hud.getBarraStamina();
  
}


//GLOBAL
getBarraVida(){
this.hud.getBarraVida();
}

//GLOBAL
getCuraciones(){
 this.hud.getCuraciones();
}
crearHUD(){
  this.hud.crearHUD();

}
//GLOBAL
//donde muestra los puntos acumulados
hudPuntos(){
this.hud.hudPuntos();

}
//GLOBAL
//donde muetra el cronometro
    hudCronometro(){
  this.hud.hudCronometro();
}






//=============================================
//GLOBAL
//terminar una partida
finalizarPartida(n=""){

   // this.sound.stopAll();
    console.log(this.scene);
    
  this.musicaFondo.stop();
  this.scene.stop('StartGame');
  this.scene.restart();

  this.scene.start('FinPartida',{puntos:this.puntos,mensaje:n});
  console.log("MENSAJE: "+n);

}

  //GLOBAL
  //carga de botones digitales
  cargarBotones(){

    let sizeBotones=(this.widthPantalla/20);
     let division=2;

    if(this.widthPantalla<this.heightPantalla){ division=1.5;sizeBotones=(this.widthPantalla/10);}
   //this.add.circle(0, 0, 50, 0x888888,0.5)

      this.botonesPlayer={
        'ataque':this.add.circle(0,0,sizeBotones,0xcccccc,0.5).setOrigin(0).setScrollFactor(0).setInteractive(),
                        }

    
     this.botonesPlayer.ataque.setPosition(this.widthPantalla-(this.botonesPlayer.ataque.width)-10,this.heightPantalla/division);
    


     this.botonesPlayer.ataque.on('pointerdown', (pointer) => {
        console.log("Botón tocado por puntero:", pointer.id);
        this.controles.ataque= true
      });
     this.botonesPlayer.ataque.on('pointerup',   () => this.controles.ataque = false);
     this.botonesPlayer.ataque.on('pointerout',  () => this.controles.ataque = false);

     this.input.on('pointermove', (pointer) => {
  if (!this.botonesPlayer.ataque.getBounds().contains(pointer.x, pointer.y)) {
    this.controles.ataque = false;
  }
});



      this.input.on('pointerup', () => {
  // Al soltar el dedo en cualquier parte de la pantalla
 
  //this.controles.ataque = false;
  
});

if(this.widthPantalla>=900){ this.botonesPlayer.ataque.setAlpha(0)}


    
    }

    //GLOBAL
    cargarJoystick(){
      let division=2;
      let sizeBotones=(this.widthPantalla/20);

    if(this.widthPantalla<this.heightPantalla){ division=1.5; sizeBotones=(this.widthPantalla/10);}
      this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 100,
      y: this.heightPantalla/division,
      radius: 100,
      base: this.add.circle(0, 0, sizeBotones, 0x888888,0.5),
      thumb: this.add.circle(0, 0, sizeBotones/2, 0xcccccc,0.5),
      forceSingleTouch:false,
      enable:true,
      input:'drag'


});

if(this.widthPantalla>=900){ this.joyStick.base.setAlpha(0);
                              this.joyStick.thumb.setAlpha(0);
}


//this.joyStick.setScrollFactor(0);

this.joystickCursors = this.joyStick.createCursorKeys();
    }


    //GLOBAL
    cargarSonido(){





      this.powerUp=this.sound.add("powerUp",{
        loop:false,
        volume:1
      });

       this.sonidoReloj=this.sound.add('reloj', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });

      this.musicaFondo = this.sound.add('fondoStart', {
    loop: true,
    volume: 0.5   // volumen entre 0 y 1
  });

  

  this.musicaFondo.play();

  this.touch = this.sound.add('touch', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });



  this.sonidoPotenciador=this.sound.add('potenciador', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });

  this.golpeToPlayer=this.sound.add("golpeToPlayer",{
    loop:false,
    volume:1
  });

 
    }

    //Condicional
    crearFiltro(){
      const vignette = this.add.rectangle(0, 0, this.widthPantalla, this.heightPantalla, 0x072EA3, 0.3); 
      vignette.setOrigin(0); 
      vignette.setDepth(999);
      vignette.setScrollFactor(0);


      /*
        this.hudBackground= this.add.rectangle(0,0,300,50,0x000000,0.5)
    .setOrigin(0)
    .setStrokeStyle(2,0xffffff);
      */
    }

    //Condicional
    crearLuces(){
      this.lights.enable();
      this.lights.setAmbientColor(0x222222); 
      cargarLucesEstaticas(this);

    }

    //CONDICIONAL
    cargarEnemigos(){

    this.enemigos.load();

    }

    //GLOBAL
 

    //CONDICIONAL
    cargarEvento(){

      this.eventos.load();
      
}





//CONDICIONAL
cargarNpc(){
 
this.npcs.load();

}
   


//CONDICIONAL
cargarCheckpoints(){

  this.checkpoints.load();


}



//CONDICIONAL
cargarPalancas(){

  this.palancas.load();

  
}


//GLOBAL
//El create es donde acomo las cosas para que tengan un orden
create(){

  
//esto sirve para que se vean las colisiones de los sprites para testear (cuadro morado)
this.physics.world.createDebugGraphic();
this.game.renderer.antialias = false;
    //this.crearFiltro();
    //Generacion de escenario
    this.crearEscenario();
    this.cargarSonido();
    this.crearLuces();
    
    //cantidad de items a crear
    this.crearItems(0);//aqui puedo agregar la cantidad de items que quiero crear
    //crear personaje
    this.cargarBotones();
    this.cargarJoystick();
    this.getPlayer();
    this.cargarEnemigos()

    this.cargarNpc();
    //this.crearEnemigo(1,2050,4500,3);
   // this.crearEnemigo(1,2100,4500,4);
    //colisiones en entre items
       //crear HUD
    this.crearHUD();
    this.crearColisiones(); 
   // this.depurarColisiones();
   //creacion de camara;
   this.crearCamera();

   this.cargarEvento();

   this.cargarCheckpoints();
    //this.crearAnimaciones();
    this.cargarPalancas();
       
}

//GLOBAL
movimientoItemToPlayer(){



  this.items_punto.children.iterate(item=>{
    if(item.moveToPlayer){
      let velocidad=Math.floor(Math.random() * (500 - 300 + 1)) + 300;
   // scene.time.delayedCall(1000, () => {
   

    item.light.setPosition((item.x)+item.displayWidth/2,(item.y)+item.displayHeight/2)
    
    this.physics.moveToObject(item, this.player.getContainer().body, velocidad);
    //});
    }

  });
}

//GLOBAL
lightplayer(){

     let xPlayer=this.player.getContainer().displayWidth/2;
   let yPlayer=this.player.getContainer().displayHeight/2;

  this.lightToPlayer.setPosition((this.player.getContainer().x)+xPlayer,(this.player.getContainer().y)+yPlayer);

 // console.log("player x: "+)

}



//GLOBAL
salirAreasInteraccion(){

  this.listaCheckpoints.children.iterate(checkpoint=>{
                  
              if(this.player.estaGuardando&& !this.physics.overlap(this.player.getContainer(),checkpoint))
              {
                this.player.estaGuardando=false;
                
                
              }
           
            
            });

  this.listaPalancas.children.iterate(palanca=>{
    if(this.player.estaActivandoPalanca&&!this.physics.overlap(this.player.getContainer(),palanca)){
      {
      this.player.estaActivandoPalanca=false;
    }
    }
  })


          


}



//GLOBAL
lucesArea(){
      let activationRadius = 700; 

    // 2. Recorrer todas las luces
    this.listaLucesObjetos.forEach(light => {
        // Calcular distancia entre el jugador y la luz
        let distance = Phaser.Math.Distance.Between(this.player.getContainer().x, this.player.getContainer().y, light.x, light.y);

        // Si está dentro del radio -> Encender, si no -> Apagar
        if (distance < activationRadius) {
            if (!light.visible) { // Solo si estaba apagada para ahorrar operaciones
                light.setVisible(true);
                // Opcional: Efecto de encendido
                light.setIntensity(1.5); 
            }
        } else {
            if (light.visible) { // Solo si estaba encendida
                light.setVisible(false);
                // Opcional: Apagado inmediato
                // light.setIntensity(0);
            }
        }
    });
}


//GLOBAL
//el update es todo lo que se corre en tiempo real
update(time, delta){

   this.lucesArea();
  //luz que sigue al player
    this.lightplayer();
    //movimientos Jugador
    this.movimientosPlayer();
   // console.log(`X:${this.player.getPositionX()} Y:${this.player.getPositionY()}`)
    //moviemientos del enemigo
    this.movimientosEnemigo();
   //this.physics.moveToObject(this.enemie.getContainer(), this.player.getContainer(),200);

    this.movimientoItemToPlayer();

    //Aqui establece si el player esta mas arriba de determinado objeto



    //movimientoNpc
    this.movimientosNpc();

   
    this.salirAreasInteraccion();



  
 



}

//GLOBAL
/* NUEVO CODIGO*/
checkCondicionBloque(objeto, tile) {

  let idLlave=0;
    // 1. Si el que choca no es el player (ej. un enemigo), funciona como pared normal
    if (objeto !== this.player.getContainer()) {
        return true; 
    }
   

    // 2. Leemos la propiedad que se puso en Tiled para saber que tipo de obstáculo es
    // Si no tiene la propiedad "tipoBloqueo", es una pared normal e impenetrable
    if (!tile.properties || !tile.properties.tipoBloqueo) {
        return true; 
    }

    let manejadorBloqueo = null;
    let tipo = tile.properties.tipoBloqueo;

    // 3. EL SWITCH: Asignamos la clase hija correcta segun el tipo de tile en Tiled
   switch (tipo) {
        case "roca_fuerte":
            manejadorBloqueo = new BloqueoAtaqueFuerte();
            break;

        case "foso":
            manejadorBloqueo = new BloqueoDash();
            break;

        case "puerta_llave":

            // Esta es la puerta. Exige la "llave_roja"
            manejadorBloqueo = new BloqueoItem("llave_roja"); 

            
            break;

        // ==========================================
        // NUEVO CASO: ESTE SIRVE PARA CUANDO RECOGA LA LLAVE DEL SUELO
        // ==========================================
        case "recoger_item":
            // Esta es la llave. Te regala la "llave_roja"
            manejadorBloqueo = new RecogerItem("llave_puerta");

            break;
       
        default:
            return true;
    }

    // 4. se verifica si el jugador cumple la condicion mandando a la clase Player
    // (Usamos this.player porque 'objeto' es el container
    let permisoConcedido = manejadorBloqueo.puedePasar(this.player);

    if (permisoConcedido) {
        // Si la clase dice que el bloque se debe destruir (ej. la roca que rompiste)
        if (manejadorBloqueo.destruirBloque) {
            this.map.removeTileAt(tile.x, tile.y, true, true, this.blockLayer);
            
            // Aqui se puede agregar un sonido:
        }
        
        // Retornamos FALSE para decirle a Phaser: "IGNORA LA COLISIÓN, DÉJALO PASAR"
        return false; 
    } else {
        // Retornamos TRUE para decirle a Phaser: "APLICA FISICAS"
        return true; 
    }
}

    // PROCESAR INTERACCIÓN CON LA TECLA "E"
  //GLOBAL
    procesarInteraccionE(playerInstance, tile) {
      
        console.log(" Escaner activado Propiedades del bloque:", tile.properties);
        // 1. Extraemos qué tipo de bloque es y qué ID de item necesita/da
        let tipo = tile.properties.tipoBloqueo;
        let idItem = tile.properties.idItem; // <-- ¡Esta es la magia dinamica!

        switch (tipo) {
            
            // CASO A: EL JUGADOR ENCUENTRA UN ÍTEM TIRADO
            case "recoger_item":
                // Le avisamos a la consola si nos falta el ID
                if (!idItem) {
                    
                    console.log(" ERROR: Es un item, pero no tiene 'idItem' en Tiled.");
                }
                  

              
              
                const t=this.listaLlaves.find((t)=>((tile.x===t.tile.x)&&tile.y===t.tile.y));
               

                if (t) {
                   
                    playerInstance.agregarItem(idItem); //+"_"+t.id
                    this.blockLayer.removeTileAt(tile.x, tile.y);
                    //eliminar la luz de la llave
                    this.lights.removeLight(t.luz)
                    t.recogido=true;
                    console.log(`¡Recogiste el ítem con ID: ${idItem}!`);
                    this.sound.add("recoger_item",{
                      loop:false,
                      volume: 0.3
                    }).play();
                }

                

                break;

           // CASO B: EL JUGADOR INTENTA ABRIR UNA PUERTA
            case "puerta_item":
                if (!idItem) break; 

                // Revisamos si la mochila tiene ese ID exacto
                if (playerInstance.tieneItem(idItem)) {
                    
                    // LO USAMOS Y LO CONSUMIMOS
                    playerInstance.usarItem(idItem); 
                    
                    // ==========================================
                    // CAMBIO: LLAMAMOS A LA REACCIÓN EN CADENA
                    // ==========================================
                    const datosPuerta={
                      nameScene:this.nameScene,
                      x:tile.x,
                      y:tile.y
                    }

                    this.listaPuertasAbiertas.push(datosPuerta);
                    this.abrirPuertaCompleta(tile,this.blockLayer);
                    
                    console.log(`¡Puerta abierta! El ítem ${idItem} se consumió y la reja gigante desapareció.`);
                    
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    this.cameras.main.fadeIn(1000, 0, 0, 0);

                    this.sound.add('puerta_abriendose', {
                     loop: false,
                     volume: 1   // volumen entre 0 y 1
                      }).play();
                    return true;

                } else {
                    // Si no lo tiene, lo rebotamos (el tile sigue siendo sólido)
                    console.log(`Está cerrado... Necesitas encontrar el ítem: ${idItem}`);
                    return false;
                    // Aquí podrías mostrar un texto flotante en pantalla
                }
                break;

            // CASO C: LEER UN CARTEL (Ejemplo para el futuro)
            case "leer_cartel":
                console.log("El cartel dice: 'Peligro, monstruos adelante'.");
                break;


                // CASO C: ACTIVAR UNA PALANCA O INTERRUPTOR
            case "palanca":
                // Leemos cual es el ID del dibujo de la palanca activada
                let tileActivado = tile.properties.idActivado; 

                if (tileActivado||tileActivado===0) {
                    // 1. Reemplazamos el dibujo actual por el de la palanca bajada
                    this.blockLayer.putTileAt(tileActivado, tile.x, tile.y);
                    
                    // 2. Le cambiamos el tipo para que el jugador no pueda activarla 100 veces
                    tile.properties.tipoBloqueo = "palanca_usada";
                    
                    console.log("La palanca ha sido activada.");
                    
                    // ==========================================
                    // aqui se puede agregar la poder abrir una puerta secreta
                    // Por ejemplo: this.abrirPuertaSecreta();
                    // ==========================================
                    
                } else {
                    console.log(" ERROR: A esta palanca le falta la propiedad 'idActivado' en Tiled.");
                }
                break;

            // CASO D: SI LA PALANCA YA SE USO
            case "palanca_usada":
                console.log("La palanca ya está trabada en la posición de encendido.");
                break;

            default:
                console.log("No se puede interactuar con este objeto de esa forma.");
                break;
        }
    }
    // ==========================================
    // DESTRUIR PUERTA COMPLETA (REACCION EN CADENA)
    // ==========================================

    //GLOBAL
    abrirPuertaCompleta(tileInicial,capa) {
        let idRequerido = tileInicial.properties.idItem;
        let tilesPorRevisar = [tileInicial];
        let tilesVisitados = new Set(); // Para no revisar el mismo tile dos veces

        // Mientras haya bloques de puerta por revisar...
        while(tilesPorRevisar.length > 0) {
          
            let tileActual = tilesPorRevisar.pop();
            let clave = `${tileActual.x},${tileActual.y}`;

            if (!tilesVisitados.has(clave)) {
                tilesVisitados.add(clave);

                // 1. Destruimos este pedazo de la puerta
                capa.removeTileAt(tileActual.x, tileActual.y);

                // 2. Buscamos a sus 4 vecinos (Arriba, Abajo, Izquierda, Derecha)
                let vecinos = [
                    capa.getTileAt(tileActual.x + 1, tileActual.y),
                    capa.getTileAt(tileActual.x - 1, tileActual.y),
                    capa.getTileAt(tileActual.x, tileActual.y + 1),
                    capa.getTileAt(tileActual.x, tileActual.y - 1)
                ];

                
                
                vecinos.forEach(vecino => {
                    if (vecino!==null) {
                        
                        // Si es parte de la puerta, lo agregamos a la lista para destruirlo
                        tilesPorRevisar.push(vecino);
                    }
                });
            }
        }
    }

//GLOBAL
//dialogos
iniciarDialogo(npc) {
    // Seguridad: verificamos que el NPC tenga el método de diálogos
    if (!npc || typeof npc.obtenerDialogos !== 'function') return;

    this.enDialogo = true;
    this.npcActual = npc; 
    this.listaTextos = npc.obtenerDialogos();

    // --- 1. REPRODUCIR MÚSICA DE AMBIENTACIÓN ---
    // Verificamos si ya hay música sonando para no duplicarla
    if (!this.sonidoNPC || !this.sonidoNPC.isPlaying) {
        this.sonidoNPC = this.sound.add('musica_mago', { 
            loop: true, 
            volume: 0.8 
        });
        this.musicaFondo.volume=0.1;
        this.sonidoNPC.play();
        
    }

    // LÓGICA DE REPETICIÓN
    if (npc.yaHabloTodo) {
        this.indiceTexto = this.listaTextos.length - 1;
    } else {
        this.indiceTexto = 0;
    }

    this.mostrarCuadroDeTexto(this.listaTextos[this.indiceTexto]);
    
    // Detenemos al caballero
    if (this.player && this.player.congelarParaDialogo) {
        this.player.congelarParaDialogo();
    }
}


//GLOBAL
avanzarDialogo() {
    // ¿Llegamos a la última frase?
    if (this.indiceTexto >= this.listaTextos.length - 1) {
        
        if (this.npcActual) {
            this.npcActual.yaHabloTodo = true;
        }

        // --- 2. DETENER MÚSICA AL CERRAR DIÁLOGO ---
        // Aplicamos un "fade-out" para mantener la atmósfera melancólica y que no se corte de golpe
        if (this.sonidoNPC) {
            this.tweens.add({
                targets: this.sonidoNPC,
                volume: 0,
                duration: 1000, // Tarda 1 segundo en desvanecerse
                onComplete: () => { 
                    this.sonidoNPC.stop(); 
                    this.musicaFondo.volume=0.5;
                }
            });
        }

        this.enDialogo = false;
        this.ocultarCuadroDeTexto();
        
        // Devolvemos el movimiento al caballero
        if (this.player && this.player.descongelarParaDialogo) {
            this.player.descongelarParaDialogo();
        }
        
    } else {
        // Si no es la última frase, avanzamos normal
        this.indiceTexto++;
        this.mostrarCuadroDeTexto(this.listaTextos[this.indiceTexto]);
    }
}


//GLOBAL
crearCuadroDialogo() {
    if (!this.graphicsBox) {
        // Fondo y borde del cuadro
        this.graphicsBox = this.add.graphics();
        this.graphicsBox.fillStyle(0x000000, 0.8); 
        this.graphicsBox.lineStyle(2, 0xffffff, 1); 
        this.graphicsBox.fillRect(100, 500, 600, 100); 
        this.graphicsBox.strokeRect(100, 500, 600, 100);
        this.graphicsBox.setScrollFactor(0); 
        this.graphicsBox.setDepth(1000); 

        // Texto
        this.txtDialogo = this.add.text(120, 520, '', {
            fontSize: '20px',
            fill: '#ffffff',
            wordWrap: { width: 560 } 
        });
        this.txtDialogo.setScrollFactor(0);
        this.txtDialogo.setDepth(1001);
    }
}


//GLOBAL
mostrarCuadroDeTexto(textoCompleto) {
    this.crearCuadroDialogo();

    this.graphicsBox.setVisible(true);
    this.txtDialogo.setVisible(true);

    if (this.typewriterTimer) this.typewriterTimer.remove();

    this.txtDialogo.setText(''); 
    this.typewriterIndex = 0; 

    this.typewriterTimer = this.time.addEvent({
        delay: 70, 
        callback: () => {
            this.txtDialogo.setText(this.txtDialogo.text + textoCompleto[this.typewriterIndex]);
            this.typewriterIndex++;

            // --- 3. EFECTO DE MÁQUINA DE ESCRIBIR ---
            // Reproducimos el "blip" bajito cada vez que sale una letra.
            // Esto le da un toque RPG clásico y mucha vida al pixel art.
            this.sound.play('sonido_habla_npc', { volume: 1.5 });

            if (this.typewriterIndex >= textoCompleto.length) {
                this.typewriterTimer.remove();
                this.isTypewriterDone = true; 
            }
        },
        callbackScope: this,
        loop: true
    });
}


//GLOBAL
ocultarCuadroDeTexto() {
    if (this.typewriterTimer) this.typewriterTimer.remove();

    if (this.graphicsBox) this.graphicsBox.setVisible(false);
    if (this.txtDialogo) this.txtDialogo.setVisible(false);
}
}