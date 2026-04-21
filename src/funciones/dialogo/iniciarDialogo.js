import { mostrarCuadroDeTexto } from "./mostrarCuadroDeTexto.js";

export const iniciarDialogo=(npc,scene)=>{

    console.log(npc);
    console.log(scene);

    
    // Seguridad: verificamos que el NPC tenga el método de diálogos
    if (!npc || typeof npc.obtenerDialogos !== 'function') return;

    scene.enDialogo = true;
    scene.npcActual = npc; 
    scene.listaTextos = npc.obtenerDialogos();

    // --- 1. REPRODUCIR MÚSICA DE AMBIENTACIÓN ---
    // Verificamos si ya hay música sonando para no duplicarla
    if (!scene.sonidoNPC || !scene.sonidoNPC.isPlaying) {
        scene.sonidoNPC = scene.sound.add('musica_mago', { 
            loop: true, 
            volume: 0.8 
        });
        scene.musicaFondo.volume=0.1;
        scene.sonidoNPC.play();
        
    }

    // LÓGICA DE REPETICIÓN
    if (npc.yaHabloTodo) {
        scene.indiceTexto = scene.listaTextos.length - 1;
    } else {
        scene.indiceTexto = 0;
    }

    mostrarCuadroDeTexto(scene.listaTextos[scene.indiceTexto],scene);
    
    // Detenemos al caballero
    if (scene.player && scene.player.congelarParaDialogo) {
        scene.player.congelarParaDialogo();
    }
}