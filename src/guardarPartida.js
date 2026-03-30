import { GuardarEnStorage } from "./funciones/GuardarEnStorage.js";


export const guardarPartida=(ranura, player, listaEventos,listaCheckpoints,listaLlaves,listaPuertasAbiertas,listaPuertasAbiertasAbove)=>{



                let datosPlayer={
                'x':player.player.x,
                'y':player.player.y,
                'inventario':player.inventario,
                'vida':player.vida,
                'stamina':player.stamina,
                'canidadPociones':player.canidadPociones,
                'velocidad_recuperacion':player.velocidad_recuperacion,
                'arma':player.arma,
                'ataque':player.ataque

              }

              let datosEventos=[];

              listaEventos.children.iterate(evento=>{
                let data={
                    'esActivo':evento.esActivo,//para verificar si esta activo el evento, llamar por BD esto se activa cuando pasa otro evento 
                    'esActivado':evento.esActivado
                }

                datosEventos.push(data)
              });


              let datosCheckpoint=[];

              listaCheckpoints.children.iterate(checkpoint=>{
                let data={
                    'esEncendido':checkpoint.esEncendido
                }

                datosCheckpoint.push(data);
              })


              let datosLlaves=[];

              listaLlaves.map((llave)=>{

                let data={
                  'recogido':llave.recogido
                }

                datosLlaves.push(data);
              });


              let datosPuertasAbiertas=[];

              listaPuertasAbiertas.map((puerta)=>{
                datosPuertasAbiertas.push(puerta);
              });


              let datosPuertasAbiertasAbove=[];

              listaPuertasAbiertasAbove.map((puerta)=>{
                datosPuertasAbiertasAbove.push(puerta);
              })

             


              let datos={
                'player':datosPlayer,
                'eventos':datosEventos,
                'checkpoints':datosCheckpoint,
                'llaves':datosLlaves,
                'puertasAbiertas':datosPuertasAbiertas,
                'puertasAbiertasAbove':datosPuertasAbiertasAbove
              }







              console.log(datos);
    

              console.log(ranura);
              console.log(datos);
              //crear valores falsos por el momento
              GuardarEnStorage(ranura,datos);
              

              console.log("Datos Guardados");


}