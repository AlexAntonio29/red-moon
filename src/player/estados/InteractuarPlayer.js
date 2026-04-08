import { Estados } from "../../funciones/automata/Estados.js";
import { guardarPartida } from "../../guardarPartida.js";

export class InteractuarPlayer extends Estados{

    enter(){
        //AQUI RECUERDA QUE DEBES DE AGREGAR MAS ESTADOS PARA LOS DIFERENTES ACTOS DE INTERACCION
        //console.log("Estoy en Interactuar");
        this.interactuar();
        this.objeto.automata.cambiarEstado('Idle');
    }

    execute(){}

    exit(){
       // console.log("Saliendo Interactuar");
    }



    interactuar(){
        
       if (!this.objeto.scene.blockLayer) return; 
        // PRIORIDAD 1: ¿Ya estamos en un diálogo activo?
       
        if (this.objeto.scene.enDialogo) {
            this.objeto.pisadas.stop();
            this.objeto.scene.avanzarDialogo();
            return; //  Detenemos la función para no interactuar con nada más
        }

        let npcCercano = this.objeto.scene.listaNpc.getChildren().find(npc => 
        npc.estaCercaParaHablar && npc.estaCercaParaHablar(this.objeto.getContainer()));

        if (npcCercano) {
    // Enviamos el objeto NPC completo para que la escena pueda marcarlo
    this.objeto.scene.iniciarDialogo(npcCercano); 
    return;

    
}
      let tileObjetivo=this.objeto.detectarBloqueCercano(this.objeto.scene.blockLayer);
      let tileObjetivoAbovePuerta=this.objeto.detectarBloqueCercano(this.objeto.scene.blockAbove);

        if (tileObjetivo) {    
            
              

        if(this.objeto.scene.procesarInteraccionE(this.objeto, tileObjetivo)&&tileObjetivoAbovePuerta){
        
        this.objeto.scene.abrirPuertaCompleta(tileObjetivoAbovePuerta,this.objeto.scene.blockAbove);
        const datosPuerta={
                      nameScene:this.objeto.scene.nameScene,
                      x:tileObjetivoAbovePuerta.x,
                      y:tileObjetivoAbovePuerta.y
                    }

      this.objeto.scene.listaPuertasAbiertasAbove.push(datosPuerta);
      }
          } else 
          if(this.objeto.estaGuardando){
            
            guardarPartida(
              this.objeto.scene.ranura,
              this.objeto,
              this.objeto.scene.listaEventos,
              this.objeto.scene.listaCheckpoints,
              this.objeto.scene.listaLlaves,
              this.objeto.scene.listaPuertasAbiertas,
              this.objeto.scene.listaPuertasAbiertasAbove,
              this.objeto.scene.listaPalancas
            );//se envia escene porque ahi se almacenan todos los objetos

              
          }else if(this.objeto.estaActivandoPalanca){

        

        this.objeto.scene.listaPalancas.children.iterate(palanca=>{
        
           if(this.objeto.scene.physics.overlap(this.objeto.player, palanca) && !(palanca.esActivado)){
            console.log("EN ACTIVACION");
            palanca.activarSonido();
            palanca.activarAnimacion();
            palanca.activar(this.objeto.scene.blockLayer);
            
            palanca.eventoSecundario(this.objeto.scene.listaEventos);
            
           }

          
        }) 
        

      } else console.log("No hay nada cerca para interactuar.");



    }
}