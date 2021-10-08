class Level extends Phaser.Scene {
    constructor() {
        super('level');
    }

    preload() {
        this.map_id = 'map' + (level+1).toString();
        this.load.image('tiles', 'assets/wall.png');
        this.load.tilemapTiledJSON(this.map_id, 'assets/level' + (level+1).toString() +'.json');
        this.load.spritesheet('player1', 'assets/player1.png', {frameWidth: 16, frameHeight: 21});
        this.load.spritesheet('player2', 'assets/player2.png', {frameWidth: 16, frameHeight: 21});
        this.load.spritesheet('player1_set', 'assets/player1_set.png', {frameWidth: 16, frameHeight: 21});
        this.load.spritesheet('player2_set', 'assets/player2_set.png', {frameWidth: 16, frameHeight: 21});
        this.load.spritesheet('teleport', 'assets/teleport.png', {frameWidth: 16});
        this.load.spritesheet('button', 'assets/button.png', {frameWidth: 16});
        this.load.spritesheet('helix', 'assets/helix.png', {frameWidth: 16});
        this.load.image('rope', 'assets/rope.png');
        this.load.audio('snd_button', ['assets/button.ogg']);
        this.load.audio('snd_rope', ['assets/rope.ogg']);
        this.load.audio('snd_teleport', ['assets/teleport.ogg']);
        this.load.audio('snd_hit', ['assets/hit.ogg']);
        this.load.audio('snd_pass', ['assets/pass.ogg']);
    }

    create() {
        // terrain
        const map = this.make.tilemap({key: this.map_id});
        const tileset = map.addTilesetImage('wall', 'tiles');
        const layer = map.createLayer('Capa de patrones 1', tileset, 0, 0);
        layer.setCollisionByProperty({collides: true});
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
        this.snd_btn = this.sound.add('snd_button', {loop: false});
        this.snd_hit = this.sound.add('snd_hit', {loop: false});
        this.btn1 = this.physics.add.sprite(buttons[level][0]*16 + 8, buttons[level][1]*16 + 8, 'button');
        this.btn1.body.setSize(4, 4);
        this.btn1.body.setOffset(6, 6);
        this.btn2 = this.physics.add.sprite(buttons[level][2]*16 + 8, buttons[level][3]*16 + 8, 'button');
        this.btn2.body.setSize(4, 4);
        this.btn2.body.setOffset(6, 6);
        if (teleports[level] !== null) {
            this.snd_tp = this.sound.add('snd_teleport', {loop: false});
            this.tp1 = this.physics.add.sprite(teleports[level][0]*16 + 8, teleports[level][1]*16 + 8, 'teleport');
            this.tp2 = this.physics.add.sprite(teleports[level][2]*16 + 8, teleports[level][3]*16 + 8, 'teleport');
            this.tp1.play('anim_tp');
            this.tp2.play('anim_tp');
            this.tp1.body.setSize(4, 4);
            this.tp1.body.setOffset(6, 6);
            this.tp2.body.setSize(4, 4);
            this.tp2.body.setOffset(6, 6);
        }
        this.b_add= false;
        if (ropes[level] !== null) {
            this.snd_rp = this.sound.add('snd_rope', {loop: false});
            this.rp = this.physics.add.sprite(ropes[level][0]*16 + 8, ropes[level][1]*16 + 8, 'rope');
            this.rp.body.setSize(4, 4);
            this.rp.body.setOffset(6, 6);
        }
        if (helixs[level] !== null) {
            this.hx = this.physics.add.sprite(helixs[level][0]*16 + 8, helixs[level][1]*16 + 8, 'helix');
            this.hx.body.setSize(10, 10);
            this.hx.body.setOffset(3, 3);
            this.hx.play('anim_helix');
        }
        // player
        this.line = this.add.line(65, 0);
        this.line.setStrokeStyle(1, 0xffffff);
        this.player1 = this.physics.add.sprite(6*16 + 8, 7*16 + 5.5, 'player1');
        this.player2 = this.physics.add.sprite(18*16 + 8, 7*16 + 5.5, 'player2');
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
        //objects collision
        if (teleports[level] !== null) {
            let p = teleports[level][4] === 1 ? this.player1 : this.player2;
            this.physics.add.overlap(p, this.tp1, () => {
                p.body.x = this.tp2.body.x;
                p.body.y = this.tp2.body.y;
                this.tp2.body.checkCollision.none = true;
                this.time.delayedCall(1000, () => this.tp2.body.checkCollision.none = false);
                this.snd_tp.play();
            });
            this.physics.add.overlap(p, this.tp2, () => {
                p.body.x = this.tp1.body.x;
                p.body.y = this.tp1.body.y;
                this.tp1.body.checkCollision.none = true;
                this.time.delayedCall(1000, () => this.tp1.body.checkCollision.none = false);
                this.snd_tp.play();
            });
        }
        if (ropes[level] !== null) {
            this.physics.add.overlap(this.player1, this.rp, () => {
                rope += add_rope;
                this.b_add= true;
                this.rp.destroy();
                this.snd_rp.play();
            });
            this.physics.add.overlap(this.player2, this.rp, () => {
                rope += add_rope;
                this.b_add= true;
                this.rp.destroy();
                this.snd_rp.play();
            });
        }
        if (helixs[level] !== null) {
            this.physics.add.overlap(this.player1, this.hx, () => {
                this.snd_hit.play();
                if (this.b_add)
                    rope -= add_rope;
                this.scene.start('level');
            });
            this.physics.add.overlap(this.player2, this.hx, () => {
                this.snd_hit.play();
                if (this.b_add)
                    rope -= add_rope;
                this.scene.start('level');
            });
        }
        //set buttons
        this.b1 = false;
        this.b2 = false;
        this.physics.add.overlap(this.player1, this.btn1, () => {
            if (!this.b1) {
                this.btn1.setTexture('button', 1);
                this.snd_btn.play();
                this.b1 = true;
            }
        });
        this.physics.add.overlap(this.player2, this.btn1, () => {
            if (!this.b1) {
                this.btn1.setTexture('button', 1);
                this.snd_btn.play();
                this.b1 = true;
            }
        });
        this.physics.add.overlap(this.player2, this.btn2, () => {
            if (!this.b2) {
                this.btn2.setTexture('button', 1);
                this.snd_btn.play();
                this.b2 = true;
            }
        });
        this.physics.add.overlap(this.player1, this.btn2, () => {
            if (!this.b2) {
                this.btn2.setTexture('button', 1);
                this.snd_btn.play();
                this.b2 = true;
            }
        });
        // variables
        this.player = this.player1;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.text = this.add.text(15, 5, '', {fontFamily: 'pixel', fontSize: 8});
        this.warning = this.add.text(130, 70, '', {fontFamily: 'pixel', fontSize: 8});
    }

    distance() {
        let x1 = this.player1.body.x + 8;
        let y1 = this.player1.body.y + 10;
        let x2 = this.player2.body.x + 8;
        let y2 = this.player2.body.y + 10;
        return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-vel);
            this.player.body.setVelocityY(0);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(vel);
            this.player.body.setVelocityY(0);
        } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(-vel);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(vel);
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
        let d = this.distance();
        this.text.setText(Math.round(d).toString() + 'm - max: ' + (rope + diff_rope).toString() + 'm');
        if (d > rope + diff_rope) {
            if (this.b_add)
                rope -= add_rope;
            this.snd_hit.play();
            this.scene.start('level');
        } else if (d > rope) {
            this.line.setStrokeStyle(1, 0xff0000);
            if (this.warning.text !== '¡demasiada larga!')
                this.warning.text = '¡demasiada larga!';
        } else {
            this.line.setStrokeStyle(1, 0xffffff);
            if (this.warning.text !== '')
                this.warning.text = '';
        }
        if (helixs[level] !== null) {
            let p1 = {x: this.hx.body.x, y: this.hx.body.y},
                p2 = {x: this.hx.body.x+10, y: this.hx.body.y+10},
                q1 = {x: this.hx.body.x, y: this.hx.body.y+10},
                q2 = {x: this.hx.body.x+10, y: this.hx.body.y},
                r1 = {x: this.player1.body.x+8, y: this.player1.body.y+10},
                r2 = {x: this.player2.body.x+8, y: this.player2.body.y+10};
            if (doLineSegmentsIntersect(r1,r2,p1,p2) || doLineSegmentsIntersect(r1,r2,q1,q2)) {
                if (this.b_add)
                    rope -= add_rope;
                this.snd_hit.play();
                this.scene.start('level');
            }
        }
        if (this.b1 && this.b2) {
            level++
            if (level < 7)
                this.sound.add('snd_pass', {loop: false}).play()
            this.scene.start('loading');
        }
    }
}
