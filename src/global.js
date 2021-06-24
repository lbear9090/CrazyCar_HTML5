var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 720;

var BG_SPEED = 6;
var CAR_SPEED = 7;
var JUMP_POWER = 15;
var GRAVITY = 0.5;
var s_aSounds;

var s_bIsIphone = false;

var convertToNodeSpace = function(pos_x, pos_y, parent) {
    // lc = left_corner
    var pos_lc = {x: parent.worldPosition.x - parent.anchor.x * parent.width, y: parent.worldPosition.y - parent.anchor.y * parent.height};
    pos_x = pos_x - pos_lc.x;
    pos_y = pos_y - pos_lc.y;
    return {x: pos_x, y: pos_y};
};

var newButton = function(asset_name, pos_x, pos_y, anchor_x, anchor_y, z_order, callback, cb_owner, group, game, is_child, parent, over, out, down) {
    if (!is_child) is_child = false;
    if (!parent) parent = null;
    if (!over) over = 2;
    if (!out) out = 0;
    if (!down) down = 1;

    var button;
    if (is_child) {
        var anchor = parent.anchor;
        button = game.make.button(pos_x - parent.width*anchor.x, pos_y - parent.height*anchor.y, asset_name, callback, cb_owner, over, out, down);
        parent.addChild(button);
    } else {
        button = game.add.button(pos_x, pos_y, asset_name, callback, cb_owner, over, out, down);
        button.z_order = z_order;
        group.add(button);
    }

    button.onInputUp.add(
        function() {
            button.scale.setTo(1);
        },
        cb_owner
    );

    button.onInputDown.add(
        function() {
            button.scale.setTo(0.9);
        },
        cb_owner
    );

    button.anchor.x = anchor_x;
    button.anchor.y = anchor_y;

    return button;
};

var newSprite = function(asset_name, pos_x, pos_y, anchor_x, anchor_y, z_order, group, game, is_child, parent) {
    if (!is_child) is_child = false;
    if (!parent) parent = null;

    var sprite;
    // if child sprite
    if (is_child) {
        var anchor = parent.anchor;
        sprite = game.make.sprite(pos_x - parent.width*anchor.x, pos_y - parent.height*anchor.y, asset_name);
        parent.addChild(sprite);
    } else {
        sprite = game.add.sprite(pos_x, pos_y, asset_name);
        sprite.z_order = z_order;
        group.add(sprite);
    }    
    // Set anchor point
    sprite.anchor.x = anchor_x;
    sprite.anchor.y = anchor_y;
    
    return sprite;
};

var newLabel = function(text, font_size, font_name, color, pos_x, pos_y, anchor_x, anchor_y, z_order, group, game, shadow, is_child, parent, shadow_color, shadow_x, shadow_y, shadow_size) {
    if (!shadow) shadow = false;
    if (!is_child) is_child = false;
    if (!parent) parent = null;
    if (!shadow_color) shadow_color = 'rgba(0, 0, 0, 0.5)';
    if (!shadow_x) shadow_x = 5;
    if (!shadow_y) shadow_y = 5;
    if (!shadow_size) shadow_size = 5;

    var label;
    var style = {
        font: 'bold ' + font_size + 'px ' + font_name,
        fill: color,
        align: "center"
    };

    // if child sprite
    if (is_child) {
        var anchor = parent.anchor;
        label = game.make.text(pos_x - parent.width*anchor.x, pos_y - parent.height*anchor.y, text, style);
        parent.addChild(label);
    } else {
        label = game.add.text(pos_x, pos_y, text, style);
        label.z_order = z_order;
        group.add(label);
    }    
    
    // Set anchor point
    label.anchor.x = anchor_x;
    label.anchor.y = anchor_y;

    // Shadow
    if (shadow)
        label.setShadow(shadow_x, shadow_y, shadow_color, shadow_size);

    return label;
};

var convertSecondToMinute = function(second) {
    var mm = Math.floor(second / 60);
    var ss = second % 60;
    return (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss;
};

var readGameData = function(key, default_value) {
    if (localStorage[key]) {
        return localStorage[key];
    } else {
        saveGameData(key, default_value);
        return default_value;
    }
};

var saveGameData = function(key, value) {
    localStorage.setItem(key, value);
};

var playSound = function(szSound,iVolume,bLoop){
    s_aSounds[szSound].play();
    s_aSounds[szSound].volume(iVolume);

    s_aSounds[szSound].loop(bLoop);

    return s_aSounds[szSound];
};

function isIOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod' 
    ]; 
 
    if (navigator.userAgent.toLowerCase().indexOf("iphone") !== -1){
        s_bIsIphone = true;
    }
            
    while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){
            return true; 
        } 
    } 
    s_bIsIphone = false;
 
    return false; 
 }

function sizeHandler(){
    window.scrollTo(0, 1);

    var size = calculateLandscapeSize(EngagedNation.Config.Game.parent_width, EngagedNation.Config.Game.parent_height);

    $('#game').find('canvas').css(
        {
            width: size.width,
            height: size.height
        }
    );

}

function calculateLandscapeSize(width, height) {
    var windowWidth = width,
        windowHeight = height;

    var ratio = CANVAS_HEIGHT / CANVAS_WIDTH;
    var newWidth = CANVAS_WIDTH;
    var newHeight = CANVAS_HEIGHT;

    // Resize game width to the window width.
    if (CANVAS_WIDTH > windowWidth) {
        newWidth = windowWidth;
        newHeight = ratio * newWidth;
    }

    // If game height is greater than window height resize game to fit window.
    if (newHeight > windowHeight) {
        newHeight = windowHeight;
        newWidth = newHeight / ratio;
    }

    if (newHeight > windowHeight) {
        var heightDiff = newHeight - windowHeight;

        newWidth = Math.round(((newHeight - heightDiff) / newHeight) * newWidth);
        newHeight -= heightDiff;
    }

    if (newWidth > windowWidth) {
        var widthDiff = newWidth - windowWidth;

        newHeight = Math.round(((newWidth - widthDiff) / newWidth) * newHeight);
        newWidth -= widthDiff;
    }

    return {
        width: newWidth,
        height: newHeight
    }
}

$(window).resize(function() {
    sizeHandler();
});