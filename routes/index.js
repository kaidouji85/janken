/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('index', {
        title : 'じゃんけんゲーム'
    });
};

exports.game = function(req, res) {
    var userName = req.body.userName;
    var roomId = req.body.roomId;
    res.render('game', {
        title : 'じゃんけんゲーム',
        userName : userName,
        roomId : roomId
    });
}; 