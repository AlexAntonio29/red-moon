
export class Eventos extends Phaser.Physics.Arcade.Image{

    

    constructor(scene, x,y,width,height,player, camera,lights,playerAtributos){



        super(scene,0,0,null);

        
        scene.add.existing(this)
        scene.physics.add.existing(this);
        
        

         

        this.x=x;
        this.y=y;
        this.camera=camera;

        this.width=width;
        this.height=height;
        this.player=player;
        this.esActivo=true;//para verificar si esta activo el evento, llamar por BD esto se activa cuando pasa otro evento 
        this.esActivado=false; //esto es para que se ejecute una sola vez

        this.lights=lights;
        this.playerAtributos=playerAtributos;

                
       this
       .setPosition(x,y)
       //.setDisplaySize(width, height)
       .setCollideWorldBounds(true)
       //.setSize(100,100)
       .setBounce(0)
       
       ;

       this.body.setSize(width,height);
       this.body.setAllowGravity(false);
       this.setVisible(false);

     

    
          //this.physics.add.collider(objeto,this._above_collider,this.eliminarRebote,null,this);

        

    }


    setCollisionEvento(x,y,tiempoEvento,tiempoTraslado, zoom=0.5,ocultarHUD,accion,movePlayer){
        console.log("Contacto");
        this.esActivado=true;
        

        this.camera.getCameraPosition(x,y, tiempoEvento,tiempoTraslado, ocultarHUD, zoom,accion, this.playerAtributos);

        
            


              

    }



}