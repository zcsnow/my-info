$(document).ready(function(){
	
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
		}, false);
		document.addEventListener('YixinJSBridgeReady', function() {//易信
				  play();
			}, false);
		document.addEventListener("touchstart",play, false);
	}
	audioAutoPlay('media');

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
    
	var storeArr = [1,2,3,4,5,6,7,8,9,10,11,12];
    storeArrLength = storeArr.length;
	var txtArr = [1,2,3,4,5,6,7,8,9,10,11,12];
	var txtArrLength;
	var loadingTxt = txtArr[0];
	var randomImgNum = 0;
	var txtNum = 0;
	var txtTime = setInterval(function(){
		txtNum++;
		if(txtNum>12){
		  clearInterval(txtTime);
		  return false;
	   }
	   txtArrLength = txtArr.length;
	   var randomNum = Math.floor(Math.random() * txtArrLength);
	   randomImgNum = txtArr[randomNum];
	   //console.log(randomImgNum);
	   //$('.loading-txt1').attr('src','images/loading_txt'+randomImgNum+'.png');
	   $('.loading-txt1').attr('src','images/people'+ randomImgNum +'_txt.png');
	   
	   txtArr.remove(randomImgNum);
	   
	},400);
	$('.loading-txt1').show();
    $('.load-txt').show()
	
	setTimeout(function(){
		$('.load-img').addClass('fadeInUp animated');
	},2500);
	

	setTimeout(function(){
		$('.page2').show();
		$('#loading').fadeOut();
		$('.music').show();
		setTimeout(function(){
			$('.img-txt .img1').addClass('fadeInLeft animated');
		},500);
		setTimeout(function(){
			$('.img-txt .img2').addClass('fadeInRight animated');
		},1000);
		setTimeout(function(){
			$('.tap-hand').fadeIn(1000);
			$('.page2').on('click',function(e){
			      $('.page3').show();
				  $('.page2').fadeOut(500);
				  //$('.page2').addClass('fadeOut animated');
				  
				  var initRandom = Math.ceil(Math.random()*parseInt(storeArrLength));
				  //人物切换
				  var starSwiper = new Swiper('#peopleSlider',{
					  loop:true,       
					  //autoplay: 3000, 
					  initialSlide:initRandom, 
					  nextButton: '#peopleSlider .swiper-button-next',
					  prevButton: '#peopleSlider .swiper-button-prev',
					  followFinger : false,
					  slidesPerView: 3,
					  spaceBetween: 20,
					  centeredSlides : true,
					  onInit: function (swiper) {
						  imgTxtShow();
					  },
					  onSlideChangeEnd: function (swiper) {
						  imgTxtShow();
					  }
	  
				  });
				  var hammerPeopleBig = new Hammer(document.getElementById("peopleBig"));
				  hammerPeopleBig.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
				  
				  hammerPeopleBig.on("swipeleft", function(){
					  starSwiper.slideNext();
				  });
				  hammerPeopleBig.on("swiperight", function(){
					  starSwiper.slidePrev();
				  });
			  
		  });
		},1500);
		setTimeout(function(){
			$('.img-txt2').addClass('fadeInUp animated');
		},2000);
		
	},5000);
	
	
	

});

function imgTxtShow(){
	var bigSrc = $('#peopleSlider .swiper-slide-active').attr('data-big-src');
	var bigSrcIndex = parseInt($('#peopleSlider .swiper-slide-active').attr('data-swiper-slide-index'))+1;
	$('.people-big-box').find('img').attr('src','images/people'+bigSrcIndex +'_big.jpg?5');
	$('.people-txt').find('img').attr('src','images/people'+bigSrcIndex +'_txt.png?5');
	$('.people-big-box').attr('data-swiper-slide-index',bigSrcIndex);
	$('.people-txt').attr('data-swiper-slide-index',bigSrcIndex);
}




//十字滑动
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;


var hammertime = new Hammer(document.getElementById("detailImgSwiper"));
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

hammertime.on("swipeleft", swipeType);
hammertime.on("swiperight",swipeType);
hammertime.on("swipeup",swipeType);
hammertime.on("swipedown",swipeType);

