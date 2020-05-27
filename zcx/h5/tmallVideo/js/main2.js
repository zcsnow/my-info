$(function(){
	var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);}, 
	}
	var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	//alert(window.innerWidth);
		
	//滚动条不可滚动、高度100%
	tool.disabledScroll();
	
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	var ua = window.navigator.userAgent.toLowerCase();
  
  //音乐控制
  function audioAutoPlay(id){
	  document.addEventListener("WeixinJSBridgeReady", function () {//微信
		 var audio = document.getElementById(id);
		 audio.play();
		 audio.pause();
	  }, false);
	 
  }
  
  var player = document.getElementById('movie');

  
  if(ua.indexOf("iphone") >= 0)
  {
	  audioAutoPlay('movie');
  }
  
	//loading
    var bar = 0;
    var loadingTime;
    function progress() {
        bar = bar + 1;
        $("#loading_text").text(bar + " %");
		if (bar < 40) {
            loadingTime = setTimeout(progress, 100);
        }
		else if (bar == 40) {
            loadingTime = setTimeout(progress, 200);
        }
		else if (bar < 70& bar > 40) {
            loadingTime = setTimeout(progress, 100);
        }
		else if (bar == 70) {
            loadingTime = setTimeout(progress, 150);
        }
		else if (bar <= 99& bar > 70) {
            loadingTime = setTimeout(progress, 100);
        }
        else {
			$('.eyes').css('opacity',1);
			$('.eyes').addClass('glassAni');
			$('.cat2').fadeIn();
			$('.cat3').fadeOut();
			//$('.cat1').fadeOut();
			$('.tip-txt').fadeIn();
			$('#loading_text').hide();

			var getCss = function(o,key){
				return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];   
			};
			var eyeshiddenElement = document.getElementById("eyeshidden");
			var eyeshiddenTop = parseInt(getCss(eyeshiddenElement,"top"));
			var eyeshiddenLeft = parseInt(getCss(eyeshiddenElement,"left"));
			var eyeshiddenWidth = $('.eyeshidden').width();
			var eyeshiddenHeight = $('.eyeshidden').height();
			
			var MaxRangeX = eyeshiddenLeft;
			var MinRangeX = eyeshiddenLeft - parseInt(eyeshiddenWidth/4);
			var MaxRangeY = eyeshiddenTop;
			var MinRangeY = eyeshiddenTop - parseInt(eyeshiddenHeight/4);
			

			function drag(element){
				element.style.top = getCss(element,"top");
				element.style.left = getCss(element,"left");
				var hammer = new Hammer(element);
				var x = 0;
				var y = 0;
				hammer.on('panstart',function(event){
					$('.eyes').removeClass('glassAni');
					$('.tip-txt').fadeOut();
					x = parseInt(element.style.left);
					y = parseInt(element.style.top);
				});
				hammer.on('panmove',function(event){
					element.style.top = y + event.deltaY + "px";
					element.style.left = x + event.deltaX + "px";
					var elementLeft = parseInt(x + event.deltaX);
					var elementTop = parseInt(y + event.deltaY);
					if(( elementLeft>MinRangeX && elementLeft<MaxRangeX )&&( elementTop>MinRangeY && elementTop<MaxRangeY )){
						$('#loading').hide();
						$('#page2').fadeIn();
						player.play();
					}
				});
				hammer.on('panend',function(event){
		
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
	  scalarX: 32,
 	  scalarY: 8,
	  originX: 0,
  });
	
	
	player.onended = function(){
		$('#page3').fadeIn();
		$('#page2').hide();
		
	}
        
	$('.play-btn-box').on('touchstart', function (event) {
		event.stopImmediatePropagation();
		 $('.play-btn-box').hide();
		 player.play();

	});


	
	
	
	
	



	
	
});