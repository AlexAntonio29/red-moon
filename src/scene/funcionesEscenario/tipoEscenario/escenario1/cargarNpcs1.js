import { crearNpc } from "../../../../npc/crearNpc.js";



export class cargarNpcs1{


    constructor(scene){
        this.scene=scene;


        console.log("seleccionado Npc posicionados scenario 1");

    }


    load(){

        
 crearNpc(2,8052,6161,this.scene);
//agrego sneyder npc dialogos
 crearNpc(3, 6008.03, 7466.2,this.scene);

    }
}