import { evento_palanca1_1 } from "../../eventos/EventosEstaticos/palanca/Scenario1/evento_palanca1_1.js";

export class Palanca extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x,y,id,idPuerta){
        super(scene,x,y,'palanca');

        this.id=id;
        this.scene=scene;
        this.idPuerta=idPuerta;
        this.esActivado=(scene.dataGuardadoRanura!==null)?
        scene.dataGuardadoRanura[scene.ranura].palanca[id].esActivado
        :false;//JSON


        scene.add.existing (this);

        scene.physics.add.existing(this);

        this.quitarMovimiento(this.body);
        this.cargarAnimaciones();

        this.hitbox=scene.add.zone(x,y,40,48)
        scene.physics.add.existing(this.hitbox);
        this.hitbox.body.setAllowGravity(false);
        this.hitbox.setOrigin(0.5,0.5);
        //this.hitbox.body.setSize(50,60);
        this.hitbox.body.setOffset(0,0);
        this.quitarMovimiento(this.hitbox.body);



        if(this.esActivado){
            
            this.activar(scene.blockLayer);
            this.play("palanca_activada");

        }else{
            this.play("palanca_desactivada");

        }

        this.getEvento();

    }


    getEvento(){

        switch(this.id){
            case 0:
            this.evento=new evento_palanca1_1(this.scene,this);
            
            break
        }

    }






    quitarMovimiento(body){
        body.moves=false;
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.pushable = false;
        body.setMass(Number.MAX_VALUE);

    }

    cargarAnimaciones(){
        this.scene.anims.create({
        key: "palanca_activada",
        frames: this.scene.anims.generateFrameNumbers('palanca', { start: 2, end: 2 }),
        frameRate: 5,
        repeat: 0
          
        });

            this.scene.anims.create({
        key: "palanca_desactivada",
        frames: this.scene.anims.generateFrameNumbers('palanca', { start: 0, end: 0 }),
        frameRate: 5,
        repeat: 0
          
        });

        this.scene.anims.create({
        key: "palanca_move",
        frames: this.scene.anims.generateFrameNumbers('palanca', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: 0
          
        });
    }


    eventoSecundario(eventos){//solo si hace algo adicional a parte de desactivar una colision

        switch(this.id){
            case 0:
               eventos.children.iterate(evento=>{
              if(evento.id===3){
                evento.esActivo=true;
              }
            });


            break;

            default:
                break;
        }
    }

    activarSonido(){
            this.scene.sound.add("palanca",{
              loop:false,
              volume:0.5
            }).play();

            this.scene.time.delayedCall(500,()=>{
            this.scene.sound.add("puerta_cadena",{
              loop:false,
              volume:0.5
            }).play();
            })


            //this.esActivado=true;
    }

    activarAnimacion(){
        
        console.log("Palanca Activado");
        this.play("palanca_move");

    }


    activar(capa){
        
        capa.forEachTile(tile=>{



              if(tile.index!==-1 && tile.properties.idItem===this.idPuerta){
            
                capa.removeTileAt(tile.x, tile.y);
              }

               
            });

            this.evento.activar();
            //this.eventoSecundario(eventos)
            this.esActivado=true;


        


       



    }



}