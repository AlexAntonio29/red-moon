import { DataComboEspada } from "../../player/combo/DataCombo.js";




export class cargarAssets{

    constructor(scene){
        this.scene=scene;

        this.cargarImagenes();
        this.cargarAnimaciones();
    }


    
        crearEfectos(){
       // this.scene.load.image("ataqueLateralAbajo","./assets/effect/ataqueLateralAbajo.png");
       // this.scene.load.image("ataqueLateralArriba","./assets/effect/ataqueLateralArriba.png");
       // this.scene.load.image("ataqueLateralDerecha","./assets/effect/ataqueLateralDerecha.png");
       // this.scene.load.image("ataqueLateralIzquierda","./assets/effect/ataqueLateralIzquierda.png");
    
         this.scene.load.spritesheet("ataqueLateralAbajo", "./assets/effect/ataqueLateralAbajo.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    
    this.scene.load.spritesheet("ataqueLateralArriba", "./assets/effect/ataqueLateralArriba.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    
    this.scene.load.spritesheet("ataqueLateralDerecha", "./assets/effect/ataqueLateralDerecha.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    
    this.scene.load.spritesheet("ataqueLateralIzquierda","./assets/effect/ataqueLateralIzquierda.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    
        }
    
        
      
        cargarAnimacionesPlayer(){
    
      this.scene.load.spritesheet("player", "./assets/player/Animations/Carry_Run/Run-lefth-right.png", {
     frameWidth: 64,
      frameHeight: 64
    });
    
    
      this.scene.load.spritesheet("player_walk_up", "./assets/player/Animations/Carry_Run/Carry_Run_Up-Sheet-Rev.png", {
     frameWidth: 64,
      frameHeight: 64
    });
    
      this.scene.load.spritesheet("player_walk_down", "./assets/player/Animations/Carry_Run/run_back.png", {
     frameWidth: 64,
      frameHeight: 64
    });
    
    this.scene.load.spritesheet("player_idle","./assets/player/Animations/Carry_Idle/Idle.png",{
      frameWidth: 64,
      frameHeight: 64
    })
    
    //ataque 
    
    this.scene.load.spritesheet(DataComboEspada[0].sprite,"./assets/player/Animations/attack/attack1.png",{
      frameWidth: 64,
      frameHeight: 64
    })
    
    this.scene.load.spritesheet(DataComboEspada[1].sprite,"./assets/player/Animations/attack/attack2.png",{
      frameWidth: 64,
      frameHeight: 64
    })
    
    this.scene.load.spritesheet(DataComboEspada[2].sprite,"./assets/player/Animations/attack/attack3.png",{
      frameWidth: 64,
      frameHeight: 64
    })
    
    
    this.scene.load.spritesheet("player_golpeado_espada","./assets/player/Animations/golpeado/golpeado_espada.png",{
      frameWidth: 64,
      frameHeight: 64
    });
    
    this.scene.load.spritesheet("player_dash_reverso","./assets/player/Animations/Dash/reverso.png",{
      frameWidth: 64,
      frameHeight: 64
    });
    
    this.scene.load.spritesheet("player_dash_adelante","./assets/player/Animations/Dash/adelante.png",{
      frameWidth: 64,
      frameHeight: 64
    });
    
    
    
    
    
    
    
    this.scene.load.spritesheet("player_golpeado_espada_arriba","./assets/player/Animations/golpeado/golpeado_espada_arriba.png",{
      frameWidth: 64,   
      frameHeight: 64
    });
    
        this.scene.load.spritesheet("player_heal", "./assets/player/Animations/heal/heal_animation.png", {
            frameWidth: 64, // Asumo 64 porque tus otros sprites usan ese tamaño
            frameHeight: 64
        });
    
    
    
    
        this.crearEfectos();
    
    
    
    
    
            }
    
        cargarImagenes(){
          
          //Agregar efectos
    
          
        
    
        //imagen mochila
        this.scene.load.image('mochila','./assets/mochilaInventario.png');
       // this.scene.load.image("croquis","./assets/croquis_escuela.png");
    
    
       //this.scene.load.image("player","./assets/player/Player.png");
          
    
    
       
    
       this.scene.load.image('tiles', './assets/[Base]BaseChip_pipo.png');
       this.scene.load.image('tiles2', './assets/[A]Grass_pipo.png');
       this.scene.load.tilemapTiledJSON('mapa', './assets/mapa_scene.json');
       
    
       //carga del mapa las coordenadas en archivo JSON
    
        this.scene.load.image('tiles_suelo_nexus','./assets/tiles_maps/nexus/asset_suelo_castillo.png');
        this.scene.load.tilemapTiledJSON('mapa_nexus','./assets/tiles_maps/nexus/base_nexus.json');
    
    
    
        //tiles de nexus personal cargar imagenes
        this.scene.load.image("baseMap","/assets/tiles_maps/nexus/BaseMap.png");
        this.scene.load.image("build","/assets/tiles_maps/nexus/mainlevbuild.png");
        this.scene.load.image("wall_Tiles","/assets/tiles_maps/nexus/Wall_Tiles.png");
    
    
        this.scene.load.image("a2-TerrainAndMisc","/assets/tiles_maps/Tiled/A2-TerrainAndMisc.png");
        this.scene.load.image("fantasy_Outside_A2","/assets/tiles_maps/Tiled/Fantasy_Outside_A2.png");
        this.scene.load.image("fantasy_Outside_A5","/assets/tiles_maps/Tiled/Fantasy_Outside_A5.png");
        this.scene.load.image("fantasy_Outside_D","/assets/tiles_maps/Tiled/Fantasy_Outside_D.png");
        this.scene.load.image("fantasy_Outside_A4","/assets/tiles_maps/Tiled/Fantasy_Outside_A4.png");
        this.scene.load.image("fantasy_Outside_B","/assets/tiles_maps/Tiled/Fantasy_Outside_B.png");//Fantasy_Outside_B
        this.scene.load.image("big_Decoration","/assets/tiles_maps/Tiled/Big_Decoration.png");//Big_Decoration
    
        this.scene.load.image("a4 - Walls","/assets/tiles_maps/Tiled/A4 - Walls.png");//Big_Decoration
        this.scene.load.image("a3 - Walls And Floors","/assets/tiles_maps/Tiled/A3 - Walls And Floors.png");//Big_Decoration
    
        
    
    
        //cargar el tiled
        this.scene.load.tilemapTiledJSON("nexus_mapa","./assets/tiles_maps/nexus/MapaNeexo.json")
        
    
    
    
    
        }
    
    
        cargarAnimacionesEnemigos(){
    
    
          //Idle
           this.scene.load.spritesheet('enemie1_idle', "./assets/enemies/enemie1/idle/idle.png", {
            frameWidth: 64,
            frameHeight: 64
            });
    
          //walk
            this.scene.load.spritesheet('enemie1_walk', "./assets/enemies/enemie1/walk/walk.png", {
            frameWidth: 64,
            frameHeight: 64
            });
    
    
            this.scene.load.spritesheet('enemie4_idle', "./assets/enemies/enemie4/idle/idle.png", {
            frameWidth: 64,
            frameHeight: 64
            });
    
          //walk
            this.scene.load.spritesheet('enemie4_walk', "./assets/enemies/enemie4/walk/walk.png", {
            frameWidth: 64,
            frameHeight: 64
            });
    
    
            this.scene.load.spritesheet('enemie5_idle', "./assets/enemies/enemie5/idle/idle.png", {
            frameWidth: 64,
            frameHeight: 64
            });
    
          //walk
            this.scene.load.spritesheet('enemie5_walk', "./assets/enemies/enemie5/walk/walk.png", {
            frameWidth: 64,
            frameHeight: 64
            });
    
            this.scene.load.spritesheet('enemie5_attack1', "./assets/enemies/enemie5/attack/attack1.png", {
            frameWidth: 64,
            frameHeight: 64
            });
    
    


            //Enemigos de fondo 

            //DRAGON

            this.scene.load.spritesheet('enemieF1', "./assets/enemies/fondo/dragon_rojo.png", {
            frameWidth: 768,
            frameHeight: 768
            });

    
          
        }
    
        cargarAnimacionesItems(){
    
              
    
          this.scene.load.spritesheet("item_punto","./assets/items/puntos/soul.png",{
            frameWidth: 32,
            frameHeight:32
          });
    
          this.scene.load.spritesheet("item_pocion","./assets/items/pocion/pocion.png",{
            frameWidth: 32,
            frameHeight:32
          });
    
            this.scene.load.spritesheet("item_pocion_vacio","./assets/items/pocion/pocion_vacio.png",{
            frameWidth: 32,
            frameHeight:32
          });
        }
    
        cargarAnimaciones(){
    
          this.cargarAnimacionesEnemigos();
    
          this.cargarAnimacionesPlayer();
    
          this.cargarAnimacionesItems();
          
    
    
    
    
        }
    
        crearJoystick(){
         
    
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.scene.load.plugin('rexvirtualjoystickplugin', url, true);
         
       
    
        }
    



}