
var CrossHair = function(_pos_x, _pos_y, _group, _game, _z_index) {
    this.game = _game;
    this.z_index = _z_index;

    this.swing_direction = 1;
    
    var sprBg = newSprite('crosshair_bg', _pos_x, _pos_y, 0.5, 0.5, 1, _group, _game);
    var sprRoad = newSprite('crosshair_road', 171.5-CH_ROAD_WIDTH/2, 171.5-CH_ROAD_HEIGHT/2, 0, 0, 2, _group, _game, true, sprBg);

    this.sprBallV = newSprite('crosshair_ball', CH_CENTER_POS_X, CH_CENTER_POS_Y, 0.5, 0.5, 2, _group, _game, true, sprRoad);
    this.sprBallH = newSprite('crosshair_ball', CH_CENTER_POS_X, CH_CENTER_POS_Y, 0.5, 0.5, 2, _group, _game, true, sprRoad);

    this.setStatus(CH_STATUS_PAUSE);
    this.setStatus(CH_STATUS_HORIZONTAL);

    return this;
};

CrossHair.prototype.start = function() {
    this.setStatus(CH_STATUS_PAUSE);
    this.setStatus(CH_STATUS_HORIZONTAL);
};

CrossHair.prototype.setStatus = function(status) {
    this.status = status;
    switch (status) {
        case CH_STATUS_PAUSE:
            this.sprBallH.visible = false;
            this.sprBallV.visible = false;

            break;
        case CH_STATUS_HORIZONTAL:
            this.swing_direction = 1;
            
            this.sprBallH.x = CH_CENTER_POS_X;
            this.sprBallH.y = CH_CENTER_POS_Y;

            this.sprBallH.visible = true;
            this.sprBallV.visible = false;

            break;
        case CH_STATUS_VERTICAL:
            this.swing_direction = 1;
            
            this.sprBallV.x = CH_CENTER_POS_X;
            this.sprBallV.y = CH_CENTER_POS_Y;
            
            this.sprBallV.visible = true;

            break;
        case CH_STATUS_HOLD:
            break;
    }
};

CrossHair.prototype.takeValue = function() {
    switch (this.status) {
        case CH_STATUS_HORIZONTAL:
            this.setStatus(CH_STATUS_VERTICAL);
            break;

        case CH_STATUS_VERTICAL:
            this.setStatus(CH_STATUS_HOLD);
            break;
    }

    return this.status == CH_STATUS_HOLD;
};

CrossHair.prototype.getValue = function() {
    var temp = {};
    temp.x = (this.sprBallH.x - CH_CENTER_POS_X)/((CH_ROAD_WIDTH-55)/2) * 10;
    temp.y = (CH_CENTER_POS_Y - this.sprBallV.y)/((CH_ROAD_HEIGHT-55)/2) * 10;

    return temp;
};

CrossHair.prototype.update = function() {
    switch (this.status) {
        case CH_STATUS_HORIZONTAL: {
            var xx = this.sprBallH.x;
            var delta = this.swing_direction * CH_SPEED;
            var next_xx = xx + delta;

            if (this.swing_direction == -1) {
                if (next_xx > CH_CENTER_POS_X - (CH_ROAD_WIDTH-55)/2) {
                    this.sprBallH.x = next_xx;
                } else {
                    this.sprBallH.x = CH_CENTER_POS_X - (CH_ROAD_WIDTH-55)/2 + 1;
                    this.swing_direction = 1;
                }
            }
            if (this.swing_direction == 1) {
                if (next_xx < CH_CENTER_POS_X + (CH_ROAD_WIDTH-55)/2) {
                    this.sprBallH.x = next_xx;
                } else {
                    this.sprBallH.x = CH_CENTER_POS_X + (CH_ROAD_WIDTH-55)/2 - 1;
                    this.swing_direction = -1;
                }
            }

            break;
        }
        case CH_STATUS_VERTICAL: {
            var yy = this.sprBallV.y;
            var delta = this.swing_direction * CH_SPEED;
            var next_yy = yy + delta;

            if (this.swing_direction == -1) {
                if (next_yy > CH_CENTER_POS_Y - (CH_ROAD_HEIGHT-55)/2) {
                    this.sprBallV.y = next_yy;
                } else {
                    this.sprBallV.y = CH_CENTER_POS_Y - (CH_ROAD_HEIGHT-55)/2 + 1;
                    this.swing_direction = 1;
                }
            }
            if (this.swing_direction == 1) {
                if (next_yy < CH_CENTER_POS_Y + (CH_ROAD_HEIGHT-55)/2) {
                    this.sprBallV.y = next_yy;
                } else {
                    this.sprBallV.y = CH_CENTER_POS_Y + (CH_ROAD_HEIGHT-55)/2 - 1;
                    this.swing_direction = -1;
                }
            }
            break;
        }
    }
}

