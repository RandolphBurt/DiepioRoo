class EnemyGroup {
    private enemyCreationBoundary: number = 10;

    private enemyCreationTimer: number = 0;
    private game: Game;
    private enemies :Phaser.Group;

    constructor(game: Game) {
        this.game = game;
    }

    public get spriteGroup() {
        return this.enemies;
    }

    public create = () => {
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    };

    public update = () => {
        this.checkCreateEnemy();
        this.enemies.forEach((enemy: EnemySprite) => { enemy.healthBar.update(enemy.x, enemy.y, 100); }, this, true);
    }

    // TODO - shouldn't create too near the player - or maybe appears from offscreen with warning indicator showing entry point
    private createEnemy = () => {
        var x = this.game.rnd.integerInRange(this.enemyCreationBoundary, this.game.width - this.enemyCreationBoundary);
        var y = this.game.rnd.integerInRange(this.enemyCreationBoundary, this.game.height - this.enemyCreationBoundary);

        var enemy = this.enemies.getFirstExists(false);

        if (!enemy) {
            enemy = this.enemies.create(x, y, 'enemy1');
            enemy.events.onKilled.add(() => { enemy.healthBar.kill(); })
        } else {
            enemy.reset(x, y);
        }

        enemy.healthBar = new HealthBar(this.game, enemy.width, 5, -1 * (enemy.width / 2), 50, 100);
        enemy.anchor.x = 0.5;
        enemy.anchor.y = 0.5;
    };

    private checkCreateEnemy = () => {
        if (this.enemyCreationTimer < this.game.time.now) {
            this.createEnemy();
            this.enemyCreationTimer = this.game.time.now + 5000;
        }
    };
}
