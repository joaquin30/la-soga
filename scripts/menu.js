class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    preload() {
        this.load.image('tiles', '/assets/wall.png');
        this.load.tilemapTiledJSON('map', '/assets/menu.json');
        this.load.spritesheet('player1', '/assets/player1.png', {frameWidth: 16, frameHeight: 21});
        this.load.spritesheet('player2', '/assets/player2.png', {frameWidth: 16, frameHeight: 21});
        this.load.spritesheet('player1_set', '/assets/player1_set.png', {frameWidth: 16, frameHeight: 21});
        this.load.spritesheet('player2_set', '/assets/player2_set.png', {frameWidth: 16, frameHeight: 21});
    }

    create() {
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('wall', 'tiles');
        const layer = map.createLayer('Capa de patrones 1', tileset, 0, 0);
        layer.setCollisionByProperty({collides: true});
        this.line = this.add.line(65, 0);
        this.line.setStrokeStyle(1, 0xffffff);
        this.player1 = this.physics.add.sprite(6*16 + 8, 7*16 + 8, 'player1');
        this.player2 = this.physics.add.sprite(18*16 + 8, 7*16 + 8, 'player2');
        this.anims.create({
            key: 'anim_player1',
            frames: this.anims.generateFrameNumbers('player1'),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_player2',
            frames: this.anims.generateFrameNumbers('player2'),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_player1_set',
            frames: this.anims.generateFrameNumbers('player1_set'),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_player2_set',
            frames: this.anims.generateFrameNumbers('player2_set'),
            frameRate: 3,
            repeat: -1
        });
        this.player1.play('anim_player1_set');
        this.player2.play('anim_player2');
        this.physics.add.collider(this.player1, layer);
        this.physics.add.collider(this.player2, layer);
        this.player1.body.setSize(16, 16);
        this.player1.body.setOffset(0, 5);
        this.player2.body.setSize(16, 16);
        this.player2.body.setOffset(0, 5);
        this.player1.setBounce(1);
        this.player2.setBounce(1);
        this.player = this.player1;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.continue = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.vel = 40;
        this.text = this.add.text(5, 5, '', {fontFamily: 'pixel', fontSize: 8});
        this.add.text(120, 50, 'LA SOGA', {fontFamily: 'pixel', fontSize: 24});
        this.add.text(125, 80, '¡Evita que se rompa!', {fontFamily: 'pixel', fontSize: 8});
        this.add.text(64, 140, 'Usa las\nflechas para\nmoverte', {fontFamily: 'pixel', fontSize: 8});
        this.add.text(256, 140, 'Presiona X\npara cambiar\nde personaje', {fontFamily: 'pixel', fontSize: 8});
        this.add.text(105, 190, 'Presiona Enter para jugar', {fontFamily: 'pixel', fontSize: 8});
    }

    distance() {
        let x1 = this.player1.body.x + 8;
        let y1 = this.player1.body.y + 10;
        let x2 = this.player2.body.x + 8;
        let y2 = this.player2.body.y + 10;
        return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    }

    update() {
        if (this.continue.isDown)
            this.scene.start('loading');
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-this.vel);
            this.player.body.setVelocityY(0);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(this.vel);
            this.player.body.setVelocityY(0);
        } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(-this.vel);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(this.vel);
        }
        this.key.onDown = () => {
            if (this.player === this.player2) {
                this.player = this.player1;
                this.player1.play('anim_player1_set');
                this.player2.play('anim_player2');
            } else {
                this.player = this.player2;
                this.player2.play('anim_player2_set');
                this.player1.play('anim_player1');
            }
        }
        this.line.setTo(this.player1.body.x + 8, this.player1.body.y + 10,
            this.player2.body.x + 8, this.player2.body.y + 10);
        this.text.setText(Math.round(this.distance()).toString() + ' max:∞');
    }
}
