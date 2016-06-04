class Player {
    private _player: Phaser.Sprite;

    private _forward:Phaser.Key;
    private _left:Phaser.Key;
    private _right:Phaser.Key;
    private _fire:Phaser.Key;
    private _game: Phaser.Game;
    private bullets :Phaser.Group;
    private bulletTime :number = 0;

    constructor(game: Game, x: number, y: number, playerImage: string, bulletImage: string, forward: Key, left: Key, right: Key, fire: Key) {
        this._game = game;
        this._forward = forward;
        this._left = left;
        this._right = right;
        this._fire = fire;
        this._player = game.add.sprite(x, y, playerImage);
        this._player.anchor.setTo(0.5, 0.5);

        game.physics.enable(this._player, Phaser.Physics.ARCADE);

        this._player.body.drag.set(100);
        this._player.body.maxVelocity.set(200);

        this.bullets = this._game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(40, bulletImage);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
    };

    public get sprite() {
        return this._player;
    }
    
    public get bulletsGroup() {
        return this.bullets;
    }

    private fireBullet = () => {
        if (this._game.time.now > this.bulletTime) {
            var bullet = this.bullets.getFirstExists(false);

            if (bullet) {
                bullet.reset(this._player.body.x + 40, this._player.body.y + 22);
                bullet.lifespan = 2000;
                bullet.rotation = this._player.rotation;
                this._game.physics.arcade.velocityFromRotation(this._player.rotation, 400, bullet.body.velocity);
                this.bulletTime = this._game.time.now + 150;
            }
        }
    };

    public handleMovement = () => {
        if (this._forward.isDown) {
            this._game.physics.arcade.accelerationFromRotation(this._player.rotation, 200, this._player.body.acceleration);
        } else {
            this._player.body.acceleration.set(0);
        }

        if (this._left.isDown) {
            this._player.body.angularVelocity = -300;
        } else if (this._right.isDown) {
            this._player.body.angularVelocity = 300;
        } else {
            this._player.body.angularVelocity = 0;
        }

        if (this._fire.isDown)
        {
            this.fireBullet();
        }
    };
}