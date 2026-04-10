export class cargarLucesEstaticas1{


    constructor(scene){
        console.log('luces estaticas en scenario1');
        this.scene=scene;
    }


    load(){
            let x,y;

    


    x=8052;
    y=6161;
    this.scene.listaLucesObjetos.push
    (this.scene.lights.addLight(x, y, 1000) 
    .setColor(0xffaa00) 
    .setIntensity(1.5));
    }




}