var swipeXIndex = 0;
var swipeYIndex = 0;
var curIndex = 0;
var canMove = true;
var lookStoreArr = [1,2,3,4,5,6,7,8,9,10,11,12];
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
function swipeType(ev){
	
	curIndex = parseInt($('.detail-swiper-wrapper').find('.active').attr('data-index'));
	lookStoreArr.remove(curIndex);
	swipeXIndex=0;
	swipeYIndex = 0;
	if(canMove == true){
		$('.detail-slide .ele1').removeClass('fadeInBlurUp1,fadeInBlurDown1,fadeInBlurLeft1,fadeInBlurRight1');
		$('.detail-slide .ele2').removeClass('fadeInBlurUp2,fadeInBlurDown2,fadeInBlurLeft2,fadeInBlurRight2');
		$('.detail-slide .ele3').removeClass('fadeInBlurUp3,fadeInBlurDown3,fadeInBlurLeft3,fadeInBlurRight3');
	  if(ev.type=="swipeleft"){
		  
		  detailSwiperWrapper(curIndex,"left");
		  /*$('.detail-slide .ele2').addClass('fadeInBlurLeft2');
	      $('.detail-slide .ele3').addClass('fadeInBlurLeft3');*/
	  }
	  if(ev.type=="swiperight"){
		  detailSwiperWrapper(curIndex,"right");
		  /*$('.detail-slide .ele2').addClass('fadeInBlurRight2');
	      $('.detail-slide .ele3').addClass('fadeInBlurRight3');*/
	  }
	  if(ev.type=="swipedown"){
		  detailSwiperWrapper(curIndex,"down");
		  /*$('.detail-slide .ele2').addClass('fadeInBlurDown2');
	      $('.detail-slide .ele3').addClass('fadeInBlurDown3');*/
		  
	  }
	  if(ev.type=="swipeup"){
		  detailSwiperWrapper(curIndex,"up");
		  /*$('.detail-slide .ele2').addClass('fadeInBlurUp2');
	      $('.detail-slide .ele3').addClass('fadeInBlurUp3');*/
	  }
	}
	//分享页面
	if(lookStoreArr.length == 0){
		//setTimeout(function(){
		$('.share-page').addClass('show');
		$('.music').show();
		//},500);
	}
}


