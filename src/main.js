// Max Gasser
// Basket Patrol
// April 21
// 15 hours to complete
//
// sound effects https://mixkit.co/free-sound-effects/
// Point Breakdown:
// S(hrek) game redesign: 60
// - redesigned artwork, UI, and sound to change theme/aesthetic
// Create new title screen: 10
// - new title screen that goes along with new theme
//
// total: 70

// Game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let boarderUISize = game.config.height / 15;
let boarderPadding = boarderUISize / 3;
let starSpeed = 4;

// reserver keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;