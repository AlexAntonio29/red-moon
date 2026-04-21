
export const lucesArea =(scene)=>{
      let activationRadius = 3000; 

    // 2. Recorrer todas las luces
    scene.listaLucesObjetos.forEach(light => {
        // Calcular distancia entre el jugador y la luz
        let distance = Phaser.Math.Distance.Between(scene.player.getContainer().x, scene.player.getContainer().y, light.x, light.y);

        // Si está dentro del radio -> Encender, si no -> Apagar
        if (distance < activationRadius) {
            if (!light.visible) { // Solo si estaba apagada para ahorrar operaciones
                light.setVisible(true);
                // Opcional: Efecto de encendido
                light.setIntensity(1.5); 
            }
        } else {
            if (light.visible) { // Solo si estaba encendida
                light.setVisible(false);
                // Opcional: Apagado inmediato
                // light.setIntensity(0);
            }
        }
    });
}