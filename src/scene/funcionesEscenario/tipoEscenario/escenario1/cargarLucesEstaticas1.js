export class cargarLucesEstaticas1{


    constructor(scene){
        console.log('luces estaticas en scenario1');
        this.scene=scene;
    }


    load(){
            let x,y;

    


    x=8102;
    y=5965;
    this.scene.listaLucesObjetos.push
    (this.scene.lights.addLight(x, y, 5000) 
    .setColor(0xffaa00) 
    .setIntensity(2.0));
    }




}