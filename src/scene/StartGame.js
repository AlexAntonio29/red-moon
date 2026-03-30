
import {player} from "../player/player.js";
import {dataEnemigos} from "../enemies/DataEnemies.js"
import {dataBosses} from "../bosses/dataBosses.js"
import { Enemie1 } from "../enemies/Enemie1.js";
import { Enemie4 } from "../enemies/Enemie4.js";
import { Enemie5 } from "../enemies/Enemie5.js";
import { empujar } from "../funciones/empujar.js";
import { crearItemsPunto } from "../funciones/crearItemsPuntos.js";
import {cargarAssets} from "./cargar/cargarAssets.js"
import {cargarSonido} from "./cargar/cargarSonido.js"
import { cargarVariablesGlobales } from "./cargar/cargarVariablesGlobales.js";
import { ItemPocion } from "../items/extendsItems/ItemPocion.js";
import { CamaraPersonalizada } from "../camera/CamaraPersonalizada.js";
import { cargarLucesEstaticas } from "../funciones/cargarLucesEstaticas.js";

import { boss1 } from "../bosses/boss1.js";

import {npc1} from '../npc/npc1.js'
import {npc2} from '../npc/npc2.js'
import { npc3 } from '../npc/Npc3.js'//agrego sneyder npc dialogos -nota- bug de la mayuscula de npc3 al crear el archivo, revisar eso para evitar errores de importacion es npc3 original





import { BloqueoAtaqueFuerte } from "./colisiones/BloqueoAtaqueFuerte.js";
import { BloqueoDash } from "./colisiones/BloqueoDash.js";
import { BloqueoItem } from "./colisiones/BloqueoItem.js";
import { RecogerItem } from "./colisiones/RecogerItem.js"; 
import { Estatua } from "../items/estatua/Estatua.js";

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
      

      
}


//CREACION DE TILES (Son las texturas que no son sprites como tal sino que actua como escenario)