function detailSwiperWrapper(curIndex,direction){
	canMove = false;
	//$('.detail-slide .ele1').removeClass('ele1fadeIn');
	
	if(direction=="up"){
		//$('.detail-slide .ele1').removeClass('fadeInBlurUp1');
//		$('.detail-slide .ele2').removeClass('fadeInBlurUp2');
//		$('.detail-slide .ele3').removeClass('fadeInBlurUp3');
		swipeYIndex--;
	}else if(direction=="down"){
		//$('.detail-slide .ele1').removeClass('fadeInBlurDown1');
//		$('.detail-slide .ele2').removeClass('fadeInBlurDown2');
//		$('.detail-slide .ele3').removeClass('fadeInBlurDown3');
		swipeYIndex++;
	}
	else if(direction=="left"){
		/*$('.detail-slide .ele1').removeClass('fadeInBlurLeft1');
		$('.detail-slide .ele2').removeClass('fadeInBlurLeft2');
		$('.detail-slide .ele3').removeClass('fadeInBlurLeft3');*/
		swipeXIndex--;
	}
	else if(direction=="right"){
		/*$('.detail-slide .ele1').removeClass('fadeInBlurRight1');
		$('.detail-slide .ele2').removeClass('fadeInBlurRight2');
		$('.detail-slide .ele3').removeClass('fadeInBlurRight3');*/
		swipeXIndex++;
	}
	
	$('.detail-swiper-wrapper').css({'transform':'translate3d(' + swipeXIndex*windowWidth + 'px, '+ swipeYIndex*windowHeight+'px, 0)','-webkit-transform':'translate3d(' + swipeXIndex*windowWidth + 'px, '+ swipeYIndex*windowHeight+'px,0)','transition-duration':'0s'});
	
	setTimeout(function(){
	  //$('.detail-slide .ele1').addClass('ele1fadeIn');
	  if(direction=="left"||direction=="up"){
		  curIndex++;
			if(curIndex>storeArrLength){
				curIndex=1;
			}
		  if(direction=="left"){
			crossLayout(curIndex);
			$('.detail-slide.center-box .ele1').addClass('fadeInBlurLeft1');
		  	$('.detail-slide.center-box .ele2').addClass('fadeInBlurLeft2');
			$('.detail-slide.center-box .ele3').addClass('fadeInBlurLeft3');
		  }
		  if(direction=="up"){
			crossLayout(curIndex);
			$('.detail-slide.center-box .ele1').addClass('fadeInBlurUp1');
		  	$('.detail-slide.center-box .ele2').addClass('fadeInBlurUp2');
			$('.detail-slide.center-box .ele3').addClass('fadeInBlurUp3');
		  }
		  $('.detail-swiper-wrapper').css({'transform':'translate3d(0,0,0)','transition-duration':'0s'});
		  
	  }else if(direction=="down"||direction=="right"){
		  curIndex--;
		  if(curIndex<=0){
			  curIndex=storeArrLength;
		  }
		  if(direction=="down"){
			crossLayout(curIndex);
			$('.detail-slide.center-box .ele1').addClass('fadeInBlurDown1');
		  	$('.detail-slide.center-box .ele2').addClass('fadeInBlurDown2');
			$('.detail-slide.center-box .ele3').addClass('fadeInBlurDown3');
		  }
		  if(direction=="right"){
			crossLayout(curIndex);
			$('.detail-slide.center-box .ele1').addClass('fadeInBlurRight1');
		  	$('.detail-slide.center-box .ele2').addClass('fadeInBlurRight2');
			$('.detail-slide.center-box .ele3').addClass('fadeInBlurRight3');
			
		  }
		  $('.detail-swiper-wrapper').css({'transform':'translate3d(0,0,0)','transition-duration':'0s'});
	  	  
		  
	  }
	  
	  
	  canMove = true;
	},300)
}


// 关闭弹层
$('.share-page .close-btn').on('click',function(e){
	e.stopPropagation();
	$('.share-page').removeClass('show');
	lookStoreArr = [1,2,3,4,5,6,7,8,9,10,11,12];
	$('.page4').hide();
	$('.page3').show();
	$('.logo').show();
	$('.music').show();
	
});

//点击查看详情
$('.js-look-detail').on('click',function(e){
	e.stopPropagation();
	var index = $(this).attr('data-swiper-slide-index');
	var detailIndex = 0;
	crossLayout(index);
	$('.detail-slide.center-box .ele1').addClass('fadeInBlurDown1');
	$('.detail-slide.center-box .ele2').addClass('fadeInBlurDown2');
	$('.detail-slide.center-box .ele3').addClass('fadeInBlurDown3');
	$('.page3').hide();
	$('.logo').hide();
	$('.music').hide();
	$('.page4').show();
	shakeFun();
});

$('#peopleSlider').on('click','.swiper-slide-active',function(e){
	e.stopPropagation();
	var index = parseInt($(this).attr('data-swiper-slide-index'))+1;
	var detailIndex = 0;
	crossLayout(index);
	$('.detail-slide.center-box .ele1').addClass('fadeInBlurDown1');
	$('.detail-slide.center-box .ele2').addClass('fadeInBlurDown2');
	$('.detail-slide.center-box .ele3').addClass('fadeInBlurDown3');
	$('.page3').hide();
	$('.logo').hide();
	$('.music').hide();
	$('.page4').show();
	shakeFun();
});


