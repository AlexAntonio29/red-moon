
import { conjuntoArmas } from "../../armas/conjuntoArmas.js"
import {puntos, itemsConsumibles} from "../../items/DataItemsPuntos.js";
import { Scenario1Eventos } from "../../eventos/Scenario1Eventos.js";
import { cargarLucesEstaticas } from "../../funciones/cargarLucesEstaticas.js";
import { dataNpc } from "../../npc/dataNpc.js";
import { dataBosses } from "../../bosses/dataBosses.js";
import { GuardarEnStorage } from "../../funciones/GuardarEnStorage.js";




export class cargarVariablesGlobales{


    constructor(scene){

        this.scene=scene;

        this.cargarVariablesGlobales();


    }


        cargarBotonesTeclas(){  
          this.scene.controles = {
      ataque:false
    };
    
    
        }
        crearJoystick(){
         
    
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.scene.load.plugin('rexvirtualjoystickplugin', url, true);
         
       
    
        }
    
        cargarTeclar(){
           this.scene.keys = this.scene.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
        ESC: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
        J: Phaser.Input.Keyboard.KeyCodes.J,//golpear
        V: Phaser.Input.Keyboard.KeyCodes.V,//vida
        E: Phaser.Input.Keyboard.KeyCodes.E//interaccion
    });
        }

 
        crearArchivoLuces(){

          //this.scene.lucesEstaticas=cargarLucesEstaticas();
        }


        crearData(){
          this.scene.dataNpc=dataNpc;

          this.scene.dataBosses= dataBosses;
        }

        cargarGruposObjetos(){

              
       this.scene.listaRelojes=this.scene.physics.add.group();
    
       this.scene.listaEnemigos=this.scene.physics.add.group();

       this.scene.listaNpc=this.scene.physics.add.group();

       this.scene.listaLucesObjetos=[];

       this.scene.listaCheckpoints=this.scene.physics.add.group();

       this.scene.listaPalancas=this.scene.physics.add.group();

       this.scene.listaJefes=this.scene.physics.add.group();

       this.scene.listaEventos=this.scene.physics.add.group();

       this.scene.listaLlaves=[];

       this.scene.listaPuertasAbiertas=(this.scene.dataGuardadoRanura!==null)?
       this.scene.dataGuardadoRanura[this.scene.ranura].puertasAbiertas
       :[];

       this.scene.listaPuertasAbiertasAbove=(this.scene.dataGuardadoRanura!==null)?
       this.scene.dataGuardadoRanura[this.scene.ranura].puertasAbiertasAbove
       :[]


       this.scene.listaEventosCondicionales=this.scene.physics.add.group();

        }


    cargarVariablesGlobales(){


      //AQUI ESTA LA VARIABLE GENERAL DE LA BD DONDE PODRAS OBTENER LOS DATOS GUARDADOS EN EL JSON
      //por el momento ocupare la ranuera 1 despues la cambio para que reciba segun la ranura que manda el menu principal
        this.scene.ranura=0;
        this.scene.dataGuardadoRanura=GuardarEnStorage(this.scene.ranura,null);

        this.scene.tipoEscenario=1;//aqui es dependiendo de que escenario quiere cargar desde el menu

        

          //cargar scenario Eventos


          this.scene.Scenario1Eventos=Scenario1Eventos;
    
          this.scene.tiempo=0;
          this.scene.tiempoProgresivo=0;//el tiempo progresivo sirve para llevar el tiempo siempre adelante
          this.scene.tiempoParaCrearEnemigos=0;
    
    
          //collisiones
    
          this.scene.colisionEnemigoPlayer ;
    
         
          //agregar arma
          this.scene.armas=new conjuntoArmas().getArmas();
    
          this.scene.itemsOrganicos=puntos.map(a => ({ ...a }));
          this.scene.itemsInorganicos=itemsConsumibles.map(a => ({ ...a }));
    
          
    
          //fuente del texto
    
          this.scene.fontText='FontArcade4';
       // console.log("Preload "+this.scene.scene.key);
          this.scene.widthPantalla=this.scene.sys.game.config.width;
          this.scene.heightPantalla=this.scene.sys.game.config.height;
    
        this.scene.widthEscenario=0;
        this.scene.heightEscenario=0;
    
        this.scene.tamañoTextoStandard=16;
        this.scene.tamañoImagenItemStandard=25;
    
    
        this.scene.contactoSprites=[
           false//Contacto de enemigo con player
          ,false//Contacto de ataque con enemigo
          ,false//Contacto de enemigo con enemigo
        ];
    
        this.scene.estaAtacando=false;//esto me sirve para generar una condicional de tiempo de ataque asi no genera errores
    
         this.scene.cantidadRelojes=0;
         //relojes



       
    
        
        this.scene.puntosCreacionEnemigo=0;
        this.scene.topeCreacionEnemigos=0;
    
        this.scene.getPotenciadorPuntos=0;
        this.scene.puntosPotenciadorAcumulador=1;
    
        this.scene.items_punto=this.scene.physics.add.group();



        
      this.cargarGruposObjetos();

      this.crearJoystick();
      this.cargarTeclar();

      this.cargarBotonesTeclas();

        this.crearArchivoLuces();

        this.crearData();

        }
}