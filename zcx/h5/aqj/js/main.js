$(function(){
	  $('.gold').fadeIn().addClass('gold-anim');
	  var tool={
		  //defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);},
		  sys:{
			  ua:{"str":navigator.userAgent},
			  ios:function(){return !!this.ua.str.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);},
			  adr:function(){return !!this.ua.str.toLowerCase().match('android') || !!this.ua.str.toLowerCase().match('Linux');},
			  wip:function(){return !!this.ua.str.toLowerCase().match("windows phone")},
			  wxB:function(){return !!this.ua.str.toLowerCase().match('micromessenger');},
			  qqB:function(){return !!this.ua.str.toLowerCase().match('mqqbrowser');},
			  ucB:function(){return !!this.ua.str.toLowerCase().match('ucbrowser');},
			  sfB:function(){return !!this.ua.str.toLowerCase().match('safari');}	
		  },
		  bro:{
			  ua:{"str":navigator.userAgent},
			  wxB:function(){return !!this.ua.str.toLowerCase().match('micromessenger');},
			  qqB:function(){return !!this.ua.str.toLowerCase().match('mqqbrowser');},
			  ucB:function(){return !!this.ua.str.toLowerCase().match('ucbrowser');},
			  sfB:function(){return !!this.ua.str.toLowerCase().match('safari');}	
		  },
		  imgPreLoad:function(){
			  var i=0,loaded=0,handle,imgList=arguments[0],len=imgList.length,fun1=arguments[1],fun2=arguments[2],fun3=arguments[3];
			  //百分比补充
			  if(fun3!=undefined){if(len<100){for(var a=0;a<(100-len);a++){imgList.push('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');}len=100;}}
			  handle = setInterval(function(){
				  var img = new Image();
					  img.crossorigin="anonymous";
					  img.src = imgList[i];
					  if(img.complete){
						  loaded++;
						  var per = loaded/len;
						  if(fun1!==undefined){fun1(Math.round(per.toFixed(2) * 100));}
						  if(per >= 1){if(fun2!==undefined){fun2();}}
					  }else {
						  img.onload =function(){
							  loaded++;
							  var per = loaded/len;
							  if(fun1!==undefined){fun1(Math.round(per.toFixed(2) * 100));}
							  if(per >= 1){if(fun2!==undefined){fun2();}}
						  };
					  }
					  img.onerror = function(){
						  console.log(this.src+"不存在");
						  loaded++;
						  var per = loaded/len;
						  if(fun1!==undefined){fun1(Math.round(per.toFixed(2) * 100));}
						  if(per >= 1){if(fun2!==undefined){fun2();}}
					  };
					  i++;
				  if(i>imgList.length-1){clearInterval(handle);}
			  },10);
		  },
		  
	  }
	  var root={"route":"img/"};
			
		
	  audioAutoPlay('media');
	  audioAutoPlay('bgMusic');
	  
	  
	  //音乐控制
	  function audioAutoPlay(id){
		  var audio = document.getElementById(id),
			  play = function(){
			  audio.play();
			  /*if(tool.sys.qqB()){
				audio.pause();
			  }*/
			  document.removeEventListener("touchstart",play, false);
		  };
		  audio.play();
		  document.addEventListener("WeixinJSBridgeReady", function () {//微信
			 play();
		  }, false);
		 
		  document.addEventListener('YixinJSBridgeReady', function() {//易信
			 play();
		  }, false);
		  //document.addEventListener("touchstart",play, false);
	  }
	  
	  
	  
	  //滚动条不可滚动、高度100%
	  //tool.disabledScroll();
	  
	  //预加载图片
	  /*tool.imgPreLoad(
		  [root.route+'logo.png'],
		  function(o){$('.percent').html(o+" %");},
		  function(){
			  tool.imgPreLoad(
				  [
				  root.route+'page1_img1.png',
				  root.route+'page1_img2.png',
				  root.route+'page1_img3.png',
				  ],
				  function(o){
					  $('.percent').html(o+" %");
				  },
				  function(){
					  //隐藏loading页面
					  $('.loading-box').hide()
					  $('.gold').removeClass('gold-anim');
					  //显示播放页面
					  $('.page1').show();
				  },true
			  )
			  
		  }
	  )*/
	  
	  setTimeout(function(){
		  //隐藏loading页面
		  //$('#media').attr('src','');
		  $('#media').attr('loop',false);
		  
		  $('.loading-box').hide()
		  $('.gold').removeClass('gold-anim');
		  //显示播放页面
		  $('.page1').show();
		  var options = {
			useEasing : true, 
			useGrouping : true, 
			separator : ',', 
			decimal : '.', 
		  };
		  var demo;
		  $('.page1 .p1').addClass("page1_1");
		  setTimeout(function(){
			   $('.page1 .bubble1').fadeIn();
		  },500);
		  add('.page1 .bubble1','tada animated',1.5);
		  add('.page1 .balance b','moneyColor',1.2);
		  add('.page1 .bubble2','animated fadeIn',1.2);
		  setTimeout(function(){
			  demo = new CountUp("myTargetElement", 0, 4000, 0, 0.5, options);
			  demo.start();
		  },2000);
		  add('.page1 .bubble3','animated fadeIn',3);
		  setTimeout(function(){
			  demo = new CountUp("myTargetElement", 4000, 2500, 0, 0.5, options);
			  demo.start();
		  },3000);
		  add('.page1 .bubble4','animated fadeIn',4);
		  setTimeout(function(){
			  demo = new CountUp("myTargetElement", 2500, 1500, 0, 0.5, options);
			  demo.start();
		  },4000);
		  add('.page1 .bubble5','animated fadeIn',5);
		  setTimeout(function(){
			  demo = new CountUp("myTargetElement", 1500, 700, 0, 0.5, options);
			  demo.start();
		  },5000);
		  add('.page1 .bubble6','animated fadeIn',6);
		  setTimeout(function(){
			  demo = new CountUp("myTargetElement", 700, 0, 2, 0.5, options);
			  demo.start();
		  },6000);
		  
		  
		  add('.page1 .p2','animated fadeInLeftBig',7);
		  add('.page1 .p2 .spider','spiderMove',7);
		  
		  add('.page1 .p3','animated fadeInRightBig',7.8);
		  add('.page1 .p3_1','flash animated infinite',8.2);

		  add('.page1 .p3_2','zoomOut2',8.8);
		  add('.page1 .p3-bg','active_big',8.9);
		  add('.page1 .p3_3','txtMove2',9.5);
		  add('.page1 .p3_4','txtMove1',10);
		  add('.page1 .page1-btn','animated fadeInUp',10);
		  
		  add('.page-title1 .grenade0','ball',1);
		  //$('.page1 .p1').addClass("tada animated infinite");
	  },5000);
	  
	  
	  
	  
	  //开始按钮
	  $('.page1-btn').click(function(){
		  //$('.page3').addClass("active_big");
		  //$('.page-title1 .grenade0').addClass("ball").css('opacity',0);
		 $('.page1').hide();
		 $('.page1 .p1').removeClass("page1_1");
		 $('.page-title1').show();
		 //$('.page-title1 .grenade').addClass("stylie");
		 $('.page-title1 .grenade').addClass("ball");
		 
		 //add('.page-title1 .grenade','ball',0.2);
		 setTimeout(function(){
			 $('#media').attr('src','sound/boom.mp3');
	     },1000)
		 add('.page-title1 .p1','zoom-in-up1',1);
		 add('.page-title1 .title','animated fadeIn',2);
		 add('.page-title1 .p3','animated fadeIn',2.5);
		 add('.page-title1 .p2','animated fadeIn',2.5);
		 
		 setTimeout(function(){
			 $('.page-title1').hide();
			 //$('.page-title1 .grenade').removeClass('stylie');
			 //$('.page-title1 .p1').removeClass('zoom-in-up');
			 $('.page3').show();
			 $('.page3 .p1').addClass("page3_1");
			  add('.page3 .p1-bg','bgFlash',0.5);
			  add('.page3 .clock-box','animated fadeIn',0.8);
			  add('.page3 .clock-pointer1','ponit-rotate',0.8);
			  setTimeout(function(){
				 $('#media').attr('src','sound/clock.mp3');
				 $('#media').attr('loop',true);
			  },800)
			  add('.page3 .p2','animated fadeInUp',3.2);
			  add('.page3 .hand','headMove',3.4);
			  add('.page3 .page3-btn','animated fadeIn',3.8);
		 },4500);
		 
	  });
	  
	  var totalRadio=0,totalPraise=0;
	  $('.page3-btn').click(function(){
		 $('#media').attr('src','');
		 $('.page3').hide();
		 $('.page3 .hand').removeClass('headMove');
		 $('.page-ask').show();
		 $('#media').attr('src','sound/time.mp3');
		 var askTime = setInterval(function(){
		   var curTime = parseInt($('.time-num').text());
		   
		   var radioVal1 = $(".test_box .select-box").eq(0).find("input[type='radio']:checked")||0;
		   var radioVal2 = $(".test_box .select-box").eq(1).find("input[type='radio']:checked")||0;
		   var radioVal3 = $(".test_box .select-box").eq(2).find("input[type='radio']:checked")||0;
		   var radioVal4 = $(".test_box .select-box").eq(3).find("input[type='radio']:checked")||0;
		   var radioVal5 = $(".test_box .select-box").eq(4).find("input[type='radio']:checked")||0;
		   var radioValNum1 = $(".test_box .select-box").eq(0).find("input[type='radio']:checked").attr('num')||0;
		   var radioValNum2 = $(".test_box .select-box").eq(1).find("input[type='radio']:checked").attr('num')||0;
		   var radioValNum3 = $(".test_box .select-box").eq(2).find("input[type='radio']:checked").attr('num')||0;
		   var radioValNum4 = $(".test_box .select-box").eq(3).find("input[type='radio']:checked").attr('num')||0;
		   var radioValNum5 = $(".test_box .select-box").eq(4).find("input[type='radio']:checked").attr('num')||0;

		   if(radioVal1.length>0&&radioVal2.length>0&&radioVal3.length>0&&radioVal4.length>0&&radioVal5.length>0){
			  clearInterval(askTime);
			  askFinished();
		   }
		   if(curTime<=0) {
			  clearInterval(askTime);
			  askFinished();
			  return false;
		   }
		   
		   function askFinished(){
			  $('#media').attr('src','');
			  totalRadio = parseInt(radioValNum1)+parseInt(radioValNum2)+parseInt(radioValNum3)+parseInt(radioValNum4)+parseInt(radioValNum5);
			  var radioval=radioVal1.val()+"|"+radioVal2.val()+"|"+radioVal3.val()+"|"+radioVal4.val()+"|"+radioVal5.val()+"|";
              $("#radioval").val(radioval);
			  
		      $('.page-ask').hide();
			  $('.pop-mask').show();
			  $('.pop-box').addClass('ask');
			  //$('.pop-box.ask .pop-title').html('答题结束');
			  //$('.pop-box.ask .pop-msg').html('恭喜您获得<br><strong>'+ totalRadio*1000 +'</strong>元');
			  $('.pop-box.ask .pop-title img').attr('src','img/pop_title1.png');
			  $('.pop-box.ask .purse-box .txt em').text(totalRadio*1000);
			  
			  $('.pop-box.ask .pop-continue-btn').addClass('ask');
			  $('.pop-box').addClass('show');
			  $('.purse-box').addClass('purseMove');
			  $('.pop-icon.icon1').addClass('pop-icon-ani1');
			  $('.pop-icon.icon2').addClass('pop-icon-ani2');
			  $('.pop-icon.icon3').addClass('pop-icon-ani3');
			  $('.pop-icon.icon4').addClass('pop-icon-ani4');
			  $('.pop-icon.icon5').addClass('pop-icon-ani5');
		   }

		   curTime--;
		   $('.time-num').text(curTime);
		   
		 }, 1000);

	  });
	  
	  var txtScrollTime;
	  function autoScroll(obj) {
		  var moveHeight = $(obj).find('ul').find("li:first").height();
		  $(obj).find('ul').animate({marginTop: -moveHeight-5+"px"}, 500, function() {
			  $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
		  })
	  }
	  
	  
	  
	  function add(name,className, time)  {
		  setTimeout(function(){
			  $(name).addClass(className);
		  },time*1000);
		};
		function remove(name, className, time)  {
		  setTimeout(function(){
			  $(name).removeClass(className);
		  },time*1000);
		};
	  
	  
	  
	  function initAmiate(initTime,intervalTime){
		
		setTimeout(function(){
			$('#media').attr('src','sound/ready.mp3');
	    },1000);
		add('.countdown-box .ready','show fadeIn',0.1*intervalTime);
		remove('.countdown-box .ready','show fadeIn',4*intervalTime);
		add('.countdown-box .num4','zoomOut1',4*intervalTime);
		remove('.countdown-box .num4','zoomOut1',4.5*intervalTime);
		add('.countdown-box .num3','show zoomOut1',4.5*intervalTime);
		remove('.countdown-box .num3','show zoomOut1',5.5*intervalTime);
		add('.countdown-box .num2','show zoomOut1',5.5*intervalTime);
		remove('.countdown-box .num2','show zoomOut1',6.5*intervalTime);
		add('.countdown-box .num1','show zoomOut1',6.5*intervalTime);
		remove('.countdown-box .num1','show zoomOut1',7.5*intervalTime);
		setTimeout(function(){
			$('.countdown-box').hide();
			$('.page-live .head').addClass('headMove');
			txtScrollTime = setInterval(function(){autoScroll(".live-txt")}, 1000);
	    },7.5*intervalTime*1000);
	
	}

	  
	  //打赏
	  var flag = true;
	  var liveStart = false;
	  //var initPraise = 10000 + Math.ceil(10000*Math.random());
	 
	  var moneyHtml1 = '<li class="icon1 icon-ani1"><img src="img/page8_img3.png"></li>';
	  var moneyHtml2 = '<li class="icon1 icon-ani2"><img src="img/page8_img3.png"></li>';
	  var moneyHtml3 = '<li class="icon1 icon-ani3"><img src="img/page8_img3.png"></li>';
	  var moneyHtml4 = '<li class="icon1 icon-ani4"><img src="img/page8_img3.png"></li>';
	  var moneyHtml5 = '<li class="icon1 icon-ani5"><img src="img/page8_img3.png"></li>';
	  var moneyHtml6 = '<li class="icon1 icon-ani6"><img src="img/page8_img3.png"></li>';
	  htmArr = [moneyHtml1,moneyHtml2,moneyHtml3,moneyHtml4,moneyHtml5,moneyHtml6];
	  $('.playBtn').click(function(){
		liveStart = true;
		if(flag==true){
			  
			  randomHtml = htmArr[Math.floor(Math.random()*6)];
			  $('.money-icon').append(randomHtml);
			  
			  var top = '18';
			  var obj=$('.praise');
			  flag = false;
			  $('.page-live').append('<div id="praise"><b>+500<\/b></\div>');
			  $('#praise').css({'top':top+'%'}).animate({top:0},'fast',function(){
				   $(this).fadeIn('fast').remove();
				   
				   var Num = parseInt(obj.find('span').text());
				   //Num++;
				   Num += 500;
				   obj.find('span').text(Num);
				   flag = true;
				  
			  });
			  
		}
		return false;
	  });
	  
	  
	  
	  
	  
	   //弹层
	  $('.pop-box .pop-continue-btn').on('click', function (e) {
		  if($(this).hasClass('ask')){
			  $(this).attr('class','pop-continue-btn');
			  $('.pop-box').removeClass('show ask');
			  $('.pop-mask').hide();
			  $('.purse-box').removeClass('purseMove');
			  $('.pop-icon.icon1').removeClass('pop-icon-ani1');
			  $('.pop-icon.icon2').removeClass('pop-icon-ani2');
			  $('.pop-icon.icon3').removeClass('pop-icon-ani3');
			  $('.pop-icon.icon4').removeClass('pop-icon-ani4');
			  $('.pop-icon.icon5').removeClass('pop-icon-ani5');
			  
			  $('.page-title2').show();
			  $('.money-tip em').text(totalRadio*1000);
			  add('.page-title2 .grenade','ball',0.2);
			  setTimeout(function(){
				 $('#media').attr('src','sound/boom.mp3');
				 $('#media').attr('loop',false);
			  },1000)
			  add('.page-title2 .p1','zoom-in-up1',1.2);
			  add('.page-title2 .title','animated fadeIn',2);
			  add('.page-title2 .p3','animated fadeIn',2.5);
			  add('.page-title2 .p2','animated fadeIn',2.5);
			  add('.page-title2 .money-tip','animated fadeIn',2.5);
			  add('.page-title2 .p4','animated fadeIn',3);
			  add('.page-title2 .p5','animated fadeIn',3.5);
		  }
		  if($(this).hasClass('live')&& liveFlag){
			  $(this).attr('class','pop-continue-btn');
			  $('.pop-box').removeClass('show live');
			  $('.pop-mask').hide();
			  $('.purse-box').removeClass('purseMove');
			  $('.pop-icon.icon1').removeClass('pop-icon-ani1');
			  $('.pop-icon.icon2').removeClass('pop-icon-ani2');
			  $('.pop-icon.icon3').removeClass('pop-icon-ani3');
			  $('.pop-icon.icon4').removeClass('pop-icon-ani4');
			  $('.pop-icon.icon5').removeClass('pop-icon-ani5');
			  
			  $('.page-title3').show();
			  $('.money-tip em').text(totalPraise);
			  add('.page-title3 .grenade','ball',0.2);
			  setTimeout(function(){
				 $('#media').attr('src','sound/boom.mp3');
			  },1000)
			  add('.page-title3 .p1','zoom-in-up1',1.2);
			  add('.page-title3 .title','animated fadeIn',2);
			  add('.page-title3 .p3','animated fadeIn',2.5);
			  add('.page-title3 .money-tip','animated fadeIn',2.5);
			  add('.page-title3 .p2','animated fadeIn',2.5);
			  setTimeout(function(){
				 $('.page-title3').hide();
				 $('.page-shake').show();
				 
				 add('.page-shake-bg1','animated fadeInUp',0.3);
				 add('.page-shake-bg2','animated fadeInUp',0.6);
				 add('.page-shake .money-box','animated fadeInUpBig',1);
				 add('.page-shake #moneyBox','animated fadeInDownBig',1);
				 add('.page-shake .result-tip1','animated fadeIn',1.5);
				 setTimeout(function(){
					 $('.page-shake .money-box').css('opacity',1).removeClass('animated fadeInUpBig');
					 $('.page-shake #moneyBox').css('opacity',1).removeClass('animated fadeInDownBig').addClass('moneyMove');
				 },2500)
				 
				 $('.money-txt1 .txt em').text(totalPraise);
				 
				 
				  var is_f_page = false;
				  $('#moneyBox').on('touchy-drag', function (event, phase, $target, data) {
					  if(!$(this).hasClass('cur')){ return false;}
					  //$('#moneyBox').removeClass('moneyMove');
					  var movePoint = data.movePoint,
						  startPoint = data.startPoint;
				      var x =  movePoint.x-startPoint.x;
					  var y =  startPoint.y - movePoint.y;
					
					  switch (phase) {
						  case 'start':
						  break;
						  case 'move':
							  if(!is_f_page){
								  //if(y > 0&& x> 0){
									  //console.log(2);
									  $target.get(0).style.cssText = 'opacity:1;-webkit-transform:translate3d(' + (movePoint.x-startPoint.x) + 'px,' + (movePoint.y - startPoint.y) + 'px,0);';
									  console.log(x,y);
										  if(y > -330&&y < -180&&x >-70&&x < 80){
		
											  $('#moneyBox').removeClass('moneyMove').hide().removeClass('cur');
											  $('.page-shake .yyy-box').fadeIn();
											  $('.money-box').addClass('headMove2');
											  $('.result-tip1').hide();
											  $('.result-tip2').show();
											  $('.result-tip1 img').attr('src','img/result_tip2.png');
											  //
											  setTimeout(function(){
											  		shakeFun();
											  },1000);
											  
										  }
								 // }
							  }
							  break;
						  case 'end':
							  if(!is_f_page){
								  //$target.get(0).style.cssText = '-webkit-transform:translate3d(' + (movePoint.x-startPoint.x) + 'px,' + (movePoint.y - startPoint.y) + 'px,0);';
							  }
							  break;
					  }
				  });
	
	
	
				 
				  
			  },4500);
		  }


	  });
	  var liveFlag = false;
	  
	  $('.live-start-btn').on('click', function (e) {
		   $('.page-title2').hide();
		    var initPraise = totalRadio*1000;
	  	   $('.praise').find('span').text(initPraise);
		   $('.page-live').show();
		   
		   $('.countdown-box').show();
		   initAmiate(0.1,0.5);
		   

			setTimeout(function(){
				flag = false;
				clearInterval(txtScrollTime);
				$('.page-live .head').removeClass('headMove');
				$('.money-icon').children().remove();
				liveStart = false;
				$('.page-live').hide();
				totalPraise = parseInt($('.praise').find('span').text());
				$('.pop-mask').show();
				$('.pop-box').addClass('live');
				//$('.pop-box.live .pop-title').html('直播结束');
				//$('.pop-box.live .pop-msg').html('恭喜您赚得<br><strong>'+ totalPraise +'</strong>元');
				$('.pop-box.live .pop-title img').attr('src','img/pop_title2.png');
			    $('.pop-box.live .purse-box .txt em').text(totalPraise);
				$('.pop-box.live .pop-continue-btn').addClass('live');
				$('.pop-box').addClass('show');
				
				$('.purse-box').addClass('purseMove');
				$('.pop-icon.icon1').addClass('pop-icon-ani1');
				$('.pop-icon.icon2').addClass('pop-icon-ani2');
				$('.pop-icon.icon3').addClass('pop-icon-ani3');
				$('.pop-icon.icon4').addClass('pop-icon-ani4');
				$('.pop-icon.icon5').addClass('pop-icon-ani5');
				setTimeout(function(){
					liveFlag = true
				},1500);
				
			},14000);

	  });
	  
	  
	  
	  $('.js-share-btn').on('click', function () {
		  $('.js-share-pop').show();	
		  $('.mask').show();
	  });
	  $('.js-share-pop').on('click', function () {
		  $('.js-share-pop').hide();	
		  $('.mask').hide();
	  });
	 
 

/*$('.music').on('click', function () {
if ($('.music').hasClass('on')) {
	$('.music').removeClass('on');
	$('.music img').attr('src', 'img/music1.png');
	   //player1.pause();
	   player1.volume=0;
	   player1.muted = true; 
	
} else {
	$('.music').addClass('on');
	$('.music img').attr('src', 'img/music0.png');
	   //player1.play();
	   player1.volume=1;
	   
	   player1.muted = false;
}
});*/


//触发动画
var isShaked=true;
var shakeCount = 0;
function shakeFun(){
  // 判断要不要执行
  if(shakeCount!=0) return false;
  shakeCount = 1;
 //判断系统是否支持html5摇一摇的相关属性
	if (window.DeviceMotionEvent){
		var speed = 10;
	
		var x = t = z = lastX = lastY = lastZ = 0;
		window.addEventListener('devicemotion',
		function (event) {
			var acceleration = event.accelerationIncludingGravity;
			x = acceleration.x;
			y = acceleration.y;
			if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
				
				
				
				//摇一摇后js代码
				$('.page-shake .ico').addClass('yyy-ani');
				$('.reshake-tip').hide();
				setTimeout(function(){
					$('#media').attr('loop',false);
					$('#media').attr('src','img/shake_sound.mp3');
					//$("#shakeSound")[0].play();
				
				 //手机震动1秒
				if (navigator.vibrate) {
					navigator.vibrate(1000);//震动1000毫秒
				} else if (navigator.webkitVibrate) {
					navigator.webkitVibrate(1000);
				}
				},200)
				
				//打开弹窗
				setTimeout(function(){
					$('.money-box').removeClass('headMove2');
					$('.page-shake .yyy-box').hide();
					$('.page-shake .result-tip2').hide();
					$('.page-shake .result-title').fadeIn();
					$('#moneyBox').css({'transform': 'translate3d(0px, 0, 0px) scale(0.7)','-webkit-transform': 'translate3d(0px, 0, 0px) scale(0.7)','top':'25%','display': 'block'});
					$('.money-box').find('.img').attr('src','img/page12_img2_2.png');
					$('.page-shake .shine').fadeIn();
					var shakeResultArr = ["img/result_img1.png","img/result_img2.png","img/result_img3.png"];
					var randomshakeResult = shakeResultArr[Math.floor(Math.random()*3)];
					$('.shake-result').find('img').attr('src',randomshakeResult);
					$('.shake-result').show();
					$('.reshake-tip').show();
					$('.shake-next-btn').show();
					
					//$('.money-txt1').hide();
					$('.money-tip').hide();
					
					$('.page-shake .ico').removeClass('yyy-ani');
					setTimeout(function(){
						shakeCount = 0;
					}, 3000);
					
				}, 1500);
			};
			lastX = x;
			lastY = y;
		},false);
	} 
	else {
        alert('not support mobile event');
    }
}

