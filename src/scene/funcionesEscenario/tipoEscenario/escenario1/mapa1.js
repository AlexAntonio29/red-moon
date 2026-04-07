
export class mapa1 {

    constructor(scene){
        this.scene=scene;   
        console.log('Seleccionado mapa 1'); 
    }


    crearEscenario(){
     
        //this.scene.escenario=scene.add.image(0,0,'croquis');
        //this.scene.escenario.setOrigin(0);
        //this.scene.scene.setDisplaySize(this.scene.scale.width,this.scene.scale.height);
    
        //console.log(this.scene.escenario);
    
       //Dimensiones del mapa
        this.scene.map= this.scene.make.tilemap({ key: "nexus_mapa" });
        this.scene.widthEscenario=this.scene.map.widthInPixels;
        this.scene.heightEscenario=this.scene.map.heightInPixels;
    
        
    
    
    
        //console.log(`width:${this.scene.widthEscenario} height:${this.scene.heightEscenario}`);
    
        this.scene.tileset1 = this.scene.map.addTilesetImage('BaseMap', 'baseMap');
        this.scene.tileset2 = this.scene.map.addTilesetImage('Fantasy_Outside_A5', 'fantasy_Outside_A5');//48
        this.scene.tileset3 = this.scene.map.addTilesetImage('A2-TerrainAndMisc', 'a2-TerrainAndMisc');//48
        this.scene.tileset4 = this.scene.map.addTilesetImage('Fantasy_Outside_A2', 'fantasy_Outside_A2');//48
        this.scene.tileset5 = this.scene.map.addTilesetImage('Fantasy_Outside_D', 'fantasy_Outside_D');//48
        this.scene.tileset6 = this.scene.map.addTilesetImage('Fantasy_Outside_A4', 'fantasy_Outside_A4');//Fantasy_Outside_A4
        this.scene.tileset7 = this.scene.map.addTilesetImage('Fantasy_Outside_B', 'fantasy_Outside_B');
        this.scene.tileset8 = this.scene.map.addTilesetImage('Big_Decoration', 'big_Decoration');//Big_Decoration
        this.scene.tileset9 = this.scene.map.addTilesetImage('A4 - Walls', 'a4 - Walls');
        this.scene.tileset10 = this.scene.map.addTilesetImage('A3 - Walls And Floors', 'a3 - Walls And Floors');//Big_Decoration
        this.scene.tileset11 = this.scene.map.addTilesetImage('antorcha_sheet', 'antorcha_sheet');//Big_Decoration
        this.scene.tileset12 = this.scene.map.addTilesetImage('portal_inactivo', 'portal_inactivo');//portal
        this.scene.tileset13 = this.scene.map.addTilesetImage('objeto_llave_basica', 'objeto_llave_basica');//item_llave
        this.scene.tileset14 = this.scene.map.addTilesetImage('bloqueo_puerta', 'bloqueo_puerta');//puerta bloqueo
    
        this.scene.tileset15 = this.scene.map.addTilesetImage('Gate_Wood1', 'Gate_Wood1');
        this.scene.tileset16 = this.scene.map.addTilesetImage('Fantasy_door1', 'Fantasy_door1');
        this.scene.tileset17 = this.scene.map.addTilesetImage('Fantasy_door2', 'Fantasy_door2');
        this.scene.tileset18 = this.scene.map.addTilesetImage("Fantasy_switches","Fantasy_switches");
    
    
        
           // this.scene.load.image("a4 - Walls","/assets/tiles_maps/Tiled/A4 - Walls.png");//Big_Decoration
        //this.scene.load.image("a3 - Walls And Floors","/assets/tiles_maps/Tiled/A3 - Walls And Floors.png");
    
        
    
    
    
        this.scene.fondo=this.scene.map.createLayer('FONDO',
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
              this.scene.subSuelo=this.scene.map.createLayer('SUBSUELO',
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
    
    
        this.scene._subSuelo=this.scene.map.createLayer('_SUBSUELO',
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
        this.scene.suelo=this.scene.map.createLayer('SUELO', 
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]  
          ,0,0);
    
              this.scene._suelo=this.scene.map.createLayer('_SUELO', 
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
          
              this.scene._suelo2=this.scene.map.createLayer('_SUELO-2', 
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
    
              this.scene._suelo3=this.scene.map.createLayer('_SUELO-3', 
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
                    this.scene._suelo4=this.scene.map.createLayer('_SUELO-4', 
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
        //this.scene.detalles_piso=this.scene.map.createLayer('DETAILS_PISO', this.scene.tileset,0,0);SIN ADIGNAR ]
    
    
    
    
    
                  this.scene.above_collider=this.scene.map.createLayer('ABOVE-COLLIDER',
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
    
              this.scene.blockLayer = this.scene.map.createLayer('BLOCK', 
                  [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ], 
                  0, 0
              );
    
    
              this.scene.blockAbove = this.scene.map.createLayer('BLOCK-ABOVE', 
                  [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ], 
                  0, 0
              );
    
    
    
    
                    this.scene._above_collider=this.scene.map.createLayer('_ABOVE-COLLIDER',
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
    
                    
    
    
    
    
                      this.scene.above=this.scene.map.createLayer('ABOVE',//TODO lo que esta encima del jugador pero sin collision
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                  
                ]
          ,0,0);
    
    
                      this.scene._above=this.scene.map.createLayer('_ABOVE',//TODO lo que esta encima del jugador pero sin collision
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                  
                ]
          ,0,0);
    
    
                             this.scene._above2=this.scene.map.createLayer('_ABOVE2',//TODO lo que esta encima del jugador pero sin collision
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
    
          
                      this.scene._above3_decoration=this.scene.map.createLayer('_ABOVE3-DECORATION',//TODO lo que esta encima del jugador pero sin collision
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
    
          this.scene._above4_antorcha=this.scene.map.createLayer('_ABOVE4-ANTORCHA',//las antorchas
                [this.scene.tileset1,this.scene.tileset2,this.scene.tileset3,this.scene.tileset4,this.scene.tileset5, this.scene.tileset6,this.scene.tileset7
                  ,this.scene.tileset8,this.scene.tileset9,this.scene.tileset10,this.scene.tileset11,this.scene.tileset12,this.scene.tileset13,this.scene.tileset14,this.scene.tileset15,this.scene.tileset16,this.scene.tileset17
                  ,this.scene.tileset18
                
                ]
          ,0,0);
    
    
    
    
    
    
    
    
    
          //_ABOVE4-ANTORCHA
    
       
    
     
    
      
          
    
    
    
    
          //ANIMAR OBJETOS DE TILED
          this.scene.sys.animatedTiles.init(this.scene.map);
    
          //crear luces para cada antorcha
    
      
        this.scene._above4_antorcha.forEachTile(tile=>{
    
          if(tile.index!==-1){
           const x=tile.getCenterX();
           const y=tile.getCenterY();
           this.scene.listaLucesObjetos.push
           (this.scene.lights.addLight(x, y, 350) .setColor(0xffaa00) .setIntensity(1));
            
    
          }
        })
    
    
        //aqui se evalua el objeto para crear una llave y almacenarlo
    
        let idLlave=0;
       
    
    
            this.scene.blockLayer.forEachTile(tile=>{
    
          if(tile.index!==-1&& 
            (tile.properties.tipoBloqueo==="recoger_item")&&
            (tile.properties.idItem==="llave_01")){
            
            console.log(tile.layer.id);
            
            
           const x=tile.getCenterX();
           const y=tile.getCenterY();
           const luzLlave= this.scene.lights.addLight(x, y, 50) .setColor(0xffffff) .setIntensity(1);
    
            
           
            const recogido=(this.scene.dataGuardadoRanura)?
            this.scene.dataGuardadoRanura[this.scene.ranura].llaves[idLlave].recogido
            :false;//evaluar con JSON
    
            if(recogido){
              this.scene.map.removeTileAt(tile.x, tile.y, true, true, this.scene.blockLayer);
              this.scene.lights.removeLight(luzLlave);
            }
    
            this.scene.listaLlaves.push({
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
    
              if(this.scene.listaPuertasAbiertas.find((t)=>(
                t.x===tile.x&&
                t.y===tile.y&&
                t.nameScene===this.scene.nameScene
              
              )))
              this.scene.abrirPuertaCompleta(tile,this.scene.blockLayer);
              console.log("abrir");
              
            }
    
    
    
        });
    
        this.scene.blockAbove.forEachTile(tile=>{
    
          if(tile.index!==-1){
    
            if(this.scene.listaPuertasAbiertasAbove.find((t)=>(
                t.x===tile.x&&
                t.y===tile.y&&
                t.nameScene===this.scene.nameScene
            ))){
              this.scene.abrirPuertaCompleta(tile,this.scene.blockAbove);
            }
    
          }
        });
    
    
    
    
    
    
    
    
    
        //crear contacto con collision
        //this.scene._above3_decoration.setCollisionByExclusion([-1]);
    
    
    
    
    
        
    
          
    
    
    
    
    
    
    
    
    // Mantenemos tu sistema de luces
         this.scene.blockLayer.setPipeline('Light2D');
          //agregar luces los mapas
    
    
          this.scene.fondo.setPipeline('Light2D');
          this.scene.subSuelo.setPipeline('Light2D');
          this.scene._subSuelo.setPipeline('Light2D');
          this.scene.suelo.setPipeline('Light2D');
          this.scene._suelo.setPipeline('Light2D');
          this.scene._suelo2.setPipeline('Light2D');
          this.scene._suelo3.setPipeline('Light2D');
          this.scene._suelo4.setPipeline('Light2D');
          this.scene.above.setPipeline('Light2D');
          this.scene._above.setPipeline('Light2D');
          this.scene._above2.setPipeline('Light2D');
          this.scene._above3_decoration.setPipeline('Light2D');
          this.scene._above4_antorcha.setPipeline('Light2D');
          this.scene.above_collider.setPipeline('Light2D');
    
          this.scene.blockLayer.setPipeline('Light2D');
          this.scene.blockAbove.setPipeline('Light2D');
    
          this.scene._above_collider.setPipeline('Light2D');
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        this.scene.physics.world.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
        this.scene.cameras.main.setBounds(0,0,this.scene.map.widthInPixels,this.scene.map.heightInPixels);
    
    
    
    
      // Este nombre debe coincidir con el nombre del tileset dentro de Tiled
      //const tileset = map.addTilesetImage('[Base]BaseChip_pipo', 'tiles');
    
      // Crear capa (usa el nombre de la capa en Tiled)
      //const fondo = map.createLayer('Fondo', tileset, 0, 0);
    
       console.log('mapa 1 cargado');
    
    }




}

