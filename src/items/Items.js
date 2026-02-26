


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

    
    setBody(n="item_punto"){//n es el nombre de la textura si es que se crea




                               this//creacion del item
                    .setOrigin(0)
                    .setDisplaySize(this.width,this.height)
                    //.setPipeline('Light2D');
                    .setSize(this.width*3,this.height*5)
                    ;



      if (!this.scene.anims.exists("item_mov"+this.id)) {
          this.scene.anims.create({
        key: "item_mov"+this.id,
        frames: this.scene.anims.generateFrameNumbers("item_punto", { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
          });
        }

    this.play("item_mov"+this.id);      
                    


        


        

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

    setRecoger(listaItems,item){



     this.destroy();

     const index = listaItems.indexOf(item);
              if (index !== -1) listaItems.splice(index, 1);

    }


}