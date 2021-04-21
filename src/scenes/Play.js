class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        // load sprites and images
        this.load.image('basketball', './assets/basketball.png');
        this.load.image('basket', './assets/Basket.png');
        this.load.image('court', "./assets/court.png");
        this.load.image('gameover', "./assets/gameover.png");

    }

    create() {
        //place court background
        this.court = this.add.tileSprite(0, 0, 640, 480, 'court').setOrigin(0, 0);
        
        //white boards
        //top rectangle
        this.add.rectangle(0, 0, game.config.width, boarderUISize, 0xFFFFFF).setOrigin
        (0, 0);
        //bottom rectangle
        this.add.rectangle(0, game.config.height - boarderUISize, game.config.width,
        boarderUISize, 0xFFFFFF).setOrigin(0, 0);
        // Left rectangle
        this.add.rectangle(0, 0, boarderUISize, game.config.height, 0xFFFFFF).setOrigin
        (0, 0);
        // right rectangle
        this.add.rectangle(game.config.width - boarderUISize, 0, boarderUISize, 
        game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        //add basketball (player 1) 
        this.p1basketball = new Basketball(this, game.config.width / 2,
        game.config.height - boarderUISize - boarderPadding - 20, 'basketball').setOrigin(0.5, 0);

        //add Basket
        this.basket = new Basket(this, game.config.width/2, boarderUISize + boarderPadding,
        'basket').setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //initialize score
        this.p1Score = 0;

        // Display Score
        let scoreConfig = {
            fontFamily: 'Droid Sans',
            fontSize: '28px',
            //backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreText = this.add.text(boarderUISize + boarderPadding, -1,
        this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        // 60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.gmOverText = this.add.tileSprite(0, 0, 640, 480, 'gameover').setOrigin(0, 0);
            this.gameOver = true;
            this.sound.play('sfx_buzzer');

        }, null, this);
    }

    update() {

        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        // check key input for returning to Menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver) {
            // update rocket
            this.p1basketball.update();
            //update basket
            this.basket.update();

        }

        //check collision
        if (this.checkCollision(this.p1basketball, this.basket)) {
            this.p1basketball.reset();
            this.p1Score += 1;
            this.scoreText.text = this.p1Score;
            this.sound.play('sfx_basket');r
        }
    }

    checkCollision(basketball, basket) {
        //simple AABB chekcing
        if (basketball.x < basket.x + basket.width &&
            basketball.x + basketball.width > basket.x &&
            basketball.y < basket.y + basket.height &&
            basketball.height + basketball.y > basket.y) {
                return true;
        } else {
            return false;
        }

    }
}
