export class MenuPrincipal extends Phaser.Scene{//cuando estamos en el menu Principal

constructor(){
    super('MenuPrincipal');
    //console.log("Estoy en MenuPrincipal");
}

//HUD 

bStart(){



  
    //console.log(this.scene);
  

document.fonts.load(`32px ${this.fontText}`).then(() => {

  this.boton = this.add.text(40, this.heightPantalla/2, 'Historia', {
  fontSize: '45px',
  fill: '#ff0000',
  
  padding: { x: 80, y: 80 },
  fontFamily:this.fontText
})
.setInteractive()
.on('pointerdown', () => {

  //this.touch.play();
  
  this.scene.start('StartGame');

  this.musica.stop();


}).setDepth(10);

//this.boton.setPosition(((this.widthPantalla)/2)-this.boton.width/2,this.titulo.y+this.titulo.displayHeight+10);


this.tweens.add({
  targets: this.boton,
  scaleX: this.boton.scaleX * 1.0,
  scaleY: this.boton.scaleY * 1.0,
  duration: 1000,
  yoyo: true,
  repeat: -1
});

//
});





}



  preload(){
    this.load.image("imagenFondo","./assets/menuPrincipal/fondo.png");
    this.load.image("castillo","./assets/menuPrincipal/castillo.png");
    this.load.image("estrellas","./assets/menuPrincipal/estrellas.png");
    this.load.image("hud","./assets/menuPrincipal/hud.png");
    this.load.image("luna","./assets/menuPrincipal/luna.png");
    this.load.image("tierra","./assets/menuPrincipal/tierra.png");

    this.load.spritesheet("antorcha","./assets/menuPrincipal/antorcha.png",{
      frameWidth:480,
      frameHeight:480
    });

     this.load.spritesheet('nube','./assets/menuPrincipal/nubes.png',{
      frameWidth:700,
      frameHeight:500
     });

          this.load.spritesheet('nube2','./assets/menuPrincipal/nubes.png',{
      frameWidth:700,
      frameHeight:500
     });


    this.load.image("titulo","./assets/tituloMain.png");
    this.load.audio('musicaFondo','./sounds/menu.WAV');
    this.load.audio("touch","./sounds/touch2.mp3");
    this.fontText='FontArcade1'
    this.widthPantalla=this.sys.game.config.width;
    this.heightPantalla=this.sys.game.config.height;
    //console.log("Preload "+this.scene.key);
}


lucesLuciernaga(){



    this.luciernaga1=this.lights.addLight(this.widthPantalla/2, this.heightPantalla/2, 35) .setColor(0x00FF20) .setIntensity(3);


}

cargarLuces(){
  this.lights.enable();
  this.lights.setAmbientColor(0x141414); 


  //cargar luz sobre la luna

    this.lights.addLight(this.widthPantalla/2, this.heightPantalla/4, 2000) .setColor(0xffffff) .setIntensity(1);
  
  this.lights.addLight(this.widthPantalla/2, this.heightPantalla/4, 2000) .setColor(0xFF0000) .setIntensity(3);
   
  this.lights.addLight(0, 0, 2000) .setColor(0xFF0000) .setIntensity(3);


  this.luzNube1=this.lights.addLight(this.nube1.x, this.nube1.y, 200) .setColor(0xFFFFFF) .setIntensity(0.5);


   this.luzNube2=this.lights.addLight(this.nube2.x, this.nube2.y, 100) .setColor(0xFFFFFF) .setIntensity(0.5);



   this.luzAntorcha=this.lights.addLight(this.antorcha.x,this.antorcha.y-100,550).setColor(0xffaa00) .setIntensity(5);
   
  this.luzCastillo=this.lights.addLight(this.widthPantalla+50 ,-50,1000).setColor(0xFF0000) .setIntensity(5);

  this.luzAntorcha2=this.lights.addLight(this.widthPantalla-100 ,this.heightPantalla-50,500).setColor(0xffffff) .setIntensity(0.5);
   


  this.lucesLuciernaga();
}

cargarSonidos(){
  
   this.musica = this.sound.add('musicaFondo', {
    loop: true,
    volume: 0.5   // volumen entre 0 y 1
  });

  this.touch = this.sound.add('touch', {
    loop: false,
    volume: 1   // volumen entre 0 y 1
  });



}

cargarNubes(){

  
    this.nube1=this.physics.add.sprite(this.widthPantalla/2, this.heightPantalla/3, 'nube');

    this.nube1.setDepth(4).setPipeline('Light2D');
    
    this.nube1.body.setAllowGravity(false);
    this.nube1.setVelocityX(20);

    console.log(this.nube1)


    this.nube2=this.physics.add.sprite(0, this.heightPantalla/3, 'nube2');

    this.nube2.setDepth(4).setPipeline('Light2D');
    
    this.nube2.body.setAllowGravity(false);
    this.nube2.setVelocityX(10);



     


}

cargarAntorcha(){

  
  this.antorcha=this.physics.add.sprite(this.hud.x+80, this.heightPantalla+70, 'antorcha');


  if(!this.anims.exists('antorcha_play'))

    this.anims.create({
        key: 'antorcha_play',
        frames: this.anims.generateFrameNumbers('antorcha', { start: 0, end: 6 }),
        frameRate: 6,
        repeat: -1
          });

  this.antorcha.setDepth(9).setPipeline('Light2D');

  this.antorcha.play('antorcha_play');


          
}


cargarImagenes(){

      this.fondo = this.add.image(0, 0, 'imagenFondo').setOrigin(0,0)
    .setDisplaySize(this.widthPantalla*1.0,this.heightPantalla*1.0);

          //this.estrella = this.add.image(0, 0, 'estrellas').setOrigin(0,0)
    //.setDisplaySize(this.widthPantalla*1.0,this.heightPantalla*1.0);

          this.tierra= this.add.image(0, 0, 'tierra').setOrigin(0,0)
    .setDisplaySize(this.widthPantalla*1.0,this.heightPantalla*1.0);

          this.castillo = this.add.image(0, 0, 'castillo').setOrigin(0,0)
    .setDisplaySize(this.widthPantalla*1.0,this.heightPantalla*1.0);

          this.luna = this.add.image(0, 0, 'luna').setOrigin(0,0)
    .setDisplaySize(this.widthPantalla*1.0,this.heightPantalla*1.0);

          this.hud = this.add.image(0, 0, 'hud').setOrigin(0,0)
    .setDisplaySize(this.widthPantalla*1.0,this.heightPantalla*1.0);

    this.cargarNubes();
    this.cargarAntorcha();

    //this.add.sprite(100, 100, 'personaje');



    this.fondo.setDepth(1).setPipeline('Light2D');
   // this.estrella.setDepth(2).setPipeline('Light2D');
    this.luna.setDepth(3).setPipeline('Light2D');
    this.castillo.setDepth(7).setPipeline('Light2D');
    this.tierra.setDepth(8).setPipeline('Light2D');
   this.hud.setDepth(9).setPipeline('Light2D');

}


create(){
   // console.log("Create "+this.scene.key);
   
    
    this.scale.resize(this.widthPantalla,this.heightPantalla);

    
    this.cargarImagenes();
     this.cargarLuces();
this.cargarSonidos();

  this.musica.play();

  this.bStart();
}

reiniciarNubes(){

  if(this.nube1.body.x>this.widthPantalla){

    this.nube1.setPosition(0,this.heightPantalla/2);

  }

    if(this.nube2.body.x>this.widthPantalla){

    this.nube2.setPosition(0,this.heightPantalla/2);

  }

}

luzDinamica(){

  this.luzNube1.setPosition(this.nube1.x,this.nube1.y)
  this.luzNube2.setPosition(this.nube2.x,this.nube2.y)
}

update(){
  this.reiniciarNubes();
  this.luzDinamica();
}


}