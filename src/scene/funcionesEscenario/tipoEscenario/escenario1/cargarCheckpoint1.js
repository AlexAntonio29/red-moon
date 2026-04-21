import { crearCheckpoint } from "../../../../items/estatua/checkpoints/crearCheckpoint.js";


export class cargarCheckpoint1{

    constructor(scene){


        this.scene=scene;


        console.log('Seleccionado Checkpoint de escenario 1');

    }


    load(){

      let x=5816//8000;//x=2100;
      let y=7826//6862;//y=8500;
      let id=0

  crearCheckpoint(x,y,id,this.scene)

  id++;
  x=2400;
  y=8500;

  crearCheckpoint(x,y,id,this.scene);

    id++;
  x=7602;
  y=7255;

   crearCheckpoint(x,y,id,this.scene);


}
}