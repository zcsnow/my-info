<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxf005c82fa81f7be6", "2a6826bd24a798185751775e1e9e7d72");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>2015毕业季，为自己摇取毕业签！</title>
<style>
@keyframes play {  
	100% {background-position: -737px -2px;}
}
@-webkit-keyframes play {  
	100% {background-position: -737px -2px;}
}
.sprite { width: 145px; height: 300px; display: inline-block; overflow: hidden; background-repeat: no-repeat; background-image: url(img/234.png); background-position: -2px -2px; animation: play 0.8s steps(5) infinite; -webkit-animation: play 0.8s steps(5) infinite; }
.preload { background-position: 9999px 9999px; width: 1px; height: 1px; display: none; }
body { background: url(img/bg.jpg) no-repeat #E8DFD0; background-size: 100% 100%; }
html, body { margin: 0; width: 100%; height: 100%; }
.do { background: url(img/button.png) no-repeat center; background-size: cover; width: 100%; height: 15%; margin: 0 auto; position: fixed; bottom: 20%; text-align: center; color: #666; line-height: 180px; cursor: pointer; }
.cover { background: url(img/share.png) top right no-repeat; background-size: 50%; background-color: rgba(0, 0, 0, 0.7); position: fixed; width: 100%; height: 100%; top: 0; left: 0; display: none; }
.decode .inner { width: 100%; height: 100%; background: url(img/decode.png) center no-repeat; background-size: 80%; }
.item { width: 100%; text-align: center; padding-top: 20%; }
</style>
</head>
<body>
  <div class="do"></div>
  <div class="cover result">
     <div class="item">
        <div class="sprite a1"></div>
     </div>
  </div>
  <div class="cover decode">
     <div class="inner"></div>
  </div>
  <div style="position: absolute;bottom: 10px; font-size: 14px;width: 100%; text-align: center;">摇一摇手机</div>
  <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  <script src="zepto.min.js"></script> 
  <script src="index.js?p=20150511"></script>
  
  <script>
    wx.config({
      debug: false,
      appId: '<?php echo $signPackage["appId"];?>',
      timestamp: <?php echo $signPackage["timestamp"];?>,
      nonceStr: '<?php echo $signPackage["nonceStr"];?>',
      signature: '<?php echo $signPackage["signature"];?>',
      jsApiList: [
        // 所有要调用的 API 都要加到这个列表中
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
      ]
    });
    wx.ready(function () {
      // 在这里调用 API
          wx.onMenuShareAppMessage({
              title: ' 月寒书社',
              desc: '撒电饭锅撒旦法个',
              link: 'http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209278371&idx=1&sn=7d47af23fa9802050862f7ce789d5bb5#rd',
              imgUrl: 'http://a1.qpic.cn/psb?/0b130480-14de-4cf6-8e8f-1c1486dd9bfa/zMGBwwvPDjpP.*MQSB94B7uJVsibQPUydKoxXhBrtr4!/m/dCgAAAAAAAAA&ek=1&kp=1&pt=0&bo=KgQgA8AMkAkBCHc!&sce=0-12-12&rf=0-18',
              success: function () {
                  // 用户确认分享后执行的回调函数
                  location.href="http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209278371&idx=1&sn=7d47af23fa9802050862f7ce789d5bb5#rd";
              }
          });
          wx.onMenuShareTimeline({
              title: ' 月寒书社',
              link: 'http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209278371&idx=1&sn=7d47af23fa9802050862f7ce789d5bb5#rd',
              imgUrl: 'http://a1.qpic.cn/psb?/0b130480-14de-4cf6-8e8f-1c1486dd9bfa/zMGBwwvPDjpP.*MQSB94B7uJVsibQPUydKoxXhBrtr4!/m/dCgAAAAAAAAA&ek=1&kp=1&pt=0&bo=KgQgA8AMkAkBCHc!&sce=0-12-12&rf=0-18',
              success: function () {
                  // 用户确认分享后执行的回调函数
                  location.href="http://mp.weixin.qq.com/s?__biz=MzAxMjAwOTU0Mw==&mid=209278371&idx=1&sn=7d47af23fa9802050862f7ce789d5bb5#rd";
              }
          });
      
    });
  </script>
</body>
</html>
