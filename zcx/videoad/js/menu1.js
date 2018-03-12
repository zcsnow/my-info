(function($){
	var tranlateY = 0;
	var imgGifUrl;
	var imgGif = new Image();
	imgGif.onload = function (){
		imgGifUrl=imgGif.src;
		scrollAuto();
	};
	imgGif.src='http://zbaicai.com/zcx/videoad/images/mzvideo.gif';
	
	function scrollAuto(){
	  var menu1Height = $('.menu1-box .indexcon').height();
	  var picconHeight = $('.menu1-box .indexcon .piccon').height();
	  var screenHeight = $('body').height();
	  var timeInterval = setInterval(function(){
		  //if($(".menu1-box").scrollTop() > (picconHeight)){
			  if(tranlateY > (picconHeight)){
			  
			  clearInterval(timeInterval);
			  $('.mzvideo').addClass('scaleInOut');
			  setTimeout(function(){
				  $('.mzvideo img').attr('src',imgGifUrl);
				  $('.mzvideotips').show();
			  },1000);
			  setTimeout(function(){

				  $('.swiper-slide').eq(0).removeClass('swiper-no-swiping');
				   mySwiper.slideTo(1);
				   $('.menu1-2').show();

			  },7000);
			  
			  
		  }
		  tranlateY+=2;
		  $('.menu1-box .indexcon').css({'transform':'translate3d(0px, -' + tranlateY + 'px, 0px)','-webkit-transform':'translate3d(0px, -' + tranlateY + 'px, 0px)'});
		  //$(".menu1-box").scrollTop($(".menu1-box").scrollTop() + 2);
	  },10);
	};
	
	var mySwiper = new Swiper ('#swiper-container1', {
	 direction : 'vertical',
	 noSwiping : true,
	 onInit: function(swiper){
		 
	 },
	 onSlideChangeEnd: function(swiper){
		/* if(swiper.activeIndex==0){
		 	$('.menu1-2').hide();
			$('.xxlbtn').removeClass('toswitchAni_sj');
			$('.menu1-box').delay(500).show();
			$(".menu1-box").scrollTop(0);
			scrollAuto();
         }*/
	 }	    
   }); 

   
	
})(jQuery);

