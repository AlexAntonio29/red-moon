import {puntos, itemsConsumibles} from "../items/ItemsData.js";
import { Items } from "../items/Items.js";
import {player} from "../player/player.js";
import {dataEnemigos} from "../enemies/DataEnemies.js"
import { Enemies } from "../enemies/Enemies.js";
import { empujar } from "../funciones/empujar.js";
import { itemTiempo } from "../items/ItemTiempo.js";
import { armas } from "../items/DataItemsPotenciadores.js";
import { crearItemsPunto } from "../funciones/crearItemsPuntos.js";
import { conjuntoArmas } from "../armas/conjuntoArmas.js"

export class StartGame extends Phaser.Scene{//cuando inicia la partida

    constructor(){
        super('StartGame');
        //console.log("Estoy en StartGame");

    }
    //aqui se cargan las variables globales desde preload()
    cargarVariablesGlobales(){

      this.tiempo=0;
      this.tiempoProgresivo=0;//el tiempo progresivo sirve para llevar el tiempo siempre adelante
      this.tiempoParaCrearEnemigos=20;

     
      //agregar arma
      this.armas=new conjuntoArmas().getArmas();

      this.itemsOrganicos=puntos.map(a => ({ ...a }));
      this.itemsInorganicos=itemsConsumibles.map(a => ({ ...a }));

      

      //fuente del texto

      this.fontText='FontArcade4';
   // console.log("Preload "+this.scene.key);
      this.widthPantalla=this.sys.game.config.width;
      this.heightPantalla=this.sys.game.config.height;

    this.widthEscenario=0;
    this.heightEscenario=0;

    this.tamañoTextoStandard=16;
    this.tamañoImagenItemStandard=25;


    this.contactoSprites=[
       false//Contacto de enemigo con player
      ,false//Contacto de ataque con enemigo
      ,false//Contacto de enemigo con enemigo
    ];

    this.estaAtacando=false;//esto me sirve para generar una condicional de tiempo de ataque asi no genera errores

     this.cantidadRelojes=0;
     //relojes

     this.listaRelojes=this.physics.add.group();

       //TODO REFEREIDO A ENEMIGOS

   this.listaEnemigos=this.physics.add.group();

    
    this.puntosCreacionEnemigo=0;
    this.topeCreacionEnemigos=0;

    this.getPotenciadorPuntos=0;
    this.puntosPotenciadorAcumulador=1;

    this.items_punto=this.physics.add.group();
    }

    cargarBotonesTeclas(){  
      this.controles = {
  ataque:false
};


    }

    crearSonidos(){
      //sonido items basura
     /* for(let i=1;i<=10;i++){
        this.load.audio('pop'+i,"./sounds/pop"+i+".mp3");
        this.load.audio('ataque'+i,"./sounds/ataque"+i+".mp3");
      
      }*/

     // this.sonidoAtaquePlayer;
      
      //cargar sonidos de ataque
     this.load.audio("ataque1","./sounds/player/atacando/ataque_espada.mp3")


     //sonido de puntos
     this.load.audio("point1","./sounds/general/points/sound1.mp3");
     this.load.audio("point2","./sounds/general/points/sound2.mp3");
     this.load.audio("point3","./sounds/general/points/sound3.mp3");
     



      

      this.load.audio("powerUp","./sounds/powerUp.mp3");

      this.load.audio("fondoStart","./sounds/level/nexus/soundtrack.mp3");

      this.load.audio("potenciador","./sounds/woo.mp3");

      this.load.audio("touch","./sounds/touch.mp3");

      this.load.audio("golpeEnemie","./sounds/enemigo/enemie1/golpeado/espada/golpe.mp3");

      this.load.audio("golpeToPlayer","./sounds/player/atacado/ataque.mp3");

      this.load.audio("reloj","./sounds/reloj.mp3");
      
    }


