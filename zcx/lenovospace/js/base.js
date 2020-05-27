;$(function(){

//点击导航按钮
$('.js-bar-btn,.hand-btn').click(function(e){
	e.stopPropagation();
    $(".hand-btn").hide();
	if($('.js-bar-btn').hasClass('open')){
		$('.js-bar-btn').removeClass('open');
		$('.js-bar-list').addClass('slideOutRight').removeClass('slideInRight');
		$('html,body').css({overflowY:'auto',height:'auto'});
		
	}else{
		$('.js-bar-btn').addClass('open');
		$('.js-bar-list').addClass('slideInRight').removeClass('slideOutRight');
		$('html,body').css({overflow:'hidden',height:'100%'});
		$('.download-pop').hide();
	}
});

$(document).click(function(e){
	if($('.bar-btn').hasClass('open')){
		$('.bar-btn').removeClass('open');
		$('.bar-btn').removeClass('open');
		$('.js-bar-list').addClass('slideOutRight').removeClass('slideInRight');
		$('html,body').css({overflowY:'auto',height:'auto'});
	}
});


//内容提交
$(".btn-submit").click(function (e) {
	e.preventDefault();
	 
	    var urls=$("#emailurl").val();
        var username=$("#username").val();
        var email=$("#emial").val();
        $.ajax({url:"/Mobile/Message.ashx?name="+username+"&email="+email+"&url="+urls})
		alert('邮件发送成功'); 
        $('.download-pop').hide();
	 
});

$('.js-bar-list').click(function(e){
	e.stopPropagation();
});


$('.list-level1').click(function(e){
	var subListLength = $(this).parent().find('.sub-list').length;
	if(subListLength){
		e.preventDefault();
		$(this).parent().find('.sub-list').slideToggle().parent().siblings().find('.sub-list').slideUp();
	}
	
});


//轮播图
if($('#homeSlider .swiper-slide').length>1){
var homeSwiper = new Swiper('#homeSlider',{
	loop:true,       //循环切换
	autoplay: 3000,  //自动播放
	autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
	pagination:'.swiper-pagination', //分页
	paginationClickable: true,
});
}


//tab切换
	$(".js-tab-menu").find("li").click(function(){
		var $this = $(this);
		var $thisIndex = $this.index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
	});


$('.info-btn').on('click',function(){
	$('.share-page').hide();
	$('.info-page').show();
});
$('.js-download-btn').on('click',function(){
	var downUrl = $(this).parent().attr('data-url');
    $("#emailurl").val(downUrl);
	$('.download-pop').show();
});
$('.js-close-btn').on('click',function(){
	$('.download-pop').hide();
});


$('#gotop').click(function(){
	$("html,body").animate({scrollTop:0});
})
if(!$('#homeSlider').length){
$('.hand-btn').hide();
}

var animateMove1Y,animateMove2Y,animateMove3Y,animateMove4Y,animateMove5Y;
if($('.home-box1').length>0){
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
}
var sclTop=0,t=0;  
var desVal = 250,desVal2 = 450; 
$(window).scroll(function(e){
	  sclTop = $(this).scrollTop();  
	  var windowHeight = $(window).height();
	  var sclTop1 = $(document).scrollTop();  
	  if($('.home-box1').length>0){
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
		  if(sclTop >= animateMove4Y-desVal && sclTop < animateMove4Y+100){
			  $('.animate-icon4').removeClass('animate4-move-out').addClass('animate4-move');
		  }
		  if(sclTop >= animateMove4Y+100){
			  $('.animate-icon5').removeClass('animate5-move-out').addClass('animate5-move');
		  }
	  } else{//上滚   
		  if( sclTop < animateMove5Y+100){
			  $('.animate-icon5').removeClass('animate5-move').addClass('animate5-move-out');
		  }
		  if( sclTop < animateMove4Y){
			  $('.animate-icon4').removeClass('animate4-move').addClass('animate4-move-out');
		  }
		  if(sclTop < animateMove4Y-desVal2){
			  $('.animate-icon3').removeClass('animate3-move').addClass('animate3-move-out');
		  }
		  if(sclTop < animateMove3Y-desVal2){
			  $('.animate-icon2').removeClass('animate2-move').addClass('animate2-move-out');
		  }
		  if(sclTop < animateMove2Y-desVal2){
			  $('.animate-icon1').removeClass('animate1-move').addClass('animate1-move-out');
		  }
	  }  
	  setTimeout(function(){t = sclTop;},0); 
	  }
	  if(sclTop1 > windowHeight){
		  $('#gotop').slideDown();
	  }else{
		  $('#gotop').slideUp();
	  }		
  });

$(".jdttongji").click(function()
{
    var dataurl= $(this).attr("data-url");
    $.ajax({url:"/mobile/tongji.ashx?ttype=1"})
    window.location.href=dataurl;
}) ;
$(".zbtongji").click(function()
{
    var dataurl= $(this).attr("data-url");
    $.ajax({url:"/mobile/tongji.ashx?ttype=2"});
    window.location.href=dataurl;
}) ;

var curUrl = window.location.hash;
var urlArg=curUrl.substr(1); 
if(urlArg==1){
	$(".js-tab-menu li").eq(1).addClass("curr");
	$(".js-tab-menu li").eq(0).removeClass("curr");
	$(".js-tab-content .js-content-list").eq(1).show();
	$(".js-tab-content .js-content-list").eq(0).hide();
}

});