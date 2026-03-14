import {Eventos} from './Eventos.js'


export class Scenario1Eventos extends Eventos{

    //eventos que solo sucede una sola vez en determinada parte de la hisotoria

    constructor(scene,x=0,y=0,width=100,height=50,player,camera){

   

        super(scene, x,y,width,height,player,camera);

    }

    EventoPuenteScenario1(){
        /*
        posicion player
        variable para detectar si esta activo se activara en la bd
        variable para ver si ya se activo ya que solo se activan una sola vez se activara en la bd
        */

        this.setPosition();
        



       



    }


}