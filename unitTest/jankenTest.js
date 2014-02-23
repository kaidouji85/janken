var assert = require('chai').assert;
var janken = require('../janken.js');

describe('ジャンケンロジック', function() {
    it('プレイヤー1が勝利したので関数は1を返す#1:グー 2:チョキ', function() {
        var Janken = janken();
        var ret = Janken.play({
            player1 : Janken.ROCK,
            player2 : Janken.SCISSORS
        });
        assert.equal(ret, 1, '関数は1を返す');
    });

    it('プレイヤー1が勝利したので関数は1を返す#1:チョキ 2:パー', function() {
        var Janken = janken();
        var ret = Janken.play({
            player1 : Janken.SCISSORS,
            player2 : Janken.PAPER
        });
        assert.equal(ret, 1, '関数は1を返す');
    });

    it('プレイヤー1が勝利したので関数は1を返す#1:パー 2:グー', function() {
        var Janken = janken();
        var ret = Janken.play({
            player1 : Janken.PAPER,
            player2 : Janken.ROCK
        });
        assert.equal(ret, 1, '関数は1を返す');
    });

    it('プレイヤー2が勝利したので関数は1を返す#1:チョキ 2:グー', function() {
        var Janken = janken();
        var ret = Janken.play({
            player1 : Janken.SCISSORS,
            player2 : Janken.ROCK
        });
        assert.equal(ret, 2, '関数は2を返す');
    });

    it('プレイヤー2が勝利したので関数は1を返す#1:パー 2:チョキ', function() {
        var Janken = janken();
        var ret = Janken.play({
            player1 : Janken.PAPER,
            player2 : Janken.SCISSORS
        });
        assert.equal(ret, 2, '関数は2を返す');
    });

    it('プレイヤー2が勝利したので関数は1を返す#1:グー 2:パー', function() {
        var Janken = janken();
        var ret = Janken.play({
            player1 : Janken.ROCK,
            player2 : Janken.PAPER
        });
        assert.equal(ret, 2, '関数は2を返す');
    });

    it('あいこなので関数は0を返す#1:グー 2:グー', function() {
        var Janken = janken();
        var ret = Janken.play({
            player1 : Janken.ROCK,
            player2 : Janken.ROCK
        });
        assert.equal(ret, 0, '関数は0を返す');
    });

    it('あいこなので関数は0を返す#1:チョキ 2:チョキ', function() {
        var Janken = janken();
        var ret = Janken.play({
            player1 : Janken.SCISSORS,
            player2 : Janken.SCISSORS
        });
        assert.equal(ret, 0, '関数は0を返す');
    });

    it('あいこなので関数は0を返す#1:パー 2:パー', function() {
        var Janken = janken();
        var ret = Janken.play({
            player1 : Janken.PAPER,
            player2 : Janken.PAPER
        });
        assert.equal(ret, 0, '関数は0を返す');
    });
});
