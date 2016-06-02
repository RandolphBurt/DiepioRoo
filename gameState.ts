import Key = Phaser.Key;
import Sprite = Phaser.Sprite;
import Game = Phaser.Game;

class GameState {

    constructor() {
        this.game = new Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    private game: Game;
    private player1: Player;
    private player2: Player;

    private bullets:Phaser.Group;
    private bulletTime:number = 0;

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

    private fireBullet = (player: Player) => {
        if (this.game.time.now > this.bulletTime) {
            var bullet = this.bullets.getFirstExists(false);

            if (bullet) {
                bullet.reset(player.sprite.body.x + 16, player.sprite.body.y + 16);
                bullet.lifespan = 2000;
                bullet.rotation = player.sprite.rotation;
                this.game.physics.arcade.velocityFromRotation(player.sprite.rotation, 400, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 150;
            }
        }
    }

    public preload = () => {
        this.game.load.image('player1', 'assets/player1.png');
        this.game.load.image('player2', 'assets/player1.png'); // TODO: Separate iamge for player 2
        this.game.load.image('bullet', 'assets/bullet.png');
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
            this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            this.game.input.keyboard.addKey(Phaser.Keyboard.D));

        this.player2 = new Player(
            this.game,
            400,
            300,
            'player2',
            this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
            this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT));

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(40, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);

        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    };

    public update = () => {
        this.player1.handleMovement();
        this.player2.handleMovement();

        this.screenWrap(this.player1.sprite);
        this.screenWrap(this.player2.sprite);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.fireBullet(this.player1);
        }

        this.bullets.forEachExists(this.screenWrap, this);
    };
}