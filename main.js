var gameState= {
    _createPlayer: function(x, y) {
        var player = game.add.sprite(x, y, 'player1');
        player.anchor.setTo(0.5, 0.5);

        game.physics.arcade.enable(player);

        player.body.maxAngular = 500;
        player.body.angularDrag = 50;

        return player;
    },

    _handleMovement: function(player, forward, left, right) {
        player.body.angularAcceleration = 0;

        if (left.isDown) {
            player.body.angularAcceleration -= 200;
        }
        if (right.isDown) {
            player.body.angularAcceleration += 200;
        }
        if (forward.isDown) {
            var preX = player.body.velocity.x;
            var preY = player.body.velocity.y;
            game.physics.arcade.velocityFromAngle(player.angle - 90, 5, player.body.velocity);
            player.body.velocity.x += preX;
            player.body.velocity.y += preY;

            var maxPositiveVelocity = 250;
            var maxNegativeVelocity = -250;
            if (player.body.velocity.x > maxPositiveVelocity) {
                player.body.velocity.x = maxPositiveVelocity;
            } else if (player.body.velocity.x < maxNegativeVelocity) {
                player.body.velocity.x = maxNegativeVelocity;
            }

            if (player.body.velocity.y > maxPositiveVelocity) {
                player.body.velocity.y = maxPositiveVelocity;
            } else if (player.body.velocity.y < maxNegativeVelocity) {
                player.body.velocity.y = maxNegativeVelocity;
            }
        }
    },

    preload: function () {
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player1.png');
    },

    create: function() {
        game.stage.backgroundColor = '#ffffff';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        this.player1 = this._createPlayer(200, 150);
        this.player2 = this._createPlayer(400, 300);

        this.p1LeftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.p1RightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.p1ForwardKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        this.p2LeftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.p2RightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.p2ForwardKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    },

    update: function() {
        this._handleMovement(this.player1, this.p1ForwardKey, this.p1LeftKey, this.p1RightKey);
        this._handleMovement(this.player2, this.p2ForwardKey, this.p2LeftKey, this.p2RightKey);
    }
};


var game= new Phaser.Game(1200, 850, Phaser.AUTO, 'gameDiv');
game.state.add('game',gameState);
game.state.start('game');