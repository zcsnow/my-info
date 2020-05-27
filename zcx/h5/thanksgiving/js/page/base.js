;$(function(){ 
var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);}, 
	}
	
//滚动条不可滚动、高度100%
//tool.disabledScroll();


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
//audioAutoPlay('media');

var clientW=document.documentElement.clientWidth,clientH=document.documentElement.clientHeight;
var homeSwiper = null;
var wrapLeft=(clientW-clientH)*0.5+"px";
var wrapTop=(clientH-clientW)*0.5+"px";
$("#loading,.page").css({"-webkit-transform":"rotate(90deg)","width":clientH,"height":clientW,"left":wrapLeft,"top":wrapTop});
	  
setTimeout(function(){
	
	$('#loading').fadeOut();
	$('#homeSlider').show();
	//滑动切换
	homeSwiper = new Swiper('#homeSlider', {
		direction : 'vertical',
		pagination:'.swiper-pagination', //分页
		paginationClickable: true,
		onInit: function (swiper) {
				
		},
		onSlideChangeEnd: function (swiper) {
			
			/*if(swiper.activeIndex==3){
			  $('#array').hide();
			}*/
			
		}
	
	});
	


	
},500);
//$('.detail-slide.center-box .ele1').addClass('fadeInBlurDown1');
//$('.load-img').addClass('fadeInUp animated');

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

	

$('.page1').click(function(e){
	homeSwiper.slideNext();
});  
$('.page2').click(function(e){
	homeSwiper.slideNext();
});  
$('.page3').click(function(e){
	homeSwiper.slideNext();
});  
$('.page4').click(function(e){
	homeSwiper.slideNext();
});  
$('.page5').click(function(e){
	homeSwiper.slideNext();
});  
$('.page6').click(function(e){
	homeSwiper.slideNext();
});  
$('.page7').click(function(e){
	homeSwiper.slideNext();
});  
$('.page8').click(function(e){
	homeSwiper.slideNext();
});     
 

});



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