//metodo que crea y modifica el escenario
crearEscenario(){
    
    //this.escenario=scene.add.image(0,0,'croquis');
    //this.escenario.setOrigin(0);
    //this.scene.setDisplaySize(this.scale.width,this.scale.height);

    //console.log(this.escenario);

   //Dimensiones del mapa
    this.map= this.make.tilemap({ key: "nexus_mapa" });
    this.widthEscenario=this.map.widthInPixels;
    this.heightEscenario=this.map.heightInPixels;

    



    //console.log(`width:${this.widthEscenario} height:${this.heightEscenario}`);

    this.tileset1 = this.map.addTilesetImage('BaseMap', 'baseMap');
    this.tileset2 = this.map.addTilesetImage('Fantasy_Outside_A5', 'fantasy_Outside_A5');//48
    this.tileset3 = this.map.addTilesetImage('A2-TerrainAndMisc', 'a2-TerrainAndMisc');//48
    this.tileset4 = this.map.addTilesetImage('Fantasy_Outside_A2', 'fantasy_Outside_A2');//48
    this.tileset5 = this.map.addTilesetImage('Fantasy_Outside_D', 'fantasy_Outside_D');//48
    this.tileset6 = this.map.addTilesetImage('Fantasy_Outside_A4', 'fantasy_Outside_A4');//Fantasy_Outside_A4
    this.tileset7 = this.map.addTilesetImage('Fantasy_Outside_B', 'fantasy_Outside_B');
    this.tileset8 = this.map.addTilesetImage('Big_Decoration', 'big_Decoration');//Big_Decoration
    this.tileset9 = this.map.addTilesetImage('A4 - Walls', 'a4 - Walls');
    this.tileset10 = this.map.addTilesetImage('A3 - Walls And Floors', 'a3 - Walls And Floors');//Big_Decoration
    this.tileset11 = this.map.addTilesetImage('antorcha_sheet', 'antorcha_sheet');//Big_Decoration
    this.tileset12 = this.map.addTilesetImage('portal_inactivo', 'portal_inactivo');//portal
    this.tileset13 = this.map.addTilesetImage('objeto_llave_basica', 'objeto_llave_basica');//item_llave
    this.tileset14 = this.map.addTilesetImage('bloqueo_puerta', 'bloqueo_puerta');//puerta bloqueo

    this.tileset15 = this.map.addTilesetImage('Gate_Wood1', 'Gate_Wood1');
    this.tileset16 = this.map.addTilesetImage('Fantasy_door1', 'Fantasy_door1');
    this.tileset17 = this.map.addTilesetImage('Fantasy_door2', 'Fantasy_door2');


    
       // this.load.image("a4 - Walls","/assets/tiles_maps/Tiled/A4 - Walls.png");//Big_Decoration
    //this.load.image("a3 - Walls And Floors","/assets/tiles_maps/Tiled/A3 - Walls And Floors.png");

    



    this.fondo=this.map.createLayer('FONDO',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);

          this.subSuelo=this.map.createLayer('SUBSUELO',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);



    this._subSuelo=this.map.createLayer('_SUBSUELO',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);

    this.suelo=this.map.createLayer('SUELO', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]  
      ,0,0);

          this._suelo=this.map.createLayer('_SUELO', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);

      
          this._suelo2=this.map.createLayer('_SUELO-2', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);


          this._suelo3=this.map.createLayer('_SUELO-3', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);

                this._suelo4=this.map.createLayer('_SUELO-4', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);
    //this.detalles_piso=this.map.createLayer('DETAILS_PISO', this.tileset,0,0);SIN ADIGNAR ]





              this.above_collider=this.map.createLayer('ABOVE-COLLIDER',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);


          this.blockLayer = this.map.createLayer('BLOCK', 
              [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ], 
              0, 0
          );


          this.blockAbove = this.map.createLayer('BLOCK-ABOVE', 
              [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ], 
              0, 0
          );




                this._above_collider=this.map.createLayer('_ABOVE-COLLIDER',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);


                




                  this.above=this.map.createLayer('ABOVE',//TODO lo que esta encima del jugador pero sin collision
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
              
            ]
      ,0,0);


                  this._above=this.map.createLayer('_ABOVE',//TODO lo que esta encima del jugador pero sin collision
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
              
            ]
      ,0,0);


                         this._above2=this.map.createLayer('_ABOVE2',//TODO lo que esta encima del jugador pero sin collision
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);


      
                  this._above3_decoration=this.map.createLayer('_ABOVE3-DECORATION',//TODO lo que esta encima del jugador pero sin collision
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);


      this._above4_antorcha=this.map.createLayer('_ABOVE4-ANTORCHA',//las antorchas
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10,this.tileset11,this.tileset12,this.tileset13,this.tileset14,this.tileset15,this.tileset16,this.tileset17
            
            ]
      ,0,0);









      //_ABOVE4-ANTORCHA

   

 

  
      




      //ANIMAR OBJETOS DE TILED
      this.sys.animatedTiles.init(this.map);

      //crear luces para cada antorcha

  
    this._above4_antorcha.forEachTile(tile=>{

      if(tile.index!==-1){
       const x=tile.getCenterX();
       const y=tile.getCenterY();
        this.lights.addLight(x, y, 350) .setColor(0xffaa00) .setIntensity(1);

      }
    })


    //aqui se evalua el objeto para crear una llave y almacenarlo

    let idLlave=0;
   


        this.blockLayer.forEachTile(tile=>{

      if(tile.index!==-1&& 
        (tile.properties.tipoBloqueo==="recoger_item")&&
        (tile.properties.idItem==="llave_01")){
        
        console.log(tile.layer.id);
        
        
       const x=tile.getCenterX();
       const y=tile.getCenterY();
       const luzLlave= this.lights.addLight(x, y, 50) .setColor(0xffffff) .setIntensity(1);

        
       
        const recogido=(this.dataGuardadoRanura)?
        this.dataGuardadoRanura[this.ranura].llaves[idLlave].recogido
        :false;//evaluar con JSON

        if(recogido){
          this.map.removeTileAt(tile.x, tile.y, true, true, this.blockLayer);
          this.lights.removeLight(luzLlave);
        }

        this.listaLlaves.push({
        'id':idLlave,
        'tile':tile,
        'recogido':recogido,
        'luz':luzLlave

      });

      idLlave++;

      }


       if(tile.index!==-1&& 
        (tile.properties.tipoBloqueo==="puerta_item")&&
        (tile.properties.idItem==="llave_01")){

          if(this.listaPuertasAbiertas.find((t)=>(
            t.x===tile.x&&
            t.y===tile.y&&
            t.nameScene===this.nameScene
          
          )))
          this.abrirPuertaCompleta(tile,this.blockLayer);
          console.log("abrir");
          
        }



    });

    this.blockAbove.forEachTile(tile=>{

      if(tile.index!==-1){

        if(this.listaPuertasAbiertasAbove.find((t)=>(
            t.x===tile.x&&
            t.y===tile.y&&
            t.nameScene===this.nameScene
        ))){
          this.abrirPuertaCompleta(tile,this.blockAbove);
        }

      }
    });









    //crear contacto con collision
    //this._above3_decoration.setCollisionByExclusion([-1]);





    

      








// Mantenemos tu sistema de luces
     this.blockLayer.setPipeline('Light2D');
      //agregar luces los mapas


      this.fondo.setPipeline('Light2D');
      this.subSuelo.setPipeline('Light2D');
      this._subSuelo.setPipeline('Light2D');
      this.suelo.setPipeline('Light2D');
      this._suelo.setPipeline('Light2D');
      this._suelo2.setPipeline('Light2D');
      this._suelo3.setPipeline('Light2D');
      this._suelo4.setPipeline('Light2D');
      this.above.setPipeline('Light2D');
      this._above.setPipeline('Light2D');
      this._above2.setPipeline('Light2D');
      this._above3_decoration.setPipeline('Light2D');
      this._above4_antorcha.setPipeline('Light2D');
      this.above_collider.setPipeline('Light2D');

      this.blockLayer.setPipeline('Light2D');
      this.blockAbove.setPipeline('Light2D');

      this._above_collider.setPipeline('Light2D');















    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);




  // Este nombre debe coincidir con el nombre del tileset dentro de Tiled
  //const tileset = map.addTilesetImage('[Base]BaseChip_pipo', 'tiles');

  // Crear capa (usa el nombre de la capa en Tiled)
  //const fondo = map.createLayer('Fondo', tileset, 0, 0);



}



