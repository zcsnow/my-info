$(function(){
	var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);}, 
	}
	

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	

	
	
	var ua = navigator.userAgent;
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
	//alert(window.innerWidth);
		
	//滚动条不可滚动、高度100%
	tool.disabledScroll();

  
  //音乐控制
  function audioAutoPlay(id){
	  document.addEventListener("WeixinJSBridgeReady", function () {//微信
		 var audio = document.getElementById(id);
		 
		 audio.play();
		 audio.pause();
		 
	  }, false);
	 
  }
  
  var player = document.getElementById('movie');

  

  audioAutoPlay('movie');

  
	//loading
    var bar = 0;
    var loadingTime;
    function progress() {
        bar = bar + 1;
        $("#loading_text").text(bar + " %");
		if (bar <= 40) {
            loadingTime = setTimeout(progress, 40);
        }
		else if (bar <= 70& bar > 40) {
            loadingTime = setTimeout(progress, 60);
        }
		else if (bar <= 99& bar > 70) {
            loadingTime = setTimeout(progress, 80);
        }
        else {
			$('.eyes').css('opacity',1);
			$('.eyes').addClass('glassAni');
			$('.cat').fadeIn();
			//$('.cat3').fadeOut();
			//$('.cat1').fadeOut();
			$('.tip-txt').fadeIn();
			$('.cat-eye').fadeIn();
			$('.cat-eye').addClass('eyeAnimate');
			$('#loading_text').hide();

			var getCss = function(o,key){
				return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];   
			};
			var eyeshiddenElement = document.getElementById("eyeshidden");
			var eyeshiddenTop = parseInt($('#eyeshidden').css('top'));
			var eyeshiddenLeft = parseInt($('#eyeshidden').css('left'));
			var eyeshiddenWidth = $('.eyeshidden').width();
			var eyeshiddenHeight = $('.eyeshidden').height();
			var eleEndTop = $('#eyeshidden').css('top');
			var eleEndLeft = $('#eyeshidden').css('left');
			console.log(eleEndTop,eleEndLeft);
			var MaxRangeX = eyeshiddenLeft+ parseInt(eyeshiddenWidth/1.5);
			var MinRangeX = eyeshiddenLeft - parseInt(eyeshiddenWidth/1.5);
			var MaxRangeY = eyeshiddenTop+ parseInt(eyeshiddenHeight/1.2);
			var MinRangeY = eyeshiddenTop - parseInt(eyeshiddenHeight/1.5);
			var elementLeft;
			var elementTop;
			
			var x = 0;
			var y = 0;
			var isplay=false;
			function drag(element){
				//element.style.top = getCss(element,"top");
				//element.style.left = getCss(element,"left");
				element.style.top = $('#glass').css('top')
				element.style.left = $('#glass').css('left');
				var hammer = new Hammer(element);
				hammer.on('panstart',function(event){
					$('.eyes').removeClass('glassAni');
					$('.tip-txt').fadeOut();
					x = parseInt(element.style.left);
					y = parseInt(element.style.top);
					console.log(x,y);
					
				});
				hammer.on('panmove',function(event){
					element.style.top = y + event.deltaY + "px";
					element.style.left = x + event.deltaX + "px";
					elementLeft = parseInt(x + event.deltaX);
					elementTop = parseInt(y + event.deltaY);
					
				});
				hammer.on('panend',function(event){
					if(( elementLeft>MinRangeX && elementLeft<MaxRangeX )&&( elementTop>MinRangeY && elementTop<MaxRangeY )){
						//player.play();
						//player.pasue();
						hammer.off('panstart');
						hammer.off('panmove');
						hammer.off('panend');
						
						$('.eyes').addClass('cur');
						$('.eyes').css({'top':eleEndTop,'left':eleEndLeft});
						$('.cat-eye').fadeOut();
						//player.play();
						
						if (ua.indexOf("iPhone") >0) {
							setTimeout(function (){
								$('.eyes').removeClass('cur');
								$('#loading').hide();
								$('#page2').show();
								player.play();
								$('.tip-rotate').fadeIn();
								$('.music').fadeIn();
	
							},1000);
						}else{
							$('.eyes').removeClass('cur');
							$('#loading').hide();
							$('#page2').show();
							player.play();
							$('.tip-rotate').fadeIn();
							$('.music').fadeIn();
						}
						
						
						
					}
		
				});
		
			}
			var glassElement = document.getElementById("glass");
			drag(glassElement);
			

			
        }

    }

    setTimeout(function(){
		$(".loading_wrp").show();
		progress();
	},50);
	
	
  var $scene = $('#scene').parallax({
	  limitY: 0,
	  scalarX: 50,
 	  scalarY: 8,
	  originX: 0,
  });
  
    var timeline01 = [23.480305];
	var timeline02 = [32.668376];
	var timeline03 = [34.519877];
	var timeline04 = [47.519877];
	var timeline05 = [56.219877];
	
    player.ontimeupdate = function () { 
		var curTime = player.currentTime; 
		  if (timeline01[0] && curTime >= timeline01[0]) {
			  vibrate();
			  timeline01.shift();
		  }else if (timeline02[0] && curTime >= timeline02[0]) {
			  vibrate();
			  timeline02.shift();
		  }else if (timeline03[0] && curTime >= timeline03[0]) {
			  vibrate();
			  timeline03.shift();
		  } else if (timeline04[0] && curTime >= timeline04[0]) {
			  vibrate();
			  timeline04.shift();
		  } else if (timeline05[0] && curTime >= timeline05[0]) {
			  vibrate();
			  timeline05.shift();
		  }else if(curTime>66.5){
			  if(isAndroid){
					$('#page3').css('opacity',1);
					$('#page2').hide();
				}else{
					$('#page3').addClass('resultScale');
					setTimeout(function(){$('#page2').fadeOut();},500);
				}
				$('.tip-rotate').hide();
				$('.music').hide();
			 
		  };
		  
	}
	
	//手机震动1秒
	function vibrate(){
		if (navigator.vibrate) {
			navigator.vibrate(1000);//震动1000毫秒
		} else if (navigator.webkitVibrate) {
			navigator.webkitVibrate(1000);
		}
	}

	player.onended = function(){
		if(isAndroid){
			$('#page3').css('opacity',1);
			$('#page2').hide();
		}else{
			$('#page3').addClass('resultScale');
			setTimeout(function(){$('#page2').fadeOut();},500);
		}
		$('.tip-rotate').hide();
		$('.music').hide();
		
	}
        
	$('.play-btn-box').on('touchstart', function (event) {
		event.stopImmediatePropagation();
		 $('.play-btn-box').hide();
		 player.play();

	});
	
	

//分享
$('.js-share-btn').click(function(){
	$('.js-share-pop').show();	
});
$('.js-share-pop').click(function(e){
	e.stopPropagation();
	$('.js-share-pop').hide();	
});

$('.js-restart').on('touchstart', function (event) {
	 event.stopImmediatePropagation();
	 window.location.href= "index.html?"+Math.random(); 
	 
	
});
	
	
$('.music').on('click', function () {
  if ($('.music').hasClass('on')) {
	  $('.music').removeClass('on');
	  $('.music img').attr('src', 'img/music1.png');
		 player.volume=0;
		 player.muted = true; 
	  
  } else {
	  $('.music').addClass('on');
	  $('.music img').attr('src', 'img/music0.png');
		 player.volume=1;
		 player.muted = false;
  }
});	
	
	



	
	
});