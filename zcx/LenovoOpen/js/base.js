;$(function(){


/*if($('#conferenceList').length>0){
 $('#conferenceList').accordion({
	  //active: false, 
	  alwaysOpen: false, 
	  autoheight: false 
	  
  });
}*/
var curUrl = window.location.hash;
var urlArg=curUrl.substr(1); 
if(urlArg==1){
	$(".js-tab-menu li").eq(1).addClass("curr");
	$(".js-tab-menu li").eq(0).removeClass("curr");
	$(".js-tab-content .js-content-list").eq(1).show();
	$(".js-tab-content .js-content-list").eq(0).hide();
}

if(!$('#homeSlider').length){
$('.hand-btn').hide();
}

//点击导航按钮
$('.js-bar-btn,.hand-btn').click(function(e){
	e.stopPropagation();
	$('.hand-btn').hide();
	if($('.js-bar-btn').hasClass('open')){
		$('.js-bar-btn').removeClass('open');
		//$('.bar-list-mask').hide();
		//$('.main').removeClass('blur');
		
		$('.js-bar-list').addClass('slideOutRight').removeClass('slideInRight');
		$('html,body').css({overflow:'auto',height:'auto'});
		
	}else{
		$('.js-bar-btn').addClass('open');
		//$('.bar-list-mask').show();
		//$('.main').addClass('blur');
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
		$('html,body').css({overflow:'auto',height:'auto'});
	}
});


$('.star-box,.successful-box').on('click',function(){
	if($(this).hasClass('js-play')){
		$(this).removeClass('js-play');
		$(this).find('video')[0].pause();
		$(this).find('.play-icon').show();
	}else{
		$(this).addClass('js-play');
		$(this).find('.play-icon').hide();
		$(this).find('video')[0].play();
		$(this).siblings().find('video')[0].pause();
		$(this).siblings().find('.play-icon').show();
	}
		
	
});

//内容提交
$(".btn-submit").click(function (e) {
	e.preventDefault();
	if ($("#form").valid()) {

	   /* var userinfo =
		{
			username: $("#last-name").val(),
			phone: $("#phone").val(),
		};
		var reslt = $.ajax({ url: "/CompanyProject/Geelysjyg/GeelyUserinfo.ashx", data: userinfo, type: "post", async: false });
		var jieguo = reslt.responseText;*/

		alert('提交成功');

	}
});

if($('#form').length>0){
  $("#form").validate({
	  //错误信息提示
	  errorPlacement: function (error, element) {
		  error.appendTo(element.siblings(".error_tip"));
	  }
  });
}

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
if($('#homeSlider2 .swiper-slide').length>1){
var homeSwiper2 = new Swiper('#homeSlider2',{
	loop:true,       //循环切换
	autoplay: 3000,  //自动播放
	autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
	pagination:'.swiper-pagination2', //分页
	paginationClickable: true,
});
}

if($('#homeSlider3 .swiper-slide').length>1){
var homeSwiper3 = new Swiper('#homeSlider3',{
	loop:true,       //循环切换
	autoplay: 3000,  //自动播放
	autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
	pagination:'.swiper-pagination3', //分页
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
	//$('.info-page').hide();
	var downUrl = $(this).parent().attr('data-url');
	console.log(downUrl);
	$('.download-pop').show();
});
$('.js-close-btn').on('click',function(){
	$('.download-pop').hide();
});


$('#gotop').click(function(){
	$("html,body").animate({scrollTop:0});
})

$(window).scroll(function(e){
	var windowHeight = $(window).height();
	var sclTop = $(document).scrollTop();
	if(sclTop > windowHeight){
		$('#gotop').slideDown();
	}else{
		$('#gotop').slideUp();
	}		
});




});