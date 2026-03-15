
import {player} from "../player/player.js";
import {dataEnemigos} from "../enemies/DataEnemies.js"
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





export class StartGame extends Phaser.Scene{//cuando inicia la partida

    constructor(){
        super('StartGame');
        //console.log("Estoy en StartGame");

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

       // this.load.image("a4 - Walls","/assets/tiles_maps/Tiled/A4 - Walls.png");//Big_Decoration
    //this.load.image("a3 - Walls And Floors","/assets/tiles_maps/Tiled/A3 - Walls And Floors.png");

    



    this.fondo=this.map.createLayer('FONDO',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);

          this.subSuelo=this.map.createLayer('SUBSUELO',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);



    this._subSuelo=this.map.createLayer('_SUBSUELO',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);

    this.suelo=this.map.createLayer('SUELO', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]  
      ,0,0);

          this._suelo=this.map.createLayer('_SUELO', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);

      
          this._suelo2=this.map.createLayer('_SUELO-2', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);


          this._suelo3=this.map.createLayer('_SUELO-3', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);

                this._suelo4=this.map.createLayer('_SUELO-4', 
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);
    //this.detalles_piso=this.map.createLayer('DETAILS_PISO', this.tileset,0,0);SIN ADIGNAR ]



            this.above=this.map.createLayer('ABOVE',//TODO lo que esta encima del jugador pero sin collision
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
              
            ]
      ,0,0);


       this._above=this.map.createLayer('_ABOVE',//TODO lo que esta encima del jugador pero sin collision
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
              
            ]
      ,0,0);

             this._above2=this.map.createLayer('_ABOVE2',//TODO lo que esta encima del jugador pero sin collision
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);


                   this._above3_decoration=this.map.createLayer('_ABOVE3-DECORATION',//TODO lo que esta encima del jugador pero sin collision
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);

          this.above_collider=this.map.createLayer('ABOVE-COLLIDER',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);

                this._above_collider=this.map.createLayer('_ABOVE-COLLIDER',
            [this.tileset1,this.tileset2,this.tileset3,this.tileset4,this.tileset5, this.tileset6,this.tileset7
              ,this.tileset8,this.tileset9,this.tileset10
            ]
      ,0,0);








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
      this.above_collider.setPipeline('Light2D');
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


//METODOS DEL PLAYER


getPlayer(){

  let x=2585;
  let y=8500;
    this.player=new player(this, 'player',80,80,this.joystickCursors, this.controles, this.keys,this.listaEnemigos,this.lights,this.cameras.main);

    this.player.getContainer().setTint(0x555555);//para ver si se oscurece mas
    this.player.getContainer().setPipeline('Light2D');


    //curando

  

  

  

    this.player.setPositionInitial(x,y);

    this.lightToPlayer=this.lights.addLight(x, y, 350) .setColor(0xffaa00) .setIntensity(2);
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


     this.player.setMovimientoPlayer(this.contactoSprites[0],this.listaEnemigos,this.contactoSprites,this.items_punto);
    
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

      console.log("recuperando");

      this.player.stamina+=this.player.velocidad_recuperacion;


      this.getBarraStamina();
      
      if(this.player.stamina>=this.player.staminaMax){
        this.player.stamina=this.player.staminaMax;
        this.player.recuperando=false;
      }
    }

   



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
          empujar(enemigo.getContainer(),this.player.getContainer(),0,this.contactoSprites,this,700);//

          this.player.setVida(enemigo.dataEnemie.ataque); //desactivar para el contacto player enemigo


                this.physics.world.removeCollider(this.colisionEnemigoPlayer);
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





       if(objeto && this._above2){
  //above para que este encima del player
          if(this._above2.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this._above2.setCollisionByExclusion([-1]);
        this.physics.add.collider(objeto,this._above2,this.eliminarRebote,null,this);

        this._above2.setDepth(10);
        objeto.setDepth(5);



}



       if(objeto && this._above3_decoration){
  //above para que este encima del player
          if(this._above3_decoration.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this._above3_decoration.setCollisionByExclusion([-1]);
        this.physics.add.collider(objeto,this._above3_decoration,this.eliminarRebote,null,this);

        this._above3_decoration.setDepth(10);
        objeto.setDepth(5);



}


//generar depth a _suelo3






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

    }


    creacionEnemigosPosicionados(){

      this.crearEnemigo(1,2950,8600,1);//cantidad Enemigos, x, y ,tipo de enemigo

      //this.crearEnemigo(1,2150,4400,4);//cantidad Enemigos, x, y ,tipo de enemigo


    }

    crearEvento(x,y,width,height,tiempoEvento,tiempoTraslado, xadd,yadd, zoom=0.5,ocultarHUD ,accion,movePlayer){


      /*
      

       let x=4400;
       let y=8525;
       
       let width=400;
       let height=250;
      */

      
      let evento = new this.Scenario1Eventos(this,x,y,width,height,this.player.getContainer(),this.camera,this.lights, this.player);

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
      


    }

    cargarEvento(){
      //datos de eventos estos para comodidad del programador en agregar eventos se agregaran en variables
      let x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom, ocultarHUD,accion,movePlayer;
      x=4400;
      y=8425;
      width=400;
      height=250;
      tiempo=3000;
      tiempoTraslado=500;
      xAdicional=0;
      yAdicional=0;
      zoom=0.8;
      ocultarHUD=false;
      accion=1;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
      //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
      movePlayer=false;


      //this.crearEvento(4400,8425,400,250,3000,500,0,0,0.8);//positionx,positiony,widthEvento,heightEvento, tiempoEjecucion, tiempoTrasladoCamara, xAdicional, yAdicional,zoom
      this.crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer);

      //cuando se va a agregar un nuevo elemento entoces se establecen valores variables;

}
    

//El create es donde acomo las cosas para que tengan un orden
create(){

  
//esto sirve para que se vean las colisiones de los sprites para testear (cuadro morado)
//this.physics.world.createDebugGraphic();
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


  
 



}
}