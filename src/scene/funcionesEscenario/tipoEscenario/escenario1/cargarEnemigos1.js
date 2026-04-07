import { crearEnemigo } from "../../../../enemies/crearEnemigo.js";



export class cargarEnemigos1 {

    constructor(scene){

        

        this.scene=scene;

        console.log("enemigos escenario 1 cargado "+this.scene);
    }

    

      load(){

     // crearEnemigo(1,2950,8550,3,this.scene);//cantidad Enemigos, x, y ,tipo de enemigo

      //crearEnemigo(1,3050,8600,1,this.scene);
      //crearEnemigo(1,0,0,10,this.scene);
      //crearEnemigo(1,8004,6400,10,this.scene);

      //crearEnemigo(1,2150,4400,4,this.scene);//cantidad Enemigos, x, y ,tipo de enemigo



       //hacer prueba para jefe

     
      crearEnemigo(1,6605,7972,0,this.scene);  
      crearEnemigo(1,6290,8425,0,this.scene);
      crearEnemigo(1,5971,8451,3,this.scene);
      crearEnemigo(1,6515,8532,0,this.scene);
      crearEnemigo(1,6752,7657,0,this.scene);
      crearEnemigo(1,6684,7251,3,this.scene);
      crearEnemigo(1,6930,8392,0,this.scene);
      crearEnemigo(1,7518,8470,0,this.scene);
      crearEnemigo(1,7581,7905,3,this.scene);
      crearEnemigo(1,7857,8482,0,this.scene);
      crearEnemigo(1,8483,8509,0,this.scene);
      crearEnemigo(1,9063,8449,0,this.scene);
      crearEnemigo(1,9809,8107,3,this.scene);
      crearEnemigo(1,10109,8370,0,this.scene);
      crearEnemigo(1,10522,8296,0,this.scene);
      crearEnemigo(1,10134,8190,0,this.scene);
      crearEnemigo(1,9976,7865,0,this.scene);
      crearEnemigo(1,10561,7862,3,this.scene);
      crearEnemigo(1,10197,7506,0,this.scene);
      crearEnemigo(1,9596,7531,0,this.scene);
      crearEnemigo(1,8999,7645,0,this.scene);
     
      crearEnemigo(1,8009,6957,0,this.scene);

      crearEnemigo(1,8187,8005,3,this.scene);
      crearEnemigo(1,8686,8033,3,this.scene);
        crearEnemigo(1,7658,7628,0,this.scene);
      
       








     //  crearEnemigo(1,this.scene.player.x+100,this.scene.player.y)// enemigo



    }
}