


export class Items extends Phaser.Physics.Arcade.Sprite{


    constructor(scene,id,categoria,width=25,height=25,x=0,y=0,textura,dataItem){

      

          super(scene,x,y,textura);

          scene.add.existing(this);
    scene.physics.add.existing(this);

    this.puntos=dataItem;
     this.width=width;
     this.height=height;
     this.id=id;
     this.categoria=categoria;
     this.moveToPlayer=false;
     

       
      this.setBody(textura);
       

     

      
        
       
         
    }



    getContainer(){
     //console.log("Dentro de getContainer Items");
     return this;
    }

    getGraphics(){
      return this;
    }

    
    setBody(){//n es el nombre de la textura si es que se crea




                    this//creacion del item
                    .setOrigin(0)
                    .setDisplaySize(this.width,this.height)
                    //.setPipeline('Light2D');

    }


   setItemPosition(x,y) {
    
    this.setPosition(x,y);
 
    }

    setItemMovementX(n=1){
    
     this.x=this.x+n;
     
    }
     setItemMovementY(){
     this.y++;
     
    }

    setItem(){}




}