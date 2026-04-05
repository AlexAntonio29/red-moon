import { Estados } from "../../funciones/automata/Estados.js";

export class HealingPlayer extends Estados{

    enter(){
        console.log("Estoy En Healing");
        this.curar();

        this.verificarIdle();
    }

    execute(){

        
    }

    exit(){

        console.log("Saliendo de Healing");
    }

            verificarIdle(){
        this.objeto.player.once("animationcomplete", (anim)=>{

            this.objeto.automata.cambiarEstado('Idle');
        });

    }


    curar(){
              if(this.objeto.cantidadPociones>0){

        
      let pocion=100;
        
  // Definimos el límite máximo


        if (this.objeto.vida < this.objeto.vidaActualMax) {
            // AUMENTO DE VIDA

            this.objeto.vida=this.objeto.vida+pocion;
            if (this.objeto.vida > this.objeto.vidaActualMax) {
                this.objeto.vida = this.objeto.vidaActualMax;
            }

            // --- LÓGICA DE ANIMACIÓN ---
            this.objeto.state = "healing";      // Cambiamos el estado para bloquear otras acciones
            this.objeto.player.setVelocity(0);  // Frenamos al jugador para que no se mueva mientras se cura
            this.objeto.player.play("player_curar_anim"); // Reproducimos la animación que creaste
            this.objeto.health_sound.play();
            console.log("Caballero curado. Vida actual: " + this.objeto.vida);
            this.objeto.curando=true;

        } else {
            console.log("La vida ya está al máximo");
        }

        this.objeto.cantidadPociones-=1;
        

      }else{
        console.log("no tienes pociones");
        this.objeto.automata.cambiarEstado('Idle');
      }
    }
}