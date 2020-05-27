$(function(){
	function show(eid, t) {
    	setTimeout(function(){
			//$("#media")[0].play();
			$("."+eid).show();
			$('html,body').css('height','auto');
			window.scroll(0,$('#page3').height());
		}, t*1000);
		
	};
	
	var player1,player2;
	player1 = document.getElementById('movie');
	player2 = document.getElementById('movie2');
	
	function add(name,className,time)  {
	  setTimeout(function(){
		  $(name).addClass(className);
	  },time*1000);
	};
	function remove(name, className, time)  {
	  setTimeout(function(){
		  $(name).removeClass(className);
	  },time*1000);
	};
  
	function hide(eid) {
	  $("."+eid).hide();
	};
	
	var browser={
	  versions:function(){
		  var u = navigator.userAgent, app = navigator.appVersion;
		  return {
			  webKit: u.indexOf('AppleWebKit') > -1, 
			  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
			  android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
			  weixin: u.indexOf('MicroMessenger') > -1, 
			  txnews: u.indexOf('qqnews') > -1,
			  sinawb: u.indexOf('weibo') > -1,
			  mqq   : u.indexOf('QQ') > -1
		  };
	  }(),
	  language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}
	
	//setTimeout(function(){
		//$('#loading').hide();
		$('#wxMsg').show();
		//$('.unlock-mask').addClass('leftright');
	//},3000);
	
	//音乐控制
	  function audioAutoPlay(id){
		  var audio = document.getElementById(id),
			  play = function(){
			  audio.play();
			  document.removeEventListener("touchstart",play, false);
		  };
		  audio.play();
		  document.addEventListener("WeixinJSBridgeReady", function () {//微信
			 play();
		  }, false);
		  document.addEventListener('YixinJSBridgeReady', function() {//易信
			 play();
		  }, false);
		  document.addEventListener("touchstart",play, false);
	  }
	  
	  if (browser.versions.ios){
		player1.play();
		player1.pause();
		
	  };
	  function wxPlay() {
		  player1.play();
		  player1.pause();
	  };
	  
	  
	  if (browser.versions.ios&&browser.versions.weixin){
		  if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
			  wxPlay();
		  } else {
			  if (document.addEventListener) {
				  document.addEventListener("WeixinJSBridgeReady", wxPlay, false);
			  } else if (document.attachEvent) {
				  document.attachEvent("WeixinJSBridgeReady", wxPlay);
				  document.attachEvent("onWeixinJSBridgeReady", wxPlay);
			  }
		  };
	  }
	  
	
	audioAutoPlay('media');
	//index.show();
	var is_f_page = false;
	var is_f_page_video = false;
	var video_play = false;
	$('#time').on('touchy-drag', function (event, phase, $target, data) {
		if(!$(this).hasClass('cur')){ return false;}
		var f_page = $('#f-page');
		var movePoint = data.movePoint,
			startPoint = data.startPoint;
		var y =  startPoint.y - movePoint.y;
		switch (phase) {
			case 'start':
			break;
			case 'move':
				if(!is_f_page){
					if(y > 0){
						$target.get(0).style.cssText = 'z-index:99;-webkit-transform:translate(0,' + (movePoint.y - startPoint.y) + 'px);';
							if(y > 100){
								$('#page1').hide();
								$("#media")[0].pause();
								$('#page-video').show();
								 player1.play();
								 $('#movie').addClass('active');
								avdio();
								
								
							   //var video = $('#movie').get(0);
							   //window.makeVideoPlayableInline(video);
								
								
							}
					}
				}
				break;
			case 'end':
				if(!is_f_page){
					$target.get(0).style.cssText = 'z-index:99;-webkit-transform:translate(0,0);-webkit-transition: -webkit-transform .4s;';
				}
				break;
		}
	});
	
	var flag = 0;
	player1.ontimeupdate = function () { 
	  var curTime = player1.currentTime; 
      if(curTime>18){
		 $('.NFC-card1').show();
		  flag = 1;
		 
	  }
	  if(curTime>20){
		 //$('.NFC-card1').show();
		 $('.text-tip').show();
		
		 player1.pause(); 
		 
	  }
	};	
	
	
	/*player.ontimeupdate = function () { 
	  var curTime = parseInt(player.currentTime); 
	  console.log(curTime);
	  if(curTime==22){
		  console.log(1);
		  player1.pause();
		  $('.NFC-card1').show();
	  }
	  
	  if(curTime>40){
		  $('#page6').show();
		  $("#page-video").css('visibility','hidden');
		  $('.music img').attr('src', 'img/music0.png');
		  $("#media")[0].play();
	  }
	};	*/
	
	$('#container').on('click','.NFC-card1', function(){
		if(flag==1){
		$(this).hide();
		$('.text-tip').hide();
		//player.currentTime=24;
		$('#movie').css('visibility','hidden');
		//player1.pause(); 
		$('#movie').removeClass('active');
		$('#movie2').show();
		$('#movie2').addClass('active');
		avdio();
		player2.play();
		player2.ontimeupdate = function () { 
		  var curTime = player2.currentTime; 
		  if(curTime>16){
			  $('#page6').show();
			  $('#movie2').removeClass('active');
			  $("#page-video").css('visibility','hidden').removeClass('active');
			  $('.music img').attr('src', 'img/music0.png');
			  $("#media")[0].play();
		  }
		};
		}	
		
	});
	
	/*player.onended = function(){ 
            $("#page-video").css('visibility','hidden');
			$('#page6').show();
	}*/

	$('.p6-pop-btn').click(function(){
		   $('.pop-box').show();
		   //$('.mask').show();
	});
	
	$('.pop-box .close-btn').on('click',function() {
		 $('.pop-box').hide();
		 //$('.mask').hide();
	});  

	
	
	
	$('.js-share-btn').click(function(){
		$('.js-share-pop').show();	
		$('.mask').show();
	});
	$('.js-share-pop').click(function(){
		$('.js-share-pop').hide();	
		$('.mask').hide();
	});

	
	$('.music').on('click', function () {
	  if ($('.music').hasClass('on')) {
		  $('.music').removeClass('on');
		  $('.music img').attr('src', 'img/music1.png');
		  if($('#movie').hasClass('active')) {
		     player1.volume=0;
		  }else if($('#movie2').hasClass('active')) {
		     player2.volume=0;
		  }else{
		     $("#media")[0].pause();
		  }
		  
	  } else {
		  $('.music').addClass('on');
		  $('.music img').attr('src', 'img/music0.png');
		  if($('#movie').hasClass('active')) {
		     player1.volume=0.5;
		  }else if($('#movie2').hasClass('active')) {
		     player2.volume=0.5;
		  }else{
		     $("#media")[0].play();
		  }
	  }
  });
  function avdio(){
	  if ($('.music').hasClass('on')) {
		 
		  if($('#movie').hasClass('active')) {
			 player1.volume=0.5;
		  }else if($('#movie2').hasClass('active')) {
			 player2.volume=0.5;
		  }else{
			 $("#media")[0].play();
		  }
		  
	  } else {
		  if($('#movie').hasClass('active')) {
			 player1.volume=0;
		  }else if($('#movie2').hasClass('active')) {
			 player2.volume=0;
		  }else{
			 $("#media")[0].pause();
		  }
	  }	
  }
  
  $('#video').on('click', function () {
	  if ($('.music').hasClass('on')) {
		  $('.music').removeClass('on');
		  $('.music img').attr('src', 'img/music1.png');
		  $("#media")[0].pause();
	  } 
  });
  
  var my_video = document.getElementById("video");
  
  my_video.ontimeupdate = function () { 
	var vTime = my_video.currentTime; 
	//console.log(vTime); 
	if(vTime>0){
		$('.music').removeClass('on');
		$('.music img').attr('src', 'img/music1.png');
	    $("#media")[0].pause();
	}
  };	
  
  
  
  

		
/*
$("#movie")[0].addEventListener("play",function(evt) {
	videoUtil.onPlay();
});
$("#movie")[0].addEventListener("ended",function(evt) {
	var evtTarget = evt.target || evt.srcElement;
	videoUtil.onEnd(evtTarget.getAttribute('data-index'))
});
	
var videoUtil = {
    onPlay:function() {},
    onEnd:function(a) {
        switch (a) {
          case "1":
			if (browser.versions.ios&&browser.versions.weixin){
				WeixinJSBridge.invoke('WeixinJSBridge',{},function(e){
					query("#videoIndex2").play();
				});
			}
    
          case "2":
            document.title="视频2";
			$(".page2").hide();
            query(".ring-bg").play();
            break;

          case "3":
		    document.title="视频3";
			query(".end-bgm").play();

        }
    },
    onError:function() {}
};
*/

});