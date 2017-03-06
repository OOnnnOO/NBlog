var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// 登出
router.get('/', checkLogin, function (req, res, next) {
  // 清空session中的用户信息
  req.session.user = null;
  req.flash('success', '登出成功');

  res.redirect('/posts');

  // res.send(req.flash());

});

module.exports = router;
