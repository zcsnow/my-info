var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var fs = require('fs-extra');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.all('*', function(req, res, next) {
    //允许的来源
    res.header("Access-Control-Allow-Origin", "*");
    //允许的头部信息，如果自定义请求头，需要添加以下信息，允许列表可以根据需求添加
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    //允许的请求类型
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});
var port = process.env.PORT || 3000;
var router = express.Router();

//app.post('/uploadImage', function(req, res){
router.route('/uploadImage').post(function(req, res) {
   
    
    if(req.body.base64Data) {
        /**
         *
         * @param request.base64Data    The base64 data of the image
         * @param request.imageFormat   The mime type of the image
         * @param request.userID        The ID of the user sending the request
         */
        var request = req.body;
        // Remove header if existent
        var base64Image = request.base64Data.split(';base64,').pop();
        var imageFormat = request.imageFormat;
		var imgNameNum=Date.now();
		var file = 'CreateImage/'+ imgNameNum +'.'+imageFormat;
        var result = {
			error: false,
			success: false,
			imgName:imgNameNum,
		};
        fs.outputFile(file, base64Image, {encoding: 'base64'}, function(err) {
            if (err) {
                result.error = true;
				console.log(err);
            }
            result.success = true;
			//result.imgName = Date.now();
            res.json({ message: result });
			console.log('写入成功！');

		
    });
    }
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
