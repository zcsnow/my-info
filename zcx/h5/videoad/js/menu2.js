(function($){
	var tranlateY = 0;
	var imgGifUrl;
	var imgGif = new Image();
	imgGif.onload = function (){
		imgGifUrl=imgGif.src;
		$('.hand1').addClass('click-hand');
		setTimeout(function(){
			$('.menu2-2').show();	
			$('.menu2-1').hide();
			$('.hand2').addClass('click-hand');
		},2000);
		
		setTimeout(function(){
			$('.menu2-4').show();
			$('.menu2-2').hide();
			scrollAuto();
		},4000);
		
	};
	imgGif.src='http://zbaicai.com/zcx/videoad/images/papi2.gif';
	
	
	function scrollAuto(){
	  var menu1Height = $('.menu2-box .indexcon').height();
	  var picconHeight = $('.menu2-box .indexcon .piccon').height();
	  var screenHeight = $('body').height();
	  var timeInterval = setInterval(function(){
		  if(tranlateY > (picconHeight)){
		  //if($(".menu2-box").scrollTop() > (picconHeight)){
			  clearInterval(timeInterval);
			  $('.rmvideo').addClass('scaleInOut');
			  setTimeout(function(){
				  $('.rmvideo img').attr('src',imgGifUrl);
				    $('.mzvideotips').show();
			  },1000);
			  setTimeout(function(){
				  $('.menu2-3').show();
				  mySwiper.slideNext();
				  $('.swiper-slide').eq(0).removeClass('swiper-no-swiping');
				  
			  },7000);
		  }
		  tranlateY+=2;
		  $('.menu2-box .indexcon').css({'transform':'translate3d(0px, -' + tranlateY + 'px, 0px)','-webkit-transform':'translate3d(0px, -' + tranlateY + 'px, 0px)'});
		  //$(".menu2-box").scrollTop($(".menu2-box").scrollTop() + 2);
	  },10);
	};

	
	
	
	
	var mySwiper = new Swiper ('#swiper-container2', {
	 direction : 'vertical',
	 noSwiping : true,
	 onInit: function(swiper){
		 
	 },
	 onSlideChangeEnd: function(swiper){
		 /*if(swiper.activeIndex==0){
			$(".menu2-box").scrollTop(0);
         }*/
	 }	    
   }); 

   
	
})(jQuery);

