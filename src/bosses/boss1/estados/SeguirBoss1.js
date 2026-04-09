import { SeguirEnemies } from "../../../enemies/Enemies/EstadosEnemies/SeguirEnemies.js"

export class SeguirBoss1 extends SeguirEnemies{

        enter(){


        super.enter();


        this.objeto.sound_walk.play();
        this.Hitbox=this.objeto.scene.physics.add.overlap(this.objeto.hitbox, this.objeto.scene.player.getContainer());

    }

    execute(){

       if(!super.execute())
        if(this.objeto.scene.physics.overlap(this.objeto.hitbox, this.objeto.scene.player.getContainer())){
            
            if(this.objeto.stamina>0){
            this.objeto.maquina.cambiarEstado('Attack');}

        
        }
        


    }


    exit(){
        super.exit();

        this.objeto.sound_walk.stop();
        this.objeto.scene.physics.world.removeCollider(this.Hitbox);

    }
}