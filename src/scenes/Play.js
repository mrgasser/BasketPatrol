class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {

        this.load.image('basketball', './assets/basketball.png');
        this.load.image('basket', './assets/Basket.png');
        this.load.image('court', "./assets/court.png");
        this.load.image('gameover', "./assets/gameover.png");

        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        //place court background
        this.court = this.add.tileSprite(0, 0, 640, 480, 'court').setOrigin(0, 0);

        // // green UI background
        // this.add.rectangle(0, boarderUISize + boarderPadding, game.config.width, 
        // boarderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
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
        game.config.height - boarderUISize - boarderPadding, 'basketball').setOrigin(0.5, 0);

        //add Basket
        this.basket = new Basket(this, game.config.width/2, boarderUISize + boarderPadding,
        'basket').setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // configure animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        //initialize score
        this.p1Score = 0;

        // Display Score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(boarderUISize + boarderPadding, boarderUISize + boarderPadding*2,
        this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        // 60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.gmOverText = this.add.tileSprite(0, 0, 640, 480, 'gameover').setOrigin(0, 0);
            this.gameOver = true;
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
            console.log('HIT!!!')
            // add explosion
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

    // shipExplode(ship) {
    //     //temporarily hide ship
    //     ship.alpha = 0;
    //     // create explosion at ship's position
    //     let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    //     boom.anims.play('explode');
    //     boom.on('animationcomplete', () => {
    //         ship.reset();
    //         ship.alpha = 1;
    //         boom.destroy();
    //     });
    //     // Score add and repaint
    //     this.p1Score += ship.points;
    //     this.scoreLeft.text = this.p1Score;
    //     this.sound.play('sfx_explosion');
    // }
}