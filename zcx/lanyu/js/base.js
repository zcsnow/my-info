;$(function(){
	setTimeout(function(){
		$('.loading').hide();
	},1000);
	
//是否同意选择
$('.check-box').click(function(){
	if($('.check-box i').hasClass('icon-check')){
		$('.check-box i').removeClass('icon-check').addClass('icon-check-empty');
	}else{
		$('.check-box i').removeClass('icon-check-empty').addClass('icon-check');
		$('.pay-tip-text').hide();
		$('.js-go-pay').removeClass('warning');
	};
});
$('.js-go-pay').click(function(e){
	e.preventDefault();
	if(!$('.check-box i').hasClass('icon-check')){
		$('.pay-tip-text').show();
		$(this).addClass('warning');
	}else{
		$('.js-go-pay').removeClass('warning');
		window.location = "http://baidu.com"; 
	}
});


 

//给元素加最小高度
var payMinHeight = $(window).height() - $('.header').height() - $('.weibo-box').height() - $('footer').height() - 62;
$('.js-ay-notice-box').css({minHeight:payMinHeight});

//点击导航按钮
$('.bar-btn').click(function(){
	if($('.bar-btn').hasClass('open')){
		$('.bar-btn').removeClass('open');
		$('.bar-list-mask').hide();
		$('.main').removeClass('blur');
		$('.js-bar-list').addClass('slideOutRight').removeClass('slideInRight');
		$('html,body').css({overflow:'auto',height:'auto'})
		
	}else{
		$('.bar-btn').addClass('open');
		$('.bar-list-mask').show();
		$('.main').addClass('blur');
		$('.js-bar-list').addClass('slideInRight').removeClass('slideOutRight');
		$('html,body').css({overflow:'hidden',height:'100%'});
	}
});

$('.list-level1').click(function(e){
	var subListLength = $(this).parent().find('.sub-list').length;
	if(subListLength){
		e.preventDefault();
		$(this).parent().find('.sub-list').slideToggle().parent().siblings().find('.sub-list').slideUp();
	}
	
});

	
//轮播图
var mySwiper = new Swiper('#slider',{
	loop:true,       //循环切换
	autoplay: 3000,  //自动播放
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
	pagination:'#slider .swiper-pagination', //分页
	paginationClickable: true,
});
//轮播图
var mySwiper = new Swiper('#slider2',{
	loop:true,       //循环切换
	autoplay: 3000,  //自动播放
	autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
	pagination:'#slider2 .swiper-pagination', //分页
	paginationClickable: true,
});

//轮播图
var mySwiper = new Swiper('#designer',{
	loop:true,       //循环切换
	autoplay: 3000,  //自动播放
	autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
	pagination:'#designer .swiper-pagination', //分页
	paginationClickable: true,
});



//轮播图
var homeSwiper = new Swiper('#homeSlider',{
	loop:true,       //循环切换
	autoplay: 3000,  //自动播放
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
	pagination:'.swiper-pagination', //分页
	paginationClickable: true,
});

//轮播图
var starSwiper = new Swiper('#starSlider',{
	loop:true,       //循环切换
	autoplay: 3000,  //自动播放
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
	pagination:'.swiper-pagination', //分页
	paginationClickable: true,
	effect : 'coverflow',
	centeredSlides: true,
	coverflow: {
		rotate: 0,
		stretch: 68,
		depth: 50,
		modifier: 4,
		slideShadows : false
	}
});






//登陆验证
function MobileErrorTip() {
	$(".prompt").css({height:'20px',marginTop:'5px'});
	$(".prompt").html("请输入正确手机号");
	$("#J_yzm").removeClass('error');
	$("#J_mobileNum").addClass('error');
};

function yzmErrorTip() {
  $(".prompt").html("验证码输入不正确");
 $(".prompt").css({height:'20px',marginTop:'5px'});
  $("#J_mobileNum").removeClass('error');
  $("#J_yzm").addClass('error');
 
};

function removeErrorTip(){
  $(".prompt").html("");
  $(".prompt").css({height:'0',marginTop:'0'});
  $("#J_mobileNum").removeClass('error');
  $("#J_yzm").removeClass('error');
  
}
//点击领取按钮时验证输入内容是否正确
var isMobile=/^1[358]\d{9}$/; //手机号码验证规则
$(".js-start-btn").click(function(){
	if ($.trim($("#J_mobileNum").val()) == "" || !isMobile.test($("#J_mobileNum").val())){
		MobileErrorTip();
		return;
	};	
	if ($.trim($("#J_yzm").val()) == ""){
		yzmErrorTip();
		return;
	};
	
	removeErrorTip();
	return;		
});	

//判断手机输入框内容长度
$("#J_mobileNum").on("keyup", function(){
	var len = $(this).val().length;
	if(len == 11){
		$(this).blur();
	}
});
$("#J_yzm").on("keyup", function(){
	var len = $(this).val().length;
	if(len == 6){
		$(this).blur();
	}
});

	
//获取验证码
var flag = 0;
var isS = 0;//true; //是否领过
$("#passwordGetCode").click(function() {
	
	if(isS){
		popBox();
		return;	
	}

	if ($.trim($("#J_mobileNum").val()) == "" || !isMobile.test($("#J_mobileNum").val())){
		MobileErrorTip();
		return;
	}else{
		
		if($("#passwordGetCode").hasClass('recode')){
			$('.graphics-code').css({height:'40px',marginTop:'10px'});
		}
		if($("#J_yzm").hasClass('error')){
			//$('.graphics-code').show();
		}else{
			removeErrorTip();
		}	
	}
	
	if(flag!=0){
		return false;
	}
	
	flag = 1;
	var delay = 2, trigger = this, revert = $(trigger).text();
	$("#passwordGetCode").addClass('btn_gradient_gray');
	$(trigger).attr({'disabled': true }).text(delay + $(trigger).attr("data-waiting")).parents("label").addClass("waiting");
	var counter = setInterval(function() {
		$(trigger).text($(trigger).text().replace(delay, --delay));
		if(delay == 0) {
			flag = 0;
			window.clearInterval(counter);
			$(trigger).text(revert).removeAttr("disabled").parents("label").removeClass("waiting");
			$("#passwordGetCode").removeClass('btn_gradient_gray');
			$("#passwordGetCode").html("重新获取");
			$("#passwordGetCode").addClass('recode');
		}
	}, 1000);
});

//领过弹出层
function popBox(){
	$('#popup_overlay').show();
	$('#popup_container').show();
	setTimeout(function(){
		$('#popup_overlay').hide();
		$('#popup_container').hide();
	},2000);
};

//地址删除
$('.js-delete-ads-btn').click(function(e){
	$(this).parent().parent().remove();;
});

//我喜欢
$('.js-like').click(function(e){
	e.preventDefault();
	var randomNum = Math.ceil(Math.random()*10);
	var imgSrc = "images/like_text" + randomNum + ".png";
	$('.like-text').find('img').attr('src',imgSrc);
	$('.like-text').stop().fadeIn();
	$('.bar-list-mask').show();
	setTimeout(function(){
		$('.like-text').stop().fadeOut();
		$('.bar-list-mask').hide();
	},2000);
});

//选择尺码
$('.js-size-list li').click(function(){
	$(this).toggleClass('cur').siblings().removeClass('cur');
});

//选择颜色
$('.js-color-list li').click(function(){
	$(this).toggleClass('cur').siblings().removeClass('cur');
});

});