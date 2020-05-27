var startTime = (new Date()).getTime();
var delTime = 1000;
var ishengping = false;
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
var timeType,timeType2,timeType3;
$(function(){
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
  
  $('.music').on('click', function () {
	  if ($('.music').hasClass('on')) {
		  $('.music').removeClass('on');
		  $('.music img').attr('src', 'images/music1.png?2');
		  $("#media")[0].pause();
	  } else {
		  $('.music').addClass('on');
		  $('.music img').attr('src', 'images/music0.png?2');
		  $("#media")[0].play();
	  }
  }); 
  audioAutoPlay("media");
  
  $('.showWord1').fadeIn();
  
  
  if(isAndroid){
	  $('.container').addClass('android');
  }

  setTimeout(function(){
	  $('#loading').hide();
	  hengshuping();
	  //if(ishengping == true){
		$('.page1').show();
		setTimeout(function(){
			$('.page1 .p1').addClass('animated fadeOutUp')
			$('.page1 .p2').show()
			setTimeout(function(){
				$('.page1 .p1').hide();
				$('.page1 .p2').addClass('animated fadeInUp');
			},1000);
			setTimeout(function(){
				$('.page1 .p2').removeClass('animated fadeInUp').addClass('animated fadeOutUp')
				$('.page1 .video-box').show()
			},5000);
			setTimeout(function(){
				$('.page1 .p2').hide();
				$('.page1 .video-box').addClass('animated fadeInUp');
				$('.try-btn').show();
			},6000);
		},4000);
	  //}
	  
  },6000)

  
  //hengshuping();
  /*setTimeout(function(){
	 $('#loading').hide();
	 $(".page1").show();
  },3000);*/

    /*$('.video-poster').click(function(){
		$('#video').show();
		$('#video')[0].play();
	});
	
	$('#video').click(function(){
		$('#video').hide();
		$('#video').pause();
		
	});*/

	$('.js-share-btn').click(function(){
		$('.js-share-pop').show();	
		$('.mask').show();
	});
	$('.js-share-pop').click(function(){
		$('.js-share-pop').hide();	
		$('.mask').hide();
	});
	
	$('.js-ewm-btn').click(function(){
		$('.js-ewm-pop').show();	
	});
	
	$('.close-btn').click(function(){
		$('.js-ewm-pop').hide();	
	});



/*if(!isAndroid){
	$('.fill-word').addClass('iphone');
}*/

var homeSwiper;
$('.page1').on('click','.js-xs-btn',function () {
	    $(this).hide();
	    $('.page1 .hand').find('img').attr('src','images/hand2.png');
		$('.page1 .hand').addClass('handMove');
		setTimeout(function(){
			$('.page1 .wheel').addClass('wheelMove');
			$('.page1 .dial').fadeOut();
			
		},2000);
		setTimeout(function(){
			$('.page1 .window').fadeOut();
		},4000);
		//$('.page1').hide();
		setTimeout(function(){
			  
			  $('#homeSlider').fadeIn();
			  setTimeout(function(){
				  $('.page4 .wheel').show();
				  $('.page1').hide()
				  
			  },1000);
			  homeSwiper = new Swiper('#homeSlider', {
				  paginationClickable: true,
				  noSwiping : true,
				  onInit: function (swiper) {
						  swiperAnimateCache(swiper);
						  swiperAnimate(swiper);
				  },
				  onSlideChangeEnd: function (swiper) {
					  swiperAnimate(swiper);
					  /*if(swiper.activeIndex<=1){
						  $('.back-home-btn .txt').hide();
						  $('.back-home-btn').addClass('logomove').removeClass('back-home-cur');
						  homeSwiper.lockSwipeToPrev();
					  }else{
						  if(swiper.activeIndex>=2){
							  $('.back-home-btn').removeClass('logomove').addClass('back-home-cur');
							  $('.back-home-btn .txt').show();
						  }else{
						      $('.back-home-btn .txt').hide();
							  $('.back-home-btn').addClass('logomove').removeClass('back-home-cur');
						  }
						  
						  
						  homeSwiper.unlockSwipeToPrev()
					  }*/
					  
					  
				  }
			
			  });
		},5000)
    
});


    
 
 $('.js-restart').on('click',function() {
 	homeSwiper.slideTo(1);
 });
 
 $('.page4-btn1').on('click',function() {
 	homeSwiper.slideTo(2);
 });
 
 $('.page4-btn2').on('click',function() {
 	homeSwiper.slideTo(3);
 });
 
 $('.page4-btn3').on('click',function() {
 	homeSwiper.slideTo(4);
 });
 
 $('.page4-btn4').on('click',function() {
 	homeSwiper.slideTo(5);
 });
$('.page4-btn5').on('click',function() {
 	homeSwiper.slideTo(1);
 }); 
 
 $('.container').on('click','.back-home-cur',function() {
 	homeSwiper.slideTo(1);
 }); 
 
 
 /**/$('#video').on('click', function () {
	
	  $('#video')[0].play();
  });
 

});


	    



//判断手机横竖屏状态： 
function hengshuping(){ 
	if(window.orientation==180||window.orientation==0){ 
         $('.tipzd').show();
		 //$('.tipzd').hide(); 
		 
	 } 
	if(window.orientation==90||window.orientation==-90){ 
		  $('.tipzd').hide(); 
		  ishengping = true;


 
	 } 
 } 

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping , false);