// Candy.prototype.changeToPowerup = function(row, col, powerup_id) {
//     let _powerup = this.powerup;
//     this.powerup = powerup_id;
//     console.log(this.powerup);
//     if (this.powerup == 1) {
//         if (_powerup == 3) {
//             this.label.destroy();
//             this.candy.destroy();
//             let pos = GamePlay.convertRCtoXY(row, col);
//             this.candy = newSprite('gem0'+(this.index+1), pos.x, pos.y, 0.5, 0.5, 1, this.game, true, this.parent);
//             this.candy.animations.add('selected');
//         }
//         this.ray1 = newSprite('powerup1', this.candy.width/2, this.candy.height/2, 0.5, 0.5, 2, this.game, true, this.candy);
//         this.ray2 = newSprite('powerup1', this.candy.width/2, this.candy.height/2, 0.5, 0.5, 2, this.game, true, this.candy);
//         this.game.add.tween(this.ray1).to({angle: '+360'}, 1000, Phaser.Easing.Linear.None, true, 0).loop(true);
//         this.game.add.tween(this.ray2).to({angle: '-360'}, 1000, Phaser.Easing.Linear.None, true, 0).loop(true);        
//         this.ray1.alpha = 0.5;
//         this.ray2.alpha = 0.5;

//     } else {
//         let pos = GamePlay.convertRCtoXY(row, col);
//         this.candy.destroy();
//         if (this.powerup == 3) this.label.destroy();
//         this.candy = newSprite('powerup2', pos.x, pos.y, 0.5, 0.5, 1, this.game, true, this.parent);
//         this.candy.animations.add('powerup2_anim');
//         this.candy.animations.play('powerup2_anim', 30, true);
//         this.index = CNT_CANDIES + 1;
//     }
// };

// Candy.prototype.startAnimation = function(callback) {
//     this.candy.scale.setTo(0);
//     let tween = this.game.add.tween(this.candy.scale).to( {x: 1, y: 1}, 300, Phaser.Easing.Bounce.Out, true, 0);
//     if (callback)
//         tween.onComplete.add(callback, GamePlay);
// };

// Candy.prototype.blastAnimation = function(callback, cb_owner) {
//     let self = this;

//     let tween = this.game.add.tween(this.candy.scale).to( {x: 0, y: 0}, 300, Phaser.Easing.Bounce.Out, true, 0);
//     tween.onComplete.add(function() {
//         callback.call(cb_owner);
//         if (self.powerup == 3) self.label.destroy();
//         if (self.powerup == 1) {
//             self.ray1.destroy();
//             self.ray2.destroy();
//         }
//         self.candy.destroy();
//         delete self;
//     });
// };

// Candy.prototype.explodeAnimation = function(callback, cb_owner) {
//     let self = this;

//     if (this.powerup == 1) {
//         playSound('explode', 1, false);
//         let explode = newSprite('explode', 0, 0, 0.5, 0.5, 1, this.game, true, this.parent);
//         explode.x = this.candy.x;
//         explode.y = this.candy.y;
//         let anim = explode.animations.add('explode');
//         anim.play(50);
//         anim.onComplete.add(function() {
//             callback.call(cb_owner);
//             explode.destroy();
//         });
//     } else {
//         let init_angle = Math.floor(Math.random()*180);
//         for (let i = 0 ; i < 3 ; i++) {
//             let piece = newSprite('piece0'+(this.index+1), 0, 0, 0.5, 0.5, 1, this.game, true, this.parent);
//             piece.x = this.candy.x;
//             piece.y = this.candy.y;

//             let angle = init_angle + i*120;
//             let target_x_1 = piece.x + Math.cos(Math.PI * angle/180)*50;
//             let target_y_1 = piece.y + Math.sin(Math.PI * angle/180)*50;
            
//             let tween = this.game.add.tween(piece).to( {x: target_x_1, y: target_y_1}, 300, Phaser.Easing.Linear.None, true, 0);
//             tween.onComplete.add(function() {
//                 if (i == 2) {
//                     callback.call(cb_owner);
//                 }
//                 piece.destroy();
//             });
//         }
//     }
//     this.candy.destroy();
//     if (this.powerup == 3) this.label.destroy();
//     if (this.powerup == 1) {
//         this.ray1.destroy();
//         this.ray2.destroy();
//     }
//     delete this;
// };

// Candy.prototype.selected = function() {
//     this.released();
//     if (this.powerup < 2) {
//         this.candy.animations.play('selected', 30, true);
//     }
//     this.sprSelected = newSprite('sprSelected', this.candy.width/2, this.candy.height/2, 0.5, 0.5, 1, this.game, true, this.candy);
// };

// Candy.prototype.released = function() {
//     if (this.sprSelected) {
//         this.sprSelected.destroy();
//         if (this.powerup < 2) {
//             this.candy.animations.stop();
//             this.candy.frame = 0;
//         }
//     }
// };

// Candy.prototype.moveTo = function(pos, completecallback, is_fall = false) {
//     let tween = this.game.add.tween(this.candy).to( { x: pos.x, y: pos.y }, 100, is_fall ? Phaser.Easing.Bounce.Out : Phaser.Easing.Linear.None, true, 0);
//     tween.onComplete.add(completecallback, GamePlay);
// };
