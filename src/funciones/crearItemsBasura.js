import { Items } from "../items/Items.js";
import {puntos, itemsInorganicos} from "../items/ItemsData.js";
import { player } from "../player/player.js";

export function crearItemsPunto(scene,n=1,items_punto,widthEscenario,heightEscenario,posicionAleatoria,player=null){



    //Math.floor(Math.random() * (max - min + 1)) + min;
    //Crear objeto punto
     

    


    
     for(let i=0;i<n;i++){

        let x,y;
         //generar selecion de objeto
    let seleccion=Math.floor(Math.random() * 6) + 0;//aqui se generaran valores aleatorios
    let c=Math.random() < 0.5 ? 1 : 2;
    let tipo;
    //console.log("categoria: "+c+" seleccion: "+seleccion);

    if(c===1)
    tipo=puntos[seleccion];//igual, se generara aleatorio
    else tipo=itemsInorganicos[seleccion];//igual, se generara aleatorio
    
    if(posicionAleatoria){
    x=Math.floor(Math.random() * ((widthEscenario-30) - 0 + 1)) + 0;
    y=Math.floor(Math.random() * ((heightEscenario-30) - 0 + 1)) + 0;
        }
        else{
           
            x=widthEscenario;
            y=heightEscenario;
             //console.log(`posicion APARICION EN CREATE ITEMS: X:${x}   Y:${y}`);


        }


        let textura;
        let data;


        if(tipo.categoria==="organico"){

            textura="item_basura"+tipo.id;

            data=puntos[tipo.id-1];

                  }
            else if(tipo.categoria==="inorganico") {
                textura="item_mov"+(parseInt(tipo.id)+6);
                 data=itemsInorganicos[tipo.id-1];
}
else {

    textura="reloj";
  
                  }

   let item=new Items(scene,tipo.id, tipo.categoria,40,40,x,y,textura,data.puntos);

   items_punto.add(item);

   if(!posicionAleatoria){
    

    item.moveToPlayer=true;
     
   }
    


        

  
    }


}