enchant();
window.onload = function(){
    var socket;
    var roomId;
    var userName;
    var Game;
    socket = io.connect(location.origin);
    roomId = $("meta[name=roomId]").attr('content');
    userName = $("meta[name=userName]").attr('content');
    
    socket.emit('EnterRoom',{
        roomId : roomId,
        name : userName
    });
    
    socket.on('GameStart',function(data){
        console.log('GameStart');
        console.log(data);
    });
};