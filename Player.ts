class Player {
    private _player: Phaser.Sprite;
    private _health: number;
    private _forward:Phaser.Key;
    private _back:Phaser.Key;
    private _left:Phaser.Key;
    private _right:Phaser.Key;
    private _fire:Phaser.Key;
    private _game: Phaser.Game;
    private _healthBar:HealthBar;
    private _bullets :Phaser.Group;
    private _bulletTime :number = 0;

    constructor(game: Game, x: number, y: number, playerImage: string, bulletImage: string, forward: Key, back: Key, left: Key, right: Key, fire: Key) {
        this._game = game;
        this._forward = forward;
        this._back = back;
        this._left = left;
        this._right = right;
        this._fire = fire;
        this._player = game.add.sprite(x, y, playerImage);
        this._player.anchor.setTo(0.5, 0.5);

        this._health = 100;
        this._healthBar = new HealthBar(this._game, this._player.width, 5, -1 * (this._player.width / 2), 50, 100);

        game.physics.enable(this._player, Phaser.Physics.ARCADE);

        this._player.body.drag.set(100);
        this._player.body.maxVelocity.set(200);

        this._bullets = this._game.add.group();
        this._bullets.enableBody = true;
        this._bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this._bullets.createMultiple(10, bulletImage);
        this._bullets.setAll('anchor.x', 0.5);
        this._bullets.setAll('anchor.y', 0.5);
        this._bullets.setAll('outOfBoundsKill', true);
        this._bullets.setAll('checkWorldBounds', true);
    };

    public get sprite() {
        return this._player;
    }
    
    public get health() {
        return this._health;
    }

    public set health(val:number) {
        this._health = val;
    }

    public get bulletsGroup() {
        return this._bullets;
    }

    private fireBullet = () => {
        if (this._game.time.now > this._bulletTime) {
            var bullet = this._bullets.getFirstExists(false);

            if (bullet) {
                bullet.reset(this._player.body.x + 40, this._player.body.y + 22);
                //bullet.lifespan = 2000;
                bullet.rotation = this._player.rotation;
                this._game.physics.arcade.velocityFromRotation(this._player.rotation, 400, bullet.body.velocity);
                this._bulletTime = this._game.time.now + 150;
            }
        }
    };

    public update = () => {
        if (this._forward.isDown) {
            this._game.physics.arcade.accelerationFromRotation(this._player.rotation, 200, this._player.body.acceleration);
        } else if (this._back.isDown) {
            this._game.physics.arcade.accelerationFromRotation(this._player.rotation, -200, this._player.body.acceleration);
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

        this._healthBar.update(this._player.x, this._player.y, this._health);
    };
}