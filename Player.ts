class Player {
    private _player: Phaser.Sprite;

    private _forward:Phaser.Key;
    private _left:Phaser.Key;
    private _right:Phaser.Key;
    private _game: Phaser.Game;

    constructor(game: Game, x: number, y: number, image: string, forward: Key, left: Key, right: Key) {
        this._game = game;
        this._forward = forward;
        this._left = left;
        this._right = right;
        this._player = game.add.sprite(x, y, image);
        this._player.anchor.setTo(0.5, 0.5);

        game.physics.enable(this._player, Phaser.Physics.ARCADE);

        this._player.body.drag.set(100);
        this._player.body.maxVelocity.set(200);
    }
    
    public get sprite() {
        return this._player;
    }

    public handleMovement = () => {
        if (this._forward.isDown) {
            // TODO: We take away a radian because our graphics face up instead of to the right...  (Ideally change the graphics)
            this._game.physics.arcade.accelerationFromRotation(this._player.rotation - (Math.PI / 2), 200, this._player.body.acceleration);
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
    };
}