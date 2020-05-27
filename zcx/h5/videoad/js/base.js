(function($){
	var curUrl = window.location.hash;
	var urlArg=curUrl.substr(1); 
	var mySwiper = new Swiper ('#swiper-container-v ', {
	initialSlide : urlArg,
	 direction : 'vertical',
	 noSwiping : true,
	 onInit: function(swiper){
	    swiperAnimateCache(swiper);
	    swiperAnimate(swiper);
	 },
	 onSlideChangeEnd: function(swiper){
		 swiperAnimateCache(swiper);
		 swiperAnimate(swiper);
		if(swiper.activeIndex==1){
			if($('.page2-2').is(":hidden")){
			$('.swiper-slide').eq(swiper.activeIndex).addClass('swiper-no-swiping');
            setTimeout(function(){
				$('.page2-2').show();
				$('.swiper-slide').eq(swiper.activeIndex).removeClass('swiper-no-swiping');
			},2800);
			}
         };
		 
		
	 }	    
   }); 
   
   $('.js-page1-btn').click(function(){
		mySwiper.slideNext();
	});
   
	
})(jQuery);