//创建十字结构
function crossLayout(num){
	var storeNum = parseInt(num);
	$('.detail-swiper-wrapper').children().remove();
	var slideLeft = window.innerWidth;
	var oneHeight = Math.floor(windowWidth*(301/750));
	var threeHeight = Math.floor(windowWidth*(302/750));
	var twoHeight = Math.ceil((windowHeight-oneHeight-threeHeight))+1;
	//console.log(oneHeight);
	//console.log(threeHeight);
	//console.log(twoHeight);
	var slideTop = 0;
	var detailSlideHtml = "";
	    if(storeNum==1){
		detailSlideHtml += '<div class="detail-slide up-box" data-index='+parseInt(storeArrLength)+' style="position:absolute;width:'+windowWidth+'px;height:'+windowHeight+'px;left:'+ 0*windowWidth +'px;top:'+ -1*windowHeight +'px;">';
		detailSlideHtml += '<p class="ele1"><img src="images/people'+ parseInt(storeArrLength) +'_detail1.jpg?1"></p>';
		detailSlideHtml += '<p class="ele2" style="height:'+twoHeight+'px"><img src="images/people'+ parseInt(storeArrLength) +'_detail2.jpg?1"></p>';
		detailSlideHtml += '<p class="ele3"><img src="images/people'+ parseInt(storeArrLength) +'_detail3.jpg?1"></p>';
		detailSlideHtml += '</div>';
		}else{
		detailSlideHtml += '<div class="detail-slide up-box" data-index='+parseInt(storeNum-1)+' style="position:absolute;width:'+windowWidth+'px;height:'+windowHeight+'px;left:'+ 0*windowWidth +'px;top:'+ -1*windowHeight +'px;">';
		detailSlideHtml += '<p class="ele1"><img src="images/people'+ parseInt(storeNum-1) +'_detail1.jpg?1"></p>';
		detailSlideHtml += '<p class="ele2" style="height:'+twoHeight+'px"><img src="images/people'+ parseInt(storeNum-1) +'_detail2.jpg"></p>';
		detailSlideHtml += '<p class="ele3"><img src="images/people'+ parseInt(storeNum-1) +'_detail3.jpg?1"></p>';
		detailSlideHtml += '</div>';
		}
		if(storeNum==12){
		detailSlideHtml += '<div class="detail-slide down-box" data-index='+1+' style="position:absolute;width:'+windowWidth+'px;height:'+windowHeight+'px;left:'+ 0*windowWidth +'px;top:'+1*windowHeight+'px;">';
		detailSlideHtml += '<p class="ele1"><img src="images/people'+ 1 +'_detail1.jpg"></p>';
		detailSlideHtml += '<p class="ele2" style="height:'+twoHeight+'px"><img src="images/people'+ 1 +'_detail2.jpg?1"></p>';
		detailSlideHtml += '<p class="ele3"><img src="images/people'+ 1 +'_detail3.jpg?1"></p>';
		detailSlideHtml += '</div>';
		}else{
		detailSlideHtml += '<div class="detail-slide down-box" data-index='+parseInt(storeNum+1)+' style="position:absolute;width:'+windowWidth+'px;height:'+windowHeight+'px;left:'+ 0*windowWidth +'px;top:'+1*windowHeight+'px;">';
		detailSlideHtml += '<p class="ele1"><img src="images/people'+ parseInt(storeNum+1) +'_detail1.jpg"></p>';
		detailSlideHtml += '<p class="ele2" style="height:'+twoHeight+'px"><img src="images/people'+ parseInt(storeNum+1) +'_detail2.jpg?1"></p>';
		detailSlideHtml += '<p class="ele3"><img src="images/people'+ parseInt(storeNum+1) +'_detail3.jpg?1"></p>';
		detailSlideHtml += '</div>';
		}
		detailSlideHtml += '<div class="detail-slide center-box active" data-index='+storeNum+' style="position: relative;width:'+windowWidth+'px;height:'+windowHeight+'px;">';
		detailSlideHtml += '<p class="ele1"><img src="images/people'+ storeNum +'_detail1.jpg"></p>';
		detailSlideHtml += '<p class="ele2" style="height:'+twoHeight+'px"><img src="images/people'+ storeNum +'_detail2.jpg?1"></p>';
		detailSlideHtml += '<p class="ele3"><img src="images/people'+ storeNum +'_detail3.jpg?1"></p>';
		detailSlideHtml += '</div>';
		if(storeNum==1){
			detailSlideHtml += '<div class="detail-slide left-box" data-index='+parseInt(storeArrLength)+' style="position:absolute;width:'+windowWidth+'px;height:'+windowHeight+'px;left:'+ -1*windowWidth +'px;top:'+ 0*windowHeight +'px;">';
		detailSlideHtml += '<p class="ele1"><img src="images/people'+ parseInt(storeArrLength) +'_detail1.jpg"></p>';
		detailSlideHtml += '<p class="ele2" style="height:'+ twoHeight +'px"><img src="images/people'+ parseInt(storeArrLength) +'_detail2.jpg?1"></p>';
		detailSlideHtml += '<p class="ele3"><img src="images/people'+ parseInt(storeArrLength) +'_detail3.jpg?1"></p>';
		detailSlideHtml += '</div>';
		}else{
		detailSlideHtml += '<div class="detail-slide left-box" data-index='+parseInt(storeNum-1)+' style="position:absolute;width:'+windowWidth+'px;height:'+windowHeight+'px;left:'+ -1*windowWidth +'px;top:'+ 0*windowHeight +'px;">';
		detailSlideHtml += '<p class="ele1"><img src="images/people'+ parseInt(storeNum-1) +'_detail1.jpg"></p>';
		detailSlideHtml += '<p class="ele2" style="height:'+ twoHeight +'px"><img src="images/people'+ parseInt(storeNum-1) +'_detail2.jpg?1"></p>';
		detailSlideHtml += '<p class="ele3"><img src="images/people'+ parseInt(storeNum-1) +'_detail3.jpg?1"></p>';
		detailSlideHtml += '</div>';
		}
		if(storeNum==12){
		detailSlideHtml += '<div class="detail-slide right-box" data-index='+1+' style="position:absolute;width:'+windowWidth+'px;height:'+windowHeight+'px;left:'+ 1*windowWidth +'px;top:'+ 0*windowHeight +'px;">';
		detailSlideHtml += '<p class="ele1"><img src="images/people'+ 1 +'_detail1.jpg"></p>';
		detailSlideHtml += '<p class="ele2" style="height:'+ twoHeight +'px"><img src="images/people'+ 1 +'_detail2.jpg?1"></p>';
		detailSlideHtml += '<p class="ele3"><img src="images/people'+ 1 +'_detail3.jpg?1"></p>';
		detailSlideHtml += '</div>';
		}else{
		detailSlideHtml += '<div class="detail-slide right-box" data-index='+parseInt(storeNum+1)+' style="position:absolute;width:'+windowWidth+'px;height:'+windowHeight+'px;left:'+ 1*windowWidth +'px;top:'+ 0*windowHeight +'px;">';
		detailSlideHtml += '<p class="ele1"><img src="images/people'+ parseInt(storeNum+1) +'_detail1.jpg"></p>';
		detailSlideHtml += '<p class="ele2" style="height:'+ twoHeight +'px"><img src="images/people'+ parseInt(storeNum+1) +'_detail2.jpg?1"></p>';
		detailSlideHtml += '<p class="ele3"><img src="images/people'+ parseInt(storeNum+1) +'_detail3.jpg?1"></p>';
		detailSlideHtml += '</div>';
		}
		
	$('.detail-swiper-wrapper').append(detailSlideHtml);
	//$('.detail-slide .ele1').addClass('ele1fadeIn');
	
}





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
						if (navigator.vibrate) {
							navigator.vibrate(1000);//震动1000毫秒
						} else if (navigator.webkitVibrate) {
							navigator.webkitVibrate(1000);
						}
					},200)
					
					//摇结果
					setTimeout(function(){
						var randomshakeResult = Math.ceil(Math.random()*parseInt(storeArrLength));
						crossLayout(randomshakeResult);
						$('.detail-slide.center-box .ele1').addClass('fadeInBlurDown1');
						$('.detail-slide.center-box .ele2').addClass('fadeInBlurDown2');
						$('.detail-slide.center-box .ele3').addClass('fadeInBlurDown3');
						setTimeout(function(){
							canShake = true;
						}, 1000);
						
					}, 1500);
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
		 //player1.volume=0;
		 //player1.muted = true; 
	  
  } else {
	  $('.music').addClass('on');
	  $('.music img').attr('src', 'images/music0.png');
		 $('#media')[0].play();
		 //player1.volume=1;
		 
		 //player1.muted = false;
  }
});

