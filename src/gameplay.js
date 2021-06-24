var GAMEPLAY_STATUS_START = 0;
var GAMEPLAY_STATUS_PLAY = 1;
var GAMEPLAY_GAMEOVER = 2;

var GamePlay = {
    game: controller.game,
    status: GAMEPLAY_STATUS_START,
    jump: 0,
    score: 0,
    level: 1,
    
    init: function() {
        this.game.renderer.renderSession.roundPixels = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
    },
    
    preload: function() {
        
    },
    
    create: function() {
        // create ui
        this.createUI();
        this.count = 0;
        this.bgSpeed = BG_SPEED;
    },

    createUI: function() {
        var me = this;
        this.group = this.game.add.group();
        
        // bg
        this.bg1 = newSprite('background',  0, CANVAS_HEIGHT, 0, 1, 1, this.group, this.game);
        this.bg2 = newSprite('background',  this.bg1.width, CANVAS_HEIGHT, 0, 1, 1, this.group, this.game);
        this.bg1.inputEnabled = true;
        this.bg1.input.priorityID = 0;
        this.bg1.events.onInputDown.add(this.onTap, this);

        this.bg2.inputEnabled = true;
        this.bg2.input.priorityID = 0;
        this.bg2.events.onInputDown.add(this.onTap, this);

        this.sStart = newSprite('touchtostart',  CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 0.5, 0.5, 2, this.group, this.game);
        if (this.game.device.touch)
            this.game.input.mouse.stop();

        var sStar = newSprite('framestars', 10, 10, 0, 0, 1, this.group, this.game);
        var sScore = newSprite('framescore', CANVAS_WIDTH/2, 10, 0.5, 0, 1, this.group, this.game);
        
        this.isSoundOn = readGameData('sound', 1);
        if (this.isSoundOn == 0) {
            this.btnSound = newButton('btn_sound', 1200, 10, 0.5, 0, 5, this.onClickSound, this, this.group, this.game, false, null, 1, 1, 0);
        } else {
            this.btnSound = newButton('btn_sound', 1200, 10, 0.5, 0, 5, this.onClickSound, this, this.group, this.game, false, null, 0, 0, 1);
        }

        this.lblLevel = newLabel('1', EngagedNation.Config.Game.gameplay_level_font_size, EngagedNation.Config.Game.gameplay_level_font, EngagedNation.Config.Game.gameplay_level_font_color, 60, 60, 0.5, 0.5, 1, this.group, this.game, false, true, sStar);
        this.lblJump = newLabel('0/10', EngagedNation.Config.Game.gameplay_jump_font_size, EngagedNation.Config.Game.gameplay_jump_font, EngagedNation.Config.Game.gameplay_jump_font_color, 200, 50, 0.5, 0.5, 1, this.group, this.game, false, true, sStar);
        this.lblScore = newLabel('0', EngagedNation.Config.Game.gameplay_score_font_size, EngagedNation.Config.Game.gameplay_score_font, EngagedNation.Config.Game.gameplay_score_font_color, 160, 50, 0.5, 0.5, 1, this.group, this.game, false, true, sScore);

        this.player = new Player(350, EngagedNation.Config.Game.gameplay_ground_level_y_coordinate, this.group, this.game, this);
        
        this.createOpponent();
        this.createCoins();

        Howler.mute(1-this.isSoundOn);
        this.sort();
    },

    onClickSound: function() {
        Howler.mute(this.isSoundOn==0 ? false : true);
        
        this.isSoundOn = (this.isSoundOn == 1 ? 0 : 1);
        saveGameData('sound', this.isSoundOn);

        if (this.isSoundOn == 1) {
            this.btnSound.setFrames(0, 0, 1);
        } else {
            this.btnSound.setFrames(1, 1, 0);
        }
    },

    onClickHelp: function() {
        this.dlgInstruction.visible = true;
    },

    onClickClose: function() {
        this.dlgInstruction.visible = false;
    },  

    sort: function() {
        this.group.sort('z_order', Phaser.Group.SORT_ASCENDING);
    },
    
    onTap: function() {
        if(this.status == GAMEPLAY_STATUS_START){
            this.setStatus(GAMEPLAY_STATUS_PLAY);
            this.player.playAnim(true);
            playSound('audio_game_music', 0.1, true);
            this.sStart.visible = false;
        }
        else if(this.status == GAMEPLAY_STATUS_PLAY){
            playSound('audio_jump');
            this.player.jump();
        }
    },
    
    createOpponent: function(){
        this.opponent = new Opponent(CANVAS_WIDTH + 200, EngagedNation.Config.Game.gameplay_ground_level_y_coordinate, this.group, this.game, this);
        this.sort();
    },

    createCoins: function(){   
        this.coins = [];
        for(i = 0; i < 5; i++){
            this.coins[i] = new Coin(CANVAS_WIDTH + 500 + i * 50, EngagedNation.Config.Game.gameplay_ground_level_y_coordinate-20, this.group, this.game, this);
        }
    },

    setStatus: function(status)     {
        this.status = status;
        switch (status) {
            case GAMEPLAY_STATUS_START:
                break;
            case GAMEPLAY_STATUS_PLAY:
                break;
            case GAMEPLAY_GAMEOVER:
                this.gameOver();
                break;
        }
    },

    gameOver: function() {
        // playSound('audio_game_over', 1, false);
        $(controller).trigger('post_message', {
            status: 'complete',
            score: this.score
        });
    },

    update: function() {
        if(this.status == GAMEPLAY_STATUS_START || this.status == GAMEPLAY_GAMEOVER)
            return;

        this.bg1.x -= this.bgSpeed;
        this.bg2.x -= this.bgSpeed;
        
        if(this.bg1.x + this.bg1.width < 0){
            this.bg1.x = this.bg2.x + this.bg2.width
        }
        if(this.bg2.x + this.bg2.width < 0){
            this.bg2.x = this.bg1.x + this.bg1.width
        }
        
        this.player.update();

        this.count++;

        if(this.opponent.sprite.x < -(160 + (Math.random() * 150))){
            this.opponent.destroy();
            this.jump++;
            
            if(this.jump == this.level * 10){
                this.level++;
                this.jump = 0;
                this.bgSpeed = BG_SPEED + ((this.level - 1) * 5)
            }

            this.lblJump.text = this.jump + "/" + (this.level*10);
            this.lblLevel.text = this.level;

            this.createOpponent();
        }
        this.opponent.update(this.bgSpeed);

        if(this.checkOverlap(this.player.sprite, this.opponent.sprite)){
            this.player.playAnim(false);
            playSound('audio_crash');
            playSound('audio_gameover');
            this.setStatus(GAMEPLAY_GAMEOVER);
        }

        if(this.count % 600 == 0){
            for(i = 0; i < 5; i++){
                this.coins[i].destroy();
            }
            this.createCoins();
        }
        
        for(i = 0; i < 5; i++){
            this.coins[i].update(this.bgSpeed);
            if(this.coins[i].sprite.visible && this.checkOverlap(this.player.sprite, this.coins[i].sprite)){
                this.score += 10;
                playSound('audio_coin');
                this.lblScore.text = this.score;
                this.coins[i].sprite.visible = false;
            }
        }        
    },

    checkOverlap: function (spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
    
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
};