$('.shake-next-btn').click(function(){
	  $('.page-shake').hide();
	  $('.page-last').show();
	  add('.page-last .p1','animated fadeIn',0.1);
	  add('.page-last .p2','animated fadeIn',0.5);
	  add('.page-last .p3','animated fadeIn',1);
	  add('.page-last .btn-box','animated fadeIn',1.5);
	  add('.page-last .p5','animated fadeIn',2);
});


/*$('.yyy-box').click(function(){
	  if(shakeCount!=0) return false;
	  shakeCount = 1;
	  
	  //摇一摇后js代码
	  $('.page-shake .ico').addClass('yyy-ani');
	  $('.reshake-tip').hide();
	  setTimeout(function(){
		  $('#media').attr('src','img/shake_sound.mp3');
		 //$("#shakeSound")[0].play();
	  },200)
	  
	   //手机震动1秒
	  if (navigator.vibrate) {
		  navigator.vibrate(1000);//震动1000毫秒
	  } else if (navigator.webkitVibrate) {
		  navigator.webkitVibrate(1000);
	  }
	  
	  //打开弹窗
	  setTimeout(function(){
		  $('.money-box').removeClass('headMove2');
		  $('.page-shake .yyy-box').hide();
		  $('.page-shake .result-tip2').hide();
		  $('.page-shake .result-title').fadeIn();
		  $('#moneyBox').css({'transform': 'translate3d(0px, 0, 0px) scale(0.7)','-webkit-transform': 'translate3d(0px, 0, 0px) scale(0.7)','top':'25%','display': 'block'});
		  $('.money-box').find('.img').attr('src','img/page12_img2_2.png');
		  $('.page-shake .shine').fadeIn();
		  var shakeResultArr = ["img/result_img1.png","img/result_img2.png","img/result_img3.png"];
		  var randomshakeResult = shakeResultArr[Math.floor(Math.random()*3)];
		  $('.shake-result').find('img').attr('src',randomshakeResult);
		  $('.shake-result').show();
		  $('.reshake-tip').show();
		  $('.shake-next-btn').show();
		  
		  //$('.money-txt1').hide();
		  $('.money-tip').hide();
		  
		  $('.page-shake .ico').removeClass('yyy-ani');
		  shakeCount = 0;
	  }, 1000);
});
*/



});