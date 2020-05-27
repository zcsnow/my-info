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
//audioAutoPlay('bgMusic');
//audioAutoPlay('shakeMedia');

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
	$("#progressbar em").text(bar);
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



//摇一摇
var canShake = true;
function page1Ani(){
	$('.p1-img1').removeClass('animated fadeIn');
	$('.p1-img2').removeClass('animated fadeIn');
	$('.p1-img3').hide();
	$('.p1-img4').hide();
	$('.page1 .btn').removeClass('animated fadeIn');
	$('.page1 .logo1').removeClass('animated fadeIn');
	$('.page1 .cloud').removeClass('animated fadeInUp');
	$('.page1').fadeIn();
	setTimeout(function(){
		$('.p1-img1').addClass('animated fadeIn');
		$('.p1-img2').addClass('animated fadeIn');
	},500);
	setTimeout(function(){
		$('.p1-img3').fadeIn(2000);
		$('.p1-img4').fadeIn(2000);
	},1000);
	setTimeout(function(){
		$('.page1 .cloud').addClass('animated fadeInUp');
	},1500);
	setTimeout(function(){
		$('.page1 .btn').addClass('animated fadeIn');
		$('.page1 .logo1').addClass('animated fadeIn');
		canShake = true;
		shakeFun();
	},2000);
	
}

function page2Ani(){
	$('.p2-img1').removeClass('animated fadeIn');
	$('.p2-img2').removeClass('animated fadeIn');
	$('.p2-img3').removeClass('animated fadeIn');
	$('.page2 .btn').removeClass('animated fadeIn');
	$('.page2 .cloud').removeClass('animated fadeInUp');
	$('.page2').fadeIn();
	setTimeout(function(){
		$('.p2-img1').addClass('animated fadeIn');
		$('.p2-img2').addClass('animated fadeIn');
	},500);
	setTimeout(function(){
		$('.p2-img3').addClass('animated fadeIn');
	},1000);
	setTimeout(function(){
		$('.page2 .cloud').addClass('animated fadeInUp');
	},1500);
	setTimeout(function(){
		$('.page2 .btn').addClass('animated fadeIn');
		
	},2000);
	
}

// $('.js-try-btn').click(function(e){
// 	e.stopPropagation();
// 	$('.page1').hide();	
// 	page2Ani();
// });
$('.js-open-btn').on('click',function(e){
	e.stopPropagation();
	//var randomshakeResult = Math.ceil(Math.random()*parseInt(storeArrLength));
	$('.page2').hide();
	// $('.page3 .result-box').find('.result-img').attr('src','');
	// $('.result-box').find('.result-img').attr('src','images/result'+randomshakeResult+'.png');
	// $('.save').find('img').attr('src','images/save_result'+randomshakeResult+'.jpg');
	$('.page3').fadeIn(1000);
});

$('.js-replay-btn').click(function(e){
	e.stopPropagation();
	page1Ani();
	$('.page3').hide();
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
document.addEventListener("WeixinJSBridgeReady", function () {//微信
	//play();
	$('#shakeMedia')[0].play();
	$('#shakeMedia')[0].pause();
 }, false);
  
var storeArr = [1,2,3,4,5,6];
var storeArrLength = storeArr.length;	 


function shakeFun(){
    //判断系统是否支持html5摇一摇的相关属性
	if (window.DeviceMotionEvent){
        //alert('window.DeviceMotionEvent:'window.DeviceMotionEvent)
		var speed = 10;
		var x = t = z = lastX = lastY = lastZ = 0;
		window.addEventListener('devicemotion',function (event) {
				//alert('devicemotion')
				var acceleration = event.accelerationIncludingGravity;
				x = acceleration.x;
				y = acceleration.y;
				if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
					if(canShake==true){
				      canShake=false;
					  //摇一摇后js代码
					  setTimeout(function(){

						  $('#shakeMedia')[0].play();
						  //$('#shakeMedia')[0].trigger('play');
						  //手机震动1秒
						  if (navigator.vibrate) {
							  navigator.vibrate(1000);//震动1000毫秒
						  } else if (navigator.webkitVibrate) {
							  navigator.webkitVibrate(1000);
						  }
					  },200)
					  
					  //摇结果
					  setTimeout(function(){
						$('.page3 .result-box').find('.result-img').attr('src','');
						var randomshakeResult = Math.ceil(Math.random()*parseInt(storeArrLength));
						$('.result-box').find('.result-img').attr('src','images/result'+randomshakeResult+'.png');
						$('.save').find('img').attr('src','images/save_result'+randomshakeResult+'.jpg');
						$('.p1-img3').addClass('swingAni0');
						//结果分享
						var shareDescArr = [
							'我的2019锦鲤灵符竟然是：好友投食符！好友们快来吧，我准备好啦~', 
							'我的2019锦鲤灵符竟然是：肥宅不胖符！妈妈再也不用担心我长胖了~', 
							'我的2019锦鲤灵符竟然是：不用加班符！火锅蹦迪逛大街，我有的是时间~', 
							'我的2019锦鲤灵符竟然是：桃花上门符！确认过眼神，我终于遇上对的人~',
							'我的2019锦鲤灵符竟然是：计划顺利符！今年是个好运年，心想的事儿都能成~',
							'我的2019锦鲤灵符竟然是：不被催婚符！我还是个宝宝，结婚确实太早~'
						];
						var shareDesc = shareDescArr[randomshakeResult-1];
						shareInfo = {
							title:'19年锦鲤赐福？立即摇一摇，获得运势灵符！',     
							desc:shareDesc,
							linetitle: "比转发“信小呆”还有用的2019年度灵符！",
							imgUrl:'http://pay.dongxingji.cn/h5/20190101/images/fenxiang.jpg', 
						}; 
						wxShare(sharLink,shareInfo);

						  setTimeout(function(){
							$('.page1').hide();	
							$('.p1-img3').removeClass('swingAni0');
							//$('.page2').fadeIn();
							page2Ani();
						  }, 2000);
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
$('.js-share-btn').on('click',function(e){
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



	  
	 