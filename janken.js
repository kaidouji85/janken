function janken(){
    var that = {};
    
    that.ROCK = 1;
    that.SCISSORS = 2;
    that.PAPER = 3;
    
    that.play = function(command){
        var player1 = command.player1;
        var player2 = command.player2;
        var ret = 0;
        
        if(player1===that.ROCK && player2===that.SCISSORS) {
            ret = 1;
        } else if(player1===that.SCISSORS && player2===that.PAPERS) {
            ret = 1;
        } else if(player1===that.PAPERS && player2===that.ROCK) {
            ret = 1;
        } else if(player1===that.SCISSORS && player2===that.ROCK) {
            ret = 2;
        } else if(player1===that.PAPERS && player2===that.SCISSORS) {
            ret = 2;
        } else if(player1===that.ROCK && player2===that.PAPERS) {
            ret = 2;
        } else if(player1===player2) {
            ret = 0;
        }
        return ret;
    };
    
    return that;
}

module.exports = janken;
