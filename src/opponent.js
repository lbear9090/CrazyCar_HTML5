var Opponent = function(posX, posY, _group, _game, _cb_owner) {
    this.posX = posX;
    this.posY = posY;
    this.game = _game;

    this.type = Math.floor(Math.random()*6)
    this.speedX = 0;
    
    if(this.type == 0){
        this.sprite = newSprite('oil_slick', posX, posY+50, 0.5, 1, 1, _group, _game);
        this.speedX = 0;
    }else{
        this.sprite = newSprite('traffic_car_' + this.type, posX, posY, 0.5, 1, 1, _group, _game);
        this.anim = this.sprite.animations.add('selected');
        this.anim.loop = true;
        this.anim.play(20);
        this.speedX = CAR_SPEED;
    }
    var me = this;
}

Opponent.prototype.update = function(bgSpeed){
    this.sprite.x -= (bgSpeed + this.speedX);
}

Opponent.prototype.destroy = function(){
    this.sprite.destroy();
}