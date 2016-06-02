var gameState= {

    _createPlayer: function(x, y) {
        var player = game.add.sprite(x, y, 'player1');
        player.anchor.setTo(0.5, 0.5);

        game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.drag.set(100);
        player.body.maxVelocity.set(200);

        return player;
    },

    _handleMovement: function(player, forward, left, right) {
        if (forward.isDown) {
            game.physics.arcade.accelerationFromRotation(player.rotation - (Math.PI / 2), 200, player.body.acceleration);
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
    },

    _screenWrap: function(sprite) {

        if (sprite.x < 0) {
            sprite.x = game.width;
        }
        else if (sprite.x > game.width) {
            sprite.x = 0;
        }

        if (sprite.y < 0) {
            sprite.y = game.height;
        }
        else if (sprite.y > game.height) {
            sprite.y = 0;
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