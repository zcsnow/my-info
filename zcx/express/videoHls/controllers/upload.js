var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({  
    destination: function (req, file, cb) {  //destination用于设置文件的存储目录，可以是一个函数或字符串。如果文件夹路径不存在则会自动创建
        var _noencryptPath = './public/videos/noencrypt';
        //如果没有videos目录，则创建之
        if(!fs.existsSync('./public/videos')){
            fs.mkdirSync('./public/videos');
        }
        //如果没有noencrypt目录，则创建之
        if(!fs.existsSync(_noencryptPath)){
            fs.mkdirSync(_noencryptPath);
        }
        cb(null, _noencryptPath)
    },
    filename: function (req, file, cb) {    //filename用于设置文件名。重命名上传的文件，并添加后缀
        var fileFormat = (file.originalname).split('.');
        cb(null,fileFormat[0] + '.' + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({ storage: storage }) //diskStorage(obj) 硬盘存储,  memoryStorage()内存存储

module.exports = upload;




