
export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
        
    }

    preload() {
        console.log("Precargando recursos del juego...");
        

        // ==========================================
        // ASSETS DEL MENÚ PRINCIPAL
        // ==========================================
        this.load.image('title', 'assets/image/title.png');
        this.load.image('play', 'assets/image/play.png');
        this.load.image('options', 'assets/image/options.png');
        this.load.image('exit', 'assets/image/exit.png');
        this.load.image('background', 'assets/image/background.png');

        this.load.audio('select', 'sounds/general/points/sound1.mp3');
        this.load.audio('bgm', 'sounds/level/nexus/soundtrack.wav');
        this.load.audio('paso', 'sounds/general/pisadas/tierra/pisada.mp3'); 
        this.load.audio('slash', 'sounds/player/atacando/Sword_Slash.mp3');

        // ==========================================
        // ASSETS DE STARTGAME (Nivel 1, Jugador, Items)
        // ==========================================
        this.load.image('Tileset', 'assets/tilesets/Tileset.png');
        this.load.tilemapTiledJSON('mapa', 'assets/mapas/nexus.json');
        
        this.load.spritesheet('player', 'assets/personajes/player/sprite.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemies1', 'assets/enemigos/enemie1.png', { frameWidth: 32, frameHeight: 32 });
        
        this.load.image('inventory-bg', 'assets/ui/inventory.png');
        this.load.image('item-health', 'assets/items/health_potion.png');
        this.load.image('item-key', 'assets/items/key.png');
        this.load.image('puerta_item', 'assets/items/puerta.png');
        this.load.image('antorcha', 'assets/items/antorcha.png');
    }

    create() {
        console.log("Carga terminada. Pasando al Menú Principal...");
        this.scene.start('MenuPrincipal'); 
    }
}