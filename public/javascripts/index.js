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
        /*
        var enemyName = getEnemyName(userName,data.players);
        var Gmae = game({
            player : userName,
            enemy : enemyName
        });
        */
    });
    
    /*
    function getEnemyName(playerName,players) {
        var enemyName;
        for(var i in players){
            if(players[i]!==userName){
                enemyName = players[i];
                break;
            }
        }
        return enemyName;
    }
    */
};