import Graphics = PIXI.Graphics;
import Point = PIXI.Point;
class HealthBar {
    private percentageBar: Phaser.Graphics;
    private outlineBar: Phaser.Graphics;
    private xOffset:number;
    private yOffset:number;
    private health:number;
    private maxHealth:number;

    constructor(game: Game, width: number, height: number, xOffset: number, yOffset: number, maxHealth: number) {
        this.maxHealth = maxHealth;
        this.xOffset = xOffset;
        this.yOffset = yOffset;

        this.outlineBar = game.add.graphics(0, 0);
        this.outlineBar.lineStyle(1, 0, 1);
        this.outlineBar.drawRect(0, 0, width, height * -1);

        this.percentageBar = game.add.graphics(0, 0);
        this.percentageBar.beginFill(0x00ff00);
        this.percentageBar.lineStyle(height, 0x00ff00, 1);
        this.percentageBar.moveTo(0, -1 * (height / 2));
        this.percentageBar.lineTo(width, -1 * (height / 2));
        this.percentageBar.endFill();
    }
    
    public update = (x: number, y: number, health: number) => {
        this.outlineBar.x = x + this.xOffset;
        this.outlineBar.y = y + this.yOffset;
        this.percentageBar.x = x + this.xOffset;
        this.percentageBar.y = y + this.yOffset;

        this.health = Math.max(health, 0);

        this.percentageBar.scale = new Point(this.health / this.maxHealth, 1);
    };
}