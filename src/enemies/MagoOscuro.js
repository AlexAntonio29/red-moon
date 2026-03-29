export class MagoOscuro extends Enemies {
    constructor(scene, dataEnemie, x = 0, y = 0) {
       
        super(scene, dataEnemie, x, y);

        // --- Propiedades exclusivas del Mago --
        
        // Tiempo en milisegundos entre cada disparo (ej. 2000 = 2 segundos)
        this.tiempoRecarga = 2000; 
        this.ultimoDisparo = 0;

        // Rango de distancia para que el mago empiece a disparar
        this.rangoAtaque = 400; 
        
        // Distancia a la que el mago prefiere detenerse para no pegarse al jugador
        this.distanciaSegura = 150; 
    }

    
    actualizarMago(player, time, contacto, contactoAtaque, contactoEnemigo) {
        // Si el mago está muerto, no hace nada
        if (this.vida <= 0) return;

        // Calculamos la distancia entre el mago y el jugador
        let distanciaPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);





        // 1. LÓGICA DE MOVIMIENTO


        // Si el jugador está lejos de la "distancia segura", el mago lo persigue
        if (distanciaPlayer > this.distanciaSegura) {
            this.setMovimientoEnemigo(player, contacto, contactoAtaque, contactoEnemigo);
        } else {
            // Si el jugador está muy cerca, el mago se detiene para castear (o podrías hacer que huya)
            this.setEnemiesVelocity(0);
        }





        // 2. LÓGICA DE DISPARO




        // Si el jugador está dentro del rango de ataque y el tiempo actual superó al tiempo de recarga
        if (distanciaPlayer <= this.rangoAtaque && time > this.ultimoDisparo) {
            this.dispararHechizo(player);
            // Actualizamos el tiempo del último disparo
            this.ultimoDisparo = time + this.tiempoRecarga; 
        }
    }

    dispararHechizo(player) {
        // Creamos el sprite del hechizo. 
        
        let hechizo = this.scene.physics.add.sprite(this.x, this.y, 'textura_hechizo');
        
        // Calculamos el ángulo en radianes hacia el jugador
        let angulo = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
        
        // Ajustamos la velocidad del hechizo (píxeles por segundo)
        let velocidadHechizo = 250;
        
        // Le damos velocidad al hechizo en la dirección del jugador
        this.scene.physics.velocityFromRotation(angulo, velocidadHechizo, hechizo.body.velocity);

        // Rotamos visualmente el sprite para que apunte hacia donde se mueve (opcional)
        hechizo.rotation = angulo;

        // Limpieza: Destruimos el hechizo después de 3 segundos si no choca con nada
        // Esto evita que tengas miles de sprites invisibles flotando por el mapa y lagueando el juego
        this.scene.time.delayedCall(3000, () => {
            if(hechizo && !hechizo.destroyed) {
                hechizo.destroy();
            }
        });

      
        hechizo.dano = 10; 
    }
}