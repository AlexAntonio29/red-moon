import {Eventos} from './Eventos.js'
import {evento1_1} from './Scenario1Eventos/evento1_1.js'


export class Scenario1Eventos extends Eventos{

    //eventos que solo sucede una sola vez en determinada parte de la hisotoria

    constructor(scene,x=0,y=0,width=100,height=50,player,camera,lights,playerAtributos){

   

        super(scene, x,y,width,height,player,camera,lights, playerAtributos);

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


        }

    }


    setCollisionEvento(x,y,tiempoEvento,tiempoTraslado, zoom=0.5,ocultarHUD,accion,movePlayer){

        super.setCollisionEvento(x,y,tiempoEvento,tiempoTraslado, zoom=0.5,ocultarHUD,accion,movePlayer);

        this.selectorEvento(accion,movePlayer);

    }


}