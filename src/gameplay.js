var GAMEPLAY_STATUS_CROSSHAIR = 0;
var GAMEPLAY_STATUS_DART = 1;
var GAMEPLAY_GAMEOVER = 2;

var GamePlay = {
    game: controller.game,
    status: GAMEPLAY_STATUS_CROSSHAIR,

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

        if (this.game.device.touch)
            this.game.input.mouse.stop();

        newSprite('framestars', 10, 10, 0, 0, 1, this.group, this.game);
        newSprite('framescore', CANVAS_WIDTH/2, 10, 0.5, 0, 1, this.group, this.game);
        
        this.isSoundOn = readGameData('sound', 1);
        if (this.isSoundOn == 0) {
            this.btnSound = newButton('btn_sound', 1800, 10, 0.5, 0, 5, this.onClickSound, this, this.group, this.game, false, null, 1, 1, 0);
        } else {
            this.btnSound = newButton('btn_sound', 1800, 10, 0.5, 0, 5, this.onClickSound, this, this.group, this.game, false, null, 0, 0, 1);
        }

        this.player = new Player(400, 800, this.group, this.game, this.onDartFinished, this);

        this.createOpponent();
        // header
        // var sprHeader = newSprite('header', 0, 15, 0, 0, 1, this.group, this.game);
        // newLabel(EngagedNation.Config.Game.text_score, 40, 'Arial', 'black', 196, 40, 0.5, 0.5, 1, this.group, this.game, false, true, sprHeader);
        // newLabel(EngagedNation.Config.Game.text_darts, 40, 'Arial', 'black', 800, 40, 0.5, 0.5, 1, this.group, this.game, false, true, sprHeader);
        // this.lblScore = newLabel('000', 50, EngagedNation.Config.Game.text_font, '#9a0000', 433, 35, 0.5, 0.5, 1, this.group, this.game, false, true, sprHeader);
        // this.lblDarts = newLabel('00', 50, EngagedNation.Config.Game.text_font, '#9a0000', 958, 35, 0.5, 0.5, 1, this.group, this.game, false, true, sprHeader);
        // this.score = 0;
        // this.cnt_darts = EngagedNation.Config.Game.gameplay_darts + 1;
        // this.addScore(EngagedNation.Config.Game.gameplay_start_score);
        // this.removeDarts(0);
        // if (!EngagedNation.Config.Game.gameplay_header_visible) {
        //     sprHeader.visible = false;
        // }

        
        // this.btnHelp = newButton('btn_help', 1140, 50, 0.5, 0.5, 5, this.onClickHelp, this, this.group, this.game, false, null, 0, 0, 1);
        // // target
        // this.sprTarget = newSprite('dashboard', 640, 360, 0.5, 0.5, 1, this.group, this.game);
        
        // // crosshair
        // this.sprCrossHair = new CrossHair(1110, 550, this.group, this.game, 5);

        // this.dlgInstruction = newSprite('instruction', CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 0.5, 0.5, 10, this.group, this.game);
        // newButton('btn_close', 698, 80, 0.5, 0.5, 5, this.onClickClose, this, this.group, this.game, true, this.dlgInstruction, 0, 0, 1);
        // this.dlgInstruction.visible = false;

        playSound('audio_game_music', 0.1, true);
        Howler.mute(1-this.isSoundOn);

        // this.showRingScoreValues();
        // this.sort();
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
        this.player.jump();
        // if ( this.dlgInstruction.visible ) return;
        // if (this.cnt_darts == 0 || this.status !== GAMEPLAY_STATUS_CROSSHAIR) return;

        // if (this.sprCrossHair.takeValue()) {
        //     var temp = this.sprCrossHair.getValue();

        //     var x = temp.x,
        //         y = temp.y;

        //     this.direct_x = Math.round(x);
        //     this.direct_y = Math.round(y);
        //     if (EngagedNation.Config.Game.gameplay_always_win_mode) {
        //         var len = Math.sqrt(x*x + y*y);
        //         if (len >= 9.5) {
        //             x = x/len*9.4;
        //             y = y/len*9.4;
        //             this.direct_x = Math.round(x);
        //             this.direct_y = Math.round(y);
        //         }
        //     }
            
        //     this.setStatus(GAMEPLAY_STATUS_DART);
        //     new Dart(CANVAS_WIDTH/2+x*TARGET_WIDTH/20, CANVAS_HEIGHT/2-y*TARGET_HEIGHT/20, this.group, this.game, this.onDartFinished, this);
        // }
    },
    
    addScore: function(score) {
        this.score += score;
        var str = '00000'+this.score;
        this.lblScore.text = str.substr(-5);
    },

    removeDarts: function() {
        this.cnt_darts--;
        var str = '000'+this.cnt_darts;
        this.lblDarts.text = str.substr(-2);
        return this.cnt_darts == 0;
    },

    onDartFinished: function() {
        // var score = Math.round(Math.sqrt(this.direct_x*this.direct_x+this.direct_y*this.direct_y));
        // score = score < 10 ? this.ringScores[score] : 0;
        // this.addScore(score);
        // this.sort();

        // if (this.removeDarts()) {
        //     this.setStatus(GAMEPLAY_GAMEOVER);
        //     return;
        // }
        // this.setStatus(GAMEPLAY_STATUS_CROSSHAIR);
    },

    createOpponent: function(){
        this.opponent = new Opponent(CANVAS_WIDTH + 200, 800, this.group, this.game, this.onDartFinished, this);
    },

    createCoins: function(){

    },

    setStatus: function(status)     {
        this.status = status;
        switch (status) {
            case GAMEPLAY_STATUS_CROSSHAIR:
                this.sprCrossHair.start();
                break;
            case GAMEPLAY_STATUS_DART:
                break;
            case GAMEPLAY_GAMEOVER:
                this.gameOver();
                break;
        }
    },

    gameOver: function() {
        playSound('audio_game_over', 1, false);
        $(controller).trigger('post_message', {
            status: 'complete',
            score: this.score
        });
    },

    update: function() {
        this.bg1.x -= BG_SPEED;
        this.bg2.x -= BG_SPEED;
        
        if(this.bg1.x + this.bg1.width < 0){
            this.bg1.x = this.bg2.x + this.bg2.width
        }
        if(this.bg2.x + this.bg2.width < 0){
            this.bg2.x = this.bg1.x + this.bg1.width
        }
        
        this.player.update();

        this.count++;

        if(this.opponent.sprite.x < -200){
            this.opponent.destroy();
            this.createOpponent();
        }
        this.opponent.update();

        if(this.count % 150 == 0){
            this.createCoins();
        }
    }
};