    crearEfectos(){
   // this.load.image("ataqueLateralAbajo","./assets/effect/ataqueLateralAbajo.png");
   // this.load.image("ataqueLateralArriba","./assets/effect/ataqueLateralArriba.png");
   // this.load.image("ataqueLateralDerecha","./assets/effect/ataqueLateralDerecha.png");
   // this.load.image("ataqueLateralIzquierda","./assets/effect/ataqueLateralIzquierda.png");

     this.load.spritesheet("ataqueLateralAbajo", "./assets/effect/ataqueLateralAbajo.png", {
  frameWidth: 64,
  frameHeight: 64
});

this.load.spritesheet("ataqueLateralArriba", "./assets/effect/ataqueLateralArriba.png", {
  frameWidth: 64,
  frameHeight: 64
});

this.load.spritesheet("ataqueLateralDerecha", "./assets/effect/ataqueLateralDerecha.png", {
  frameWidth: 64,
  frameHeight: 64
});

this.load.spritesheet("ataqueLateralIzquierda","./assets/effect/ataqueLateralIzquierda.png", {
  frameWidth: 64,
  frameHeight: 64
});

    }

    
  
    cargarSpritesPlayer(){

  this.load.spritesheet("player", "./assets/player/Animations/Carry_Run/Run-lefth-right.png", {
 frameWidth: 64,
  frameHeight: 64
});


  this.load.spritesheet("player_walk_up", "./assets/player/Animations/Carry_Run/Carry_Run_Up-Sheet-Rev.png", {
 frameWidth: 64,
  frameHeight: 64
});

  this.load.spritesheet("player_walk_down", "./assets/player/Animations/Carry_Run/run_back.png", {
 frameWidth: 64,
  frameHeight: 64
});

this.load.spritesheet("player_idle","./assets/player/Animations/Carry_Idle/Idle.png",{
  frameWidth: 64,
  frameHeight: 64
})

//ataque 

this.load.spritesheet("attack_right","./assets/player/Animations/attack/attack1.png",{
  frameWidth: 64,
  frameHeight: 64
})

this.load.spritesheet("player_golpeado_espada","./assets/player/Animations/golpeado/golpeado_espada.png",{
  frameWidth: 64,
  frameHeight: 64
});

this.load.spritesheet("player_dash_reverso","./assets/player/Animations/Dash/reverso.png",{
  frameWidth: 64,
  frameHeight: 64
});

this.load.spritesheet("player_dash_adelante","./assets/player/Animations/Dash/adelante.png",{
  frameWidth: 64,
  frameHeight: 64
});










        }

    cargarImagenes(){
      
      //Agregar efectos

      this.crearEfectos();
    

    //imagen mochila
    this.load.image('mochila','./assets/mochilaInventario.png');
   // this.load.image("croquis","./assets/croquis_escuela.png");


   //this.load.image("player","./assets/player/Player.png");
      this.cargarSpritesPlayer();


   

   this.load.image('tiles', './assets/[Base]BaseChip_pipo.png');
   this.load.image('tiles2', './assets/[A]Grass_pipo.png');
   this.load.tilemapTiledJSON('mapa', './assets/mapa_scene.json');
   //item basura

    this.load.image('tiles_suelo_nexus','./assets/tiles_maps/nexus/asset_suelo_castillo.png');
    this.load.tilemapTiledJSON('mapa_nexus','./assets/tiles_maps/nexus/base_nexus.json');



    //tiles de nexus personal cargar imagenes
    this.load.image("baseMap","/assets/tiles_maps/nexus/BaseMap.png");
  
    this.load.image("suelo_castillo","/assets/tiles_maps/nexus/asset_suelo_castillo.png");
    this.load.image("arbol1","/assets/tiles_maps/nexus/Arbol_T1.png");
    this.load.image("arbol2","/assets/tiles_maps/nexus/Arbol_T2.png");
    this.load.image("rocks","/assets/tiles_maps/nexus/Rocks.png");
    this.load.image("tiles_dungeon","/assets/tiles_maps/nexus/Dungeon_Tiles.png");
    this.load.image("build","/assets/tiles_maps/nexus/mainlevbuild.png");
    this.load.image("build2","/assets/tiles_maps/nexus/mainlevbuild.png");
    this.load.image("bushes","/assets/tiles_maps/nexus/Topdown_RPG_Bushes.png");
    this.load.image("ground","/assets/tiles_maps/nexus/Topdown_RPG_Ground.png");
    this.load.image("ruins","/assets/tiles_maps/nexus/Topdown_RPG_Ruins.png");
    this.load.image("trees","/assets/tiles_maps/nexus/Topdown_RPG_Trees.png");
    this.load.image("vegetacion","/assets/tiles_maps/nexus/Vegetation.png");
    this.load.image("wall_Tiles","/assets/tiles_maps/nexus/Wall_Tiles.png");
    this.load.image("wall_Variations","/assets/tiles_maps/nexus/Wall_Variations.png");
    


    //cargar el tiled
    this.load.tilemapTiledJSON("nexus_mapa","./assets/tiles_maps/nexus/MapaNeexo.json")
    
    



   let cantidadItems=itemsConsumibles.length+puntos.length;
   
    /*for(let i=0;i<cantidadItems;i++){

      this.load.spritesheet("item_basura"+(i+1), "./assets/items/item_basura"+(i+1)+".png", {
  frameWidth: 32,
  frameHeight: 32
});



    

    }*/

      this.load.spritesheet("item_punto","./assets/items/soul.png",{
        frameWidth: 32,
        frameHeight:32
      });




   //Textura de tiempo
  // this.load.image("reloj","./assets/items/otrosItems/reloj.png");
  

   //enemigos

  // this.load.image('enemie1',"./assets/enemies/enemie1.png");

  //textura armas

  for(let i=0;i<armas.length;i++)
    this.load.image(armas[i].diseno,"./assets/potenciadores/armas/"+(i+1)+".png"); 




    }

