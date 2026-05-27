import { abrirPuertaCompleta } from "./abrirPuertaCompleta.js";

export const procesarInteraccionE=(playerInstance, tile,scene)=>{
      
        console.log(" Escaner activado Propiedades del bloque:", tile.properties);
        // 1. Extraemos qué tipo de bloque es y qué ID de item necesita/da
        let tipo = tile.properties.tipoBloqueo;
        let idItem = tile.properties.idItem; // <-- ¡Esta es la magia dinamica!

        switch (tipo) {
            
            // CASO A: EL JUGADOR ENCUENTRA UN ÍTEM TIRADO
            case "recoger_item":
                // Le avisamos a la consola si nos falta el ID
                if (!idItem) {
                    
                    console.log(" ERROR: Es un item, pero no tiene 'idItem' en Tiled.");
                }
                  

              
              
                const t=scene.listaLlaves.find((t)=>((tile.x===t.tile.x)&&tile.y===t.tile.y));
               

                if (t) {
                   
                    playerInstance.agregarItem(idItem); //+"_"+t.id
                    scene.blockLayer.removeTileAt(tile.x, tile.y);
                    //eliminar la luz de la llave
                    scene.lights.removeLight(t.luz)
                    t.recogido=true;
                    console.log(`¡Recogiste el ítem con ID: ${idItem}!`);
                    scene.sound.add("recoger_item",{
                      loop:false,
                      volume: 0.3
                    }).play();
                }

                

                break;

           // CASO B: EL JUGADOR INTENTA ABRIR UNA PUERTA
            case "puerta_item":
                if (!idItem) break; 

                // Revisamos si la mochila tiene ese ID exacto
                if (playerInstance.tieneItem(idItem)) {
                    
                    // LO USAMOS Y LO CONSUMIMOS
                    playerInstance.usarItem(idItem); 
                    
                    // ==========================================
                    // CAMBIO: LLAMAMOS A LA REACCIÓN EN CADENA
                    // ==========================================
                    const datosPuerta={
                      nameScene:scene.nameScene,
                      x:tile.x,
                      y:tile.y
                    }

                    scene.listaPuertasAbiertas.push(datosPuerta);
                    abrirPuertaCompleta(tile,scene.blockLayer);
                    
                    console.log(`¡Puerta abierta! El ítem ${idItem} se consumió y la reja gigante desapareció.`);
                    
                    scene.cameras.main.fadeOut(1000, 0, 0, 0);
                    scene.cameras.main.fadeIn(1000, 0, 0, 0);

                    scene.sound.add('puerta_abriendose', {
                     loop: false,
                     volume: 1   // volumen entre 0 y 1
                      }).play();
                    return true;

                } else {
                    // Si no lo tiene, lo rebotamos (el tile sigue siendo sólido)
                    console.log(`Está cerrado... Necesitas encontrar el ítem: ${idItem}`);
                    return false;
                    // Aquí podrías mostrar un texto flotante en pantalla
                }
                break;

            // CASO C: LEER UN CARTEL (Ejemplo para el futuro)
            case "leer_cartel":
                console.log("El cartel dice: 'Peligro, monstruos adelante'.");
                break;


                // CASO C: ACTIVAR UNA PALANCA O INTERRUPTOR
            case "palanca":
                // Leemos cual es el ID del dibujo de la palanca activada
                let tileActivado = tile.properties.idActivado; 

                if (tileActivado||tileActivado===0) {
                    // 1. Reemplazamos el dibujo actual por el de la palanca bajada
                    scene.blockLayer.putTileAt(tileActivado, tile.x, tile.y);
                    
                    // 2. Le cambiamos el tipo para que el jugador no pueda activarla 100 veces
                    tile.properties.tipoBloqueo = "palanca_usada";
                    
                    console.log("La palanca ha sido activada.");
                    
                    // ==========================================
                    // aqui se puede agregar la poder abrir una puerta secreta
                    // Por ejemplo: scene.abrirPuertaSecreta();
                    // ==========================================
                    
                } else {
                    console.log(" ERROR: A esta palanca le falta la propiedad 'idActivado' en Tiled.");
                }
                break;

            // CASO D: SI LA PALANCA YA SE USO
            case "palanca_usada":
                console.log("La palanca ya está trabada en la posición de encendido.");
                break;

            default:
                console.log("No se puede interactuar con este objeto de esa forma.");
                break;
        }
    }