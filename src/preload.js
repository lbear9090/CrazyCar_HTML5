var cnt_files = 0;
var cnt_loaded_files = 0;

var Preload = {
    game: controller.game,
    lblProgress: {},

    init: function() {
        this.game.renderer.renderSession.roundPixels = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
    },

    preload: function() {

    },
    
    create: function() {
        this.game.stage.backgroundColor = 'black';
        this.group = this.game.add.group();
        this.lblProgress = newLabel('', 20, "Arial", 'white', CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 0.5, 0.5, 1, this.group, this.game);

        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
        
        this.start();
    },
    
    start: function() {
        cnt_files = 0;
        this.loadImage("background",		        EngagedNation.Config.Game.img_background);
        this.loadImage("coin",			        EngagedNation.Config.Game.img_coin, true, 36, 36, 6);
        this.loadImage("framescore",		        EngagedNation.Config.Game.img_framescore);
        this.loadImage("framestars",		        EngagedNation.Config.Game.img_framestars);
        this.loadImage("oil_slick",		            EngagedNation.Config.Game.img_oil_slick);
        this.loadImage("playercar_red",			    EngagedNation.Config.Game.img_playercar_red, true, EngagedNation.Config.Game.gameplay_player_width, EngagedNation.Config.Game.gameplay_player_height, 3);
        this.loadImage("btn_sound",			        EngagedNation.Config.Game.img_soundbtn, true, 114, 120, 2);
        this.loadImage("touchtostart",		        EngagedNation.Config.Game.img_touchtostart);
        this.loadImage("traffic_car_1",			EngagedNation.Config.Game.img_traffic_car_1, true, EngagedNation.Config.Game.gameplay_opponent1_width, EngagedNation.Config.Game.gameplay_opponent1_height, 3);
        this.loadImage("traffic_car_2",			EngagedNation.Config.Game.img_traffic_car_2, true, EngagedNation.Config.Game.gameplay_opponent2_width, EngagedNation.Config.Game.gameplay_opponent2_height, 3);
        this.loadImage("traffic_car_3",			EngagedNation.Config.Game.img_traffic_car_3, true, EngagedNation.Config.Game.gameplay_opponent3_width, EngagedNation.Config.Game.gameplay_opponent3_height, 3);
        this.loadImage("traffic_car_4",			EngagedNation.Config.Game.img_traffic_car_4, true, EngagedNation.Config.Game.gameplay_opponent4_width, EngagedNation.Config.Game.gameplay_opponent4_height, 3);
        this.loadImage("traffic_car_5",			EngagedNation.Config.Game.img_traffic_car_5, true, EngagedNation.Config.Game.gameplay_opponent5_width, EngagedNation.Config.Game.gameplay_opponent5_height, 3);

        var aSoundsInfo = [];
        aSoundsInfo.push({filename: EngagedNation.Config.Game.audio_button,		loop: false, volume: 1, ingamename: "audio_button"});
        aSoundsInfo.push({filename: EngagedNation.Config.Game.audio_coin,		loop: false, volume: 1, ingamename: "audio_coin"});
        aSoundsInfo.push({filename: EngagedNation.Config.Game.audio_crash,		loop: false, volume: 1, ingamename: "audio_crash"});
        aSoundsInfo.push({filename: EngagedNation.Config.Game.audio_game_music,	loop: false, volume: 1, ingamename: "audio_game_music"});
        aSoundsInfo.push({filename: EngagedNation.Config.Game.audio_gameover,	loop: false, volume: 1, ingamename: "audio_gameover"});
        aSoundsInfo.push({filename: EngagedNation.Config.Game.audio_go,		    loop: false, volume: 1, ingamename: "audio_go"});
        aSoundsInfo.push({filename: EngagedNation.Config.Game.audio_jump,		loop: false, volume: 1, ingamename: "audio_jump"});
        aSoundsInfo.push({filename: EngagedNation.Config.Game.audio_silent,		loop: false, volume: 1, ingamename: "audio_silent"});

        cnt_files += aSoundsInfo.length;

        s_aSounds = [];
        for(var i=0; i<aSoundsInfo.length; i++){
            s_aSounds[aSoundsInfo[i].ingamename] = 
                new Howl({ 
                    src: [aSoundsInfo[i].filename+'.mp3', aSoundsInfo[i].path+aSoundsInfo[i].filename+'.ogg'],
                    autoplay: false,
                    preload: true,
                    loop: aSoundsInfo[i].loop, 
                    volume: aSoundsInfo[i].volume,
                    onload: this.fileComplete()
                });
        }

        cnt_loaded_files = 0;
        this.game.load.start();
    },

    loadSound: function(name, path) {
        cnt_files++;
        this.game.load.audio(name, [path]);
    },

    loadImage: function(name, path, spritesheet, width, height, cnt) {
        if (!spritesheet) spritesheet = false;
        if (!width) width = -1;
        if (!height) height = -1;
        if (!cnt) cnt = -1;

        cnt_files++;
        if (!spritesheet) {
            this.game.load.image(name, path);
        } else {
            this.game.load.spritesheet(name, path, width, height, cnt);
        }
    },

    loadStart: function() {
        this.lblProgress.text = 'Loading: 0%';
        this.start();
    },

    fileComplete: function() {
        cnt_loaded_files++;
        this.lblProgress.text = 'Loading: ' + Math.floor(cnt_loaded_files/cnt_files * 100) + '%';
    },
    
    loadComplete: function() {
        controller.goToScene('GamePlay');
    }
};