    cargarAnimaciones(){

      for(let i=0;i<=3;i++){

      this.load.spritesheet(dataEnemigos[i].diseno, "./assets/enemies/"+dataEnemigos[i].diseno+".png", {
  frameWidth: 64,
  frameHeight: 64
});

//console.log("Creado "+dataEnemigos[i].diseno+" de directorio: ./assets/enemies/"+dataEnemigos[i].diseno+".png");

}


//this.load.image(dataEnemigos[0].diseno+'_golpeado',"./assets/enemies/"+(dataEnemigos[0].diseno)+"_golpeado.png");


    }

    crearJoystick(){
     

    let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);
     
   

    }

    cargarTeclar(){
       this.keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D,
    ESC: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    J: Phaser.Input.Keyboard.KeyCodes.J//golpear
    
});
    }

//aqui cargo todos los archivos y objetos necesarios antes de que inicie el escenario
    preload(){

       
      

      this.cargarVariablesGlobales();
      
      this.cargarImagenes();

      this.cargarAnimaciones();

      this.crearJoystick();
      this.cargarTeclar();

      this.cargarBotonesTeclas();

      this.crearSonidos();
   
    
     

      
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
    this.tileset2 = this.map.addTilesetImage('asset_suelo_castillo', 'suelo_castillo');
    this.tileset3 = this.map.addTilesetImage('Arbol_T1', 'arbol1');
    this.tileset4 = this.map.addTilesetImage('Arbol_T2', 'arbol2');
    this.tileset5 = this.map.addTilesetImage('Rocks', 'rocks');
    this.tileset6 = this.map.addTilesetImage('Dungeon_Tiles', 'tiles_dungeon');
    this.tileset7 = this.map.addTilesetImage('mainlevbuild', 'build');
    this.tileset8 = this.map.addTilesetImage('NATURA2', 'bushes');
    this.tileset9 = this.map.addTilesetImage('NATURA', 'ground');
    this.tileset10 = this.map.addTilesetImage('CONSTRUCCION2', 'ruins');
    this.tileset11 = this.map.addTilesetImage('NATURA3', 'trees');
    this.tileset12 = this.map.addTilesetImage('mainlevbuild', 'build2');
    this.tileset13 = this.map.addTilesetImage('Vegetation', 'vegetacion');
    this.tileset14 = this.map.addTilesetImage('Wall_Tiles', 'wall_Tiles');
    this.tileset15 = this.map.addTilesetImage('Wall_Variations', 'wall_Variations');
    



        this.fondo=this.map.createLayer('FONDO', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,
        this.tileset12,this.tileset13, this.tileset14, this.tileset15
      ]
      ,0,0);

    this.suelo=this.map.createLayer('SUELOS', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,
        this.tileset12,this.tileset13, this.tileset14, this.tileset15
      ]
      ,0,0);

          this.suelo=this.map.createLayer('DETAILS_PISO', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,
        this.tileset12,this.tileset13, this.tileset14, this.tileset15
      ]
      ,0,0);
    //this.detalles_piso=this.map.createLayer('DETAILS_PISO', this.tileset,0,0);SIN ADIGNAR ]
    this.tierra=this.map.createLayer('TIERRA',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,this.tileset12,this.tileset13
              , this.tileset14, this.tileset15
      ]
      ,0,0);

          this.trees=this.map.createLayer('TREES',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,this.tileset12,this.tileset13
              , this.tileset14, this.tileset15
      ]
      ,0,0);
    
    this.pisoCiudad=this.map.createLayer('PISOS_CIUDAD',
      [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,this.tileset12,this.tileset13
        , this.tileset14, this.tileset15
      ]
      ,0,0);


    this.decoracion_suelo_city=this.map.createLayer('DECORACION_SUELO_CITY',
      [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,this.tileset12, this.tileset13
        , this.tileset14, this.tileset15
      ]
      ,0,0);

          this.build_city=this.map.createLayer('BUILD_CITY',
      [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,this.tileset12, this.tileset13
        , this.tileset14, this.tileset15
      ]
      ,0,0);

      this.edificios=this.map.createLayer('EDFICIOS_GNR',
      [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,this.tileset12, this.tileset13
        , this.tileset14, this.tileset15
      ]
      ,0,0);

      this.edificios2=this.map.createLayer('EDIFICIOS_GNR_2',
      [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,this.tileset12, this.tileset13, this.tileset14, this.tileset15
      ]
      ,0,0);

      this.decoracion=this.map.createLayer('DECORACION_EDI',
      [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5,
        this.tileset6, this.tileset7,this.tileset8, this.tileset9, this.tileset10,this.tileset11,this.tileset12, this.tileset13, this.tileset14, this.tileset15
      ]
      ,0,0);






    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);




  // Este nombre debe coincidir con el nombre del tileset dentro de Tiled
  //const tileset = map.addTilesetImage('[Base]BaseChip_pipo', 'tiles');

  // Crear capa (usa el nombre de la capa en Tiled)
  //const fondo = map.createLayer('Fondo', tileset, 0, 0);



}
//metodo que crea los edificios
crearEdificios(){

    //this.diseno=this.map.createLayer('DISENO',this.tileset,0,0);

    this.complementosMuros=this.map.createLayer('DEPARTAMENTS/COMPLEMENTOS', this.tileset2 , 0, 0);
    this.edificios = this.map.createLayer('DEPARTAMENTS/INDUSTRIAL', this.tileset2 , 0, 0);
    this.windowsEdificio = this.map.createLayer('DEPARTAMENTS/WINDOWS', this.tileset2 , 0, 0);
    
    
    


}
//metodo para crear los arboles
crearArboles(){
    //this.arboles = this.map.createLayer('TREE', this.tileset , 0, 0);
}


