var express = require('express');
var sha1 = require('sha1');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signin');
  // res.send(req.flash);

});
//／signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
  var name = req.fields.name;
  var password = req.fields.password;

  UserModel.getUserByName(name)
    .then(function (user) {
      // 检查用户名
      if (!user) {
        req.flash('error', '用户名不存在');
        return res.redirect('back');
      }
      //  检查密码是否匹配
      if (sha1(password) !== user.password) {
        req.flash('error', '用户名或密码错误');
        return res.redirect('back');
      }

      req.flash('success', '登录成功');
      // 用户信息写入session
      delete  user.password;
      req.session.user = user;
      // 跳转至主页
      res.redirect('/posts');
    })
    .catch(next);

  // res.send(req.flash());
});

module.exports = router;
