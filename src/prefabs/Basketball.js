//Rocket (Player) prefab
class Basketball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;          // track ball firing
        this.moveSpeed = 3;             // ball movement speed
        this.sfxBall = scene.sound.add('sfx_ball'); // add ball sfx
    }

    update() {
        // left and right movement
        if (!this.isFiring) {
            if(keyLEFT.isDown && this.x >= boarderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - boarderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxBall.play(); //play sfx
        }
        // if fired move the rockey up
        if (this.isFiring && this.y >= boarderUISize) {
            this.y -= this.moveSpeed;
        }

        // reset on a miss
        if (this.y <= boarderUISize) {
            this.reset();
        }
    }

    // Reset rocket to ground
    reset() {
        this.isFiring = false;
        this.y = game.config.height - boarderUISize - boarderPadding - 20;
    }
}