//Aqui se generaran los items
crearItems(n){
    

   //this.crearItemsPunto(n); 
   crearItemsPunto(this,n,this.items_punto,this.widthEscenario,this.heightEscenario,true,null,this.lights);

  
}

//METODOS DEL ENEMIGO

crearEnemigoPorPuntos(){
  let valor=0;

valor=Math.random() < 0.5 ? 0 : 1;

return valor;

}

//Crear enemigo
crearEnemigo(n=1, x,y,selector=0){

 if(n!==0){
    for(let i=0;i<n;i++){
  let enemigo;
  
      if(x===undefined){
        x=Math.floor(Math.random() * ((this.widthEscenario-30) - 0 + 1)) + 0;
      }

      if(y===undefined){
            y=Math.floor(Math.random() * ((this.heightEscenario-30) - 0 + 1)) + 0;
      }

    

  switch(selector){

    case 0:

    enemigo=new Enemie1(this,({...dataEnemigos[selector]}),x,y);

    break;

    case 3:

  
    enemigo=new Enemie4(this,({...dataEnemigos[selector]}),x,y);

    break;


    case 4:

  
    enemigo=new Enemie5(this,({...dataEnemigos[selector]}),x,y);

    break;

    case 10:

    enemigo= new boss1(this,({...this.dataBosses[0]}),8004,6400);

    break;

    default:

    enemigo=new Enemie1(this,({...dataEnemigos[0]}),x,y);
    break;


  }


 

      //let valor=Math.floor(Math.random() * 4) + 0;
      //aqui va el valor del tipo de enemigo
      //se debe de modificar con el paso del tiempo para la variacion de enemigo
      //por el momento puse cero ya que es el valor del primero enemigo en el arreglo


      
   
   

      
   




    this.collisionMurosObjetos(enemigo);

    enemigo.setPipeline('Light2D');
    this.listaEnemigos.add(enemigo);

   
    
    
    

  }

  
   

    // this.collisionPlayerEnemigo();
     this.collisionEnemigoEnemigo();
     //this.colisionesEnemigo();
  } else console.log("Tope al maximo no se crearan enemigo: "+this.listaEnemigos.countActive(true));
  

   

}
//Movimientos Enemigo

movimientosEnemigo(){
     
     this.listaEnemigos.children.iterate(enemigo=>{
      
      enemigo.setMovimientoEnemigo(this.player.getContainer(),this.contactoSprites[0],this.contactoSprites[1],this.contactoSprites[2]);
     });


     

     

}

movimientosNpc(){
  this.listaNpc.children.iterate(npc=>{

    npc.setMovimientoNpc(this, this.player)
  })
}


//METODOS DEL PLAYER


getPlayer(){


  
    
  let x=(this.dataGuardadoRanura!==null)?this.dataGuardadoRanura[this.ranura].player.x:2100//8000;//x=2100;
  let y=(this.dataGuardadoRanura!==null)?this.dataGuardadoRanura[this.ranura].player.y:8500
    this.player=new player(this, 'player',80,80,this.joystickCursors, this.controles, this.keys,this.listaEnemigos,this.lights,this.cameras.main);

    this.player.getContainer().setTint(0x555555);//para ver si se oscurece mas
    this.player.getContainer().setPipeline('Light2D');


    //curando

  

  

  

    this.player.setPositionInitial(x,y);

    this.lightToPlayer=this.lights.addLight(x, y, 150) .setColor(0xffaa00) .setIntensity(2);
    //this.lightToPlayer.setDepth(6);
    //this.lightToPlayer.setOrigin(1,1);
    //this.player.getChangeSprite();

/*
    this.keys.W.on('down', () => {this.player.getCaminar()});
    this.keys.W.on('up',   () => {this.player.getNoCaminar()});

    this.keys.S.on('down', () => {this.player.getCaminar()});
    this.keys.S.on('up',   () => {this.player.getNoCaminar()});

    this.keys.A.on('down', () => {this.player.getCaminar()});
    this.keys.A.on('up',   () => {this.player.getNoCaminar()});

    this.keys.D.on('down', () => {this.player.getCaminar()});
    this.keys.D.on('up',   () => {this.player.getNoCaminar()});*/



   
    //this.input.keyboard.on('keyup-W', () => {console.log("Suelto ") });

     //movimientos de jugador

     this.cursor=this.input.keyboard.createCursorKeys();//flechas

     //collision del jugador

   
}

//Moviemientos Player

pausarEscena(){
this.scene.pause();

this.scene.launch('ScenePause',{scene:this.scene,puntos:this.puntos,player:this.player,puntaje:this.puntaje,armas:this.armas, keys:this.keys});


}

