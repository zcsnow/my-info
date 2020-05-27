;$(function(){
	
  //首页轮播图
  if($('#homeSlider').length>0){
	var homeSwiper = new Swiper('#homeSlider',{
		loop:true,       //循环切换
		autoplay: 3000,  //自动播放
		autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
		pagination:'.swiper-pagination', //分页
		paginationClickable: true,
		//effect : 'coverflow',
	});
  };
  
  //品牌详情轮播图
  if($('#brandSlider').length>0){
	var brandSwiper = new Swiper('#brandSlider',{
		autoHeight: true,
		pagination:'.swiper-pagination', //分页
		paginationClickable: true,
		//effect : 'coverflow',
		/*effect : 'flip',
		flip: {
            slideShadows : true,
            limitRotation : true,
        }
		effect : 'cube',
		cube: {
		  shadow: false,
		}*/
		onSlideChangeStart: function(swiper){ 
		var slidesLength = swiper.slides.length -1;
		  if(swiper.activeIndex== slidesLength){
		  	$('.mask-footer .cart-icon').css("display","inline-block");
			$('.mask-footer .js-brand-collect-icon').hide();
		  }else{
		  	$('.mask-footer .cart-icon').hide();
			$('.mask-footer .js-brand-collect-icon').show();
			
		  }
		} 
		
		
	});
  };
  
  //tab切换
  $(".js-tab-menu").find("li").click(function(){
	  var $this = $(this);
	  var $thisIndex = $this.index();
	  $(this).addClass("curr").siblings().removeClass("curr");
	  $(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
  });
  
  //滚动页面导航固定
  if($('.js-tab-menu-box').length>0){
	$(window).scroll(function(){
	   topFixed('.js-tab-menu-box');
	});
  };
  
  //品牌详情点击收藏
  $(".js-brand-collect-icon").click(function(){
	  if(!$(this).hasClass("cur")){
		  $(this).addClass("cur");
		  $(this).find('i').removeClass('icon-heart-empty').addClass("icon-heart");
		  return jShare('收藏成功',"","");
	  }else{
		  $(this).removeClass("cur");
		  $(this).find('i').removeClass("icon-heart").addClass('icon-heart-empty');
		  return jShare('取消收藏',"","");
	  }
	  return false;
			  
  });
  
  
  $('.js-ques-list li').click(function(){
  		$(this).addClass('cur').siblings().removeClass('cur');
  });
  
  $(".js-add-cart-btn").click(function(e){
	  e.preventDefault();
	  
	 return jShare('商品已添加到购物车',"","");
	  
  });
  
  


});