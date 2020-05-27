;(function(){
    var ecnrypt_input = $('#encrypt-data');
    var encrypt_btn = $('#encrypt-btn');   //加密视频按钮
    var success_btn = $('#encrypt-success');  //继续按钮
    var encrypt_out = $('#encrypt-out');  //视频加密日志输出
    var encrypt_tip = $('#encrypt-tip');  //视频加密日志提示


    //获取url里的参数值
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var type = getQueryString("type");
    var noencryptPath = getQueryString("noencryptPath");
    var fileName = getQueryString("fileName");
    var encryptPath = getQueryString("encryptPath");
    
    var data = {
            type:type,
            noencryptPath: noencryptPath,
            fileName: fileName,
            encryptPath: encryptPath
        }

    //var data = JSON.parse(ecnrypt_input.val());
    //var data = ecnrypt_input.val();
    setClickable(success_btn,false);
    
    
    //添加事件
    encrypt_btn.on('click',function () {
        if($('#watermark').prop("checked")){
            console.log('选中');
            data.watermark = true;
        }else{
            console.log('没选中');
            data.watermark = false;
        }
        
        $.ajax({
            url:'/encrypt',
            type:'POST',
            data:data,
            dataType:'json',
            success:function(data){
                console.log(data);
            },
            error:function () {
                console.log('视频加密POST请求失败！');
            }
        });
        setClickable(encrypt_btn,false);
    });
    success_btn.on('click',function () {
        window.location.href = '/encrypt-success'
    })
    //websocket 成功，进行设置
    var socket = io.connect("//localhost:3001");
    socket.on('connection', function (data) {
        console.log('socket connection.');
    });
    var encrypt_out_html = "";
    socket.on('encrypt-event',function(data){
        encrypt_out.addClass('encrypt-out-style');
        encrypt_out_html += '<br>' + data.msg;
        encrypt_out.html(encrypt_out_html);
        if(data.type == 1){
            setClickable(success_btn,true);
            encrypt_tip.html('视频加密成功！')
        }
    });
    socket.on('connect_error',function(){
       console.log('socket error.');
       socket.close();
    });


    // var socket = io.connect("http://localhost:3001");
    // socket.on('encry-event',function(data){
    //     console.log(data)
    // })


})();