var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); 
var logger = require('morgan');//记录日志中间件
var session = require('express-session')  //session 中间件 处理客户端的 session
//var MongoStore = require('connect-mongo')(session); //mongodb中间件  
//serve-favicon
var router = require('./routes/router');

var app = express();//生成一个express实例 app。

//websocket
var io = require('socket.io')();
app.io = io;



app.set('views', path.join(__dirname, 'views')); //设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('view engine', 'ejs');  //设置视图模板引擎为 ejs

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//将请求信息打印在控制台，便于开发调试，但实际生产环境中，需要将日志记录在log文件里
app.use(logger('dev'));		//打印到控制台
//app.use(logger('combined'));		//打印到log日志

app.use(express.json());  //加载解析json的中间件。
app.use(express.urlencoded({ extended: false })); //加载解析urlencoded请求体的中间件。
app.use(cookieParser());  //加载解析cookie的中间件。
app.use(express.static(path.join(__dirname, 'public')));  //设置public文件夹为存放静态文件的目录。

//静态资源访问时的跨域设置
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  next();
});

//设置session,设置为1天有效
app.use(session({
  secret:'encrypt',  // 对session id 相关的cookie 进行签名
  name:'videoHLS', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie:{maxAge:1000 * 60 * 60 * 24},  //设置maxAge是24小时，即24小时后session和相应的cookie失效过期
  //resave: false,
  //saveUninitialized: false, // 是否保存未初始化的会话
  // store: new MongoStore({   //创建新的mongodb数据库   //mongodb的相关参数，程序运行时, express app会自动的替我们管理session的存储，更新和删除。
  //     db: 'sessiondb',        //数据库的名称。
  //     host: 'localhost',    //数据库地址，默认为本机 127.0.0.1
  //     port: 27017,          //数据库端口，默认为27017
  //     url:'mongodb://localhost/' + settings.db,
	// 		autoRemove:'native'
  // })
}));


//静态资源访问限制
app.use(function (req, res, next) {
  var suffix = /(\.key)$/g;//后缀格式指定
  
  if(suffix.test(req.path)) {
      console.log(1);
      console.log(req.session.username,'++++请求key文件了');
      if((req.session.username != 'admin')){
          return res.send('请求非法');
      }else{
          console.log('+++++请求key文件了，并且已经登录，登录名为：',req.session.username);
          next();
      }
  }
  else {
      console.log(2);
      next();
  }
});


//路由控制器
app.use('/', router(app.io));  


// 捕获404错误，并转发到错误处理器。
app.use(function(req, res, next) {
  next(createError(404));
});

//错误处理器，将错误信息渲染error模版并显示到浏览器中。
app.use(function(err, req, res, next) {
  // 设置本地，只在开发中提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; //导出app实例供其他模块调用
