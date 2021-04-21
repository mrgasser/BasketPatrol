class Basket extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);

        // add to existing scene
        scene.add.existing(this);
        this.movesSpeed = 0;
        this.start = true;
        this.movingLeft = false;
    }

    update() {
        
        // if game just started we want to move left
        if (this.start) {
            this.movingLeft = true;
            this.start = false;
        }

        // movement 
        if (this.movingLeft) {
            this.x -= this.movesSpeed; // move left
            console.log("Moving left!");
        } else {
            console.log("Moving right!");
            this.x += this.movesSpeed; // move right
        }

        // if we reach the left side of the board we want to move right
        if (this.x <= boarderUISize) {
            this.movingLeft = false;
        }

        // if we reach the right side we want to move left again
        if (this.x >= game.config.width - boarderUISize - this.width) {
            this.movingLeft = true;
        }
    }
}