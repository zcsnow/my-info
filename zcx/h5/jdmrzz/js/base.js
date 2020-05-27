var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
var imgSrc1="images/boy1.png";
var imgSrc2="images/boy2.png";
var imgSrc3="images/boy3.png";
var host1 = imgSrc1; 
var host2 = imgSrc2;
function dp_submitScore(m,t){
}
function dp_share(t){
    //document.title = t/1000+"秒！不行了，我都快变双重人格了！这游戏实在太虐心了！";
}
function dp_share2(t){
    //document.title = t/1000+"秒！不行了，我都快变双重人格了！这游戏实在太虐心了！";
}
function dp_Ranking(){
}
function help_text(){
}

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
  
  var curUrl = window.location.hash;
  var urlArg=curUrl.substr(1)||0; 
  console.log(urlArg);
  if(urlArg==1){
		  startPage();
  }else{
	  setTimeout(function(){
		  //$('.loading-txt .txt1').fadeIn();
		  $('.loading-txt .txt1').css('opacity',1)
	  },500);
	  setTimeout(function(){
		  //$('.loading-txt .txt2').fadeIn();
		  $('.loading-txt .txt2').css('opacity',1)
	  },1000);
	  setTimeout(function(){
		  //$('.loading-txt .txt3').fadeIn();
		  $('.loading-txt .txt3').css('opacity',1)
		  //$('.page1 .p1').addClass('animated fadeOutUp')
	  },1500);
	  setTimeout(function(){
		  startPage();
	  },3000)
  }
  
  function startPage(){
		  $('#loading').hide();
		  $('#loading .dog-icon').removeClass('dogMove');
		  $('#loading .dog-p').removeClass('dog-p-move');
		  $('.page1').show();
		  $('.music').show();
		  $('.logo').show();
		  var homeSwiper;
		  var flag = false;
		  var initFlag = false;
		  homeSwiper = new Swiper('#homeSlider', {
			  //loop:true,       //循环切换
			  nextButton: '.swiper-button-next',
			  prevButton: '.swiper-button-prev',
			  //noSwiping : true,
			  effect : 'fade',
			  fade: {
				crossFade: true,
			  },
			  onInit: function (swiper) {
				  if(initFlag==false){
					  initFlag=true;
					  swiperAnimateCache(swiper);
					  swiperAnimate(swiper);
					  if(flag==false){
					  setTimeout(function(){
						$('.slide1 .p1').removeClass('ani fadeInRight animated').css({'animation-duration': '2s','-webkit-animation-duration': '2s','animation-delay': '0s','-webkit-animation-delay': '0s'}).addClass('pMove1');
						$('.slide1 .p2').removeClass('ani fadeInRight animated').css({'animation-duration': '2s','-webkit-animation-duration': '2s','animation-delay': '0s','-webkit-animation-delay': '0s'}).addClass('pMove2');
						$('.swiper-slide .ele6').fadeIn();
						$('.swiper-slide .ele7').fadeIn();
						$('.swiper-slide .ele8').fadeIn();
						$('.swiper-slide .ele9').fadeIn();
					  },2000);
					  }
				  }
			  },
			  onSlideChangeEnd: function (swiper) {
				  flag = true;
				  $('.p1').removeClass('pMove1');
				  $('.p2').removeClass('pMove2');
				  $('.p4').removeClass('pMove4');
				  //swiperAnimate(swiper);
				  if(swiper.activeIndex==0){
						$('.slide1 .p1').css({'animation-duration': '2s','-webkit-animation-duration': '2s','animation-delay': '0s','-webkit-animation-delay': '0s'}).addClass('pMove1');
						$('.slide1 .p2').css({'animation-duration': '2s','-webkit-animation-duration': '2s','animation-delay': '0s','-webkit-animation-delay': '0s'}).addClass('pMove2');
				  }
				  if(swiper.activeIndex==1){
						$('.slide2 .p1').addClass('pMove1');
						$('.slide2 .p2').addClass('pMove2');
				  }
				  if(swiper.activeIndex==2){
						$('.slide3 .p1').addClass('pMove1');
						$('.slide3 .p4').addClass('pMove4');
				  }
			  }
		
		  });
		  
	}


	$('.js-share-btn').click(function(){
		$('.js-share-pop').show();	
		$('.mask').show();
	});
	$('.js-share-pop').click(function(){
		$('.js-share-pop').hide();	
		$('.mask').hide();
	});
	
	$('.rule-btn').click(function(){
		$('.rule-pop').show();	
		$('.mask1').show();
	});

	$('.close-btn').click(function(){
		$('.rule-pop').hide();	
		$('.mask1').hide();
	});
	



 
 $('.js-restart').on('click',function() {
 	homeSwiper.slideTo(1);
 });
 


 

});

