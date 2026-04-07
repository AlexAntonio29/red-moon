import { crearPalanca } from "../../../../items/palanca/crearPalanca.js";


export class cargarPalancas1{

    constructor(scene){

        this.scene=scene;

        console.log('cargado palancas 1');

    }


    load(){

        
let id=0,idPuerta='palanca_01',x=7935,y=7880;

crearPalanca(x,y,id,idPuerta,this.scene);


    }
}