
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
import { seleccionarLucesEstaticas } from "./funcionesEscenario/seleccionarElementosEscenario/seleccionarLucesEstaticas.js";
import { lucesArea } from "./update/lucesArea.js";
import { lightplayer } from "./update/lightplayer.js";
import { movimientosPlayer } from "./update/movimientosPlayer.js";
import { movimientosEnemigo } from "./update/movimientosEnemigo.js";
import { movimientoItemToPlayer } from "./update/movimientoItemToPlayer.js";
import { movimientosNpc } from "./update/movimientosNpc.js";
import { salirAreasInteraccion } from "./update/salirAreasInteraccion.js";
import { crearCuadroDialogo } from "../funciones/dialogo/crearCuadroDialogo.js";
import { eventosTemporales } from "./update/eventosTemporales.js";

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

      this.luces= seleccionarLucesEstaticas(this);
      

      
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
      this.luces.load();

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
//ethis.physics.world.createDebugGraphic();
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
//el update es todo lo que se corre en tiempo real
update(time, delta){

   lucesArea(this);
  //luz que sigue al player
    lightplayer(this);
    //movimientos Jugador
    movimientosPlayer(this);
   // console.log(`X:${this.player.getPositionX()} Y:${this.player.getPositionY()}`)
    //moviemientos del enemigo
    movimientosEnemigo(this);
   //this.physics.moveToObject(this.enemie.getContainer(), this.player.getContainer(),200);

    //this.movimientoItemToPlayer();
    movimientoItemToPlayer(this);

    //Aqui establece si el player esta mas arriba de determinado objeto
    //movimientoNpc
    movimientosNpc(this);

   
    salirAreasInteraccion(this);

    eventosTemporales(this);

}



}