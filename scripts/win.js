class Win extends Phaser.Scene {
    constructor() {
        super('win');
    }

    preload() {
        this.load.audio('snd_win', ['/assets/win.ogg']);
    }

    create() {
        bg_music.stop()
        this.sound.add('snd_win', {loop: false}).play();
        this.add.text(95, 50, '¡Ganaste!',
            {fontFamily: 'pixel', fontSize: 24});
        this.add.text(110, 90, 'Hecho por Joaquin Pino',
            {fontFamily: 'pixel', fontSize: 8, align: 'center'});
        this.add.text(105, 200, 'Tu Juego a Juicio Jam 2021',
            {fontFamily: 'pixel', fontSize: 8, align: 'center'});
        this.time.delayedCall(4000, () => {
            this.scene.start('menu');
            level = 0;
        });
    }
}
