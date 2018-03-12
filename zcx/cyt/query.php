<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxf005c82fa81f7be6", "2a6826bd24a798185751775e1e9e7d72");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="keywords" content="">
<meta name="description" content="">
<meta name="robots" content="index, follow">
<meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>任丘车易通</title>
<style>
* { margin: 0; padding: 0; }
html, body{  font-family: sans-serif; font-size: 14px;text-align: center;overflow:hidden; width:100%; height:100%; }
.illegal-query{ width:100%; height:100%; position:relative;}
.bkcsy{ width:100%; position:absolute; top:271px; left:0;text-align: center;height: 30px;line-height: 30px;background-color: #fff; z-index:999}
.bkcsy a {
  font-size: 90%;
  text-decoration: none;
  color: #888;
  display: inline-block;
}
</style>
</head>
<body>
    <div class="illegal-query">
    <iframe class="iframe" name="weizhang" src="http://m.cheshouye.com/api/weizhang/?dp=17&dc=213" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
    <!--<div class="bkcsy"><a href="javascript:;">任丘车易通提供</a></div>-->
    </div>
  <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
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
              title: '任丘车易通',
              desc: '代理 上保险 专业验车 过户 上牌照',
              link: 'http://zbaicai.com/zcx/cyt/query.php',
              imgUrl: 'https://mp.weixin.qq.com/misc/getheadimg?token=1113924323&fakeid=3091482250&r=678301',
              success: function () {
                  // 用户确认分享后执行的回调函数
                  //location.href="";
              }
          });
          wx.onMenuShareTimeline({
              title: '任丘车易通',
              link: 'http://zbaicai.com/zcx/cyt/query.php',
              imgUrl: 'https://mp.weixin.qq.com/misc/getheadimg?token=1113924323&fakeid=3091482250&r=678301',
              success: function () {
                  // 用户确认分享后执行的回调函数
                  //location.href="";
              }
          });
      
    });
  </script>
</body>
</html>
