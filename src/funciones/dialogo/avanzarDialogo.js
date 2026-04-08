import { mostrarCuadroDeTexto } from "./mostrarCuadroDeTexto.js";
import { ocultarCuadroDeTexto } from "./ocultarCuadroDeTexto.js";

export const avanzarDialogo=(scene)=>{
    // ¿Llegamos a la última frase?
    if (scene.indiceTexto >= scene.listaTextos.length - 1) {
        
        if (scene.npcActual) {
            scene.npcActual.yaHabloTodo = true;
        }

        // --- 2. DETENER MÚSICA AL CERRAR DIÁLOGO ---
        // Aplicamos un "fade-out" para mantener la atmósfera melancólica y que no se corte de golpe
        if (scene.sonidoNPC) {
            scene.tweens.add({
                targets: scene.sonidoNPC,
                volume: 0,
                duration: 1000, // Tarda 1 segundo en desvanecerse
                onComplete: () => { 
                    scene.sonidoNPC.stop(); 
                    scene.musicaFondo.volume=0.5;
                }
            });
        }

        scene.enDialogo = false;
        ocultarCuadroDeTexto(scene);
        
        // Devolvemos el movimiento al caballero
        if (scene.player && scene.player.descongelarParaDialogo) {
            scene.player.descongelarParaDialogo();
        }
        
    } else {
        // Si no es la última frase, avanzamos normal
        scene.indiceTexto++;
        mostrarCuadroDeTexto(scene.listaTextos[scene.indiceTexto],scene);
    }
}