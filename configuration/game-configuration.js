/**
 * Set up Game Configurations.
 */
'use strict';

var EngagedNation = EngagedNation || {};
EngagedNation.Config = EngagedNation.Config || {};
EngagedNation.Config.Game = EngagedNation.Config.Game || {};

(
    function($) {
        /**
         * @param {{}} configuration
         * @constructor
         */
        function GameConfiguration(configuration) {
            this.addMessageEventListener();
        }

        GameConfiguration.prototype = $.extend(
            GameConfiguration.prototype,
            {
                /**
                 * Process param configuration to override existing matched configs.
                 * @param {{}} configuration
                 */
                setConfig: function(configuration) {
                    if ($.isEmptyObject(EngagedNation.Config.Game)) {
                        this.displayLog('Configuration is not set.');
                        return;
                    }

                    $.each(
                        EngagedNation.Config.Game,
                        function(parentKey, parentValue) {
                            if (configuration.hasOwnProperty(parentKey)) {
                                EngagedNation.Config.Game[parentKey] = configuration[parentKey];
                                return true;
                            }
                        }
                    );
                },

                /**
                 * @param {string|{}} variable
                 */
                getType: function(variable) {
                    return $.type(variable);
                },

                getKeyAlias: function(name1, name2, name3) {
                    var appendName3 = '';
                    if (name3) {
                        appendName3 = '_' + name3;
                    }

                    return name1 + '_' + name2 + appendName3;
                },

                /**
                 * Add window event message listener.
                 */
                addMessageEventListener: function() {
                    var self = this;
                    self.addPostMessage({status: "loading"});
                    
                    $(window).on('message', function(event) {
                        var configuration = EngagedNation.Config.Game;
                        
                        event = event.originalEvent;
                        if (event.data.hasOwnProperty('en_game_config')) {
                            configuration = self.setType(event.data.en_game_config);
                            self.setConfig(configuration);
                            self.displayGame(configuration);
                        }

                        if (event.data.hasOwnProperty('resize')) {
                            EngagedNation.Config.Game.parent_width = event.data.resize.parent_width;
                            EngagedNation.Config.Game.parent_height = event.data.resize.parent_height;
                            sizeHandler();
                        }
                    });
                    
                    self.addPostMessage({status: "configuration-ready"});
                },

                /**
                 * Add game complete event listener
                 * @param {{}} element
                 */
                addPostMessageEventListener: function(element) {
                    var self = this;
                    $(element).on("post_message", function(evt, data) {
                        self.addPostMessage(data);
                    });
                },

                /**
                 * Post to iframe
                 * @param {{}} data
                 */
                addPostMessage: function(data) {
                    parent.postMessage(
                        {
                            game: data
                        },
                        '*'
                    );
                },

                /**
                 * Display game.
                 * @param {{}} configuration
                 */
                displayGame: function(configuration) {
                    var self = this;
                    setTimeout(
                        function() {
                            $('.loading').remove();
            
                            controller.createGame();
                            self.addPostMessageEventListener(controller);
                            self.addPostMessage({status: "loaded"});

                            if(isIOS()){
                                // seems that ios need a little delay for resize after the game is loaded
                                setTimeout(
                                    function(){
                                        sizeHandler();
                                    },200
                                );
                                return;
                            }

                            sizeHandler();
                        },
                        500
                    );
                },

                /**
                 * @param data
                 * @returns {{}}
                 */
                setType: function(data) {
                    if (typeof data === 'object') {
                        return data;
                    }

                    return JSON.parse(data);
                },

                /**
                 * Display message on console.
                 * @param {string} message
                 */
                displayLog: function(message) {
                    console.log(message);
                }
            }
        );

        new GameConfiguration();
    }(jQuery)
);
