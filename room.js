var janken = require('./janken.js');
function room(){
    var that = {};
    var inPlayers = [];
    var handBuffer = {};
    
    that.Janken = janken();
    
    that.join = function(name){
        inPlayers.push(name);
    };
    
    that.isStartGame = function(){
        if(inPlayers.length === 2){
            return true;
        }  else {
            return false;
        }
    };
    
    that.getPlayers = function(){
        inPlayers.sort();
        return inPlayers;
    };
    
    that.setHand = function(data){
        var name = data.name;
        var hand = data.hand;
        handBuffer[name] = hand;
    };
    
    that.isStartJanken = function(){
        if(Object.keys(handBuffer).length===2){
            return true;
        } else {
            return false;
        }
    };
    
    that.doJanken = function(){
        var player1 = inPlayers[0];
        var player2 = inPlayers[1];
        var player1Hand = handBuffer[player1];
        var player2Hand = handBuffer[player2];

        var result = that.Janken.play({
            player1 : player1Hand,
            player2 : player2Hand
        });
        var winner = getWinnerName(result);
        var ret = {
            result : winner};
        ret[player1] = player1Hand;
        ret[player2] = player2Hand;
        handBuffer = {};
        return ret;
    };
    
    function getWinnerName(result){
        if(result===1){
            return inPlayers[0];
        } else if(result===2) {
            return inPlayers[1];
        } else {
            return null;
        }
    }
    
    return that;
}

module.exports = room;