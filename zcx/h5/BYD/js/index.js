$(document).ready(function(){
	
	
	// 点击弹层
   
    $('.pop-list li').on('click', function (e) {
		e.preventDefault();
        e.stopPropagation();
		if($(this).hasClass('cur')){
		  var imgSrc = $(this).attr('data-info');
		  $('.popp-msg').find('img').attr('src',imgSrc);
		  $('.mask').show();
		  $('.pop-box').show();
		}else{
		  var imgSrc = 'images/tc00.png';
		  $('.popp-msg').find('img').attr('src',imgSrc);
		  $('.mask').show();
		  $('.pop-box').show();
		}
    });	  
	
	$('.nav li').on('click', function (e) {  
		$(this).find('a').addClass('cur')
		$(this).siblings('li').find('a').removeClass('cur')
	});	
		  
	// 关闭弹层
    $('.pop-box,.mask').on('click', function (e) {
        e.stopPropagation();
        $('.mask').hide();
        $('.pop-box').hide();
    });
	
	//中奖人员滚动列表
	var AutoRoll = function(){
		$(".lottery_list").animate({
			marginTop:"-30px"
		},500,function(){
			$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
		});
	};
    var startRoll = setInterval(AutoRoll,3000);
	
	
	//tab切换
	$(".js-tab-menu").find("li").click(function(){
		var $this = $(this);
		var $thisIndex = $this.index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
	});
	
	$(".bar-btn").click(function(e){
		$('.nav').stop().slideToggle();
		
        $(document).one("click", function () {
            $('.nav').slideUp();
        });
        e.stopPropagation();
	});
	
	var tmpWid=$(window).width();
	if(tmpWid<1000){
		var VSlider = new Swiper('#VSlider',{
			  loop:true,       //循环切换
			  autoplay : 4000,
			  slidesPerView: 3,
        	  spaceBetween: 6,
			  nextButton: '#VSlider .swiper-button-next',
			  prevButton: '#VSlider .swiper-button-prev',
          });
		
		var Swiper1 = new Swiper('#Slider1',{
			  loop:true,       //循环切换
			  autoplay : 3000,
			  slidesPerView: 3,
        	  spaceBetween: 6,
			  nextButton: '#Slider1 .swiper-button-next',
			  prevButton: '#Slider1 .swiper-button-prev',
          });
	
		var Swiper2 = new Swiper('#Slider2',{
			  loop:true,       //循环切换
			  slidesPerView: 3,
        	  spaceBetween: 6,
			  nextButton: '#Slider2 .swiper-button-next',
			  prevButton: '#Slider2 .swiper-button-prev',
          });
	  
	}else{
		var txtSwiper = new Swiper('#txtSlider',{
			  autoplay : 3000,
			  loop:true,       //循环切换
			  pagination: '.swiper-pagination',
        	  paginationClickable: true
          });
	
	var VSlider = new Swiper('#VSlider',{
			  loop:true,       //循环切换
			  autoplay : 4000,
			  slidesPerView: 3,
        	  spaceBetween: 16,
			  nextButton: '#VSlider .swiper-button-next',
			  prevButton: '#VSlider .swiper-button-prev',
          });
	
	var Swiper1 = new Swiper('#Slider1',{
			  loop:true,       //循环切换
			  autoplay : 3000,
			  slidesPerView: 3,
        	  spaceBetween: 16,
			  nextButton: '#Slider1 .swiper-button-next',
			  prevButton: '#Slider1 .swiper-button-prev',
          });
	
	var Swiper2 = new Swiper('#Slider2',{
			  loop:true,       //循环切换
			  slidesPerView: 3,
        	  spaceBetween: 16,
			  nextButton: '#Slider2 .swiper-button-next',
			  prevButton: '#Slider2 .swiper-button-prev',
          });
		
	}

	$('.floor4').on('click','.video-img',function(){
		var videoSrc = $(this).attr('data-video-src');
		var videoHtml = '<div class="video-iframe"><iframe frameborder="0" src=' + videoSrc + ' allowfullscreen /></div>';
        $('.video-file').html(videoHtml);
		$('.video-mask').show();
		$('.video-file').show();
		//$('html,body').css({overflow:'hidden',height:'100%'});
    });
    
    // 关闭手机视频
    $('.video-close-btn,.video-mask').click(function(e){
		e.stopPropagation();
        $('.video-mask').hide();
        $('.video-file').hide();
		$('.video-file').html("");
		//$('html,body').css({overflow:'auto',height:'auto'});
    });
	
	$('.floor4').on('click','.img-click',function(){
		var imgSrc = $(this).attr('data-big-img');
		var imgPopHtml = '<div class="img-box"><img src=' + imgSrc + ' /></div>';
        $('.img-file').html(imgPopHtml);
		$('.img-mask').show();
		$('.img-file').show();
		//$('html,body').css({overflow:'hidden',height:'100%'});
    });
    
    // 关闭手机视频
    $('.img-close-btn,.img-mask').click(function(e){
		e.stopPropagation();
        $('.img-mask').hide();
        $('.img-file').hide();
		$('.img-file').html("");
		//$('html,body').css({overflow:'auto',height:'auto'});
    });
	
	
});


