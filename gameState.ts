import Key = Phaser.Key;
import Sprite = Phaser.Sprite;
import Game = Phaser.Game;

class GameState {

    constructor() {
        this.game = new Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    private game :Game;
    private player1 :Player;
    private player2 :Player;

    private screenWrap = (sprite: Sprite) => {
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
        this.game.load.image('player2', 'assets/player1.png'); // TODO: Separate image for player 2
        this.game.load.image('bullet1', 'assets/bullet1.png');
        this.game.load.image('bullet2', 'assets/bullet2.png');
    };

    public create = () => {
        this.game.stage.backgroundColor = '#ffffff';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.renderer.renderSession.roundPixels = true;

        this.player1 = new Player(
            this.game,
            200,
            150,
            'player1',
            'bullet1',
            this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR));

        this.player2 = new Player(
            this.game,
            400,
            300,
            'player2',
            'bullet2',
            this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
            this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            this.game.input.keyboard.addKey(Phaser.Keyboard.END));

        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.input.keyboard.addKey(Phaser.Keyboard.END);
    };

    public update = () => {
        this.player1.handleMovement();
        this.player2.handleMovement();

        this.screenWrap(this.player1.sprite);
        this.screenWrap(this.player2.sprite);
    };
}