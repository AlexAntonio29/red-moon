import {Eventos} from './Eventos.js'
import {evento1_1} from './Scenario1Eventos/evento1_1.js'
import {evento1_2} from './Scenario1Eventos/evento1_2.js';
import {evento1_3} from './Scenario1Eventos/evento1_3.js';
import { evento1_4 } from './Scenario1Eventos/evento1_4.js';


export class Scenario1Eventos extends Eventos{

    //eventos que solo sucede una sola vez en determinada parte de la hisotoria

    constructor(scene,x=0,y=0,width=100,height=50,player,camera,lights,playerAtributos,id){

   

        super(scene, x,y,width,height,player,camera,lights, playerAtributos,id);

    }

    EventoPuenteScenario1(){
        /*
        posicion player
        variable para detectar si esta activo se activara en la bd
        variable para ver si ya se activo ya que solo se activan una sola vez se activara en la bd
        */

        this.setPosition();
        



       



    }

    selectorEvento(accion,movePlayer){
        //seleccionar el tipo de evento que se va a ejecutar
        switch(accion){

            case 1:

            
            evento1_1(this.scene,this.player, this.lights, movePlayer, this.playerAtributos);


            break;

            case 2:

            
            evento1_2(this.scene,this.player, this.lights, movePlayer, this.playerAtributos);


            break;

            case 3:

            
            evento1_3(this.scene,this.player, this.lights, movePlayer, this.playerAtributos);


            break;

            case 4:

            
            evento1_4(this.scene,this.player, this.lights, movePlayer, this.playerAtributos);


            break;


        }

    }


    setCollisionEvento(x,y,tiempoEvento,tiempoTraslado, zoom,ocultarHUD,accion,movePlayer){

        super.setCollisionEvento(x,y,tiempoEvento,tiempoTraslado, zoom,ocultarHUD,accion,movePlayer);

        this.selectorEvento(accion,movePlayer);

            if(tiempoEvento<=0){
               

                 
                this.scene.hudContainer.setVisible(true);
                //activar movePlayer
                this.playerAtributos.isInputActive=true;
               //this.camera.getCameratoPlayer();


            }

    }


}