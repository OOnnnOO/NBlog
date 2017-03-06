var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');

var routes = require('./routes');
var pkg = require('./package');

// 记录日志
var winstom = require('winston');
var expressWinston = require('express-winston');

var app = express();


app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');


app.use(require('express-formidable')(
  {
    uploadDir: path.join(__dirname, 'public/img'),
    keepExtensions: true //保留后缀
  }));


app.use(express.static(path.join(__dirname, 'public')));

app.use(session({

  name: config.session.key,
  secret: config.session.secret,
  cookie: {
    maxAge: config.session.maxAge

  },
  store: new MongoStore({
    url: config.mongodb

  })
}));

// 设置模版全局变量
app.use(flash());
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
};

//添加模版必须的变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();

  res.locals.error = req.flash('error').toString();
  next();

});

// routes(app);

//正常请求日志
app.use(expressWinston.logger({
  transports: [
    // new (winstom.transports.Console)({
    //   json: true,
    //   colorize: true
    // }),
    new winstom.transports.File({
      filename: 'log/success.log'
    })
  ]
}));
// 路由
routes(app);

//错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    // new winstom.transports.Console({
    //   json: true,
    //   colorize: true
    // }),
    new winstom.transports.File({
      filename: 'log/error.log'
    })
  ]
}));

// error page
app.use(function (err, req, res, next) {
  res.render('error', {
    error: err
  });
});

app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`);
});


