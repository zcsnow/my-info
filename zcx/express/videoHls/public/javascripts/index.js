;(function(){
    //元素对象
    var elementOBJ = {
        index_input: $('#index-data'),//获取数据的隐藏域对象
        upload_status: $('#index-upload-tip'),//上传状态的元素
        encrypt_btn: $('#index-encrypt-btn'),//视频加密按钮
        encrypt_status: $('#index-encrypt-tip'),//视频加密状态的元素
        login_status: $('#index-login-tip'),//登录状态提示
        login_btn: $('#index-login-btn'),//登录按钮
        play_status:$('#index-play-tip'),//可播放状态提示
        play_btn:$('#index-play-btn')//视频播放按钮
    };
    
    //入口
    init()
    function init(){
        elementStatus()
    }

    //元素的状态
    function elementStatus(){
        setClickable(elementOBJ.encrypt_btn, false);
        //如果数据为空，则表示未进行任何操作
        if (elementOBJ.index_input && elementOBJ.index_input.val() == "") {
            console.log('未进行任何操作')
        } else {
            var data = JSON.parse(elementOBJ.index_input.val());
            console.log(data);
            switch (data.type) {
                case 1:
                    uploadStatus(true);
                    setClickable(elementOBJ.encrypt_btn, true);
                    break;
                case 2:
                    encryptStatus(true);
                    setClickable(elementOBJ.login_btn,true);
                    break;
                case 3:
                    console.log('已登录');
                    break;
                case 4:
                    console.log('可观看');
                    break;
                default:
                    console.log('出现异常，请注意！');
                    break;
            }
        }

    }

    //修改上传状态
    function uploadStatus(bool) {
        if (bool) {
            elementOBJ.upload_status.html('已上传');
        } else {
            elementOBJ.upload_status.html('未上传');
        }

    }

    //修改加密状态
    function encryptStatus(bool) {
        if (bool) {
            elementOBJ.encrypt_status.html('已加密');
        } else {
            elementOBJ.encrypt_status.html('未加密');
        }

    }

})()