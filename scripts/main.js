const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 240,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu, Level, Loading],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    fps: {
        target: 30,
        forceSetTimeOut: true
    }
};
const game = new Phaser.Game(config);
