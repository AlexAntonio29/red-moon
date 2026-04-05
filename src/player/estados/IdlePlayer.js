import { Estados } from "../../funciones/automata/Estados.js";

export class IdlePlayer extends Estados{


    enter(){

        console.log('Entrando en Idle');
        this.objeto.player.setVelocity(0);
        this.objeto.player.play("player_estatico");
        
    }

    execute(){

        
        
        if(!this.verificarCaminar());
        if(!this.verificarAtacar());
        if(!this.verificarDash());
        if(!this.verficarCurar());
        if(!this.verificarInteractuar());


        
    }




    exit(){
        console.log("saliendo de idle");
    }




    verificarCaminar(){
        if(
        (this.objeto.scene.cursor.up.isDown||this.objeto.keys.W.isDown||this.objeto.joystick.up.isDown) ||
        (this.objeto.keys.S.isDown||this.objeto.scene.cursor.down.isDown||this.objeto.joystick.down.isDown) ||
        (this.objeto.scene.cursor.right.isDown||this.objeto.keys.D.isDown||this.objeto.joystick.right.isDown) ||
        (this.objeto.scene.cursor.left.isDown||this.objeto.keys.A.isDown||this.objeto.joystick.left.isDown)
        ){
            this.objeto.automata.cambiarEstado('Walk');
            return true;
            }
            return false;
    }


    verificarAtacar(){

            if (this.objeto.keys.J.isDown && !this.objeto.estaAtacando) {
            this.objeto.tiempocarga++; 
          
        }
        if(Phaser.Input.Keyboard.JustUp(this.objeto.keys.J)&&this.objeto.stamina>0){
            this.objeto.automata.cambiarEstado('Attack');
            return true;
        }
        return false;
    }

    verificarHerir(){


    }

    verificarDash(){
        if(Phaser.Input.Keyboard.JustDown
            (this.objeto.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)) 
            && this.objeto.stamina > 0 ){
            this.objeto.automata.cambiarEstado('Dash');
            return true
        }
        return false;
    }


    verficarCurar(){
        if(Phaser.Input.Keyboard.JustDown(this.objeto.keys.V)){
            this.objeto.automata.cambiarEstado('Healing');
            return true
        }

        return false;
    }

    verificarInteractuar(){
        if(Phaser.Input.Keyboard.JustDown(this.objeto.keys.E)){
            this.objeto.automata.cambiarEstado('Interactuar');
            return true;
        }

        return false;
    }
}