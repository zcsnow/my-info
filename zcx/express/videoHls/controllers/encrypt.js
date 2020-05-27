var fs = require('fs');
var ffmpegCommand = require('fluent-ffmpeg')  //fluent-ffmpeg其实本质上就是通过nodejs在终端中执行FFmpeg的命令,使用前服务器必须先安装了ffmpeg  可以直接使用brew命令进行安装：brew install ffmpeg

/**
 * 加密处理方法
 * @param options 加密数据的相关参数
 * @param socket socket输出
 * @param callback 回调函数
 */
function encryptHandle(options,socket,callback){
    var optionsFormat = (options.fileName).split('.');
    var _name = optionsFormat[0];
    var _type = optionsFormat[optionsFormat.length - 1];

    var _encryptPath = options.encryptPath + '/' + _name;
    var _videoPath = options.noencryptPath + '/' + options.fileName;
    var _keyInfoPath = './public/key/key_info.key';
    var _outputPath = _encryptPath + '/playlist.m3u8';
    
    
    var watermark = options.watermark

    //如果没有encrypt目录，则创建之
    if(!fs.existsSync(options.encryptPath)){
        fs.mkdirSync(options.encryptPath);
    };
    //如果没有对应的文件目录，则创建之
    if(!fs.existsSync(_encryptPath)){
        fs.mkdirSync(_encryptPath);
    };

    console.log('begin encrypt Fun');
    if (_type == 'mp4') {
        var command = ffmpegCommand(_videoPath)
        if(watermark === 'true'){
            console.log(11)
            command.addInput('./public/images/logo.png')   //添加水印图片
            command.addOption('-filter_complex', 'overlay=W-w-44:20')  //水印位置
            //mainW表示主视频宽度，mainH表示主视频高度，overlayW表示水印宽度，overlayH表示水印高度
            //overlay=left:top W-w(main_w-overlay_w)为left=100% H-h(main_h-overlay_h)为top=100%;; 左上角0:0;右上角W-w(main_w-overlay_w):0;左下角0: H-h(main_h-overlay_h);右下角 W-w(main_w-overlay_w):H-h(main_h-overlay_h);
            //.addOption('-vf','delogo=x=599:y=1:w=255:h=75:band=4:show=0')  //去水印位置  delogo=x:y:w:h:show]] x:y 离左上角的坐标  w:h logo的宽和高 band矩形模糊边缘的厚度,默认值是4。 show：若设置为1有一个绿色的矩形，默认值0。
        }
        command
            /* .videoBitrate(1024k)// 设置视频比特率
            .videoCodec('mpeg4')
            .aspect('16:9')// 设置宽高比
            .size('800x600')// 设置视频尺寸大小
            .fps(24)// 设置视频的帧率
            .audioBitrate('128k')// 设置音频比特率
            .audioCodec('libmp3lame')// 设置音频编解码器
            .audioChannels(2)// 设置音频通道数
            .addOption('-vtag', 'DIVX')// 设置自定义选项
            .format('avi') // 设置视频输出格式 */
            .addOption('-hls_list_size', '0')   //设置播放列表保存的ts最多条目，设置为0会保存有所片信息，默认值为最后5个
            .addOption('-hls_time', '10')   //设置每个片段的长度 默认值为2。单位为秒
            .addOption('-hls_key_info_file', _keyInfoPath) 
            //-hls_wrap n:设置多少片之后开始覆盖，如果设置为0则不会覆盖，默认值为0.这个选项能够避免在磁盘上存储过多的片，而且能够限制写入磁盘的最多的片的数量
            //-hls_start_number n:设置播放列表中sequence number的值为number，默认值为0
            .on('start', function(comandLine) {
                console.log('用Ffmpeg命令运行: ' + comandLine);
                
                // Send SIGSTOP to suspend ffmpeg
                //command.kill('SIGSTOP');
            })
            .on('stderr', function (stderrLine) {  //向屏幕输出标准错误
                //console.log('标准错误输出: ' + stderrLine);
                socket.emit('encrypt-event',{msg:stderrLine})
            })
            .on('error', function (err, stdout, stderr) {
                console.log('无法处理视频: ' + err.message);
                socket.emit('encrypt-event',{msg:err.message});
                callback(err, err.message);
            })
            .on('end', function () {  // 表示视频已经转码完成
                console.log('文件成功被转换');
                socket.emit('encrypt-event',{msg:options.fileName+' 文件加密成功',type:1})
                callback(null, options.fileName + ' 文件加密成功');
            })
            .save(_outputPath)  // 将视频文件存储到相应的目录
    }
    else{
        callback('type err','file type is not mp4.');
    }
}


module.exports = encryptHandle;

