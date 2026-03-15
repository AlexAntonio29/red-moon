
export class scenePauseRapido extends Phaser.Scene{

    constructor(){

        super('scenePauseRapido');

    }

    preload(){

    }

    create(){

        //regresar al startGame

        this.time.delayedCall(200,()=>{
            this.scene.resume('StartGame');
            this.scene.stop();

        })
    }
}