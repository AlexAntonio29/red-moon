import { Items } from "../Items.js";

export class ItemPuntos extends Items{

    

    constructor(scene,id,categoria,width=25,height=25,x=0,y=0,textura,dataItem,lights){

        super(scene,id,categoria,width,height,x,y,textura,dataItem,lights);

         //crear luz

      this.light=lights.addLight(x, y, 40) .setColor(0xEB3636) .setIntensity(3);


      this.light.setPosition(this.x+(this.displayWidth/2),this.y+(this.displayHeight/2));
    }


    setBody(){

        super.setBody();
        this.setSize(this.width*3,this.height*5)
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

}