crearItemReloj(){

  

  for(let i=0;i<=this.cantidadRelojes;i++){

     let x=Math.floor(Math.random() * ((this.widthEscenario-30) - 0 + 1)) + 0;
     let y=Math.floor(Math.random() * ((this.heightEscenario-30) - 0 + 1)) + 0;

    this.listaRelojes.add(new itemTiempo(this,null,null,40,40,x,y,"reloj"));
   // this.listaRelojes[i].setItemPosition(x,y);

  }

}

//Aqui se generaran los items
crearItems(n){
    

   //this.crearItemsPunto(n); 
   crearItemsPunto(this,n,this.items_punto,this.widthEscenario,this.heightEscenario,true);

  // this.crearItemReloj();
}

//METODOS DEL ENEMIGO

crearEnemigoPorPuntos(){
  let valor=0;

valor=Math.random() < 0.5 ? 0 : 1;

return valor;

}

//Crear enemigo
crearEnemigo(n=1){




  if(n!==0){
    for(let i=0;i<n;i++){

      //let valor=Math.floor(Math.random() * 4) + 0;
      let valor=0;//aqui va el valor del tipo de enemigo
      //se debe de modificar con el paso del tiempo para la variacion de enemigo
      //por el momento puse cero ya que es el valor del primero enemigo en el arreglo
      
   
   let x=Math.floor(Math.random() * ((this.widthEscenario-30) - 0 + 1)) + 0;
    let y=Math.floor(Math.random() * ((this.heightEscenario-30) - 0 + 1)) + 0;
      
    let enemigo=new Enemies(this,({...dataEnemigos[valor]}),x,y);
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
     })

     

}


