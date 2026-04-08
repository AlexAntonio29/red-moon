import { crearEvento } from "../../../../eventos/crearEvento.js";



export class cargarEventos{

constructor(scene, eventoScenario){

    console.log("cargado Eventos del Escenario 1")

    this.scene=scene;
   this.eventoScenario=eventoScenario
}

load(){

   //datos de eventos estos para comodidad del programador en agregar eventos se agregaran en variables
         let x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom, ocultarHUD,accion,movePlayer,esActivo;
         let id=0;
         x=4400;
         y=8425;
         width=400;
         height=250;
         tiempo=3000;
         tiempoTraslado=500;
         xAdicional=0;
         yAdicional=0;
         zoom=0.4;
         ocultarHUD=false;
         accion=1;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
         //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
         movePlayer=false;
         esActivo=true;
   
   
   
         //crearEvento(4400,8425,400,250,3000,500,0,0,0.8);//positionx,positiony,widthEvento,heightEvento, tiempoEjecucion, tiempoTrasladoCamara, xAdicional, yAdicional,zoom
         crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer,id,esActivo,this.scene,this.eventoScenario);
   
         id++;
         x=7110;
         y=7710;
         width=400;
         height=250;
         tiempo=2000;
         tiempoTraslado=500;
         xAdicional=0;
         yAdicional=450;
         zoom=2.0;
         ocultarHUD=false;
         accion=2;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
         //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
         movePlayer=false;
         esActivo=true;
   
   
         //crearEvento(4400,8425,400,250,3000,500,0,0,0.8);//positionx,positiony,widthEvento,heightEvento, tiempoEjecucion, tiempoTrasladoCamara, xAdicional, yAdicional,zoom
         crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer,id,esActivo,this.scene,this.eventoScenario);
   
         id++;
         x=9805;
         y=7300;
         width=200;
         height=550;
         tiempo=0;
         tiempoTraslado=0;
         xAdicional=0;
         yAdicional=0;
         zoom=1.0;
         ocultarHUD=false;
         accion=3;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
         //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
         movePlayer=false;
         esActivo=true;
   
   
         //crearEvento(4400,8425,400,250,3000,500,0,0,0.8);//positionx,positiony,widthEvento,heightEvento, tiempoEjecucion, tiempoTrasladoCamara, xAdicional, yAdicional,zoom
         crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer,id,esActivo,this.scene,this.eventoScenario);
   
   
         //cuando se va a agregar un nuevo elemento entoces se establecen valores variables;
   
   
   
         id++;
         x=9890;
         y=8296;
         width=200;
         height=550;
         tiempo=0;
         tiempoTraslado=0;
         xAdicional=0;
         yAdicional=0;
         zoom=1.0;
         ocultarHUD=false;
         accion=4;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
         //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
         movePlayer=false;
         esActivo=false;
   
   
         //crearEvento(4400,8425,400,250,3000,500,0,0,0.8);//positionx,positiony,widthEvento,heightEvento, tiempoEjecucion, tiempoTrasladoCamara, xAdicional, yAdicional,zoom
         crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer,id,esActivo,this.scene,this.eventoScenario);
   
   
         id++;
         x=7926;
         y=5777;
         width=500;
         height=200;
         tiempo=1000;
         tiempoTraslado=500;
         xAdicional=0;
         yAdicional=300;
         zoom=1.2;
         ocultarHUD=false;
         accion=5;//aqui se condicionan lo que va a suceder ejemplo que salga un dragon o pase una situacion
         //esto llama a un switch que llama a la funcion o metodo que realice dicha accion
         movePlayer=false;
         esActivo=true;
   
         //crearEvento(x,y,width,height,tiempo,tiempoTraslado,xAdicional,yAdicional,zoom,ocultarHUD,accion,movePlayer,id,esActivo,this.scene,this.eventoScenario);
   
   
   
   
}
}

