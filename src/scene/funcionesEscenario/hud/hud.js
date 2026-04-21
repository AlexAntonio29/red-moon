import { ItemPocion } from "../../../items/extendsItems/ItemPocion.js";



export class hud{

    constructor(scene){

        this.scene=scene;



    }


    
    getBarraStamina(){
    
      //datos de player
      let stamina_player;
      if(this.scene.player.stamina>=0)
        stamina_player=this.scene.player.stamina;
      else stamina_player=0;
    
    
    
      if(this.scene.contenedorStamina) this.scene.contenedorStamina.destroy();
      this.scene.contenedorStamina=this.scene.add.container(0,0).setScrollFactor(0);
    
    
    
      if(this.scene.backgroundStamina) this.scene.backgroundStamina.destroy();
      this.scene.backgroundStamina=this.scene.add.rectangle(10,10+this.scene.backgroundVida.height+10,stamina_player,10,0x438E5B,1)//cambiar el tercer parametro por la vida del player
      .setOrigin(0)
    
        if(this.scene.backgroundStaminaCompleta) this.scene.backgroundStaminaCompleta.destroy();
      this.scene.backgroundStaminaCompleta=this.scene.add.rectangle(10,10+this.scene.backgroundVida.height+10,this.scene.player.staminaMax,10,0x90CBA3,1)//cambiar el tercer parametro por la vida del player
      .setOrigin(0)
      
     
      //cambiar despues el valor por uno que tome de la BD
    
      this.scene.contenedorStamina.add(this.scene.backgroundStaminaCompleta);
      this.scene.contenedorStamina.add(this.scene.backgroundStamina);
      this.scene.contenedorStamina.setDepth(20);
      this.scene.hudContainer.add(this.scene.contenedorStamina);
    
    
    
      
    }
    
    
    //GLOBAL
    getBarraVida(){
    
      //datos de player
      let vida_player
      if(this.scene.player)
        vida_player=this.scene.player.vida;
      else vida_player=250;
    
      if(this.scene.contenedorVida) this.scene.contenedorVida.destroy();
      this.scene.contenedorVida=this.scene.add.container(0,0).setScrollFactor(0);
    
    
    
      if(this.scene.backgroundVida) this.scene.backgroundVida.destroy();
      this.scene.backgroundVida=this.scene.add.rectangle(10,10,vida_player,10,0xFF0000,1)//cambiar el tercer parametro por la vida del player
      .setOrigin(0)
    
        if(this.scene.backgroundVidaCompleta) this.scene.backgroundVidaCompleta.destroy();
      this.scene.backgroundVidaCompleta=this.scene.add.rectangle(10,10,this.scene.player.vidaActualMax,10,0x9C2007,1)//cambiar el tercer parametro por la vida del player
      .setOrigin(0)
      
      //console.log(this.scene.player.vidaActualMax);
      //cambiar despues el valor por uno que tome de la BD
    
      this.scene.contenedorVida.add(this.scene.backgroundVidaCompleta);
      this.scene.contenedorVida.add(this.scene.backgroundVida);
      this.scene.contenedorVida.setDepth(20);
      this.scene.hudContainer.add(this.scene.contenedorVida);
      
      
    
    
    
      
    }
    
