import { armas } from "../items/DataItemsArmas.js";

export class SceneInventario extends Phaser.Scene {
    constructor() {
        super('SceneInventario');
    }

    init(data) {
        this.sceneStartGame = data.scene;
        this.puntos = data.puntos;
        this.player = data.player;
        this.puntaje = data.puntaje;
        this.armas = data.armas;
        
       
        this.keys = this.input.keyboard.addKeys({
            TAB: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
        });
    }

    agregarColorNivelArma(arma) {
        switch (arma.nivel) {
            case 1: return 0x616161;
            case 2: return 0x00EB41;
            case 3: return 0x3366ff;
            case 4: return 0xcc3333;
            case 5: return 0x9933cc;
            default: return 0xffcc33;
        }
    }

    preload() {
        this.load.audio("touch", "./sounds/touch.mp3");
        this.load.audio("touch2", "./sounds/touch.mp3");

        for (let i = 1; i <= 10; i++) {
            this.load.audio('ataque' + i, "./sounds/ataque" + i + ".mp3");
        }

        this.widthPantalla = this.sys.game.config.width;
        this.heightPantalla = this.sys.game.config.height;
        this.fontText = 'FontArcade4';
        
        // Un fondo un poco más oscuro para que resalte el menu
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.9)'); 
        this.input.enabled = true;
        this.seleccionItem;
    }

    cargarSonidos() {
        this.touch = this.sound.add('touch', { loop: false, volume: 1 });
        this.touch2 = this.sound.add('touch2', { loop: false, volume: 1 });
    }

    create() {
        if(this.player && this.player.getSound) {
            this.player.getSound(1).pause();
        }
        this.cargarSonidos();

        // 1. CREAR CONTENEDORES
        this.contenedorInventario = this.add.container(0, 0);
        this.contenedorDocs = this.add.container(0, 0);
        this.contenedorAtributos = this.add.container(0, 0);

        this.contenedorDocs.setVisible(false);
        this.contenedorAtributos.setVisible(false);

        // 2. CREAR PESTAÑAS
        this.crearPestanasNavegacion();

        // 3. LLENAR CONTENIDO
        this.crearContenidoInventario(); 
        this.crearContenidoDocumentos();
        this.crearContenidoAtributos();
    }

    crearPestanasNavegacion() {
        this.add.rectangle(0, 0, this.widthPantalla, 60, 0x111111, 1).setOrigin(0).setDepth(10);

        let btnInv = this.add.text(100, 20, "INVENTARIO", { fontSize: '24px', fontFamily: this.fontText, color: '#ffff00' }).setInteractive().setDepth(11);
        let btnDoc = this.add.text(400, 20, "DOCUMENTOS", { fontSize: '24px', fontFamily: this.fontText, color: '#ffffff' }).setInteractive().setDepth(11);
        let btnAtr = this.add.text(700, 20, "ATRIBUTOS", { fontSize: '24px', fontFamily: this.fontText, color: '#ffffff' }).setInteractive().setDepth(11);

        btnInv.on('pointerdown', () => {
            this.contenedorInventario.setVisible(true);
            this.contenedorDocs.setVisible(false);
            this.contenedorAtributos.setVisible(false);
            btnInv.setColor('#ffff00'); btnDoc.setColor('#ffffff'); btnAtr.setColor('#ffffff');
        });

        btnDoc.on('pointerdown', () => {
            this.contenedorInventario.setVisible(false);
            this.contenedorDocs.setVisible(true);
            this.contenedorAtributos.setVisible(false);
            btnInv.setColor('#ffffff'); btnDoc.setColor('#ffff00'); btnAtr.setColor('#ffffff');
        });

        btnAtr.on('pointerdown', () => {
            this.contenedorInventario.setVisible(false);
            this.contenedorDocs.setVisible(false);
            this.contenedorAtributos.setVisible(true);
            btnInv.setColor('#ffffff'); btnDoc.setColor('#ffffff'); btnAtr.setColor('#ffff00');
        });
    }

    crearContenidoInventario() {
        // 1. Fondo oscuro de la pestaña
        let bgInv = this.add.rectangle(50, 80, this.widthPantalla - 100, this.heightPantalla - 120, 0x000000, 0.8)
            .setOrigin(0).setStrokeStyle(2, 0xffffff);

        this.contenedorInventario.add(bgInv);

        // ==========================================
        // SECCIÓN IZQUIERDA: LA MOCHILA
        // ==========================================
        let tituloMochila = this.add.text(80, 100, "MOCHILA", { 
            fontSize: '28px', fontFamily: this.fontText, color: '#ffffff' 
        });
        this.contenedorInventario.add(tituloMochila);

        // Variables declaradas UNA sola vez
        let tamañoSlot = 55;
        let margen = 10;
        let inicioX = 80;
        let inicioY = 150;
        let indiceMochila = 0; 

        // Hacemos el ciclo para dibujar 5 columnas y 4 filas
        for (let fila = 0; fila < 4; fila++) {
            for (let col = 0; col < 5; col++) {
                let x = inicioX + (col * (tamañoSlot + margen));
                let y = inicioY + (fila * (tamañoSlot + margen));
                
                // Fondo de la casilla
                let slot = this.add.rectangle(x, y, tamañoSlot, tamañoSlot, 0x222222, 1)
                    .setOrigin(0)
                    .setStrokeStyle(1, 0xaaaaaa);
                
                this.contenedorInventario.add(slot);

                // LECTURA DEL INVENTARIO DE SETH
                if (this.player && this.player.inventario && this.player.inventario[indiceMochila] !== undefined) {
                    
                    let idGuardado = this.player.inventario[indiceMochila];
                    let texturaA_Dibujar = null;
                    
                    // Traductor de ID a imagen
                    if (idGuardado === '1' || idGuardado === 1) { 
                        texturaA_Dibujar = 'arma1'; 
                    } 
                    else if (idGuardado === 'pocion' || idGuardado === 0) {
                        texturaA_Dibujar = 'item_pocion'; 
                    }
                    else if (typeof idGuardado === 'string' && idGuardado.includes("llave")) {
                        texturaA_Dibujar = 'objeto_llave_basica';
                    }

                    // Pintamos el objeto si encontramos textura
                    if (texturaA_Dibujar) {
                        let spriteItem = this.add.image(x + (tamañoSlot/2), y + (tamañoSlot/2), texturaA_Dibujar);
                        spriteItem.setDisplaySize(45, 45); 
                        this.contenedorInventario.add(spriteItem);
                    }
                }
                
                indiceMochila++; // Avanzamos al siguiente espacio
            }
        }

        // ==========================================
        // SECCIÓN DERECHA: EQUIPO ACTUAL
        // ==========================================
        let tituloEquip = this.add.text(this.widthPantalla - 400, 100, "EQUIPO", { 
            fontSize: '28px', fontFamily: this.fontText, color: '#ffff00' 
        });
        
        let slotArma = this.add.rectangle(this.widthPantalla - 350, 160, 70, 70, 0x222222, 1)
            .setOrigin(0).setStrokeStyle(2, 0xcc3333); 
        let textoArma = this.add.text(this.widthPantalla - 260, 180, "ARMA\n(Vacío)", { 
            fontSize: '20px', fontFamily: this.fontText, color: '#aaaaaa' 
        });

        let slotArmadura = this.add.rectangle(this.widthPantalla - 350, 250, 70, 70, 0x222222, 1)
            .setOrigin(0).setStrokeStyle(2, 0x3366ff); 
        let textoArmadura = this.add.text(this.widthPantalla - 260, 270, "TÚNICA\n(Vacío)", { 
            fontSize: '20px', fontFamily: this.fontText, color: '#aaaaaa' 
        });

        let slotConsumible = this.add.rectangle(this.widthPantalla - 350, 340, 70, 70, 0x222222, 1)
            .setOrigin(0).setStrokeStyle(2, 0x00EB41); 
        let textoConsumible = this.add.text(this.widthPantalla - 260, 360, "OBJETO\n(Vacío)", { 
            fontSize: '20px', fontFamily: this.fontText, color: '#aaaaaa' 
        });

        this.contenedorInventario.add([
            tituloEquip, slotArma, textoArma, 
            slotArmadura, textoArmadura, slotConsumible, textoConsumible
        ]);
    }

    crearContenidoDocumentos() {
        // 1. Fondo oscuro de la pestaña
        let bgDocs = this.add.rectangle(50, 80, this.widthPantalla - 100, this.heightPantalla - 120, 0x000000, 0.8)
            .setOrigin(0).setStrokeStyle(2, 0xffffff);
        this.contenedorDocs.add(bgDocs);

        let tituloLista = this.add.text(80, 100, "ARCHIVOS ENCONTRADOS", { 
            fontSize: '24px', fontFamily: this.fontText, color: '#ffffff' 
        });
        this.contenedorDocs.add(tituloLista);

        // ==========================================
        // ÁREA DE LECTURA (DERECHA) - La creamos primero
        // ==========================================
        let bgLectura = this.add.rectangle(400, 150, this.widthPantalla - 480, this.heightPantalla - 220, 0x111111, 1)
            .setOrigin(0).setStrokeStyle(1, 0xaaaaaa);

        // Estas dos variables son las que van a cambiar cuando demos clic
        let tituloLectura = this.add.text(420, 170, "SELECCIONA UN DOCUMENTO", { 
            fontSize: '22px', fontFamily: this.fontText, color: '#ffff00' 
        });

        let cuerpoLectura = this.add.text(420, 220, 
            "El contenido del documento aparecera aqui...", { 
            fontSize: '18px', fontFamily: this.fontText, color: '#dddddd', 
            wordWrap: { width: this.widthPantalla - 520 },
            lineSpacing: 8
        });

        this.contenedorDocs.add([bgLectura, tituloLectura, cuerpoLectura]);

        // ==========================================
        // LISTA DE ARCHIVOS (IZQUIERDA) Y CLICS
        // ==========================================
        
        // Simulación de los documentos que ha recogido el player
        let documentosDeSeth = [
            { 
                titulo: "Pagina arrancada", 
                texto: "Dia 1: La cuidadora me miro extraño esta mañana. Creo que el Mago oculta algo en los niveles inferiores del castillo..." 
            },
            { 
                titulo: "Diario de la cuidadora", 
                texto: "No confío en ese Sacerdote. La luz de la luna roja lo altera. Debo mantener cerradas las puertas del ala norte." 
            },
            { 
                titulo: "Nota del Mago", 
                texto: "Los hechizos del primordial son poderosos, pero requieren un gran sacrificio."
            }
        ];

        let inicioY = 150;
        let botonesLista = []; // Guardaremos los botones aquí para hacer efectos visuales
        
        for (let i = 0; i < documentosDeSeth.length; i++) {
            
            // 1. Creamos el fondo del botón y LO HACEMOS INTERACTIVO
            let btnDoc = this.add.rectangle(80, inicioY + (i * 50), 300, 40, 0x222222, 1)
                .setOrigin(0)
                .setStrokeStyle(1, 0x555555)
                .setInteractive(); // <-- LA MAGIA EMPIEZA AQUÍ
            
            let textoBtn = this.add.text(90, inicioY + 10 + (i * 50), documentosDeSeth[i].titulo, { 
                fontSize: '18px', fontFamily: this.fontText, color: '#aaaaaa' 
            });

            // 2. Efecto visual al pasar el mouse por encima (Hover)
            btnDoc.on('pointerover', () => {
                btnDoc.setFillStyle(0x444444); // Se ilumina un poco
            });

            btnDoc.on('pointerout', () => {
                btnDoc.setFillStyle(0x222222); // Vuelve a su color normal
            });

            // 3. EL EVENTO DE CLIC
            btnDoc.on('pointerdown', () => {
                // Cambiamos el texto de la derecha por el texto de este documento
                tituloLectura.setText(documentosDeSeth[i].titulo);
                cuerpoLectura.setText(documentosDeSeth[i].texto);
                
                // (Opcional) Un sonidito de pasar página quedaría genial aquí
                // this.sound.play('sonido_papel'); 
            });

            this.contenedorDocs.add([btnDoc, textoBtn]);
        }
    }

    crearContenidoAtributos() {
        // 1. Fondo oscuro
        let bgAtr = this.add.rectangle(50, 80, this.widthPantalla - 100, this.heightPantalla - 120, 0x000000, 0.8)
            .setOrigin(0).setStrokeStyle(2, 0xffffff);
        this.contenedorAtributos.add(bgAtr);

        let tituloAtr = this.add.text(80, 100, "ESTADO del sin sangre", { 
            fontSize: '28px', fontFamily: this.fontText, color: '#ffff00' 
        });
        this.contenedorAtributos.add(tituloAtr);

        // ==========================================
        // SECCIÓN IZQUIERDA: RETRATO DEL PERSONAJE
        // ==========================================
        // Un marco para encuadrar tu dibujo
        let marcoBoceto = this.add.rectangle(80, 150, 250, 350, 0x111111, 1)
            .setOrigin(0).setStrokeStyle(2, 0x555555);
        
        // Carga de tu imagen (Asegúrate de haber puesto 'boceto_player' en tu cargarAssets.js)
        // Ajusta las coordenadas (205, 325) y la escala (0.5) según el tamaño real de tu foto
        let boceto = this.add.image(205, 325, 'boceto_player').setScale(0.5);

        // ==========================================
        // SECCIÓN DERECHA: ESTADISTICAS Y LORE
        // ==========================================
        let inicioX = 360; // Dónde empieza el texto
        
        let textoClase = this.add.text(inicioX, 150, "CLASE?", { 
            fontSize: '22px', fontFamily: this.fontText, color: '#aaaaaa' 
        });

        let textoNivel = this.add.text(inicioX, 190, "NIVEL: 1", { 
            fontSize: '24px', fontFamily: this.fontText, color: '#ffffff' 
        });

        // --- Visualización de Vida ---
        let textoVida = this.add.text(inicioX, 240, "PUNTOS DE VIDA (HP): 100 / 100", { 
            fontSize: '20px', fontFamily: this.fontText, color: '#00EB41' 
        });
        // Dibujamos una barra roja de fondo y una verde encima para simular la vida
        let barraVidaFondo = this.add.rectangle(inicioX, 270, 300, 20, 0x330000, 1).setOrigin(0);
        let barraVidaLlena = this.add.rectangle(inicioX, 270, 300, 20, 0x00EB41, 1).setOrigin(0);

        // --- Stats de Combate ---
        let textoAtaque = this.add.text(inicioX, 320, "DAÑO BASE: 15", { 
            fontSize: '20px', fontFamily: this.fontText, color: '#cc3333' 
        });
        
        let textoDefensa = this.add.text(inicioX, 360, "DEFENSA: 5", { 
            fontSize: '20px', fontFamily: this.fontText, color: '#3366ff' 
        });

        // --- Frase de Lore ---
        let textoHistoria = this.add.text(inicioX, 420, 
            "\"Todo es tan raro.\"", { 
            fontSize: '18px', fontFamily: this.fontText, color: '#888888', fontStyle: 'italic',
            wordWrap: { width: this.widthPantalla - 400 } // Evita que el texto se salga de la pantalla
        });

        this.contenedorAtributos.add([
            marcoBoceto, boceto,
            textoClase, textoNivel, 
            textoVida, barraVidaFondo, barraVidaLlena, 
            textoAtaque, textoDefensa, textoHistoria
        ]);
    }

    salirInventario() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.TAB)) {
            console.log("Cerrando inventario");
            this.scene.stop();
            if(this.player && this.player.getSound) {
                this.player.getSound(1).resume();
            }
            this.scene.resume('StartGame');
        }
    }

    update() {
        this.salirInventario();
    }
}