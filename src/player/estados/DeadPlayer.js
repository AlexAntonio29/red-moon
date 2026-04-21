import { Estados } from "../../funciones/automata/Estados.js";

export class DeadPlayer extends Estados{

    enter(){
             //   console.log("Estoy en Dead");
        this.objeto.player.setVelocity(0);
        this.objeto.vida=0;
         this.objeto.scene.getBarraVida();

         this.objeto.player.play("dead-player");


         this.objeto.scene.time.delayedCall(500,()=>{

            this.crearCuadro();
            this.objeto.scene.cameras.main.fadeOut(3000, 0, 0, 0);
            this.objeto.scene.time.delayedCall(3001,()=>{

                this.objeto.scene.sound.stopAll();
              this.objeto.scene.musicaFondo.stop();
                this.objeto.scene.scene.stop('StartGame');
                 this.objeto.scene.scene.restart();
         })
         })



    }

    execute(){
        
    }

    exit(){

       // console.log("Saliendo de Dead");
    }


    crearCuadro(){
    
        console.log("creando cuadro");
  let hudContainerPotenciador=this.objeto.scene.add.container(0,0).setScrollFactor(0);

  //Fondo semitransparente que servira para una mejor visualizacion
  let hudBackgroundPotenciador= this.objeto.scene.add.rectangle(0,0,this.objeto.scene.widthPantalla,this.objeto.scene.heightPantalla,0x000000,0.5)
    .setOrigin(0)
    .setStrokeStyle(2,0xffffff);
 
      //Centra el background
  const centrarHorizontal=(this.objeto.scene.widthPantalla/2);
  const centrarVertical=(this.objeto.scene.heightPantalla/2);


     let textoSeleccionPotenciador=this.objeto.scene.add.text(0,0,"Has Muerto",{
      wordWrap: { width: ((hudBackgroundPotenciador.width))}, // ancho máximo del texto
    fontSize: '25px',
    color: '#FF0000',
    fontFamily:this.objeto.scene.fontText
    })
    .setPosition(centrarHorizontal+10,centrarVertical+10)//.setInteractive()
  

    hudContainerPotenciador.add(hudBackgroundPotenciador);
    hudContainerPotenciador.add(textoSeleccionPotenciador);


    hudContainerPotenciador.setDepth(30);
}
}



