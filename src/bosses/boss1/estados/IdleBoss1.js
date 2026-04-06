import { IdleEnemies } from "../../../enemies/Enemies/EstadosEnemies/IdleEnemies.js";

export class IdleBoss1 extends IdleEnemies{


    enter(){

        super.enter();

        this.Hitbox=this.objeto.scene.physics.add.overlap(this.objeto.hitbox, this.objeto.scene.player.getContainer());

    }

    execute(){

        
        if(!super.execute())
            if(this.objeto.scene.physics.overlap(this.objeto.hitbox, this.objeto.scene.player.getContainer())){
                 if(this.objeto.stamina>0){
                  
                this.objeto.maquina.cambiarEstado('Attack');
            }
            }



        


    }


    exit(){
        super.exit();
        this.objeto.scene.physics.world.removeCollider(this.Hitbox);

    }

}