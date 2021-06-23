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
            
            gameplay_darts       : 10,
            gameplay_start_score : 0,

            text_score   : 'SCORE',
            text_darts   : 'DARTS',


            gameplay_ring_a_score: 1,
            gameplay_ring_b_score: 2,
            gameplay_ring_c_score: 3,
            gameplay_ring_d_score: 4,
            gameplay_ring_e_score: 5,
            gameplay_ring_f_score: 6,
            gameplay_ring_g_score: 7,
            gameplay_ring_h_score: 8,
            gameplay_ring_i_score: 9,
            gameplay_ring_j_score: 10,
            
            gameplay_horizontal_score_display: true,
            gameplay_vertical_score_display: true,
            gameplay_always_win_mode: true,
            gameplay_header_visible: true,

            text_font: 'digital',

            parent_width: (typeof window.screen.availWidth === 'undefined' && window.screen.availWidth > 0) ? window.screen.availWidth : $(window).width(),
            parent_height: (typeof window.screen.availHeight === 'undefined' && window.screen.availHeight > 0) ? window.screen.availHeight : $(window).height()
        };
    }(jQuery)
);
