export const abrirPuertaCompleta=(tileInicial,capa)=>{
        let idRequerido = tileInicial.properties.idItem;
        let tilesPorRevisar = [tileInicial];
        let tilesVisitados = new Set(); // Para no revisar el mismo tile dos veces

        // Mientras haya bloques de puerta por revisar...
        while(tilesPorRevisar.length > 0) {
          
            let tileActual = tilesPorRevisar.pop();
            let clave = `${tileActual.x},${tileActual.y}`;

            if (!tilesVisitados.has(clave)) {
                tilesVisitados.add(clave);

                // 1. Destruimos este pedazo de la puerta
                capa.removeTileAt(tileActual.x, tileActual.y);

                // 2. Buscamos a sus 4 vecinos (Arriba, Abajo, Izquierda, Derecha)
                let vecinos = [
                    capa.getTileAt(tileActual.x + 1, tileActual.y),
                    capa.getTileAt(tileActual.x - 1, tileActual.y),
                    capa.getTileAt(tileActual.x, tileActual.y + 1),
                    capa.getTileAt(tileActual.x, tileActual.y - 1)
                ];

                
                
                vecinos.forEach(vecino => {
                    if (vecino!==null) {
                        
                        // Si es parte de la puerta, lo agregamos a la lista para destruirlo
                        tilesPorRevisar.push(vecino);
                    }
                });
            }
        }
    }