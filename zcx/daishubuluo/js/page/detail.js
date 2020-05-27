
//svg动画
var X = [-18, 32],
    Y = [120, 30];
var $wave = $('.path-wave'),
    percent = parseInt($wave.data('percent'), 10) || 0,
    percent = Math.min(percent, 120);
var y = Y[0] + (Y[1] - Y[0]) / 120 * percent
var bindTransitionEndEvent = function (duration) {
    $wave.one('webkitAnimationEnd', function () {
        $wave.css({
            transition: 'none',
            transform: 'translate(' + X[1] + '%, ' + y + '%)'
        }).flushStyle(function () {
            $(this).css({
                transition: 'transform 8s linear',
                transform: 'translate(' + X[0] + '%, ' + y + '%)'
            })
        })
        
        bindTransitionEndEvent(8000)
    })
}
$wave.css('transform', 'translate(' + X[0] + '%, ' + y + '%)')
bindTransitionEndEvent(5000);


  //轮播图
  if($('#detailSlider').length>0){
  var detailSwiper = new Swiper('#detailSlider',{
    loop:true,       //循环切换
    autoplay: 5000,  //自动播放
    //autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
    pagination:'.swiper-pagination', //分页
    paginationClickable: true,
    //effect : 'coverflow',
  });
  };


  //tab切换
  $(".js-tab-menu").on('click','li',function(){
    var $this = $(this);
    var $thisIndex = $this.index();
    $(this).addClass("curr").siblings().removeClass("curr");
    $(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings(".js-content-list").hide();
  });
  
  //滚动页面导航固定
  if($('.js-tab-menu-box').length>0){
    $(window).scroll(function(){
       topFixed('.js-tab-menu-box');
    });
  };
  

  //点击关注
  $(".share-sh").click(function(){
    if(!$(this).hasClass("cur")){
      $(this).addClass("cur");
      $(this).find('img').attr('src','./images/detail_icon2_cur.png');
      return jShare('关注成功',"","");
    }else{
      $(this).removeClass("cur");
      $(this).find('img').attr('src','./images/detail_icon2.png');
      return jShare('取消关注',"","");
    }
    return false;
        
  });

  // 分享
  $('.share-pl').on('click',function(e){
    e.stopPropagation();
    $('.mask').show();
    $('.share-box').addClass('show');
    
  });

  $('.share-cancle,.mask,.share_weixin').on('click',function(e){
    e.stopPropagation();
    $('.mask').hide();
    $('.share-box').removeClass('show');
    $(".share_weixin").removeClass('show');
    
  });
  

  //添加商品数量点击
  $(".mdl-count .add").on('click',function(){
    var amount_val = parseInt($(this).parent('.mdl-count').find('.number').val());
    var amount_max = parseInt($(this).parent().attr('data-count-max'));
    if(amount_val==amount_max){
      $(this).addClass('disable');
      return false;
    }
    if(amount_val<amount_max){
      $(this).removeClass('disable');
      $(this).parent('.mdl-count').find('.reduce').removeClass('disable');
      $(this).parent('.mdl-count').find('.number').val(++amount_val);
    }
    
  });

  //删除商品数量点击
  $(".mdl-count .reduce").on('click',function(){
    var amount_val = parseInt($(this).parent().find('.number').val());
    var amount_min = parseInt($(this).parent().attr('data-count-min'));
    if(amount_val==1){
      $(this).addClass('disable');
      return false;
    }
    if(amount_val>amount_min){     
      $(this).removeClass('disable');
      $(this).parent('.mdl-count').find('.add').removeClass('disable');
      $(this).parent('.mdl-count').find('.number').val(--amount_val);
    }
  });

//选择支持商品
$(".icon-select").on('click',function(){
    var countMax = $(this).next('.mdl-count').attr('data-count-max');
    if(countMax>1){
        $(this).hide();
        $(this).next('.mdl-count').removeClass("hide").addClass('show');
    }
    $(this).parent().parent().addClass('selected').siblings().removeClass("selected");
    $(this).parent().parent().addClass('selected').siblings().find('.mdl-count').addClass("hide").removeClass('show');
    $(this).parent().parent().addClass('selected').siblings().find('.icon-select').show();

    $(this).parent().parent().parent().siblings().find('.stalls').removeClass("selected");
    $(this).parent().parent().parent().siblings().find('.icon-select').show();
    $(this).parent().parent().parent().siblings().find('.mdl-count').addClass("hide").removeClass('show');


});

//更多内容
$(".more-con-btn").on('click',function(){
  if($(this).hasClass('cur')){
    $(this).removeClass('cur');
    $(this).parent().find('.detail-con').css({'max-height':'310px'});
    $(this).html('更多内容<i class="iconfont icon-jiantou"></i>');
  }else{
    $(this).addClass('cur');
    $(this).parent().find('.detail-con').css({'max-height':'none'});
    $(this).html('收起内容<i class="iconfont icon-jiantou"></i>');
  }
});
 
 // 查看大图
 $(".progress-list .img").on('click','li',function(){
    var dataImg = $(this).attr('data-img');
    $('.js-pop-box .pop-img').find('img').attr('src',dataImg);
    $('.mask').show();
    $('.js-pop-box').addClass('show');
  });

// 关闭大图
$('.js-pop-box,.mask').on('click',function(e){
  e.stopPropagation();
  $('.mask').hide();
  $('.js-pop-box').removeClass('show');
  
});



var prefix = "https" == document.location.protocol ? "https" : "http";
// 分享配置 
var share = {
    shareConfig: {
       title: "《鬼吹灯》腾讯视频VIP",
       //url: window.location.href.replace(/\?.*#/, '#').replace(/\?.*$/, ''),
       url: window.location.href.replace(/\?.*#/, '#').replace(/\?.*$/, ''),
       img: "//img30.360buyimg.com/cf/jfs/t4000/334/1647251373/150125/b198c4f1/5886cfb9N1c0ee552.jpg",
       content: "《鬼吹灯之精绝古城》由企鹅影视、梦想者电影、正午阳光影业联合出品，改编自天下霸唱同名小说，由孔笙、周游、孙墨龙执导，白一骢任总编剧，侯鸿亮、方芳担任总",
       friendTitle: "《鬼吹灯》腾讯视频VIP",
       desc: "《鬼吹灯之精绝古城》由企鹅影视、梦想者电影、正午阳光影业联合出品，改编自天下霸唱同名小说，由孔笙、周游、孙墨龙执导，白一骢任总编剧，侯鸿亮、方芳担任总"
    },
    
    isWeixin: function() {
      var userAgentString = window.navigator ? window.navigator.userAgent : "";
      var weixinreg = /MicroMessenger/i;
      var androidreg = /android/i;
      if (!weixinreg.test(userAgentString) ) {
        return false;
      }
      return true;
    },
    weixin: function(e,conf) {
      var el = $(".share_weixin")[0];
      if (share.isWeixin()) {
        el.innerHTML = '<img src="//storage.jd.com/openicloud.q.m.z.jd.com/static/images/share.png" class="weixin">';
      } else {
        //二维码
        el.innerHTML = '<div class="wh300"><div class="qrcode" id="qrcode">二维码</div></div>';
        var base64 = qr.toDataURL({
            value: conf.url,
            real: true
        });
        document.getElementById("qrcode").innerHTML = '<img src="' + base64 + '" />';
      }
      $(".share_weixin").addClass('show');
    },
    qq: function (e,conf) {
     var turnUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" + conf.title + "&pics=" + encodeURIComponent(prefix+conf.img)+"&summary="+conf.content+"&url="+encodeURIComponent(conf.url);
     location.href = turnUrl;
     },
    sina: function(e,conf) {
       var turnUrl = 'http://service.weibo.com/share/share.php?title='+conf.title+'&source=京东金融&sourceUrl='+encodeURIComponent(conf.url)+'&pic='+ encodeURIComponent(prefix+conf.img) +'&url='+encodeURIComponent(conf.url);
       location.href = turnUrl;
    }
}
// 分享 end


$(".share-weixin").on("click", function(e) {
    share.weixin(e, share.shareConfig);
})
$(".share-weibo").on("click", function(e) {
    share.sina(e, share.shareConfig);
})
$(".share-qq").on("click", function(e) {
    share.qq(e, share.shareConfig);
})
            
            


