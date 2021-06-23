var Dart = function(_target_x, _target_y, _group, _game, _callback, _cb_owner) {
    this.target_x = _target_x;
    this.target_y = _target_y;
    this.game = _game;

    this.sprite = newSprite('dart', _target_x, 1360, 0.5, 0.868, 1, _group, _game);
    this.anim = this.sprite.animations.add('selected');

    setTimeout(
        function() {
            playSound('audio_dart_thud', 1, false);
            me.anim.play(90 );
            me.anim.onComplete.add(
                function() {
                    _callback.call(_cb_owner);
                }
            );
        },
        150
    );

    var me = this;
    var tween = this.game.add.tween(this.sprite).to( {y: _target_y}, 300, Phaser.Easing.None, true, 0);
}