import Key = Phaser.Key;
import Sprite = Phaser.Sprite;
import Game = Phaser.Game;

class GameState {

    constructor() {
        this.game = new Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    game: Game;
    player1: Sprite;
    player2: Sprite;
    p1LeftKey: Key;
    p1RightKey: Key;
    p1ForwardKey: Key;
    p2LeftKey: Key;
    p2RightKey: Key;
    p2ForwardKey: Key;

    private _createPlayer = (x: number, y: number) : Sprite => {
        var player = this.game.add.sprite(x, y, 'player1');
        player.anchor.setTo(0.5, 0.5);

        this.game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.drag.set(100);
        player.body.maxVelocity.set(200);

        return player;
    };

    private _handleMovement = (player: Sprite, forward: Key, left: Key, right: Key) => {
        if (forward.isDown) {
            this.game.physics.arcade.accelerationFromRotation(player.rotation - (Math.PI / 2), 200, player.body.acceleration);
        } else {
            player.body.acceleration.set(0);
        }

        if (left.isDown) {
            player.body.angularVelocity = -300;
        } else if (right.isDown) {
            player.body.angularVelocity = 300;
        } else {
            player.body.angularVelocity = 0;
        }

        this._screenWrap(player);
    };

    private _screenWrap = (sprite: Sprite) => {
        if (sprite.x < 0) {
            sprite.x = this.game.width;
        }
        else if (sprite.x > this.game.width) {
            sprite.x = 0;
        }

        if (sprite.y < 0) {
            sprite.y = this.game.height;
        }
        else if (sprite.y > this.game.height) {
            sprite.y = 0;
        }
    };

    public preload = () => {
        this.game.load.image('player1', 'assets/player1.png');
        this.game.load.image('player2', 'assets/player1.png');
    };

    public create = () => {
        this.game.stage.backgroundColor = '#ffffff';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.renderer.renderSession.roundPixels = true;

        this.player1 = this._createPlayer(200, 150);
        this.player2 = this._createPlayer(400, 300);

        this.p1LeftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.p1RightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.p1ForwardKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

        this.p2LeftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.p2RightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.p2ForwardKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    };

    public update = () => {
        this._handleMovement(this.player1, this.p1ForwardKey, this.p1LeftKey, this.p1RightKey);
        this._handleMovement(this.player2, this.p2ForwardKey, this.p2LeftKey, this.p2RightKey);
    };
}