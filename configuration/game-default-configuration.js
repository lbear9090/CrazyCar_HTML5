'use strict';

var EngagedNation = {};
EngagedNation.Config = {};
EngagedNation.Config.Game = {};
EngagedNation.Config.DocumentWidth = $(document).width();

(
    function($) {
        /**
         * Define all possible default game configurations
         * @type {{}}
         */
        EngagedNation.Config.Game = {
            audio_button     : './resources/sounds/buttons_sound',
            audio_coin : './resources/sounds/coin_sound',
            audio_crash : './resources/sounds/crash_sound',
            audio_game_music  : './resources/sounds/game_music',
            audio_gameover: './resources/sounds/gameover_sound',
            audio_go: './resources/sounds/go_sound',
            audio_jump: './resources/sounds/jump_sound',
            audio_silent: './resources/sounds/silent',

            img_background  : './resources/images/gamebackground.png',
            img_coin            : './resources/images/coin.png',
            img_framescore      : './resources/images/framescore.png',
            img_framestars      : './resources/images/framestars.png',
            img_oil_slick       : './resources/images/oil_slick.png',
            img_playercar_red   : './resources/images/playercar_red.png',
            img_soundbtn        : './resources/images/soundbtn.png',
            img_touchtostart    : './resources/images/touchtostart.png',
            img_traffic_car_1   : './resources/images/traffic_car_1.png',
            img_traffic_car_2   : './resources/images/traffic_car_2.png',
            img_traffic_car_3   : './resources/images/traffic_car_3.png',
            img_traffic_car_4   : './resources/images/traffic_car_4.png',
            img_traffic_car_5   : './resources/images/traffic_car_5.png',
                        
            gameplay_level_font : 'digital',
            gameplay_level_font_size: 40,
            gameplay_level_font_color: 'lightgreen',

            gameplay_jump_font : 'digital',
            gameplay_jump_font_size: 40,
            gameplay_jump_font_color: 'lightgreen',

            gameplay_score_font : 'digital',
            gameplay_score_font_size: 40,
            gameplay_score_font_color: 'lightgreen',

            gameplay_player_width: 172,
            gameplay_player_height: 73,

            gameplay_opponent1_width: 167,
            gameplay_opponent1_height: 67,
            
            gameplay_opponent2_width: 165,
            gameplay_opponent2_height: 65,

            gameplay_opponent3_width: 150,
            gameplay_opponent3_height: 67,

            gameplay_opponent4_width: 166,
            gameplay_opponent4_height: 67,

            gameplay_opponent5_width: 165,
            gameplay_opponent5_height: 71,

            gameplay_ground_level_y_coordinate: 500,

            parent_width: (typeof window.screen.availWidth === 'undefined' && window.screen.availWidth > 0) ? window.screen.availWidth : $(window).width(),
            parent_height: (typeof window.screen.availHeight === 'undefined' && window.screen.availHeight > 0) ? window.screen.availHeight : $(window).height()
        };
    }(jQuery)
);
