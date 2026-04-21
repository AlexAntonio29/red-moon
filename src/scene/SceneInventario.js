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
        
        // Un fondo un poco más oscuro para que resalte el menú
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
        let hudContainerPotenciador = this.contenedorInventario; 
        let division = 2;
        let cantidadItemsWidth = 8;
        let complementoAlturaMask = 0;
        let j = 0, k = 0, l = 0;
        let cantidadArmas = 0; // Recuerda ajustar esto si ya tienes armas en tu arreglo

        let hudBackgroundPotenciador = this.add.rectangle(0, 70, this.widthPantalla - (this.widthPantalla / 10), this.heightPantalla - (this.heightPantalla / 10) - 70, 0x000000, 0.5)
            .setOrigin(0).setStrokeStyle(2, 0xffffff);

        let centrarHorizontal = (this.widthPantalla / 2) - (hudBackgroundPotenciador.width / 2);
        let centrarVertical = 70; 

        hudBackgroundPotenciador.setPosition(centrarHorizontal, centrarVertical);

        let textoSeleccionPotenciador = this.add.text(0, 0, "Inventario", {
            wordWrap: { width: ((hudBackgroundPotenciador.width)) },
            fontSize: '25px', color: '#ffffff', fontFamily: this.fontText
        }).setPosition(centrarHorizontal + 10, centrarVertical + 10).setInteractive();

        let btnActivar = this.add.text(0, 0, "  Equipar  ", {
            wordWrap: { width: ((hudBackgroundPotenciador.width)) },
            fontSize: '30px', color: '#000000', backgroundColor: '#C7C7C7', padding: { x: 20, y: 10 }, fontFamily: this.fontText
        }).setVisible(false);

        let textoPrecio = this.add.text(0, 0, "", { color: '#FFFF00', fontFamily: this.fontText });

        if (this.widthPantalla < this.heightPantalla) {
            cantidadItemsWidth = 3;
            complementoAlturaMask = (hudBackgroundPotenciador.width / cantidadItemsWidth);
            division = 1;
        }

        let medidaItems = hudBackgroundPotenciador.width / cantidadItemsWidth;

        let descripcionItem = this.add.text(centrarHorizontal + 10, textoSeleccionPotenciador.y + textoSeleccionPotenciador.height + 10, "", {
            wordWrap: { width: (hudBackgroundPotenciador.width / division) - 10 },
            fontSize: '20px', color: '#ffffff', fontFamily: this.fontText
        }).setInteractive();

        let scrollContainer = this.add.container(0, 0).setScrollFactor(0);
        let positionX = 0, positionY = textoSeleccionPotenciador.y + (textoSeleccionPotenciador.height);

        let maskContainer = this.add.container(centrarHorizontal, centrarVertical + textoSeleccionPotenciador.height + medidaItems).setScrollFactor(0);
        let maskWidth = hudBackgroundPotenciador.width;
        let maskHeight = hudBackgroundPotenciador.height - (textoSeleccionPotenciador.height + medidaItems) - complementoAlturaMask;

        let maskShape = this.add.graphics().setScrollFactor(0);
        maskShape.lineStyle(2, 0xffffff);
        maskShape.fillRect(maskContainer.x, maskContainer.y, maskWidth, maskHeight);
        
        let seleccionador = this.add.rectangle(0, 0, medidaItems, medidaItems, 0xFFFFFF, 0.5).setVisible(false);
        this.sumaScroll = 0;

        for (let i = 0; i < cantidadArmas; i++) {
            if (j == k) {
                j += cantidadItemsWidth;
                positionX = centrarHorizontal;
                positionY += medidaItems;
                l++;
            }

            let colorFondo = this.agregarColorNivelArma(this.armas[i]);
            let body = this.add.rectangle(positionX, positionY, medidaItems, medidaItems, colorFondo, 1)
                .setOrigin(0).setStrokeStyle(2, 0xffffff).setInteractive({ useHandCursor: true });
            body.input.alwaysEnabled = true;
            let image = this.add.image(positionX, positionY, this.armas[i].diseno).setDisplaySize(medidaItems, medidaItems).setOrigin(0);

            positionX += medidaItems;
            let itemPotenciador = { 'body': body, 'image': image, 'atributos': this.armas[i] };

            itemPotenciador.body.on('pointerdown', (pointer) => {
                let sonidoAtaque = this.sound.add(itemPotenciador.atributos.sonido, { loop: false, volume: 1 });
                sonidoAtaque.play();
                
                textoSeleccionPotenciador.setText(itemPotenciador.atributos.nombre);
                descripcionItem.setText(itemPotenciador.atributos.descripcion);
                seleccionador.setVisible(true).setPosition(itemPotenciador.body.x + (itemPotenciador.body.width / 2), itemPotenciador.body.y + (itemPotenciador.body.height / 2) + (this.sumaScroll));
                textoPrecio.setText((itemPotenciador.atributos.puntos) * (itemPotenciador.atributos.nivel) + " ptos ").setPosition(descripcionItem.x + descripcionItem.width + 10, descripcionItem.y);
                
                this.seleccionItem = itemPotenciador;
                
                if (this.puntos >= (itemPotenciador.atributos.puntos) * (itemPotenciador.atributos.nivel)) {
                    btnActivar.setActive(true); btnActivar.setBackgroundColor('#17D900'); btnActivar.setColor('#FFFF00');
                } else {
                    btnActivar.setActive(false); btnActivar.setBackgroundColor('#118C00'); btnActivar.setColor('#B5B500');
                }

                if (this.widthPantalla < this.heightPantalla) {
                    textoPrecio.setPosition(hudBackgroundPotenciador.x + 10, hudBackgroundPotenciador.y + hudBackgroundPotenciador.height - medidaItems + 10);
                }

                btnActivar.setPosition(textoPrecio.x + textoPrecio.width + 10, textoPrecio.y).setInteractive().setVisible(true);
            });

            scrollContainer.add(itemPotenciador.body);
            scrollContainer.add(itemPotenciador.image);
            k++;
        }

        btnActivar.on('pointerdown', () => {
            if (!btnActivar.active) return;
            this.player.setArma({ ...this.seleccionItem.atributos });
            this.scene.stop();
            this.puntos -= (this.seleccionItem.atributos.puntos) * (this.seleccionItem.atributos.nivel);
            this.puntaje.setText((this.puntos));
            this.touch.play();
            this.scene.resume('StartGame');
            this.armas[Number(this.seleccionItem.atributos.id) - 1].nivel++;
        });

        let mask = maskShape.createGeometryMask();
        scrollContainer.add(seleccionador);
        scrollContainer.setMask(mask);

        hudContainerPotenciador.add([hudBackgroundPotenciador, textoSeleccionPotenciador, descripcionItem, btnActivar, textoPrecio, scrollContainer]);

        if ((medidaItems * l) > maskHeight) {
            this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
                if(!this.contenedorInventario.visible) return; 
                scrollContainer.y -= deltaY * 0.5;
                const totalAlturaContenido = Math.ceil(cantidadArmas / cantidadItemsWidth) * medidaItems;
                const minScroll = maskHeight - totalAlturaContenido;
                if (scrollContainer.y > 0) scrollContainer.y = 0;
                if (scrollContainer.y < minScroll) scrollContainer.y = minScroll;
            });

            let startY = 0, containerStartY = 0, isDragging = false;
            this.input.on('pointerdown', (pointer) => {
                if(!this.contenedorInventario.visible) return;
                startY = pointer.y; containerStartY = scrollContainer.y; isDragging = true;
            });
            this.input.on('pointermove', (pointer) => {
                if(!this.contenedorInventario.visible) return;
                if (isDragging && pointer.isDown) {
                    let deltaY = pointer.y - startY;
                    scrollContainer.y = containerStartY + deltaY;
                    const totalAlturaContenido = Math.ceil(cantidadArmas / cantidadItemsWidth) * medidaItems;
                    const minScroll = maskHeight - totalAlturaContenido;
                    if (scrollContainer.y > 0) scrollContainer.y = 0;
                    if (scrollContainer.y < minScroll) scrollContainer.y = minScroll;
                }
            });
            this.input.on('pointerup', () => { isDragging = false; });
        }
    }

    crearContenidoDocumentos() {
        let bgDocs = this.add.rectangle(50, 80, this.widthPantalla - 100, this.heightPantalla - 120, 0x000000, 0.8)
            .setOrigin(0).setStrokeStyle(2, 0xffffff);
        
        let tituloDocs = this.add.text(this.widthPantalla/2, 120, "ARCHIVOS Y NOTAS", { 
            fontSize: '30px', fontFamily: this.fontText, color: '#ffffff' 
        }).setOrigin(0.5);

        let placeholderText = this.add.text(this.widthPantalla/2, 250, "por el momento se queda asi hasta hacer todo lo de documentos", { 
            fontSize: '20px', fontFamily: this.fontText, color: '#aaaaaa' 
        }).setOrigin(0.5);

        this.contenedorDocs.add([bgDocs, tituloDocs, placeholderText]);
    }

    crearContenidoAtributos() {
        let bgAtr = this.add.rectangle(50, 80, this.widthPantalla - 100, this.heightPantalla - 120, 0x000000, 0.8)
            .setOrigin(0).setStrokeStyle(2, 0xffffff);
        
        let tituloAtr = this.add.text(100, 120, "ESTADO DEL PERSONAJE", { 
            fontSize: '30px', fontFamily: this.fontText, color: '#ffffff' 
        }).setOrigin(0);

        // Tu boceto (Asegúrate de cargarlo en Preload.js como 'boceto_player')
        let boceto = this.add.image(this.widthPantalla - 300, 300, 'boceto_player').setScale(0.8);

        // Integrando la información del personaje
        let statsText = this.add.text(100, 180, 
            "NOMBRE: caballero\n\n" +
            "VIDA ACTUAL: 100 / 100\n\n" +
            "DAÑO BASE: 15\n\n" +
            "DEFENSA: 5\n\n" +
            "NIVEL: 1", { 
            fontSize: '24px', fontFamily: this.fontText, color: '#00EB41', lineSpacing: 15 
        }).setOrigin(0);

        this.contenedorAtributos.add([bgAtr, tituloAtr, boceto, statsText]);
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