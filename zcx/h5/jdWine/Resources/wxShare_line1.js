
function wxShare(sharLink, shareInfo) {
    //var Htmlurl = window.location.href;
    var Htmlurl = sharLink.replace("?", "!").replace(/&/g, '$');
    var datajson = '';
    var json_data = $.ajax({
        type: "GET",
        async: false,
        url: "http://services.hyh6.com/weixinmanage.aspx?op=weixinsign&weburl=" + Htmlurl,
        dataType: "jsonp", //数据类型为jsonp  
        jsonp: "callback", //服务端用于接收callback调用的function名的参数  
        jsonpCallback: "info",
        success: function (data) {
            wx.config({
                debug: false,
                appId: data.result.Appid,
                timestamp: data.result.timestamp,
                nonceStr: data.result.nonceStr,
                signature: data.result.singer,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'onVoicePlayEnd',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                  ]
            });
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
                });
                wx.onMenuShareTimeline({
                    title: shareInfo.linetitle,
                    link: sharLink,
                    imgUrl: shareInfo.imgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                        alert('wx.onMenuShareTimeline:fail: ' + JSON.stringify(res));
                    }
                });
                wx.onMenuShareQQ({
                    title: shareInfo.title,
                    desc: shareInfo.desc, // 分享描述
                    link: sharLink,
                    imgUrl: shareInfo.imgUrl,
                    success: function () {

                    },
                    cancel: function () {
                    }
                });
                wx.onMenuShareWeibo({
                    title: shareInfo.title,
                    desc: shareInfo.desc, // 分享描述
                    link: sharLink,
                    imgUrl: shareInfo.imgUrl,
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                }); 
                wx.onMenuShareAppMessage({
                    title: shareInfo.title,
                    desc: shareInfo.desc, // 分享描述
                    link: sharLink,
                    imgUrl: shareInfo.imgUrl,
                    type: '',
                    dataUrl: '',
                    success: function () {
                    },
                    cancel: function () {
                    }
                });
            });
            wx.error(function (res) {
            });
        },
        error: function () {
        }
    });

}