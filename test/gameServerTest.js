var assert = require('chai').assert;
var io = require('socket.io-client');
var SERVER_PORT = 3000;
var SERVER_URL = 'http://localhost';
var server = require('../server.js');
var ROCK = 1;
var SCISSORS = 2;
var PAPER = 3;

describe('ゲームサーバ',function(){    
    var GameServer;
    var option = {
        'force new connection' : true,
         port : SERVER_PORT
    };
    
    before(function(){
        var app = require('http').createServer().listen(SERVER_PORT);
        var gameServer = require('../gameServer.js');
        GameServer = gameServer({
            httpServer : app
        });        
    });
    
    var complates;
    beforeEach(function(){
         complates = {};
    });
    
    function complateCLient(index) {
        complates[index] = "";
    }

    function isFinishTest() {
        if (Object.keys(complates).length === 2) {
            return true;
        } else {
            return false;
        }
    }


    it('２人が入室したのでサーバがGameStartを送信する',function(done){
        var client1 = io.connect(SERVER_URL,option);
        client1.emit('EnterRoom',{roomId:1,name:'tarou'});
        client1.on('GameStart',function(data){
            assertOfGameStartData(data);
            complateCLient(1);
            if (isFinishTest()) {
                done();
            }
        });
        
        var client2 = io.connect(SERVER_URL,option);
        client2.emit('EnterRoom',{roomId:1,name:'jiro'});
        client2.on('GameStart',function(data){
            assertOfGameStartData(data);
            complateCLient(2);
            if (isFinishTest()) {
                done();
            }
        });
        
        function assertOfGameStartData(data){
            var expect = {
                players : ['jiro','tarou']
            };
            assert.deepEqual(data,expect,'GameStartレスポンスオブジェクトが正しい');
        }
    });
    
    it('2人がジャンケンの手をサーバに送信したら勝敗結果とお互いが出した手が返される',function(done){
        var client1 = io.connect(SERVER_URL,option);
        client1.emit('EnterRoom',{roomId:2,name:'tarou'});
        client1.on('GameStart',function(data){
            client1.emit('Janken',ROCK);
            client1.on('Result',function(data){
                assertOfResultData(data);
                complateCLient(1);
                if(isFinishTest()){
                    done();
                }
            });
        });
        
        var client2 = io.connect(SERVER_URL,option);
        client2.emit('EnterRoom',{roomId:2,name:'jiro'});
        client2.on('GameStart',function(data){
            client2.emit('Janken',SCISSORS);
            client2.on('Result',function(data){
                assertOfResultData(data);
                complateCLient(2);
                if(isFinishTest()){
                    done();
                }
            });            
        });
        
        function assertOfResultData(data){
            var expect = {
                result : 'tarou',
                tarou : ROCK,
                jiro : SCISSORS
            };
            assert.deepEqual(data,expect,'正しいResultレスポンスオブジェクト');
        }
    });
    
    after(function(){
        Server.server.close();
    });
});
