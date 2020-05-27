var flag=false;

var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);}, 
	}
	
//滚动条不可滚动、高度100%
tool.disabledScroll();
	  
function audioAutoPlay(id){
	var audio = document.getElementById(id),
		play = function(){
		audio.play();
		document.removeEventListener("touchstart",play, false);
	};
	audio.play();
	document.addEventListener("WeixinJSBridgeReady", function () {//微信
	   play();
	   $('#shakeMedia')[0].play();
	   $('#shakeMedia')[0].pause();
	}, false);
	document.addEventListener('YixinJSBridgeReady', function() {//易信
			  play();
		}, false);
	//document.addEventListener("touchstart",play, false);
}
audioAutoPlay('bgMusic');

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

var bar = 0;
var loadingTime;
function progress() {
	bar = bar + 1;
	$("#progressbar").width(bar + "%");
	if (bar <= 60) {
		loadingTime = setTimeout(progress, 40);
	}
	else if (bar <= 90&bar > 60) {
		loadingTime =setTimeout(progress, 50);
	}
	else if (bar <= 96&bar > 90) {
		loadingTime = setTimeout(progress, 100);
	}
}
progress();
setTimeout(function(){
      //隐藏loading页面
	  $('.loading-box').hide();
	  page1Ani();
},5000);


function page1Ani(){
	$('.page1').fadeIn();
	setTimeout(function(){
		$('.door1').addClass('doorAni1');
	    $('.door2').addClass('doorAni2');
	},200);
	setTimeout(function(){
		$('.music').fadeIn();
	},1000);
	setTimeout(function(){
		$('.draw-icon').addClass('swingAni0');
		$('.door-box').hide();
		
	},2000);
	setTimeout(function(){
		$('.page1 .btn-box').fadeIn(1000);
	},3000);
	
}

$('.js-try-btn').click(function(e){
	e.stopPropagation();
	$('.page1').hide();	
	$('.page2').fadeIn();
	/*setTimeout(function(){
		$('.page2').hide();	
		$('.page3').fadeIn();
	},1000);	*/
	shakeFun();
});

/*$('.tip').click(function(e){
	$('.tip').fadeOut();
	setTimeout(function(){
		var randomshakeResult = Math.ceil(Math.random()*parseInt(storeArrLength));
		$('.page2 .draw1').addClass('swingAni');
		setTimeout(function(){
			$('.page2 .draw2').addClass('draw2Ani');
			
		}, 1000);
		
		setTimeout(function(){
			$('.page2').hide();
			$('.page3').fadeIn();
			$('.result-box span').find('img').attr('src','images/result'+randomshakeResult+'.png');
			$('.save').find('img').attr('src','images/save_result'+randomshakeResult+'.jpg');
			
			canShake = true;
		}, 3000);
		
	}, 1000);
});*/
function pageName()
{
	var a = location.href;
	var b = a.split("/");
	var c = b.slice(b.length-1, b.length).toString(String).split(".");
	return c.slice(0, 1);
}	 


	  
var storeArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
var storeArrLength = storeArr.length;	 

//摇一摇
var canShake = true;
function shakeFun(){
    //判断系统是否支持html5摇一摇的相关属性
	if (window.DeviceMotionEvent){
		var speed = 10;
		var x = t = z = lastX = lastY = lastZ = 0;
		window.addEventListener('devicemotion',function (event) {
			
				var acceleration = event.accelerationIncludingGravity;
				x = acceleration.x;
				y = acceleration.y;
				if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
					if(canShake==true){
				      canShake=false;
					  //摇一摇后js代码
					  setTimeout(function(){
						  $('#shakeMedia')[0].play();
						  //手机震动1秒
						  /*if (navigator.vibrate) {
							  navigator.vibrate(1000);//震动1000毫秒
						  } else if (navigator.webkitVibrate) {
							  navigator.webkitVibrate(1000);
						  }*/
					  },200)
					  
					  //摇结果
					  $('.tip').fadeOut();
					  setTimeout(function(){
						  var randomshakeResult = Math.ceil(Math.random()*parseInt(storeArrLength));
						  //$('.page2 .draw1').addClass('swingAni');
						  //$('.page2 .draw1').find('img').attr('src','images/shake.gif');
						  $('.page2 .draw1').addClass('drawAnimate');
						  //$('.page2 .draw1').find('img').css('visibility','hidden');
						  setTimeout(function(){
							  $('.page2 .draw2').addClass('draw2Ani');
							  
						  }, 3400);/**/
						  setTimeout(function(){
							  //$('.page2 .draw1').find('img').css('visibility','visible');
							  $('.page2 .draw1').removeClass('drawAnimate').addClass('drawHideAni');
						  },3000);
						  
						  setTimeout(function(){
							  
							  $('.page2 .draw2').removeClass('draw2Ani');
							  $('.page2 .draw1').removeClass('drawHideAni');
							  $('.tip').fadeIn();
							  $('.page2').hide();
							  $('.page3').fadeIn();
							  $('.page3 .result-box').addClass('reelAnimate');
							  var fileName = pageName()+'/'; 
							  if(pageName() =='index'){
								  fileName="";
							  }
							  setTimeout(function(){
								  
								  $('.result-box span').find('img').attr('src','images/result'+randomshakeResult+'.png');
								  $('.page3 .logo').find('img').attr('src','images/result'+randomshakeResult+'_logo.png');
							  	  //$('.save').find('img').attr('src',fileName+'/images/save_result'+randomshakeResult+'.jpg');
								  $('.save').find('img').attr('src','images/'+fileName+'save_result'+randomshakeResult+'.jpg');

								  
							  },1000);
							  
							  
							  canShake = true;
						  }, 4400);
						  
					  },200);
					}
				};
				lastX = x;
				lastY = y;
			
		},false);
	} 
	else {
        alert('not support mobile shake');
    }
}

//分享
$('.js-share-btn').click(function(){
	$('.js-share-pop').show();	
});
$('.js-share-pop').click(function(e){
	e.stopPropagation();
	$('.js-share-pop').hide();	
});








function popTip(msg){
	$('.pop-tip-msg').html(msg);
	$('.pop-tip-box').show();
	setTimeout(function(){
		$('.pop-tip-box').hide();
	},2000);
};

$('.music').on('click', function () {
  if ($('.music').hasClass('on')) {
	  $('.music').removeClass('on');
	  $('.music img').attr('src', 'images/music1.png');
		 $('#media')[0].pause();
	  
  } else {
	  $('.music').addClass('on');
	  $('.music img').attr('src', 'images/music0.png');
		 $('#media')[0].play();
		
  }
});



	  
	 