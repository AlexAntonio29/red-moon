import { Estados } from "../../funciones/automata/Estados.js";

export class DashPlayer extends Estados{

    enter(){
       // console.log("Estoy en Dash");
        console.log(this.objeto.player.body.velocity);

          this.objeto.xSeguro = this.objeto.player.x;
          this.objeto.ySeguro = this.objeto.player.y;
          this.objeto.slide.play();

         this.dir = 1;
        if(this.objeto.state==='idle'){

            this.objeto.player.play("dash-reverso");
            this.dir=-1;
        }else{
            this.objeto.player.play("dash-delantero");
        }

        this.movimientoDash();

        this.verificarIdle();
    }

    execute(){

        

        if(!this.verificarHerir());

        

    }

    exit(){

       // console.log("Estoy Saliendo de Dash");
       console.log(this.objeto.vida)
        this.objeto.state = "dash";
     
    }


        verificarIdle(){
        this.objeto.player.once("animationcomplete", (anim)=>{

            this.objeto.automata.cambiarEstado('Idle');
        });

    }


        verificarHerir(){
            
        if(this.objeto.atacado){
            
            this.objeto.automata.cambiarEstado('Hurt');
            return true;
        }
        return false;

    }


    movimientoDash(){
          let velocidadDash = 250;
          let velDiag = velocidadDash * 0.7071; // Matemática exacta (500 / raíz de 2)
          let costoStamina = 80;


                    switch (this.objeto.subEstado_posicionEstatico) {
              case "derecha":
                  this.objeto.player.flipX = false;
                  this.objeto.player.setVelocity(velocidadDash * this.dir, 0);
                  break;
              case "izquierda":
                  this.objeto.player.flipX = true;
                  this.objeto.player.setVelocity(-velocidadDash * this.dir, 0);
                  break;
              case "arriba":
                  this.objeto.player.setVelocity(0, -velocidadDash * this.dir);
                  break;
              case "abajo":
                  this.objeto.player.setVelocity(0, velocidadDash * this.dir);
                  break;
              case "arriba-derecha":
                  this.objeto.player.flipX = false;
                  this.objeto.player.setVelocity(velDiag * this.dir, -velDiag * this.dir);
                  break;
              case "arriba-izquierda":
                  this.objeto.player.flipX = true;
                  this.objeto.player.setVelocity(-velDiag * this.dir, -velDiag * this.dir);
                  break;
              case "abajo-derecha":
                  this.objeto.player.flipX = false;
                  this.objeto.player.setVelocity(velDiag * this.dir, velDiag * this.dir);
                  break;
              case "abajo-izquierda":
                  this.objeto.player.flipX = true;
                  this.objeto.player.setVelocity(-velDiag * this.dir, velDiag * this.dir);
                  break;
          }

          // 5. Consumimos stamina y cambiamos el estado
          this.objeto.stamina -= costoStamina;
          this.objeto.state = "dash";
    }
}