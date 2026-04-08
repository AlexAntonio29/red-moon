export const ocultarCuadroDeTexto=(scene)=>{
    if (scene.typewriterTimer) scene.typewriterTimer.remove();

    if (scene.graphicsBox) scene.graphicsBox.setVisible(false);
    if (scene.txtDialogo) scene.txtDialogo.setVisible(false);
}