//METODOS DEL PLAYER


getPlayer(){

  
    this.player=new player(this, 'player',80,80,this.joystickCursors, this.controles, this.keys,this.listaEnemigos);


  

   
   
    this.player.setPositionInitial(1200,3075);
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


     this.player.setMovimientoPlayer(this.contactoSprites[0]);
    
     this.player.getAtaque(this.listaEnemigos,this.contactoSprites,1,this.items_punto,this.widthEscenario,this.heightEscenario,this.contactoSprites,this.golpeEnemie);

     //pausar juego

     if(Phaser.Input.Keyboard.JustDown(this.keys.ESC))this.pausarEscena();


     
    if(this.player.getHabilitarCollision()){
        //console.log("Habilitando Collsion ITEM NUEVO");
        // this.collisionRecogerItemBasura(); 
         this.player.setHabilitarCollision(false);
        }
    // console.log("ESTA ATACANDO: "+this.estaAtacando);

   



}

ataquePlayer(){

}








//LLAMAR A TODAS LAS COLISIONES
crearColisiones(){

  //crear collider de objetos

  //ARBOLES

  //this.arboles.setCollisionByProperty({collider:true});

  //this.muros.setCollisionByProperty({collider:true});

  //EDIFICIOS
  //this.edificios.setCollisionByProperty({collider:true});


  this.collisionRecogerItemPuntos();
  this.collisionRecogerItemTiempo();

 // this.collisionPlayerEdificioColision();
  //this.collisionPlayerArboles();
  this.collisionPlayerMurosObjetos();

  this.colisionesEnemigo();
  
}

colisionesEnemigo(){
//this.collisionEnemigosArboles();
 // this.collisionEnemigosEdificios();
//  this.collisionEnemigosMuros();
  this.collisionPlayerEnemigo();
}

//FUNCIONES DE LAS COLISIONES

    contactoPlayerEnemigo(player,enemigo){
       console.log(this.golpeToPlayer);
       this.golpeToPlayer.play();
          
       this.player.setGolpeado();
          empujar(enemigo.getContainer(),this.player.getContainer(),0,this.contactoSprites,this);//
          //this.player.setVida(1); //desactivar para el contacto player enemigo
          if(this.player.getVida()<=0)this.finalizarPartida("Partida Finalizada") ;
    }
  //colision al contacto del player con el enemigo
      collisionPlayerEnemigo(){
        
 this.physics.add.collider(this.player.getContainer(),this.listaEnemigos,this.contactoPlayerEnemigo,null,this);

}

    contactoEnemigoEnemigo(a,b){
      
      empujar(a,b,2,this.contactoSprites,this,10,false);
    }
