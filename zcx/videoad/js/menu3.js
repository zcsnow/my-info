(function($){
	
	var tranlateY = 0;	
	var papi1Src,papi3Src;
	
	var img1Gif = new Image();
	img1Gif.onload = function (){
		papi1Src=img1Gif.src;
		$('.hand1').addClass('click-hand');
		setTimeout(function(){
			$('.papi img').attr('src',papi1Src);
			$('.menu3-box').show();	
			$('.menu3-1').hide();
			setTimeout(function(){	
				scrollAuto();
			},5000);
	
		},2000);
	};
	img1Gif.src="http://zbaicai.com/zcx/videoad/images/papi.gif";		

	var img3Gif = new Image();
	img3Gif.onload = function (){
		papi3Src=img3Gif.src;
	};
	img3Gif.src="http://rm.sina.com.cn/minisite/videoad/images/wbvideo.gif";		
			
	function scrollAuto(){
		var menu1Height = $('.menu3-box .indexcon').height();
		var piccon1Height = $('.menu3-box .indexcon .piccon1').height();
		var piccon2Height = $('.menu3-box .indexcon .piccon2').height();
		var piccon3Height = $('.menu3-box .indexcon .piccon3').height();
		var screenHeight = $('body').height();
	  	var timeInterval = setInterval(function(){
		  
		  //if($(".menu3-box").scrollTop() > (menu1Height-screenHeight-150)){
		  if(tranlateY > (menu1Height-screenHeight-150)){
			  
			  clearInterval(timeInterval);
			  $('.papi3 img').attr('src',papi3Src);
			  setTimeout(function(){
				  window.location.href = "index.php#2";
			  },4000); 
		  }
		  
		  tranlateY+=2;
		  $('.menu3-box .indexcon').css({'transform':'translate3d(0px, -' + tranlateY + 'px, 0px)','-webkit-transform':'translate3d(0px, -' + tranlateY + 'px, 0px)'});
		  
		  //$(".menu3-box").scrollTop($(".menu3-box").scrollTop() + 1);
		  
	  },10);
	  
	};
	
	/*var A=1;
	function interval(){
		var menu1Height = $('.menu3-box .indexcon').height();
		var piccon1Height = $('.menu3-box .indexcon .piccon1').height();
		var piccon2Height = $('.menu3-box .indexcon .piccon2').height();
		var piccon3Height = $('.menu3-box .indexcon .piccon3').height();
		var screenHeight = $('body').height();
		
		
		var timeInterval = setInterval(function(){
		  console.log(1);
		  //if($(".menu3-box").scrollTop() > (menu1Height-screenHeight-150)){
		if(A==1){console.log(2);
		  if(tranlateY > (piccon1Height)){
			  console.log(piccon1Height);
			  clearInterval(timeInterval);
			  $('.papi2 img').attr('src',papi2Src);
			  
			  setTimeout(function(){
				  //window.location.href = "index.php#2";
				  A=2;
				  interval();
				  
			  },4000); 
			  return;
		  }
		}
		if(A==2){
		  if(tranlateY > (piccon1Height+piccon2Height)){
			  
			  clearInterval(timeInterval);
			  $('.papi3 img').attr('src',papi3Src);
			  
			  setTimeout(function(){
				  //window.location.href = "index.php#2";
				   A=3;
				  interval();
			  },4000);
			  return; 
		  }
		}
		if(A==3){
		  if(tranlateY > (menu1Height-screenHeight-100)){
			  
			  clearInterval(timeInterval);

			  setTimeout(function(){
				  window.location.href = "index.php#2";
				 
			  },3000);
		  }
		}
		
		  
		  tranlateY+=2;
		  $('.menu3-box .indexcon').css({'transform':'translate3d(0px, -' + tranlateY + 'px, 0px)','-webkit-transform':'translate3d(0px, -' + tranlateY + 'px, 0px)'});
		  
		  //$(".menu3-box").scrollTop($(".menu3-box").scrollTop() + 1);
		  
	  },10);
	
	}*/

	
	
	
	
	
	
	var mySwiper = new Swiper ('#swiper-container3', {
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

