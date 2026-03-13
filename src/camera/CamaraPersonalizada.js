export class CamaraPersonalizada{

    constructor(scene, player, hud){

        this.scene=scene;
        this.scene.cameras.main;
        this.player=player;
        this.hud=hud;

        this.getCameratoPlayer();

    }

    getCameratoPlayer(){
    this.scene.cameras.main.startFollow(this.player);
    this.scene.cameras.main.setZoom(1.0);
    this.scene.cameras.main.setBackgroundColor('#000000');
    this.scene.cameras.main.roundPixels = true;
    }


    getCameraPosition(x,y,timeMov=1, tiempo, condicion ,ocultarHUD){

            this.hud.setVisible(ocultarHUD);

            //agregar condicion para verificar si la el evento esta activado
            //verificar si ya paso o todavia no


                        this.scene.time.delayedCall(tiempo, () => {
                
                            this.getCameratoPlayer();
                            this.hud.setVisible(false);
            });

    }

    getCameraSeguirObjeto(objeto){
        this.scene.cameras.main.startFollow(objeto);

    }






}