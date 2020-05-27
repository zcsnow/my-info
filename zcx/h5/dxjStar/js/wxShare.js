
function wxShare(sharLink, shareInfo) {
    var Htmlurl = encodeURIComponent(sharLink);
    //var Htmlurl = encodeURI(sharLink.replace("?", "!").replace(/&/g, '$'));
    //console.log(Htmlurl)
    var datajson = '';
    var json_data = $.ajax({
        type: "GET",
        async: false,
        url: 'http://topic.dongxingji.cn/wechatsupport/getsignpackage?param={"url":"'+Htmlurl+'"}',
        dataType: "json",
        success: function (data) {
			//alert("share success="+ Htmlurl+" , data="+JSON.stringify(data.data.data));
            wx.config({
                debug: false,
                appId: data.data.data.appId,
                timestamp: data.data.data.timestamp,
                nonceStr: data.data.data.nonceStr,
                signature: data.data.data.signature,
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
                        TDAPP.onEvent("OYA_share");
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                        //alert('wx.onMenuShareTimeline:fail: ' + JSON.stringify(res));
                    }
                });
                wx.onMenuShareQQ({
                    title: shareInfo.title,
                    desc: shareInfo.desc, // 分享描述
                    link: sharLink,
                    imgUrl: shareInfo.imgUrl,
                    success: function () {
                        TDAPP.onEvent("OYA_share");
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
                        TDAPP.onEvent("OYA_share");
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
                        TDAPP.onEvent("OYA_share");
                    },
                    cancel: function () {
                    }
                });
            });
            wx.error(function (res) {
            });
        },
        error: function (e) {
			//alert("share error，url="+ Htmlurl+" , e="+JSON.stringify(e));
        }
    });

}