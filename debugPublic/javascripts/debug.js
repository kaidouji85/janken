enchant();
window.onload = function(){
    var Game = game({
        playerName : 'プレイヤー',
        enemyName : '敵'
    });
    Game.start();
    
    Game.onThrowHand(function(hand){
        Game.emitJankenResult({
            'result' : 'プレイヤー',
            'プレイヤー' : hand,
            '敵' : Game.ROCK
        });
    });
};