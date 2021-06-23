var controller = { game: {} };

controller.createGame = function() {
    this.game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'game');
    this.game.state.add('Preload', Preload);
    this.game.state.add('GamePlay', GamePlay);

    this.applyGlobalVariables();
    this.goToPreload();
    sizeHandler();
};

controller.applyGlobalVariables = function() {
    // GAME_TIME = EngagedNation.Config.Game.gameplay_time;
};

controller.goToScene = function(sceneName) {
    this.game.state.start(sceneName);
};

controller.goToPreload = function() { this.goToScene('Preload'); };
controller.goToGamePlay = function() { this.goToScene('GamePlay'); };