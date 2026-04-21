export class ScenePause extends Phaser.Scene { 
    constructor() {
        super('ScenePause');
    }

    init(data) {
        this.sceneStartGame = data.scene;
        this.player = data.player;
        this.keys = this.input.keyboard.addKeys({
            ESC: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        });
    }

    preload() {
        this.widthPantalla = this.sys.game.config.width;
        this.heightPantalla = this.sys.game.config.height;
        this.fontText = 'FontArcade4'; 
        
        // Fondo oscuro general para tapar el juego
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.85)'); 
    }

    create() {
        console.log("Juego Pausado");
        
        if(this.player && this.player.getSound) {
            this.player.getSound(1).pause();
        }

        let centrarX = this.widthPantalla / 2;
        let centrarY = this.heightPantalla / 2;

        // TÍTULO DE PAUSA
        this.add.text(centrarX, centrarY - 120, "PAUSA", {
            fontSize: '60px',
            fontFamily: this.fontText,
            color: '#ffffff'
        }).setOrigin(0.5);

        // BOTÓN: CONTINUAR
        let btnContinuar = this.add.text(centrarX, centrarY, "CONTINUAR", {
            fontSize: '35px',
            fontFamily: this.fontText,
            color: '#aaaaaa'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Efectos hover para Continuar
        btnContinuar.on('pointerover', () => btnContinuar.setColor('#ffffff'));
        btnContinuar.on('pointerout', () => btnContinuar.setColor('#aaaaaa'));
        btnContinuar.on('pointerdown', () => this.reanudarJuego());

        // BOTÓN: SALIR AL MENÚ PRINCIPAL
        let btnSalir = this.add.text(centrarX, centrarY + 80, "SALIR AL MENU", {
            fontSize: '35px',
            fontFamily: this.fontText,
            color: '#aaaaaa'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Efectos hover para Salir
        btnSalir.on('pointerover', () => btnSalir.setColor('#ff3333')); // Se pone rojo al pasar el mouse
        btnSalir.on('pointerout', () => btnSalir.setColor('#aaaaaa'));
        btnSalir.on('pointerdown', () => {
            
            // 1. Apagamos TODOS los sonidos que estén sonando en el juego
            this.sound.stopAll(); 

            // 2. Detenemos el nivel
            this.scene.stop('StartGame');

            // 3. Detenemos esta misma escena de pausa
            this.scene.stop();

            // 4. Arrancamos el Menú Principal (que seguramente ahí vuelve a reproducir su propia música)
            this.scene.start('MenuPrincipal'); 
        });
    }

    reanudarJuego() {
        console.log("Saliendo de pausa");
        this.scene.stop();
        if(this.player && this.player.getSound) {
            this.player.getSound(1).resume();
        }
        this.scene.resume('StartGame');
    }

    update() {
        // Salir de la pausa si se vuelve a presionar ESC
        if (Phaser.Input.Keyboard.JustDown(this.keys.ESC)) { 
            this.reanudarJuego();
        }
    }
}