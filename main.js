var gameState= {
    preload: function () {
        game.load.image('player1', 'assets/player1.png');
    },

    create: function() {
        game.stage.backgroundColor = '#ffffff';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        this.player1 = game.add.sprite(200, 150, 'player1');
        this.player1.anchor.setTo(0.5, 0.5);

        game.physics.arcade.enable(this.player1);

        this.p1LeftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.p1RightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.p1ForwardKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    },

    update: function() {
        var angleIncrement = 5;
        if (this.p1LeftKey.isDown) {
            this.player1.angle -= angleIncrement;
        }
        if (this.p1RightKey.isDown) {
            this.player1.angle += angleIncrement;
        }
        if (this.p1ForwardKey.isDown) {
            var preX = this.player1.body.velocity.x;
            var preY = this.player1.body.velocity.y;
            game.physics.arcade.velocityFromAngle(this.player1.angle - 90, 5, this.player1.body.velocity);
            this.player1.body.velocity.x += preX;
            this.player1.body.velocity.y += preY;

            var maxPositiveVelocity = 250;
            var maxNegativeVelocity = -250;
            if (this.player1.body.velocity.x > maxPositiveVelocity) {
                this.player1.body.velocity.x = maxPositiveVelocity;
            } else if (this.player1.body.velocity.x < maxNegativeVelocity) {
                this.player1.body.velocity.x = maxNegativeVelocity;
            }

            if (this.player1.body.velocity.y > maxPositiveVelocity) {
                this.player1.body.velocity.y = maxPositiveVelocity;
            } else if (this.player1.body.velocity.y < maxNegativeVelocity) {
                this.player1.body.velocity.y = maxNegativeVelocity;
            }
        }

        //console.log(this.player1.angle + '  ' + this.player1.velocity.x + '  ' + '  ');
    },
};


var game= new Phaser.Game(1200, 850, Phaser.AUTO, 'gameDiv');
game.state.add('game',gameState);
game.state.start('game');