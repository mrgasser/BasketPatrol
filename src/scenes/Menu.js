class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // Load audio
        this.load.audio('sfx_buzzer', './assets/buzzer.wav');
        this.load.audio('sfx_basket', './assets/basketScore.wav');
        this.load.audio('sfx_ball', './assets/basketball_sound.wav');

        // load images
        this.load.image('menu', './assets/menu.png');
    }
    create() {

        this.menuText = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              basketSpeed: 2,
              gameTimer: 60000    
            }
            this.sound.play('sfx_buzzer');
            this.scene.start('playScene');    
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              basketSpeed: 5,
              gameTimer: 45000    
            }
            this.sound.play('sfx_buzzer');
            this.scene.start('playScene');    
        }
    }
}