//colision entre los enemigos para que no transpasen
      collisionEnemigoEnemigo(){
 // this.physics.collider();

    this.physics.add.collider(this.listaEnemigos, this.listaEnemigos,this.contactoEnemigoEnemigo, null, this);


}
//colision de arboles para que el player no las pase
      collisionPlayerArboles(){
   
if(this.player && this.arboles){
  //console.log("Dentro de player y arbol");
this.physics.add.collider(this.player.getContainer(),this.arboles);
}
}//s


  eliminarRebote(player){

    player.setVelocity(0);
    this.player.setCambiarEstado("idle");
   // player.this.state="idle";

  }

      collisionPlayerMurosObjetos(){

      //objetos tierra da entender al abismo de la zona


      //dar collider a los graficos 

   

        
        if(this.player && this.tierra)
  //tierra  zona abismo
{
        if(this.tierra.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this.tierra.setCollisionByExclusion([-1]);
  
        this.physics.add.collider(this.player.getContainer(),this.tierra,this.eliminarRebote,null,this);
      
}

        if(this.player && this.build_city){
  //objetos de la zona
        if(this.build_city.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this.build_city.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player.getContainer(),this.build_city,this.eliminarRebote,null,this);}

        if(this.player && this.edificios){
  //edificios

        if(this.edificios.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this.edificios.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player.getContainer(),this.edificios,this.eliminarRebote,null,this);
      }

        if(this.player && this.decoracion){
  //decoracion
          if(this.decoracion.layer.properties.find(p=>p.name==="collider"&&p.value===true))
            this.decoracion.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player.getContainer(),this.decoracion,this.eliminarRebote,null,this);

}
      }

      //

      


      //colisiones Enemigos Tiles

      collisionEnemigosArboles(){

                 this.physics.add.collider(this.listaEnemigos,this.arboles);
                  
             
   

}//s

      collisionEnemigosMuros(){
        

                 this.physics.add.collider(this.listaEnemigos,this.muros);
                  
      }

       collisionEnemigosEdificios(){

                 this.physics.add.collider(this.listaEnemigos,this.edificios);
                 
      }



        contactoPlayerItem(player,item){

          //console.log(item.puntos);

          let numAleatorio=Math.floor(Math.random() * (3 - 1 + 1)) + 1;

          let recogerPuntos = this.sound.add('point'+numAleatorio, {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });

            recogerPuntos.play();

          this.puntos=Number(this.puntaje.text);

          

          
          
          //organizar puntos en items


            


           this.puntos+=Number(item.puntos);
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

            //verifica si es candidato para obtener power Up
            //if(this.puntos>=this.getPotenciadorPuntos)  this.getPotenciador();
            //this.crearEnemigo(this.topeCreacionEnemigos-this.listaEnemigos.length);
        
        }
//colision para cuando el player recoge el itemBasura
      collisionRecogerItemPuntos(){

        this.physics.add.overlap(
        this.player.getContainer(),
        this.items_punto,
        this.contactoPlayerItem,null,this
    );

    

    
}  



    //ventanaPause para escoger potenciador

    getPotenciador(){//Es la arma o potenciador que obtiene el personaje
      this.scene.pause();
      

      this.getPotenciadorPuntos+=200*this.puntosPotenciadorAcumulador;

      this.puntosPotenciadorAcumulador++; 
      
      this.sonidoPotenciador.play();

this.scene.launch('ScenePotenciador',{scene:this.scene,puntos:this.puntos,player:this.player,puntaje:this.puntaje,armas:this.armas});

    }

//colision del tiempo

      contactoReloj(player,reloj){
          this.sonidoReloj.play();
        this.powerUp.play();
        let tiempoExtra=Math.floor(Math.random() * (50 - 10 + 1)) + 10;

        this.tiempo+=tiempoExtra;
        this.listaRelojes.remove(reloj,true,true);
      }

    collisionRecogerItemTiempo(){

     

      
      //this.listaRelojes.children.iterate(item=>{});
      this.physics.add.overlap(
        this.player.getContainer(),
        this.listaRelojes,
        this.contactoReloj,null,this);
        

       // reloj.setRecoger(this.listaRelojes,reloj);
      
    


      
    }
//colision para que player no transpase los edificios
      collisionPlayerEdificioColision(){ 

this.physics.add.collider(this.player.getContainer(), this.edificios);




}
//colision cuando un enemigo recibe un ataque
      collisionAtaqueEnemigo(){

      }





//solo sirve para testear
depurarColisiones() {
  const debugGraphics = this.add.graphics().setAlpha(0.75);

  // Dibuja los tiles con colisión activa en la capa TREE
  if (this.arboles) {
    this.arboles.renderDebug(debugGraphics, {
      tileColor: null, // tiles sin colisión (transparentes)
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // naranja
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // bordes
    });
  }

  if (this.edificio_maestria) {
    this.edificio_maestria.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(0, 255, 0, 200), // verde
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    });
  }
}




