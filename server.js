function server(spec, my) {
    var app = spec.httpServer;
    var logLevel = spec.logLevel || 1;
    var io = require('socket.io').listen(app, {
        'log level' : logLevel
    });
    
    var roomArray = {};
    for(var i = 0; i < 100; i++){
        roomArray[i] = room();
    }
    
    io.sockets.on('connection', function(socket) {
        socket.on('EnterRoom',function(data){
            var roomId = data.roomId;
            var name = data.name;
            var loginInfo = {
                roomId : roomId,
                name : name
            };
            socket.set('loginInfo',loginInfo,function(){
                roomArray[roomId].join(name);
                socket.join(roomId);
                if(roomArray[roomId].isStartGame()){
                    var ret = {
                        players : roomArray[roomId].getPlayers()
                    };
                    io.sockets.in(roomId).emit('GameStart', ret);    
                }                
            });
            

        });
        
        socket.on('Janken',function(data){
            var hand = data;
            socket.get('loginInfo',function(err,data){
                var roomId = data.roomId;
                var name = data.name;
                roomArray[roomId].setHand({
                    name : name,
                    hand : hand
                });
                if(roomArray[roomId].isStartJanken()){
                    var ret = roomArray[roomId].doJanken();
                    io.sockets.in(roomId).emit('Result', ret);
                }
            });
        });
    });
    
    return io;
};

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
        return ret;
    };
    
    function getWinnerName(result){
        if(result===1){
            return inPlayers[0];
        } else if(result===2) {
            return inPlayers[1];
        }
    }
    
    return that;
}

module.exports = server;