movimientosPlayer(){


     this.player.setMovimientoPlayer(this.contactoSprites[0]
      ,this.listaEnemigos
      ,this.contactoSprites
      ,this.items_punto
      ,this.listaEventos
      ,this.listaCheckpoints
      ,this.listaLlaves
      ,this.listaPuertasAbiertas
      ,this.listaPuertasAbiertasAbove
    );
    
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

//LLAMAR A TODAS LAS COLISIONES
crearColisiones(){
  this.collisionRecogerItemPuntos();
 
  this.collisionMurosObjetos(this.player.getContainer());
 

  this.colisionesEnemigo();
  
}

colisionesEnemigo(){


  this.collisionPlayerEnemigo();
}

//FUNCIONES DE LAS COLISIONES

    contactoPlayerEnemigo(player,enemigo){

      let tiempo_invisivilidad=1000;
      let parpadeo=100;
      let n=10;
      


       //console.log(this.golpeToPlayer);
       this.golpeToPlayer.play();
          
       this.player.setGolpeado();

        if(enemigo!==null){
          empujar(enemigo.getContainer(),this.player.getContainer(),0,this.contactoSprites,this,700);//
        

          this.player.setVida(enemigo.dataEnemie.ataque); //desactivar para el contacto player enemigo


                this.physics.world.removeCollider(this.colisionEnemigoPlayer);

                }
                
          this.time.delayedCall(tiempo_invisivilidad,()=>{

            console.log("regresa");
            player.setAlpha(1);
            player.setVisible(true);
            this.collisionPlayerEnemigo();
            

          });


        this.time.addEvent({
        
        delay: parpadeo, 
        callback: () => {
        player.setVisible(!player.visible); 
                        },
         repeat: n // número de parpadeos
                          });


          if(this.player.getVida()<=0)this.finalizarPartida("Partida Finalizada") ;

          console.log("Contacto Player Enemigo: "+this.player.getVida());

          this.getBarraVida();




        player.setAlpha(0.5)
        



          

    }
  //colision al contacto del player con el enemigo
      collisionPlayerEnemigo(){
        
   this.colisionEnemigoPlayer=this.physics.add.collider(this.player.getContainer(),this.listaEnemigos,this.contactoPlayerEnemigo,null,this);

}

    contactoEnemigoEnemigo(a,b){
      
     // empujar(a,b,2,this.contactoSprites,this,10,false);


    }
//colision entre los enemigos para que no transpasen
      collisionEnemigoEnemigo(){
 // this.physics.collider();

    this.physics.add.collider(this.listaEnemigos, this.listaEnemigos,this.contactoEnemigoEnemigo, null, this);


}
//colision de arboles para que el player no las pase



  eliminarRebote(objeto){

    

    if(objeto.name==="player"){
    this.player.setCambiarEstado("idle");
    //objeto.setVelocity(0);
  }


   // player.this.state="idle";

  }

      collisionMurosObjetos(objeto){//el collider llegara por un parametro

      //objetos tierra da entender al abismo de la zona


      //dar collider a los graficos 

   

        
        if(objeto && this.fondo)
  //tierra  zona abismo
{
        if(this.fondo.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this.fondo.setCollisionByExclusion([-1]);
  
        this.physics.add.collider(objeto,this.fondo,this.eliminarRebote,null,this);
      
}

        if(objeto && this.above_collider){
  //objetos de la zona
        if(this.above_collider.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this.above_collider.setCollisionByExclusion([-1])
        this.physics.add.collider(objeto,this.above_collider,this.eliminarRebote,null,this);}

         if(objeto && this._above_collider){
  //objetos de la zona
        if(this._above_collider.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this._above_collider.setCollisionByExclusion([-1])
        this.physics.add.collider(objeto,this._above_collider,this.eliminarRebote,null,this);
      }
        


        /*

        if(objeto && this.edificios){
  //edificios

        if(this.edificios.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this.edificios.setCollisionByExclusion([-1])
        this.physics.add.collider(objeto,this.edificios,this.eliminarRebote,null,this);
      }*/

        if(objeto && this.above){
  //above para que este encima del player
          if(this.above.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this.above.setCollisionByExclusion([-1]);
        this.physics.add.collider(objeto,this.above,this.eliminarRebote,null,this);

        this.above.setDepth(10);
        objeto.setDepth(5);



}


       if(objeto && this._above){
  //above para que este encima del player
          if(this._above.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this._above.setCollisionByExclusion([-1]);
        this.physics.add.collider(objeto,this._above,this.eliminarRebote,null,this);

        this._above.setDepth(10);
        objeto.setDepth(5);



}


if (objeto && this.blockLayer) {
   
    if (this.blockLayer.layer.properties.find(p => p.name === "collider" && p.value === true)) {
        this.blockLayer.setCollisionByExclusion([-1]);
    }

   
    this.physics.add.collider(
        objeto,               
        this.blockLayer,      
        this.eliminarRebote,  
        this.checkCondicionBloque, 
        this                 
    );
}





       if(objeto && this._above2){
  //above para que este encima del player
          if(this._above2.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this._above2.setCollisionByExclusion([-1]);
        this.physics.add.collider(objeto,this._above2,this.eliminarRebote,null,this);

        this._above2.setDepth(10);
        objeto.setDepth(5);



}


  let ultimoEstado=null;
    
       if(objeto && this._above3_decoration){
  //above para que este encima del player
          if(this._above3_decoration.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this._above3_decoration.setCollisionByExclusion([-1]);

        this.physics.add.collider(objeto,this._above3_decoration);



      objeto.setDepth(5);
      this._above3_decoration.setDepth(10);

}



//generar depth a _suelo4


       if(objeto && this._above4_antorcha){
  //above para que este encima del player
          if(this._above4_antorcha.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this._above4_antorcha.setCollisionByExclusion([-1]);

        this.physics.add.collider(objeto,this._above4_antorcha);



      objeto.setDepth(5);
      this._above4_antorcha.setDepth(10);

}









      }

      //

      


      //colisiones Enemigos Tiles


      collisionEnemigosMuros(){
        

                 this.physics.add.collider(this.listaEnemigos,this.muros);
                  
      }





        contactoPlayerItem(player,item){

          //console.log(item.puntos);

          let numAleatorio=Math.floor(Math.random() * (3 - 1 + 1)) + 1;

          let recogerPuntos = this.sound.add('point'+numAleatorio, {
    loop: false,
    volume: 0.3   // volumen entre 0 y 1
  });

            recogerPuntos.play();

          this.puntos=Number(this.puntaje.text);

          

          
          
          //organizar puntos en items


            


           this.puntos+=Number(item.puntos);
           this.lights.removeLight(item.light);
            this.items_punto.remove(item,true,true);

            
            /*
            let puntosTemporales=0;

            itemsOrganicos.map(item=>{
              puntosTemporales=puntosTemporales+(parseInt(item.cantidad)*parseInt(item.puntos));
            });
            itemsInorganicos.map(item=>{
                 puntosTemporales=puntosTemporales+(parseInt(item.cantidad)*parseInt(item.puntos));
            });*/
            
            

            //this.puntos=parseInt(this.puntos)+parseInt(item.puntos);
            //console.log("puntos: "+this.puntos);
            
            this.puntaje.setText((this.puntos));
            //Al superar cierta cantidad de puntos aparecera un nuevo enemigo
             if(parseInt(this.puntos) >this.puntosCreacionEnemigo){
               
              this.puntosCreacionEnemigo=this.puntosCreacionEnemigo+200;
              
              if(this.topeCreacionEnemigos<1000)
                this.topeCreacionEnemigos+=10;
            }


        
        }

        
//colision para cuando el player recoge el itemBasura
      collisionRecogerItemPuntos(){

        this.physics.add.overlap(
        this.player.getContainer(),
        this.items_punto,
        this.contactoPlayerItem,null,this
    );

    

    
}  













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





//creacion de la camara
crearCamera(){


    this.camera= new CamaraPersonalizada(this, this.player.getContainer(), this.hudContainer);

  
    


}



//Crear HUD del juego

getBarraStamina(){

  //datos de player
  let stamina_player;
  if(this.player.stamina>=0)
    stamina_player=this.player.stamina;
  else stamina_player=0;



  if(this.contenedorStamina) this.contenedorStamina.destroy();
  this.contenedorStamina=this.add.container(0,0).setScrollFactor(0);



  if(this.backgroundStamina) this.backgroundStamina.destroy();
  this.backgroundStamina=this.add.rectangle(10,10+this.backgroundVida.height+10,stamina_player,10,0x438E5B,1)//cambiar el tercer parametro por la vida del player
  .setOrigin(0)

    if(this.backgroundStaminaCompleta) this.backgroundStaminaCompleta.destroy();
  this.backgroundStaminaCompleta=this.add.rectangle(10,10+this.backgroundVida.height+10,this.player.staminaMax,10,0x90CBA3,1)//cambiar el tercer parametro por la vida del player
  .setOrigin(0)
  
 
  //cambiar despues el valor por uno que tome de la BD

  this.contenedorStamina.add(this.backgroundStaminaCompleta);
  this.contenedorStamina.add(this.backgroundStamina);
  this.contenedorStamina.setDepth(20);
  this.hudContainer.add(this.contenedorStamina);



  
}

getBarraVida(){

  //datos de player
  let vida_player
  if(this.player)
    vida_player=this.player.vida;
  else vida_player=250;

  if(this.contenedorVida) this.contenedorVida.destroy();
  this.contenedorVida=this.add.container(0,0).setScrollFactor(0);



  if(this.backgroundVida) this.backgroundVida.destroy();
  this.backgroundVida=this.add.rectangle(10,10,vida_player,10,0xFF0000,1)//cambiar el tercer parametro por la vida del player
  .setOrigin(0)

    if(this.backgroundVidaCompleta) this.backgroundVidaCompleta.destroy();
  this.backgroundVidaCompleta=this.add.rectangle(10,10,this.player.vidaActualMax,10,0x9C2007,1)//cambiar el tercer parametro por la vida del player
  .setOrigin(0)
  
  //console.log(this.player.vidaActualMax);
  //cambiar despues el valor por uno que tome de la BD

  this.contenedorVida.add(this.backgroundVidaCompleta);
  this.contenedorVida.add(this.backgroundVida);
  this.contenedorVida.setDepth(20);
  this.hudContainer.add(this.contenedorVida);
  
  



  
}

getCuraciones(){
  let pocionesMaximos=this.player.cantidadPocionesMaximo;
  let pocionesDisponibles=this.player.cantidadPociones;

  if(this.contenedorPociones) this.contenedorPociones.destroy();
    this.contenedorPociones=this.add.container(0,0).setScrollFactor(0);

    let width_pocion_position=10;

    
  
  for(let i=1;i<=pocionesMaximos;i++){

      let item;
      let height_pocion_position=this.backgroundStamina.y+this.backgroundStamina.height+10;

      if(pocionesDisponibles>=i){
        
        item=new ItemPocion(this,null, null,25,25,0,0,"item_pocion",null);
        item.setItemPosition(width_pocion_position,height_pocion_position);

        width_pocion_position+=item.width+10;
        this.contenedorPociones.add(item);

      }else{
        item=new ItemPocion(this,null, null,25,25,0,0,"item_pocion_vacio",null);
        item.setItemPosition(width_pocion_position,height_pocion_position);
        width_pocion_position+=item.width+10;
        this.contenedorPociones.add(item);

      }


  }

  this.contenedorPociones.setDepth(20);
  this.hudContainer.add(this.contenedorPociones);


}
crearHUD(){
    //CREAR HUD de Puntos
    this.puntos=0;

    console.log("Dentro de HUD");

//contenedor que sirve para acomodar todo en un solo item
  this.hudContainer=this.add.container(0,0).setScrollFactor(0);
//Fondo semitransparente que servira para una mejor visualizacion
  this.hudBackground= this.add.rectangle(0,0,300,50,0x000000,0.5)
    .setOrigin(0)
    .setStrokeStyle(2,0xffffff);


    this.getBarraVida();
    this.getBarraStamina();
    this.getCuraciones();

    


    this.hudPuntos();
    this.hudCronometro();

   
    this.hudBackground.setPosition(this.widthPantalla-this.hudBackground.width,10);
//union de los puntos y cronometro al background para que este todo junto
    this.hudContainer.add(this.hudBackground);
    this.hudContainer.add(this.contenedorPuntaje);
    //this.hudContainer.add(this.puntaje);
    this.hudContainer.add(this.cronometro);
    

    this.hudContainer.setDepth(20);



}

//donde muestra los puntos acumulados
    hudPuntos(){

       let textoPuntos= this.add.text(16,16,"Esencia de luna roja ",{
        fontSize: '15px',
        fontFamily:this.fontText,
        fill: '#fff'

    })
    
    
    ;


    textoPuntos.setPosition(this.widthPantalla-this.hudBackground.width,10);

    this.contenedorPuntaje=this.add.container(0,0).setScrollFactor(0);
  
    this.puntaje= this.add.text(16,16,this.puntos,{
        fontSize: '15px',
        fontFamily:this.fontText,
        fill: '#fff'

    }).setPosition(textoPuntos.x+textoPuntos.width+10,textoPuntos.y);

    this.contenedorPuntaje.add(textoPuntos);

    this.contenedorPuntaje.add(this.puntaje);


}
//donde muetra el cronometro
    hudCronometro(){
  

    //CREAR HUD de tiempo
    this.cronometro= this.add.text(16,16,'Reloj: '+this.tiempo,{
        fontSize: '15px',
        fontFamily: this.fontText,
        fill: '#fff'
    });
    

    this.time.addEvent({
  delay: 1000, // cada 1000 ms = 1 segundo
  callback: () => {
    this.tiempoProgresivo++;

    if(this.tiempoProgresivo===this.tiempoParaCrearEnemigos){
      this.tiempoParaCrearEnemigos+=10;
      //this.crearEnemigo(this.topeCreacionEnemigos-this.listaEnemigos.countActive(true));

      
     // console.log("Creando enemigos segun el tope: ");

    } 


    
   
    

    //if(this.tiempo<=0) this.finalizarPartida("Se agotó el tiempo");
    //else{
    this.tiempo++;
    this.cronometro.setText('Reloj: ' + this.tiempo);//}
  },
  loop: true
});

    this.cronometro.setPosition(this.puntaje.width+this.puntaje.x+20, 10);
}


//IR al siguiente escenario
finalizarPartida(n=""){

   // this.sound.stopAll();
    console.log(this.scene);
    
  this.musicaFondo.stop();
  this.scene.stop('StartGame');
  this.scene.restart();

  this.scene.start('FinPartida',{puntos:this.puntos,mensaje:n});
  console.log("MENSAJE: "+n);

}
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


    crearLuces(){
      this.lights.enable();
      this.lights.setAmbientColor(0x222222); 
      cargarLucesEstaticas(this);

    }


    creacionEnemigosPosicionados(){

     // this.crearEnemigo(1,2950,8550,3);//cantidad Enemigos, x, y ,tipo de enemigo

      //this.crearEnemigo(1,3050,8600,1);
      //this.crearEnemigo(1,0,0,10);
      //this.crearEnemigo(1,8004,6400,10);

      //this.crearEnemigo(1,2150,4400,4);//cantidad Enemigos, x, y ,tipo de enemigo



       //hacer prueba para jefe

       
      this.crearEnemigo(1,6605,7972,0);  
      this.crearEnemigo(1,6290,8425,0);
      this.crearEnemigo(1,5971,8451,3);
      this.crearEnemigo(1,6515,8532,0);
      this.crearEnemigo(1,6752,7657,0);
      this.crearEnemigo(1,6684,7251,3);
      this.crearEnemigo(1,6930,8392,0);
      this.crearEnemigo(1,7518,8470,0);
      this.crearEnemigo(1,7581,7905,3);
      this.crearEnemigo(1,7857,8482,0);
      this.crearEnemigo(1,8483,8509,0);
      this.crearEnemigo(1,9063,8449,0);
      this.crearEnemigo(1,9809,8107,3);
      this.crearEnemigo(1,10109,8370,0);
      this.crearEnemigo(1,10522,8296,0);
      this.crearEnemigo(1,10134,8190,0);
      this.crearEnemigo(1,9976,7865,0);
      this.crearEnemigo(1,10561,7862,3);
      this.crearEnemigo(1,10197,7506,0);
      this.crearEnemigo(1,9596,7531,0);
      this.crearEnemigo(1,8999,7645,0);
      this.crearEnemigo(1,7658,7628,0);
      this.crearEnemigo(1,8009,6957,0);

      this.crearEnemigo(1,8187,8005,3);
      this.crearEnemigo(1,8686,8033,3);
       

       








     //  this.crearEnemigo(1,this.player.x+100,this.player.y)// enemigo



    }

    crearEvento(x,y,width,height,tiempoEvento,tiempoTraslado, xadd,yadd, zoom,ocultarHUD ,accion,movePlayer,id){


      /*
      

       let x=4400;
       let y=8525;
       
       let width=400;
       let height=250;
      */



        

      
      let evento = new this.Scenario1Eventos(this,x,y,width,height,this.player.getContainer(),this.camera,this.lights, this.player,id);

      this.physics.add.overlap(
        this.player.getContainer(),
        evento,
        (player, evento)=>{

          
          let xMovCamera=x+(width/2); //-(this.widthPantalla/2)//
          let yMovCamera=y+(height/2); //-(this.heightPantalla/2)//

          if(!evento.esActivado&&evento.esActivo){
                evento.setCollisionEvento(xMovCamera+xadd,yMovCamera+yadd,tiempoEvento,tiempoTraslado,zoom,ocultarHUD,accion,movePlayer);
                
              }
              });
      
          
      this.listaEventos.add(evento);


      


    }

    cargarEvento(){
      //datos de eventos estos para comodidad del programador en agregar eventos se agregaran en variables
      let x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom, ocultarHUD,accion,movePlayer;
      let id=0;
      x=4400;
      y=8425;
      width=400;
      height=250;
      tiempo=3000;
      tiempoTraslado=500;
      xAdicional=0;
      yAdicional=0;
      zoom=0.4;
      ocultarHUD=false;
      accion=1;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
      //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
      movePlayer=false;


      //this.crearEvento(4400,8425,400,250,3000,500,0,0,0.8);//positionx,positiony,widthEvento,heightEvento, tiempoEjecucion, tiempoTrasladoCamara, xAdicional, yAdicional,zoom
      this.crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer,id);

      id++;
      x=7110;
      y=7710;
      width=400;
      height=250;
      tiempo=2000;
      tiempoTraslado=500;
      xAdicional=0;
      yAdicional=450;
      zoom=2.0;
      ocultarHUD=false;
      accion=2;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
      //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
      movePlayer=false;


      //this.crearEvento(4400,8425,400,250,3000,500,0,0,0.8);//positionx,positiony,widthEvento,heightEvento, tiempoEjecucion, tiempoTrasladoCamara, xAdicional, yAdicional,zoom
      this.crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer,id);

      id++;
      x=9805;
      y=7300;
      width=200;
      height=550;
      tiempo=0;
      tiempoTraslado=0;
      xAdicional=0;
      yAdicional=0;
      zoom=1.0;
      ocultarHUD=false;
      accion=3;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
      //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
      movePlayer=false;


      //this.crearEvento(4400,8425,400,250,3000,500,0,0,0.8);//positionx,positiony,widthEvento,heightEvento, tiempoEjecucion, tiempoTrasladoCamara, xAdicional, yAdicional,zoom
      this.crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer,id);


      //cuando se va a agregar un nuevo elemento entoces se establecen valores variables;



      id++;
      x=9890;
      y=8296;
      width=200;
      height=550;
      tiempo=0;
      tiempoTraslado=0;
      xAdicional=0;
      yAdicional=0;
      zoom=1.0;
      ocultarHUD=false;
      accion=4;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
      //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
      movePlayer=false;


      //this.crearEvento(4400,8425,400,250,3000,500,0,0,0.8);//positionx,positiony,widthEvento,heightEvento, tiempoEjecucion, tiempoTrasladoCamara, xAdicional, yAdicional,zoom
      this.crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer,id);


}

crearNpc(n,x,y){

  let npc;
    if(this.dataNpc[n-1]){
      switch(n){
        case 1:

        npc= new npc1(this,this.dataNpc[n-1],x,y);

        break;

        case 2:

        npc= new npc2(this,this.dataNpc[n-1],x,y);
        break;

        case 3:

        npc = new npc3(this, this.dataNpc[n-1], x, y);
              
                
                break;
        }

        // Tus físicas y luces originales
        this.physics.add.collider(this.player.getContainer(), npc, () => {
            this.player.pisadas_player_tierra.stop();
            
        });

        npc.setPipeline('Light2D');
        this.listaNpc.add(npc);
    }



}

cargarNpc(){
 

  this.crearNpc(2,8052,6161);
//agrego sneyder npc dialogos
this.crearNpc(3, 6008.03, 7466.2);

}
   
crearCheckpoint(x,y,id){

  let checkpoint=new Estatua(this,x,y,id);
    checkpoint.setPipeline('Light2D');
 

  this.physics.add.collider(this.player.getContainer(),checkpoint,()=>{
  
    this.player.pisadas_player_tierra.stop();
  });



  this.physics.add.overlap(this.player.getContainer(),checkpoint.hitbox,()=>{
    if(!this.player.estaGuardando) {
      
      this.player.estaGuardando=true;

      checkpoint.esActivado();
    }
    

  })

   this.listaCheckpoints.add(checkpoint);

}
cargarCheckpoints(){

      let x=5816//8000;//x=2100;
      let y=7826//6862;//y=8500;
      let id=0

  this.crearCheckpoint(x,y,id)

  id++;
  x=2400;
  y=8500;

  this.crearCheckpoint(x,y,id);


}



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
    this.creacionEnemigosPosicionados()

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
       
}


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


lightplayer(){

     let xPlayer=this.player.getContainer().displayWidth/2;
   let yPlayer=this.player.getContainer().displayHeight/2;

  this.lightToPlayer.setPosition((this.player.getContainer().x)+xPlayer,(this.player.getContainer().y)+yPlayer);

 // console.log("player x: "+)

}




salirAreaGuardado(){

  this.listaCheckpoints.children.iterate(checkpoint=>{
                  
              if(this.player.estaGuardando&& !this.physics.overlap(this.player.getContainer(),checkpoint))
              {
                this.player.estaGuardando=false;
                
                
              }
           
            
            });


          


}








//el update es todo lo que se corre en tiempo real
update(time, delta){

   
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

   
    this.salirAreaGuardado();



  
 



}

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

            default:
                console.log("No se puede interactuar con este objeto de esa forma.");
                break;
                // CASO C: ACTIVAR UNA PALANCA O INTERRUPTOR
            case "palanca":
                // Leemos cual es el ID del dibujo de la palanca activada
                let tileActivado = tile.properties.idActivado; 

                if (tileActivado) {
                    // 1. Reemplazamos el dibujo actual por el de la palanca bajada
                    this.blockLayer.putTileAt(tileActivado, tile.x, tile.y);
                    
                    // 2. Le cambiamos el tipo para que el jugador no pueda activarla 100 veces
                    tile.properties.tipoBloqueo = "palanca_usada";
                    
                    console.log("¡Click! La palanca ha sido activada.");
                    
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
        }
    }
    // ==========================================
    // DESTRUIR PUERTA COMPLETA (REACCION EN CADENA)
    // ==========================================
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


//dialogos
iniciarDialogo(npc) {
    // Seguridad: verificamos que el NPC tenga el método de diálogos
    if (!npc || typeof npc.obtenerDialogos !== 'function') return;

    this.enDialogo = true;
    this.npcActual = npc; 
    this.listaTextos = npc.obtenerDialogos();

    // --- 1. REPRODUCIR MÚSICA DE AMBIENTACIÓN ---
    // Verificamos si ya hay música sonando para no duplicarla
    if (!this.musicaMagoActiva || !this.musicaMagoActiva.isPlaying) {
        this.musicaMagoActiva = this.sound.add('musica_mago', { 
            loop: true, 
            volume: 0.8 
        });
        this.musicaMagoActiva.play();
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

avanzarDialogo() {
    // ¿Llegamos a la última frase?
    if (this.indiceTexto >= this.listaTextos.length - 1) {
        
        if (this.npcActual) {
            this.npcActual.yaHabloTodo = true;
        }

        // --- 2. DETENER MÚSICA AL CERRAR DIÁLOGO ---
        // Aplicamos un "fade-out" para mantener la atmósfera melancólica y que no se corte de golpe
        if (this.musicaMagoActiva) {
            this.tweens.add({
                targets: this.musicaMagoActiva,
                volume: 0,
                duration: 1000, // Tarda 1 segundo en desvanecerse
                onComplete: () => { 
                    this.musicaMagoActiva.stop(); 
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

ocultarCuadroDeTexto() {
    if (this.typewriterTimer) this.typewriterTimer.remove();

    if (this.graphicsBox) this.graphicsBox.setVisible(false);
    if (this.txtDialogo) this.txtDialogo.setVisible(false);
}
}