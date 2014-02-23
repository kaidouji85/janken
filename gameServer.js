var room = require('./room.js');

function gameServer(spec, my) {
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
        
        socket.on('disconnect',function(data){
            socket.get('loginInfo',function(err,data){
                var roomId = data.roomId;
                socket.leave(roomId);
                var clients = io.sockets.clients(roomId);
                for(var i in clients) {
                    clients[i].disconnect();
                }
                
            });            
        });
    });
    
    return io;
};

module.exports = gameServer;