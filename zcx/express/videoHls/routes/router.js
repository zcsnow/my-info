var express = require('express');
var router = express.Router(); //成一个路由实例
var fs = require('fs');

 var md5 = require('md5');
var child_process = require('child_process');  //node创建子进程的方式 方法有fork，spawn，exec

var multer = require('multer');

var upload = require('../controllers/upload');
var encrypt = require('../controllers/encrypt');

// 文件加salt
var fileSalt = 'xxx';

// 视频上传
var uploadDir = './public/videos/noencrypt';// 上传目录
var tmpDir = [uploadDir, 'tmp'].join('/');// 上传临时目录
var chunkDir = [uploadDir, 'chunks'].join('/');// 分片目录

// 如果必要的文件上传目录不存在,则创建之
if(!fs.existsSync('./public/videos')){
    fs.mkdirSync('./public/videos');
}
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, 0777);
}
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, 0777);
}
if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir, 0777);
}
// 上传分片
router.post('/upload_chunks', multer({dest: tmpDir}).array('file'), function (req, res, next) {

        var src_path = req.files[0].path;// 原始片段在临时目录下的路径
        var des_dir = [chunkDir, req.body.guid].join('/');
        var des_path = (req.body.chunk) ? [des_dir, req.body.chunk].join('/') : des_dir;
        req.body.chunk = (req.body.chunk) ? req.body.chunk : '000';
        // 如果没有des_dir目录,则创建des_dir
        if (!fs.existsSync(des_dir)) {
            fs.mkdirSync(des_dir);
        }

        // 视频上传分片文件
        try {
            child_process.exec(['mv', src_path, des_path].join(' '), function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                    return res.json({'status': 0, 'msg': '上传分片文件错误!'});
                }
                return res.json({'status': 1, 'msg': req.body.guid + '_' + req.body.chunk + '上传成功!'});
            });
        } catch (e) {
            console.log(e);
            return res.json({'status': 0, 'msg': '上传分片文件错误!'});
        }
})


// 合并分片
router.post('/merge_chunks', function (req, res, next) {
        var src_dir = [chunkDir, req.body.hash + '/'].join('/');
        console.log('src_dir:'+src_dir)
        // 目标目录
       /*  var time = new Date();
        var path = md5([
            time.getFullYear(),
            time.getMonth() + 1 <= 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1,
            time.getDate <= 9 ? '0' + time.getDate() : time.getDate()
        ].join(''));// 文件目录名
        console.log('path:'+path)
        // 如果没有des_dir目录,则创建des_dir
        var des_dir = [uploadDir, path].join('/');
        if (!fs.existsSync(des_dir)) {
            fs.mkdirSync(des_dir);
        } */
        // 文件名+扩展名
        var name = decodeURIComponent(req.body.name);
        // 文件的实际名称和路径
        //var fileName = md5([path, name, req.body.size, new Date().getTime(), 99999 * Math.random()].join(fileSalt));
        var fileName = name;
        // 文件签名
        //var sig = md5([path, name, fileName, req.body.size].join(fileSalt));
        var sig = "12345";
        // 文件的实际路径
        //var des_path = [des_dir, fileName].join('/');
        var des_path = [uploadDir, fileName].join('/');

        try {
            var files = fs.readdirSync(src_dir);
            console.log('files:'+files)
            if (files.length == 0) {
                return res.json({'status': 0, 'url': '', 'msg': '分片文件不存在!'});
            }
            if (files.length > 1) {
                files.sort(function (x, y) {
                    return x - y;
                });
                console.log('files:'+files)
            }
            //fs.appendFileSync(filename, data, [options])  data类型{String|Buffer}  options默认值 options = { encoding: 'utf8', mode: 438, flag: 'a' };
            for (var i = 0, len = files.length; i < len; i++) {
                fs.appendFileSync(des_path, fs.readFileSync(src_dir + files[i]));
            }
            // 删除分片文件夹
            child_process.exec(['rm', '-rf', src_dir].join(' '));
            
            return res.json({
                'status': 1,
                // 'url': [
                //     'http://127.0.0.1:3001',
                //     'file', fileName,
                //     'path', path,
                //     'name', encodeURIComponent(name),
                //     'sig', sig
                // ].join('/'),
                'data':{
                    'type':1,
                    'noencryptPath': uploadDir,
                    'fileName': fileName,
                    'encryptPath': './public/videos/encrypt'
                }
            });
        } catch (e) {
            // 删除分片文件夹
            child_process.exec(['rm', '-rf', src_dir].join(' '));
            return res.json({'status': 0, 'msg': '分片合成失败!'});
        }
    })


