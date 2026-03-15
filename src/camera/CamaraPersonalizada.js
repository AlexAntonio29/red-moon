export class CamaraPersonalizada{

    constructor(scene, player, hud){

        this.scene=scene;
        this.scene.cameras.main;
        this.player=player;
        this.hud=hud;

        this.getCameratoPlayer();

    }

    getCameratoPlayer(){
    this.scene.cameras.main.startFollow(this.player,true,0.05,0.05,0,0);
    this.scene.cameras.main.setZoom(1.0);
    this.scene.cameras.main.setBackgroundColor('#000000');
    this.scene.cameras.main.roundPixels = true;
    

   
    }


    getCameraPosition(x,y, tiempo ,tiempoTraslado,ocultarHUD,zoom=0.5,accion, playerAtributos){

           

            this.hud.setVisible(ocultarHUD);

             console.log(this.hud.visible);

            this.scene.cameras.main.stopFollow();


            //this.scene.cameras.main.setScroll(x,y);
            console.log(this.scene.cameras.main);


            console.log("activate camera modification");
            this.scene.cameras.main.zoomTo(zoom,tiempoTraslado,'Sine.easeInOut',true );
            this.scene.cameras.main.pan(x,y,tiempoTraslado,'Sine.easeInOut',true,
                (camera,progress)=>{
                    if(progress===1){



                            this.scene.time.delayedCall(tiempo, () => {
                            this.scene.cameras.main.zoomTo(1,tiempoTraslado,'Sine.easeInOut',true );
                            camera.pan(this.player.x,this.player.y,tiempoTraslado,'Sine.easeInOut',true,
                                (camera,progress)=>{
                                    if(progress===1){
                                    this.getCameratoPlayer();
                                    this.hud.setVisible(true);
                                    //activar movePlayer
                                    playerAtributos.isInputActive=true;

                                    }
                                }
                            )
                            
                            
                            });

                    }
                });
            
                

            





    }

    getCameraSeguirObjeto(objeto){
        this.scene.cameras.main.startFollow(objeto);

    }






}