//creacion de la camara
crearCamera(){
    this.cameras.main;
    
    this.cameras.main.startFollow(this.player.getContainer());
    this.cameras.main.setZoom(1.0);
    this.cameras.main.setBackgroundColor('#FFFFFF');

}



//Crear HUD del juego
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

 let textoPuntos= this.add.text(16,16,"esencia de luna roja ",{
        fontSize: '15px',
        fontFamily:this.fontText,
        fill: '#fff'

    });
    this.hudPuntos(textoPuntos);
    this.hudCronometro();

   
//union de los puntos y cronometro al background para que este todo junto
    this.hudContainer.add(this.hudBackground);
    this.hudContainer.add(textoPuntos);
    this.hudContainer.add(this.puntaje);
    this.hudContainer.add(this.cronometro);

//creacion de hud de mochila donde iran los items recogidos

  // this.hudMochila(this);

}
//donde muestra los items recolectados
    hudMochila(scene){
  this.hudBackgroundMochila= this.add.rectangle(0,0,200,200,0x000000,0.5)
    .setOrigin(0)
    .setStrokeStyle(2,0xffffff);
   this.hudContainerMochila=scene.add.container(this.widthPantalla-this.hudBackgroundMochila.width-1,0).setScrollFactor(0);
   

    this.tituloMochilaItems=this.add.text(16,16,"Organica Inorganica",{
      fontFamily:this.fontText
    }).setOrigin(0);

    //Aqui se agrega la cantidad de items de cada tipo y categoria
    this.hudContainerMochila.add(this.hudBackgroundMochila);
    this.hudContainerMochila.add(this.tituloMochilaItems);

    let ajustadorAltura=0
    let ajustadorAnchura=0;

      this.itemsOrganicos.map(item=>{

        
      this.hudContainerItemCantidadMochilaOrganica=scene.add.container(0,this.tamañoTextoStandard+10+ajustadorAltura);

        ajustadorAltura+=this.tamañoTextoStandard+10;
      const imageItem="item_basura"+item.id;
     
      
      let hudCantidadTexto=this.add.text(this.tamañoTextoStandard,this.tamañoTextoStandard, item.cantidad+" x ",{
        fontFamily:this.fontText
      })
      .setOrigin(0);

      
      let hudImagenItem=this.add.image(hudCantidadTexto.width+10,hudCantidadTexto.height-3,imageItem)
      .setOrigin(0)
      .setDisplaySize(this.tamañoImagenItemStandard,this.tamañoImagenItemStandard);

      

      
         //aqui se agregan
      this.hudContainerItemCantidadMochilaOrganica.add(hudCantidadTexto);
      this.hudContainerItemCantidadMochilaOrganica.add(hudImagenItem);

      this.hudContainerMochila.add(this.hudContainerItemCantidadMochilaOrganica);

      ajustadorAnchura=(hudCantidadTexto.width+hudImagenItem.displayWidth+30);
      //-----------------------
      });

      

      ajustadorAltura=0;

      this.itemsInorganicos.map(item=>{

        
      let hudContainerItemCantidadMochilaInorganica=scene.add.container(ajustadorAnchura,this.tamañoTextoStandard+10+ajustadorAltura);

        ajustadorAltura+=this.tamañoTextoStandard+10;
      const imageItem="item_basura"+(parseInt(item.id)+6);
     
      
      let hudCantidadTexto=this.add.text(this.tamañoTextoStandard,this.tamañoTextoStandard, item.cantidad+" x ",{
        fontFamily:this.fontText
      })
      .setOrigin(0);
      let hudImagenItem=this.add.image(hudCantidadTexto.width+10,hudCantidadTexto.height-3,imageItem).setOrigin(0);
      hudImagenItem.setDisplaySize(this.tamañoImagenItemStandard,this.tamañoImagenItemStandard);
         //aqui se agregan
      hudContainerItemCantidadMochilaInorganica.add(hudCantidadTexto);
      hudContainerItemCantidadMochilaInorganica.add(hudImagenItem);

      this.hudContainerMochila.add(hudContainerItemCantidadMochilaInorganica);

      //-----------------------
      });

      this.hudContainerMochila.visible=false;

        this.hudBotonMochila=this.add.image(0,0,'mochila')
        .setOrigin(0)
        .setAlpha(0.5)
        //.setScale(0.5)
        .setDisplaySize(50,50)
        .setInteractive()
        .setScrollFactor(0);

      
        this.hudBotonMochila.setPosition(this.widthPantalla-60,10);

        
         this.hudBotonMochila.on('pointerdown', () => {this.hudContainerMochila.visible=true; this.hudBotonMochila.setAlpha(0)});
         this.hudBotonMochila.on('pointerup',   () => {this.hudContainerMochila.visible=false; this.hudBotonMochila.setAlpha(0.5)} );


      this.input.on('pointerup', () => {
  this.hudContainerMochila.visible=false;
  this.hudBotonMochila.setAlpha(0.5) 
      });

      this.input.keyboard.on('keydown-M', () => {
       // console.log("Presionado M")
    this.hudContainerMochila.visible = true;
    this.hudBotonMochila.setAlpha(0);
});

this.input.keyboard.on('keyup-M', () => {
    this.hudContainerMochila.visible = false;
    this.hudBotonMochila.setAlpha(0.5);
});





}
//donde muestra los puntos acumulados
    hudPuntos(textoPuntos){
  
    this.puntaje= this.add.text(16,16,this.puntos,{
        fontSize: '15px',
        fontFamily:this.fontText,
        fill: '#fff'

    }).setPosition(textoPuntos.x+textoPuntos.width+10,textoPuntos.y);
}
//donde muetra el cronometro
    hudCronometro(){
  

    //CREAR HUD de tiempo
    this.cronometro= this.add.text(16,16,'Tiempo: '+this.tiempo,{
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
    this.cronometro.setText('Tiempo: ' + this.tiempo);//}
  },
  loop: true
});

    this.cronometro.setPosition(this.puntaje.width+this.puntaje.x+20, this.puntaje.height);
}


