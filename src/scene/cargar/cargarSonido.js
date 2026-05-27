
export class cargarSonido{

    constructor(scene){

        this.scene=scene


        this.crearSonidos();
    }

    
        cargarSonidoBosses(){
          this.scene.load.audio('boss1_sonido','./sounds/bosses/boss1/boss1_sonido.mp3');
          this.scene.load.audio('boss_soundtrack','./sounds/bosses/boss1/soundtrack.mp3');
          this.scene.load.audio('boss_scream','./sounds/bosses/boss1/scream.mp3');

          this.scene.load.audio('boss_attack1','./sounds/bosses/boss1/attack1.mp3');
          this.scene.load.audio('boss_attack3','./sounds/bosses/boss1/attack3.mp3');
          this.scene.load.audio('boss_attack4','./sounds/bosses/boss1/attack4.mp3');
    

          this.scene.load.audio('boss_evento1','./sounds/bosses/boss1/evento1_boss1.mp3');
          this.scene.load.audio('boss_evento2','./sounds/bosses/boss1/evento2_boss1.mp3');
          this.scene.load.audio('boss_evento3','./sounds/bosses/boss1/evento3_boss1.mp3');

          this.scene.load.audio('boss_gritoNpc1','./sounds/bosses/boss1/gritoNpc.mp3');
          this.scene.load.audio('boss_gritoNpc2','./sounds/bosses/boss1/gritoNpc2.mp3');

          this.scene.load.audio('boss_huesos_rompiendose','./sounds/bosses/boss1/huesos_rompiendose.mp3');
          this.scene.load.audio('boss_huesos_rompiendose2','./sounds/bosses/boss1/huesos_rompiendose2.mp3');

          this.scene.load.audio('boss_choque','./sounds/bosses/boss1/choque.mp3');

          this.scene.load.audio('boss_walk','./sounds/bosses/boss1/walk.mp3');
          this.scene.load.audio('vidrio','./sounds/bosses/boss1/vidrio.mp3');
          this.scene.load.audio('boss_blood','./sounds/bosses/boss1/blood.mp3');







        }
    
        
            cargarSonidosEnemigos(){
        
        
              //Enemigo5
        
               this.scene.load.audio("enemie5_sonido","./sounds/enemigo/enemie5/general/sonido.mp3");
        
               this.scene.load.audio("enemie1_sonido","./sounds/enemigo/enemie1/general/sonido.mp3");
        
               this.scene.load.audio("enemie4_sonido","./sounds/enemigo/enemie4/general/sonido.mp3");



               //enemigos fondo 


               this.scene.load.audio("skyF1","./sounds/enemigo/fondo1/f1/sky.mp3");
               this.scene.load.audio("roarF1","./sounds/enemigo/fondo1/f1/roar.mp3");


               //enemigo f1

               this.scene.load.audio("roarF2","./sounds/enemigo/fondo2/f2_roar.mp3");
               this.scene.load.audio("sismoF2","./sounds/enemigo/fondo2/f2_sismo.mp3");
        
        
        
            }


            cargarSonidosNpc(){
              this.scene.load.audio('npc2_llorando','./sounds/npc/npc2/npc2_llorando.mp3');
              // 2. Mago (npc3) - Ruta exacta paso a paso
   // 2. Mago (npc3) - Usando EXACTAMENTE el nombre de tu carpeta y archivo en Windows
    this.scene.load.audio('musica_mago', './assets/npc/npc3/Sonido/Ambientacion.mp3');
    
    // 3. Sonido de habla general - Usando EXACTAMENTE el nombre de tu carpeta y archivo
this.scene.load.audio('sonido_habla_npc', './assets/npc/npc3/Sonido/sonido_para_hablar.wav');}

            crearSonidosRecuerdos(){
              this.scene.load.audio("flashback","./sounds/general/recuerdos/flashback.mp3");
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
        
              //SONIDOS PISADAS
              this.scene.load.audio("pisada_player_tierra","./sounds/general/pisadas/tierra/pisadas.wav");
              this.scene.load.audio("pisada_player_concreto_azul","./sounds/general/pisadas/concreto_azul/pisadas.wav");
              this.scene.load.audio("pisada_player_pasto","./sounds/general/pisadas/pasto/pisadas.wav");
              this.scene.load.audio("pisada_player_concreto","./sounds/general/pisadas/concreto/pisadas.wav");
              

              

              //+++++
        
              this.scene.load.audio("potenciador","./sounds/woo.mp3");
        
              this.scene.load.audio("touch","./sounds/touch.mp3");
        
              this.scene.load.audio("atacado_espada","./sounds/enemigo/general/atacado_espada.mp3");
        
              this.scene.load.audio("recoger_item","./sounds/general/recoger/recoger_item.mp3")
              this.scene.load.audio("palanca","./sounds/general/palanca/palanca.mp3");
              this.scene.load.audio("puerta_cadena","./sounds/general/abrir_puerta_cadena/abrir_puerta_cadena2.mp3")
              this.scene.load.audio("golpeToPlayer","./sounds/player/atacado/ataque.mp3");
        
              this.scene.load.audio("reloj","./sounds/reloj.mp3");
        
        
              this.scene.load.audio("slide","./sounds/general/slide/slide.mp3");
              this.scene.load.audio("puerta_abriendose","./sounds/general/puerta/puerta_abriendose.mp3")

              this.scene.load.audio("suspenso","./sounds/evento/momentoSuspenso/suspenso.mp3");

              this.scene.load.audio("soundCheckpoint","./sounds/checkpoint/sound.mp3");



              
        
        
              this.cargarSonidosEnemigos();

              this.crearSonidosRecuerdos();

              this.cargarSonidosNpc();
              this.cargarSonidoBosses();
              
            }
        
}