import { Estados } from "../../funciones/automata/Estados.js";

export class IdlePlayer extends Estados{


    enter(){
        //console.log(this.objeto.state);
        if(this.objeto.state==='dash'){ 
            console.log("verificar trampa dash");
            this.verificarTrampaDash();
        
        }
       // console.log('Entrando en Idle');
        this.objeto.state='idle';
        this.objeto.player.setVelocity(0);

        if(this.objeto.player.anims.currentAnim?.key !== "player_estatico")
        this.objeto.player.play("player_estatico");

 
       
        
    }

    execute(){

 
       

       


        if(this.objeto.isInputActive){

        if(!this.verificarHerir());
        if(!this.verificarCaminar());   
        if(!this.verificarAtacar());
        if(!this.verificarDash());
        if(!this.verficarCurar());
        if(!this.verificarInteractuar());}


        
    }




    exit(){
        //console.log("saliendo de idle");
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
        if(this.objeto.atacado){
            this.objeto.automata.cambiarEstado('Hurt');
            return true;
        }
        return false;

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

    verificarTrampaDash() {
        if (!this.objeto.scene.blockLayer) return;

        // 1. Calculamos dónde están parados los pies del jugador exactamente
        let px = this.objeto.player.x + (this.objeto.player.displayWidth / 2);
        let py = this.objeto.player.y + (this.objeto.player.displayHeight / 2);

        // 2. Leemos el mapa en esas coordenadas
        let tileActual = this.objeto.scene.blockLayer.getTileAtWorldXY(px, py);

        // 3. ¿Ese bloque tiene la propiedad que le pusimos en Tiled?
        if (tileActual && tileActual.properties && tileActual.properties.tipoBloqueo) {
            
            // Si caíste dentro de CUALQUIER bloque que se supone es un obstáculo...
            console.log("¡Te quedaste atascado en un obstaculo! Regresando a zona segura...");
            this.objeto.setVida(100);
            this.objeto.contactoPlayerEnemigo(this.objeto.player,null,this.objeto.scene);
             //this.objeto.setVida(100); //desactivar para el contacto player enemigo
            
            // 4. ¡Magia! Lo regresamos a la coordenada donde inició el salto ALEXIS ESTUVO AQUI Y VI QUE USASTE IA XD
            this.objeto.player.setPosition(this.objeto.xSeguro, this.objeto.ySeguro);
            
            // Opcional: Aquí podrías reproducir un sonido de error o quitarle 10 de vida
        }

        
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