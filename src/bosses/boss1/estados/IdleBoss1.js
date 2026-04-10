import { IdleEnemies } from "../../../enemies/Enemies/EstadosEnemies/IdleEnemies.js";

export class IdleBoss1 extends IdleEnemies{


    enter(){
         console.log(this.objeto.maquina);


        this.objeto.state="idle";
        console.log('EN IDLE DDDDD');
         this.aleatorio = Math.floor(Math.random() *2)+1;


        super.enter();

        this.Hitbox=this.objeto.scene.physics.add.overlap(this.objeto.hitbox, this.objeto.scene.player.getContainer());

        

    }

    execute(){




        
        
       
            this.objeto.setDistanciaSonido();



            //if(this.objeto.vida>=0){

            if(this.objeto.getDistanciaPlayer()<this.objeto.dataEnemie.distancia_vista){
             if(this.aleatorio!==1){    
            this.objeto.maquina.cambiarEstado('Seguir');
        
                }else this.objeto.maquina.cambiarEstado('Enojado');
            }else
            if(this.Hitbox&&this.objeto.scene.physics.overlap(this.objeto.hitbox, this.objeto.scene.player.getContainer())){
                 if(this.objeto.stamina>0){
                  
                this.objeto.maquina.cambiarEstado('Attack');
            }
            

        }
    //}





        


    }


    exit(){
        super.exit();
        this.objeto.scene.physics.world.removeCollider(this.Hitbox);

    }

}