/* router.post('/upload_process', multer({dest: uploadDir}).array('file'), function (req, res, next) {
        var responseJson = {
            origin_file: req.files[0]// 上传的文件信息
        };
        var src_path = req.files[0].path;
        var des_path = req.files[0].destination + req.files[0].originalname;
        fs.rename(src_path, des_path, function (err) {
            if (err) {
                throw err;
            }
            fs.stat(des_path, function (err, stat) {
                if (err) {
                    throw err;
                }
                responseJson['upload_file'] = stat;
                console.log(responseJson);
                return res.json(responseJson);
            });
        });
        console.log(responseJson);
    }
    // 文件获取
    /* router.get('/file/:file/path/:path/name/:name/sig/:sig', function (req, res, next) {
        try {
            var name = decodeURIComponent(req.params.name);
            var stat = fs.statSync([uploadDir, req.params.path, req.params.file].join('/'));
            var sig = md5([req.params.path, name, req.params.file, stat.size].join(fileSalt));
            // 签名验证
            if (sig != req.params.sig) {
                return res.json({status: 0, msg: '签名错误!'});
            }
            res.download([uploadDir, req.params.path, req.params.file].join('/'), name, function (err) {
                if (err) {
                    console.log(err)
                    //return res.send('下载错误!');
                }
            });
        } catch (e) {
            return res.json({status: 0, msg: '未知错误!'});
        }
    }); */
// form相关
/* router.post('/form_process', multer({dest: __dirname + '/../../upload/'}).array('file'), function (req, res, next) {
    var responseJson = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        origin_file: req.files[0]// 上传的文件信息
    };
    var src_path = req.files[0].path;
    var des_path = req.files[0].destination + req.files[0].originalname;
    fs.rename(src_path, des_path, function (err) {
        if (err) {
            throw err;
        }
        fs.stat(des_path, function (err, stat) {
            if (err) {
                throw err;
            }
            responseJson['upload_file'] = stat;
            console.log(responseJson);
            res.json(responseJson);
        });
    });
    console.log(responseJson);
}); */


//将默认根目录永久重定向为index路由
router.get('/', function (req, res, next) {
    res.redirect(301, '/index');
});

var mysocket;

//主页
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'node ffmpeg video hls',data: null });
});

//权限登录页面
router.get('/login', function (req, res) {
    if(req.session.username && req.session.username === 'admin'){
         res.render('login',{data:{code:0,msg:'已登录！'}})
    }else{
        res.render('login',{data:null});
    }
});
//权限登录处理
router.post('/login',function(req,res){
    console.log("登录信息：",req.body);
     var _username = req.body.username;
     var _password = req.body.password;
    if(_username === 'admin' && _password === 'admin'){
        req.session.username = _username;
        return  res.json({code:0,msg:'登录成功！'});
        
    }else{
        return  res.json({code:1,msg:'账号或名密码错误！'});
    }
    req.session.username = req.body.username;
    req.session.password = req.body.password;
});



//上传视频页面
router.get('/upload', function(req, res, next) {
    res.render('upload');
});

// //上传视频POST请求处理
// router.post('/upload-video', function (req, res) {
//     var _upload = upload.single('file');
//     _upload(req, res, function (err) {
//         if (err) {
//             console.log('上传失败！');
//         }
//         else {
//             res.render('encrypt',{
//                 data :{
//                     type:1,
//                     noencryptPath: req.file.destination,
//                     fileName: req.file.originalname,
//                     encryptPath: './public/videos/encrypt'
//                 }
//             });
//         }
//         console.log(req.file);
//     });
// });

//加密视频页面
router.get('/encrypt', function(req, res, next) {
    //res.send('请先上传视频！');
    console.log(req)
    var fileDestination = '';
    var fileName = '';
    var encryptPath = './public/videos/encrypt'
    res.render('encrypt',{data: {type:1,noencryptPath: fileDestination,fileName: fileName,encryptPath: encryptPath}});
});

//视频加密POST请求处理
router.post('/encrypt', function(req, res, next) {
    //console.log(req, res);
    console.log("视频加密:",req.body);
    //为了表现压缩过程，转发一下视频加密的相关数据
    encrypt(req.body,mysocket,function(err,data){
        console.log(err,data);
        res.send({err:err,data:data});
    });
});

//加密成功后继续
router.get('/encrypt-success', function(req, res, next) {
    res.render('index',{title: 'node ffmpeg video hls',data: {type:2}});
});

//视频播放页面
router.get('/player', function(req, res, next) {
    res.render('player');
});

//检测视频名字是否存在
router.post('/player-name-test', function(req, res, next) {
    var _exist,_url;
    var _path = './public/videos/noencrypt/' + req.body.player_name + '.mp4';
    console.log(fs.existsSync(_path));
    if(fs.existsSync(_path)){
        _exist = true;
        //_url = 'http://localhost:3001/videos/noencrypt/' + req.body.player_name + '.mp4'
        _url = 'http://localhost:3001/videos/encrypt/' + req.body.player_name + '/playlist.m3u8'
    }else{
        _exist = false;
    }
    return res.json({exist:_exist,url:_url});

});

module.exports = function(io){
    io.on('connection',function(socket){
        mysocket = socket
    })
    return router
};
//module.exports = router;
  
