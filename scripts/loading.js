class Loading extends Phaser.Scene {
    constructor() {
        super('loading');
    }

    preload() {
        this.load.spritesheet('teleport', '/assets/teleport.png', {frameWidth: 16});
        this.load.spritesheet('button', '/assets/button.png', {frameWidth: 16});
        this.load.spritesheet('helix', '/assets/helix.png', {frameWidth: 16});
        this.load.image('rope', '/assets/rope.png');
        this.load.spritesheet('loading', '/assets/loading.png', {frameWidth: 70, frameHeight: 15});
    }

    create() {
        bg_music.stop();
        // objects
        this.anims.create({
            key: 'anim_tp',
            frames: this.anims.generateFrameNumbers('teleport'),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_helix',
            frames: this.anims.generateFrameNumbers('helix'),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_button',
            frames: this.anims.generateFrameNumbers('button'),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_loading',
            frames: this.anims.generateFrameNumbers('loading'),
            frameRate: 3,
            repeat: -1
        });
        let x = this.physics.add.sprite(200, 80, 'loading');
        x.play('anim_loading')
        this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.text(110, 40, 'Nivel ' + (level+1).toString() + ' de 7',
            {fontFamily: 'pixel', fontSize: 16});
        this.add.text(90, 190, 'Presiona Enter para continuar',
            {fontFamily: 'pixel', fontSize: 8});
        switch (level) {
        case 0:
            this.spr = this.physics.add.sprite(150, 130, 'button');
            this.spr.play('anim_button');
            this.add.text(170, 120, 'Presiona los\n2 botones\npara ganar',
                {fontFamily: 'pixel', fontSize: 8});
            break;
        case 1:
            this.spr = this.physics.add.sprite(160, 130, 'rope');
            this.add.text(180, 120, 'Recoge la\ncuerda\nadicional',
                {fontFamily: 'pixel', fontSize: 8});
            break;
        case 2:
            this.spr = this.physics.add.sprite(130, 130, 'teleport');
            this.spr.play('anim_tp');
            this.add.text(150, 120, 'Al acercarte te\nteletransportará\na otra plataforma',
                {fontFamily: 'pixel', fontSize: 8});
            break;
        case 4:
            this.spr = this.physics.add.sprite(120, 130, 'helix');
            this.spr.play('anim_helix');
            this.add.text(140, 120, 'Evita que los\npersonajes o la soga\ntoquen la hélice',
                {fontFamily: 'pixel', fontSize: 8});
            break;
        case 7:
            this.scene.start('win');
            break;
        default:
            this.add.text(170, 130, '¡Suerte!',
                {fontFamily: 'pixel', fontSize: 8});
            break;
        }
    }

    update() {
        if (this.key.isDown) {
            this.scene.start('level');
            bg_music.play();
        }
    }
}
