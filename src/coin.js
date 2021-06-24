var Coin = function(posX, posY, _group, _game, _cb_owner) {
    this.posX = posX;
    this.posY = posY;
    this.game = _game;
    
    this.sprite = newSprite('coin', posX, posY, 0.5, 1, 1, _group, _game);
    this.anim = this.sprite.animations.add('selected');
    this.anim.loop = true;
    this.anim.play(20);

    var me = this;
}

Coin.prototype.update = function(bgSpeed){
    this.sprite.x -= bgSpeed;
}

Coin.prototype.destroy = function(){
    this.sprite.destroy();
}