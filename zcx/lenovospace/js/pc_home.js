$(document).ready(function(){
        $('.flexslider').flexslider({
            directionNav: true,
            pauseOnAction: false
        });
		var animateMove1Y,animateMove2Y,animateMove3Y,animateMove4Y,animateMove5Y;
		setTimeout(function(){
		    animateMove1Y = parseInt($('.home-box1').offset().top),
			animateMove2Y = parseInt($('.home-box2').offset().top),
			animateMove3Y = parseInt($('.home-box3').offset().top),
			animateMove4Y = parseInt($('.home-box4').offset().top),
			animateMove5Y = parseInt($('.home-box5').offset().top),
			animateMove1H = $('.animate-icon1').height(),
			animateMove2H = $('.animate-icon2').height(),
			animateMove3H = $('.animate-icon3').height(),
			animateMove4H = $('.animate-icon4').height(),
			animateMove5H = $('.animate-icon5').height();  
		},10);
		var sclTop=0,t=0;  
		var desVal = 250,desVal2 = 250; 
		$(window).scroll(function(e){
			  sclTop = $(this).scrollTop();  
			  var windowHeight = $(window).height();
			  var sclTop1 = $(document).scrollTop();  
			  if(t<=sclTop){//下滚  
				  if(sclTop > animateMove1Y && sclTop < animateMove2Y-desVal){
					  $('.animate-icon1').removeClass('animate1-move-out').addClass('animate1-move');
				  }
				  if(sclTop >= animateMove2Y-desVal && sclTop < animateMove3Y-desVal){
					  $('.animate-icon2').removeClass('animate2-move-out').addClass('animate2-move');
				  }
				  if(sclTop >= animateMove3Y-desVal && sclTop < animateMove4Y-desVal){
					  $('.animate-icon3').removeClass('animate3-move-out').addClass('animate3-move');
				  }
				  if(sclTop >= animateMove4Y-desVal && sclTop < animateMove4Y+300){
					  $('.animate-icon4').removeClass('animate4-move-out').addClass('animate4-move');
				  }
				  if(sclTop >= animateMove4Y+300){
					  $('.animate-icon5').removeClass('animate5-move-out').addClass('animate5-move');
				  }
			  } else{//上滚   
				  if(sclTop >= animateMove4Y+300&& sclTop < animateMove5Y+300){
					  $('.animate-icon5').removeClass('animate5-move').addClass('animate5-move-out');
				  }
				  if(sclTop >= animateMove4Y-desVal2 && sclTop < animateMove4Y+300){
					  $('.animate-icon4').removeClass('animate4-move').addClass('animate4-move-out');
				  }
				  if(sclTop >= animateMove3Y-desVal2 && sclTop < animateMove4Y-desVal2){
					  $('.animate-icon3').removeClass('animate3-move').addClass('animate3-move-out');
				  }
				  if(sclTop >= animateMove2Y-desVal2 && sclTop < animateMove3Y-desVal2){
					  $('.animate-icon2').removeClass('animate2-move').addClass('animate2-move-out');
				  }
				  if(sclTop < animateMove2Y-desVal2){
					  $('.animate-icon1').removeClass('animate1-move').addClass('animate1-move-out');
				  }
			  }  
			  setTimeout(function(){t = sclTop;},0); 
		  
			  if(sclTop1 > windowHeight){
				  $('#gotop').slideDown();
			  }else{
				  $('#gotop').slideUp();
			  }		
	  });
});

      
$('#gotop').click(function(){
	$("html,body").animate({scrollTop:0});
})	