//IR al siguiente escenario
finalizarPartida(n=""){

    console.log(this.scene);
    console.log("MENSAJE: "+n);
  this.musicaFondo.stop();
  this.scene.stop('StartGame');
  this.scene.restart();
  this.scene.start('FinPartida',{puntos:this.puntos,mensaje:n});

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

      this.golpeEnemie=this.sound.add("golpeEnemie",{
        loop:false,
        volume:1
      });

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

    

//El create es donde acomo las cosas para que tengan un orden
create(){

  
//esto sirve para que se vean las colisiones de los sprites para testear (cuadro morado)
//this.physics.world.createDebugGraphic();
this.game.renderer.antialias = false;

    

  
    
    //Generacion de escenario
    this.crearEscenario();
    this.cargarSonido();
    
    //cantidad de items a crear
    this.crearItems(10);//aqui puedo agregar la cantidad de items que quiero crear


    //crear personaje



    //this.crearEdificios();  
    //this.crearArboles();
    



    
    this.cargarBotones();
    this.cargarJoystick();
    this.getPlayer();
    
    
  

    this.crearEnemigo(0);

    //colisiones en entre items
    this.crearColisiones();
  
    //this.depurarColisiones();

   //creacion de camara;

   this.crearCamera();

   //crear HUD
    this.crearHUD();

    //this.crearAnimaciones();
    
    
  
    

  

   
}


movimientoItemToPlayer(){



  this.items_punto.children.iterate(item=>{
    if(item.moveToPlayer){
      let velocidad=Math.floor(Math.random() * (500 - 300 + 1)) + 300;
   // scene.time.delayedCall(1000, () => {
    
    this.physics.moveToObject(item, this.player.getContainer(), velocidad);
    //});
    }

  });
}


//el update es todo lo que se corre en tiempo real
update(time, delta){

   
    //movimientos Jugador
    this.movimientosPlayer();
   // console.log(`X:${this.player.getPositionX()} Y:${this.player.getPositionY()}`)
    //moviemientos del enemigo
    this.movimientosEnemigo();
   //this.physics.moveToObject(this.enemie.getContainer(), this.player.getContainer(),200);

    this.movimientoItemToPlayer();


  
 



}
}