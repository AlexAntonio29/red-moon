
export class cargarSonido{

    constructor(scene){

        this.scene=scene


        this.crearSonidos();
    }

    
    
        
            cargarSonidosEnemigos(){
        
        
              //Enemigo5
        
               this.scene.load.audio("enemie5_sonido","./sounds/enemigo/enemie5/general/sonido.mp3");
        
               this.scene.load.audio("enemie1_sonido","./sounds/enemigo/enemie1/general/sonido.mp3");
        
               this.scene.load.audio("enemie4_sonido","./sounds/enemigo/enemie4/general/sonido.mp3");



               //enemigos fondo 


               this.scene.load.audio("skyF1","./sounds/enemigo/fondo1/f1/sky.mp3");
               this.scene.load.audio("roarF1","./sounds/enemigo/fondo1/f1/roar.mp3");

        
        
        
            }
        
            crearSonidos(){
              //sonido items basura
             /* for(let i=1;i<=10;i++){
                this.scene.load.audio('pop'+i,"./sounds/pop"+i+".mp3");
                this.scene.load.audio('ataque'+i,"./sounds/ataque"+i+".mp3");
              
              }*/
        
             // this.scene.sonidoAtaquePlayer;
              
              //cargar sonidos de ataque
             this.scene.load.audio("ataque1","./sounds/player/atacando/ataque_espada.mp3");
             this.scene.load.audio("ataque2","./sounds/player/atacando/ataque_espada2.mp3");
             this.scene.load.audio("ataque3","./sounds/player/atacando/ataque_espada3.mp3");
             this.scene.load.audio("ataque5","./sounds/player/atacando/ataque_espada_cargado.mp3");
        
        
              this.scene.load.audio("health","./sounds/player/health/health.mp3");
             //sonido de puntos
             this.scene.load.audio("point1","./sounds/general/points/sound1.mp3");
             this.scene.load.audio("point2","./sounds/general/points/sound2.mp3");
             this.scene.load.audio("point3","./sounds/general/points/sound3.mp3");
             
        
        
        
              
        
              this.scene.load.audio("powerUp","./sounds/powerUp.mp3");
        
              this.scene.load.audio("fondoStart","./sounds/level/nexus/soundtrack.wav");
        
              this.scene.load.audio("pisada_player_tierra","./sounds/general/pisadas/tierra/pisadas.wav");
        
              this.scene.load.audio("potenciador","./sounds/woo.mp3");
        
              this.scene.load.audio("touch","./sounds/touch.mp3");
        
              this.scene.load.audio("atacado_espada","./sounds/enemigo/general/atacado_espada.mp3");
        
              this.scene.load.audio("golpeToPlayer","./sounds/player/atacado/ataque.mp3");
        
              this.scene.load.audio("reloj","./sounds/reloj.mp3");
        
        
              this.scene.load.audio("slide","./sounds/general/slide/slide.mp3");
        
        
              this.cargarSonidosEnemigos();
              
            }
        
}