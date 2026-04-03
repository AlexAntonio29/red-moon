import { Npc } from "../Npc/Npc.js";
import { dialogosNpc3 } from "../DialogosNpc/DialogosNpc3.js";

export class npc3 extends Npc {
    constructor(scene, data, x = 0, y = 0) {
        super(scene, data, x, y);
        this.dialogos = dialogosNpc3;
        this.distanciaInteraccion = 80;

        // 1. Crear un indicador (puedes usar un texto simple o un sprite de pixel art)
        this.indicador = scene.add.text(x, y - 50, '[E]', { 
            fontSize: '16px', 
            fill: '#fff',
            backgroundColor: '#000' 
        }).setOrigin(0.5).setVisible(false);

                // 3. Aseguramos visualmente al personaje
                this.setTexture('npc3_idle'); 
                this.setScale(1); 

                //Apartado del npc  recuadros de colicion para interactuar con el npc
                this.body.setOffset(50, 45);
               
                this.body.setSize(100, 100);


    }

    // Se ejecuta en cada frame desde la Scene principal
    update(player) {
        if (this.estaCercaParaHablar(player)) {
            this.indicador.setVisible(true);
            
            // 2. Hacer que el NPC mire al jugador
            if (player.x < this.x) {
                this.setFlipX(true); // Mira a la izquierda
            } else {
                this.setFlipX(false); // Mira a la derecha
            }
        } else {
            this.indicador.setVisible(false);
        }
    }

    cargarAnimaciones() {
        // Aquí podrías crear una animación simple de "respiración" (idle) 
        // para que tus sprites de pixel art no sean estáticos.
    }

    cargarSonido() {
        // Tip: Podrías cargar un "blip" corto para cuando aparece el texto.
    }

    estaCercaParaHablar(player) {
        let distancia = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
        return distancia <= this.distanciaInteraccion;
    }

    obtenerDialogos() {
        return this.dialogos;
    }
}