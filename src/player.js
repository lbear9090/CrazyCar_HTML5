var Player = function(posX, posY, _group, _game, _cb_owner) {
    this.posX = posX;
    this.posY = posY;
    this.game = _game;
    this.speedY = 0;
    this.jumpCnt = 0;

    this.sprite = newSprite('playercar_red', posX, posY, 0.5, 1, 2, _group, _game);
    this.anim = this.sprite.animations.add('selected');
    this.anim.loop = true;
    var me = this;
}

Player.prototype.playAnim = function(isPlay){
    if(isPlay)
        this.anim.play(20);
    else
        this.anim.stop();
}
Player.prototype.jump = function(){
    if(this.jumpCnt < 2){
        this.speedY = JUMP_POWER;
        this.jumpCnt++;
    }
}

Player.prototype.update = function() {
    this.speedY -= GRAVITY;

    if(this.sprite.y - this.speedY > this.posY){
        this.speedY = 0;
        this.sprite.y = this.posY;
        this.jumpCnt = 0
    }
    
    this.sprite.y -= this.speedY;
}