    //GLOBAL
    getCuraciones(){
      try{

        let pocionesMaximos=this.scene.player.cantidadPocionesMaximo;
      let pocionesDisponibles=this.scene.player.cantidadPociones;
    
      if(this.scene.contenedorPociones) this.scene.contenedorPociones.destroy();
        this.scene.contenedorPociones=this.scene.add.container(0,0).setScrollFactor(0);
    
        let width_pocion_position=10;
    
        
      
      for(let i=1;i<=pocionesMaximos;i++){
    
          let item;
          let height_pocion_position=this.scene.backgroundStamina.y+this.scene.backgroundStamina.height+10;
    
          if(pocionesDisponibles>=i){
            
            item=new ItemPocion(this.scene,null, null,25,25,0,0,"item_pocion",null);
            
            item.setItemPosition(width_pocion_position,height_pocion_position);
    
            width_pocion_position+=item.width+10;
            this.scene.contenedorPociones.add(item);
    
          }else{
            item=new ItemPocion(this.scene,null, null,25,25,0,0,"item_pocion_vacio",null);
            
            item.setItemPosition(width_pocion_position,height_pocion_position);

            width_pocion_position+=item.width+10;
            this.scene.contenedorPociones.add(item);
    
          }
          
          
    
      }
    
      this.scene.contenedorPociones.setDepth(20);
      this.scene.hudContainer.add(this.scene.contenedorPociones);
    

      }
      catch(e){
        console.log("Error");

        console.log(e);
          } 
    
    }
    crearHUD(){
        //CREAR HUD de Puntos
        this.scene.puntos=0;
    
        console.log("Dentro de HUD");
    
    //contenedor que sirve para acomodar todo en un solo item
      this.scene.hudContainer=this.scene.add.container(0,0).setScrollFactor(0);
    //Fondo semitransparente que servira para una mejor visualizacion
      this.scene.hudBackground= this.scene.add.rectangle(0,0,300,50,0x000000,0.5)
        .setOrigin(0)
        .setStrokeStyle(2,0xffffff);
    
    
        this.scene.getBarraVida();
        this.scene.getBarraStamina();
        this.scene.getCuraciones();
    
        
    
    
        this.scene.hudPuntos();
        this.scene.hudCronometro();
    
       
        this.scene.hudBackground.setPosition(this.scene.widthPantalla-this.scene.hudBackground.width,10);
    //union de los puntos y cronometro al background para que este todo junto
        this.scene.hudContainer.add(this.scene.hudBackground);
        this.scene.hudContainer.add(this.scene.contenedorPuntaje);
        //this.scene.hudContainer.add(this.scene.puntaje);
        this.scene.hudContainer.add(this.scene.cronometro);
        
    
        this.scene.hudContainer.setDepth(20);
    
    
    
    }
    //GLOBAL
    //donde muestra los puntos acumulados
    hudPuntos(){
    
           let textoPuntos= this.scene.add.text(16,16,"Esencia de luna roja ",{
            fontSize: '15px',
            fontFamily:this.scene.fontText,
            fill: '#fff'
    
        })
        
        
        ;
    
    
        textoPuntos.setPosition(this.scene.widthPantalla-this.scene.hudBackground.width,10);
    
        this.scene.contenedorPuntaje=this.scene.add.container(0,0).setScrollFactor(0);
      
        this.scene.puntaje= this.scene.add.text(16,16,this.scene.puntos,{
            fontSize: '15px',
            fontFamily:this.scene.fontText,
            fill: '#fff'
    
        }).setPosition(textoPuntos.x+textoPuntos.width+10,textoPuntos.y);
    
        this.scene.contenedorPuntaje.add(textoPuntos);
    
        this.scene.contenedorPuntaje.add(this.scene.puntaje);
    
    
    }
    //GLOBAL
    //donde muetra el cronometro
        hudCronometro(){
      
    
        //CREAR HUD de tiempo
        this.scene.cronometro= this.scene.add.text(16,16,'Reloj: '+this.scene.tiempo,{
            fontSize: '15px',
            fontFamily: this.scene.fontText,
            fill: '#fff'
        });
        
    
        this.scene.time.addEvent({
      delay: 1000, // cada 1000 ms = 1 segundo
      callback: () => {
        this.scene.tiempoProgresivo++;
    
        if(this.scene.tiempoProgresivo===this.scene.tiempoParaCrearEnemigos){
          this.scene.tiempoParaCrearEnemigos+=10;
          //this.scene.crearEnemigo(this.scene.topeCreacionEnemigos-this.scene.listaEnemigos.countActive(true));
    
          
         // console.log("Creando enemigos segun el tope: ");
    
        } 
    
    
        
       
        
    
        //if(this.scene.tiempo<=0) this.scene.finalizarPartida("Se agotó el tiempo");
        //else{
        this.scene.tiempo++;
        this.scene.cronometro.setText('Reloj: ' + this.scene.tiempo);//}
      },
      loop: true
    });
    
        this.scene.cronometro.setPosition(this.scene.puntaje.width+this.scene.puntaje.x+20, 10);
    }
    


}