import { armas } from "../items/DataItemsArmas.js";
export class ScenePause extends Phaser.Scene{ 



constructor(){
    super('ScenePause');
    console.log("Estoy en Pause")
}

init(data) {
  this.sceneStartGame=data.scene;
  this.puntos=data.puntos;
  this.player=data.player;
  this.puntaje=data.puntaje;
  this.armas=data.armas;
    this.keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D,
    ESC: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    
});

}

crearScroll(){

}




crearPotenciador(){
    

  let hudContainerPotenciador=this.add.container(0,0);

  //Fondo semitransparente que servira para una mejor visualizacion
  let hudBackgroundPotenciador= this.add.rectangle(0,0,this.widthPantalla,this.heightPantalla,0x000000,0.5)
    .setOrigin(0)
    .setStrokeStyle(2,0xffffff);
 
      //Centra el background
  const centrarHorizontal=(this.widthPantalla/2);
  const centrarVertical=(this.heightPantalla/2);


     let textoSeleccionPotenciador=this.add.text(0,0,"Pause",{
      wordWrap: { width: ((hudBackgroundPotenciador.width))}, // ancho máximo del texto
    fontSize: '25px',
    color: '#FF0000',
    fontFamily:this.fontText
    })
    .setPosition(centrarHorizontal+10,centrarVertical+10)//.setInteractive()
  

    hudContainerPotenciador.add(hudBackgroundPotenciador);
    hudContainerPotenciador.add(textoSeleccionPotenciador);

}


  preload(){

      this.widthPantalla=this.sys.game.config.width;
      this.heightPantalla=this.sys.game.config.height;
      this.fontText='FontArcade4';
      this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');
      this.input.enabled = true;
      this.seleccionItem;

      console.log(this.sceneStartGame);
      console.log(this.puntos);
      console.log(this.player);
     // this.setVisible(false);
     //this.scene.setVisible(false);
}

cargarSonidos(){


  

}

create(){

  this.player.getSound(1).pause();
 // this.cargarSonidos();
    
  console.log("Entrando en pause");
  console.log(this.armas);
    this.crearPotenciador();
}

salirPausa(){
 if(Phaser.Input.Keyboard.JustDown(this.keys.ESC)){ 
  console.log("Salir del pause")
  this.scene.stop();
  this.player.getSound(1).resume();
  this.scene.resume(this.sceneStartGame.key);
  }
}

update(time, delta){
  //quitar pausa
  //console.log("h")

  this.salirPausa();


}


}