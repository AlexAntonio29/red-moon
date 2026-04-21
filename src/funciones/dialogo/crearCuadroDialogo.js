export const crearCuadroDialogo=(scene)=>{
   
    
    if (scene.graphicsBox)  {
        
        if(scene.txtDialogo)scene.txtDialogo.destroy();
        scene.graphicsBox.destroy();


    }
        scene.graphicsBox = scene.add.graphics();
        scene.graphicsBox.fillStyle(0x000000, 0.8); 
        scene.graphicsBox.lineStyle(2, 0xffffff, 1); 
        scene.graphicsBox.fillRect(100, 500, 600, 100); 
        scene.graphicsBox.strokeRect(100, 500, 600, 100);
        scene.graphicsBox.setScrollFactor(0); 
        scene.graphicsBox.setDepth(1000); 

        // Texto
        
        scene.txtDialogo = scene.add.text(120, 520, '', {
            fontSize: '20px',
            fill: '#ffffff',
            wordWrap: { width: 560 } 
        });
        scene.txtDialogo.setScrollFactor(0);
        scene.txtDialogo.setDepth(1001);

        
}