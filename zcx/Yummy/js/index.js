$(function(){
	
  var isPay = true;  //用户是否付费
  var isShare = true;  //用户是否分享
  //var isPay = false;  //用户是否付费
  //var isShare = false;  //用户是否分享
  
  if(isPay){
	  //顶部导航浮动
	  $(window).scroll(function(){
	  	 topFixed('.header-box');
  	  });
	  
	  $('.bottom-app').hide();//底部app下载层隐藏
	  $('.js-pay-box').hide();//支付按钮部分隐藏
	  $('.live-text p').addClass('slide-up');//内容介绍折叠
	  
	  var printWallHeight = $(window).height() - $('.header-box').height() -50;
	  $('.print-wall').height(printWallHeight);
	  
	  $('.chat-box').show();
	  main();//初始用户进入连接服务器

  }else{
  	  $('.js-slide-click').hide();//内容介绍不折叠
  };
  
  //点击全部按钮，内容介绍展开
  $('.js-slide-click').click(function(){
  	$('.live-text p').removeClass('slide-up');
	$(this).hide();
  });
  
  
  //判断用户自己是否分享过
  var payMoney = $('.pay-money').html();
  if(isShare){ 
	  $('.js-no-share').hide();
	  $('.js-shared').show(); 
	  payMoney -= 5;
	  $('.pay-money').html(payMoney);
  }else{
  	  $('.js-no-share').show();
	  $('.js-shared').hide(); 
  }
 

  //底部app下载层关闭事件
  $('.bottom-app').on("click",'.close-app',function(e){
	  $('.bottom-app').hide();
  });

  //分享弹层
  $('.time-box').on("click",'.js-share-btn',function(e){
	  $('.js-share-pop').show();	
  });
  $('body').on("click",'.js-share-pop',function(e){
	  $('.js-share-pop').hide();	
  });
  
  //找朋友帮助分享弹层
  $('body').on("click",'.help-btn',function(e){
	  $('.js-help-pop1').show();	
  });
  $('body').on("click",'.js-help-pop1',function(e){
	  $('.js-help-pop1').hide();	
  });

  //滚动到聊天位置导航固定在顶部
  /*$(window).scroll(function(){
	 if($(window).scrollTop()>=$('.chat-box').offset().top){
		$('.nofixed-box').hide();
		$('#fixed-header').show();
	 }
  });*/
  $('.nofixed-box').hide();
  $('#fixed-header').show();
  
  //
  $('body').on("click",'.js-menu-btn',function(e){
	  $('.nofixed-box').show();
      $('#fixed-header').hide();
	  $('.js-input-box').hide();
	  window.scrollTo(0,0);
  });
  
  $("body").on("touchmove",function(e){
	  $('.nofixed-box').hide();
  	  $('#fixed-header').show();
	  $('.js-input-box').show();
  });
  
  
  
  //语音点击播放
  $('body').on("click",'.audio-box',function(e){
	  if(!$(this).hasClass('actived')){
		  $(this).addClass('actived');
	  }
	  
	  if(!$(this).hasClass('on')){
		  $(this).addClass('on');
		  $(this).find("audio")[0].play();
		  
	  }else{
		  $(this).removeClass('on');
		  $(this).find("audio")[0].pause();
	  }
  });
  

});