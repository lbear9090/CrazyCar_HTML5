var GAMEPLAY_STATUS_CROSSHAIR = 0;
var GAMEPLAY_STATUS_DART = 1;
var GAMEPLAY_GAMEOVER = 2;

var GamePlay = {
    game: controller.game,
    cnt_darts: 0,
    score: 0,
    ringScores: [],
    direct_x: -1,
    direct_y: -1,
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
    },

    createUI: function() {
        var me = this;
        this.group = this.game.add.group();
        
        // bg
        var bg = newSprite('background',  0, -1080, 0, 0, 1, this.group, this.game);
        // bg.inputEnabled = true;
        // bg.input.priorityID = 0;
        // bg.events.onInputDown.add(this.onTap, this);

        // if (this.game.device.touch)
        //     this.game.input.mouse.stop();

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

        // this.isSoundOn = readGameData('sound', 1);
        // if (this.isSoundOn == 0) {
        //     this.btnSound = newButton('btn_audio', 1230, 50, 0.5, 0.5, 5, this.onClickSound, this, this.group, this.game, false, null, 1, 1, 0);
        // } else {
        //     this.btnSound = newButton('btn_audio', 1230, 50, 0.5, 0.5, 5, this.onClickSound, this, this.group, this.game, false, null, 0, 0, 1);
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

    showRingScoreValues: function() {
        this.ringScores[0] = EngagedNation.Config.Game.gameplay_ring_j_score;
        this.ringScores[1] = EngagedNation.Config.Game.gameplay_ring_i_score;
        this.ringScores[2] = EngagedNation.Config.Game.gameplay_ring_h_score;
        this.ringScores[3] = EngagedNation.Config.Game.gameplay_ring_g_score;
        this.ringScores[4] = EngagedNation.Config.Game.gameplay_ring_f_score;
        this.ringScores[5] = EngagedNation.Config.Game.gameplay_ring_e_score;
        this.ringScores[6] = EngagedNation.Config.Game.gameplay_ring_d_score;
        this.ringScores[7] = EngagedNation.Config.Game.gameplay_ring_c_score;
        this.ringScores[8] = EngagedNation.Config.Game.gameplay_ring_b_score;
        this.ringScores[9] = EngagedNation.Config.Game.gameplay_ring_a_score;
        
        for (var i = 1 ; i < 10 ; i++) {
            if (EngagedNation.Config.Game.gameplay_horizontal_score_display) {
                newLabel(this.ringScores[i].toString(), 20, 'Arial', i % 2 == 0 ? 'black' : 'white', 260-i*23, 269, 0.5, 0.5, 3, this.group, this.game, false, true, this.sprTarget);
                newLabel(this.ringScores[i].toString(), 20, 'Arial', i % 2 == 0 ? 'black' : 'white', 260+i*23, 269, 0.5, 0.5, 3, this.group, this.game, false, true, this.sprTarget);
            }
            if (EngagedNation.Config.Game.gameplay_vertical_score_display) {
                newLabel(this.ringScores[i].toString(), 20, 'Arial', i % 2 == 0 ? 'black' : 'white', 260, 269-i*23, 0.5, 0.5, 3, this.group, this.game, false, true, this.sprTarget);
                newLabel(this.ringScores[i].toString(), 20, 'Arial', i % 2 == 0 ? 'black' : 'white', 260, 269+i*23, 0.5, 0.5, 3, this.group, this.game, false, true, this.sprTarget);
            }
        }
    },

    sort: function() {
        this.group.sort('z_order', Phaser.Group.SORT_ASCENDING);
    },
    
    onTap: function() {
        if ( this.dlgInstruction.visible ) return;
        if (this.cnt_darts == 0 || this.status !== GAMEPLAY_STATUS_CROSSHAIR) return;

        if (this.sprCrossHair.takeValue()) {
            var temp = this.sprCrossHair.getValue();

            var x = temp.x,
                y = temp.y;

            this.direct_x = Math.round(x);
            this.direct_y = Math.round(y);
            if (EngagedNation.Config.Game.gameplay_always_win_mode) {
                var len = Math.sqrt(x*x + y*y);
                if (len >= 9.5) {
                    x = x/len*9.4;
                    y = y/len*9.4;
                    this.direct_x = Math.round(x);
                    this.direct_y = Math.round(y);
                }
            }
            
            this.setStatus(GAMEPLAY_STATUS_DART);
            new Dart(CANVAS_WIDTH/2+x*TARGET_WIDTH/20, CANVAS_HEIGHT/2-y*TARGET_HEIGHT/20, this.group, this.game, this.onDartFinished, this);
        }
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
        var score = Math.round(Math.sqrt(this.direct_x*this.direct_x+this.direct_y*this.direct_y));
        score = score < 10 ? this.ringScores[score] : 0;
        this.addScore(score);
        this.sort();

        if (this.removeDarts()) {
            this.setStatus(GAMEPLAY_GAMEOVER);
            return;
        }
        this.setStatus(GAMEPLAY_STATUS_CROSSHAIR);
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
        // this.sprCrossHair.update();
    }
};
