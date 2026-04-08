import { crearCuadroDialogo } from "./crearCuadroDialogo.js";

export const mostrarCuadroDeTexto=(textoCompleto,scene)=>{
    crearCuadroDialogo(scene);

    scene.graphicsBox.setVisible(true);
    scene.txtDialogo.setVisible(true);

    if (scene.typewriterTimer) scene.typewriterTimer.remove();

    scene.txtDialogo.setText(''); 
    scene.typewriterIndex = 0; 

    scene.typewriterTimer = scene.time.addEvent({
        delay: 70, 
        callback: () => {
            scene.txtDialogo.setText(scene.txtDialogo.text + textoCompleto[scene.typewriterIndex]);
            scene.typewriterIndex++;

            // --- 3. EFECTO DE MÁQUINA DE ESCRIBIR ---
            // Reproducimos el "blip" bajito cada vez que sale una letra.
            // Esto le da un toque RPG clásico y mucha vida al pixel art.
            scene.sound.play('sonido_habla_npc', { volume: 1.5 });

            if (scene.typewriterIndex >= textoCompleto.length) {
                scene.typewriterTimer.remove();
                scene.isTypewriterDone = true; 
            }
        },
        callbackScope: scene,
        loop: true
    });
}