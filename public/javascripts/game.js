function game(spec,my) {
    var PICT_PREFIX = location.origin + '/images/';
    
    var playerName = spec.playerName;
    var enemyName = spec.enemyName;

    var rockSprite;
    var scissorsSprite;
    var paperSprite;
    var playerHandSprite;
    var enemyHandSprite;
    var winnerLabel;
    var resultSprite;
  
    var core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.ROCK = 1;
    core.SCISSORS = 2;
    core.PAPER = 3;
    
    preLoad();
    core.onload = function() {
        initSprite();
        core.rootScene.addEventListener('enterframe', function(e) {
        });
    };
    
    function preLoad() {
        core.preload(PICT_PREFIX+'result.png');
        core.preload(PICT_PREFIX+'janken.png');
    }

    function initSprite() {
        rockSprite = new Sprite(128, 128);
        rockSprite.image = core.assets[PICT_PREFIX+'janken.png'];
        rockSprite.frame = 0;
        rockSprite.x = 0;
        rockSprite.y = 200;
        rockSprite.scale(0.7,0.7);
        rockSprite.addEventListener(Event.TOUCH_START,function(e){
            clickHandButton(core.ROCK);
        });
        core.rootScene.addChild(rockSprite);
        
        scissorsSprite = new Sprite(128, 128);
        scissorsSprite.image = core.assets[PICT_PREFIX+'janken.png'];
        scissorsSprite.frame = 1;
        scissorsSprite.x = 100;
        scissorsSprite.y = 200;
        scissorsSprite.scale(0.7,0.7);
        scissorsSprite.addEventListener(Event.TOUCH_START,function(e){
            clickHandButton(core.SCISSORS);
        });
        core.rootScene.addChild(scissorsSprite);
        
        paperSprite = new Sprite(128, 128);
        paperSprite.image = core.assets[PICT_PREFIX+'janken.png'];
        paperSprite.frame = 2;
        paperSprite.x = 200;
        paperSprite.y = 200;
        paperSprite.scale(0.7,0.7);
        paperSprite.addEventListener(Event.TOUCH_START,function(e){
            clickHandButton(core.PAPER);
        });        
        core.rootScene.addChild(paperSprite);
        
        playerHandSprite = new Sprite(128, 128);
        playerHandSprite.image = core.assets[PICT_PREFIX+'janken.png'];
        playerHandSprite.x = 0;
        playerHandSprite.y = 200;
        playerHandSprite.visible = false;
        playerHandSprite.scale(0.6,0.6);
        core.rootScene.addChild(playerHandSprite);
        
        enemyHandSprite =  new Sprite(128, 128);
        enemyHandSprite.image = core.assets[PICT_PREFIX+'janken.png'];
        enemyHandSprite.x = 100;
        enemyHandSprite.y = 40;
        enemyHandSprite.visible = true;
        enemyHandSprite.frame = 1;
        enemyHandSprite.scale(1.7, 1.7);
        enemyHandSprite.state = 'WAIT';
        enemyHandSprite.count = 0;
        enemyHandSprite.addEventListener('enterframe', function(e) {
            switch(this.state){
                case 'WAIT':
                    this.frame = this.count/20;
                    this.count ++;
                    if(this.count >= 20*3) {
                        this.count=0;
                    }
                    break;
            }
        });
        core.rootScene.addChild(enemyHandSprite);
        
        winnerLabel = new Label();
        winnerLabel.x = 100;
        winnerLabel.y = 20;
        winnerLabel.color = '#fff';
        winnerLabel.font = '40px cursive';
        winnerLabel.visible = false;
        core.rootScene.addChild(winnerLabel);
        
        resultSprite = new Sprite(320,320);
        resultSprite.image = core.assets[PICT_PREFIX+'result.png'];
        resultSprite.x = 0;
        resultSprite.y = 0;
        resultSprite.visible = false;
        core.rootScene.addChild(resultSprite);
    }
    
    function clickHandButton(hand) {
        rockSprite.visible = false;
        scissorsSprite.visible = false;
        paperSprite.visible = false;
        emitThrowHand(hand);
    }
    
    var emitThrowHand;
    core.onThrowHand = function(fnc){
        emitThrowHand = fnc;
    };
    
    core.emitJankenResult = function(data){
        var result = data.result;
        var playerHand = data[playerName];
        var enemyhand = data[enemyName];
        
        rockSprite.visible = false;
        scissorsSprite.visible = false;
        paperSprite.visible = false;
        playerHandSprite.visible = true;
        playerHandSprite.frame = getHandFrame(playerHand);
        enemyHandSprite.visible = true;
        enemyHandSprite.state = 'STOP';
        enemyHandSprite.frame = getHandFrame(enemyhand);
        /*
        winnerLabel.visible = true;
        if(result === playerName) {
            winnerLabel.text = 'かち';
        } else if(result === enemyName){
            winnerLabel.text = 'まけ';
        } else {
            winnerLabel.text = 'あいこ';
        }
        */
        resultSprite.visible = true;
        
        
    };
    
    function getHandFrame(hand){
        if(hand === core.ROCK){
            return 0;
        } else if (hand === core.SCISSORS) {
            return 1;
        } else if (hand === core.PAPER) {
            return 2;
        }        
    }
    
    return core;
}
