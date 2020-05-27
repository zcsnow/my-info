;$(function(){ 
  var $scene = $('#scene').parallax({
	  limitY: 0,
	  scalarX: 8,
 	  scalarY: 8,
	  originX: 0,
  });
  
  //loading
    var bar = 0;
    var loadingTime;
    function progress() {
        bar = bar + 1;
        $("#loading_text").text(bar + " %");
		if (bar < 40) {
            loadingTime = setTimeout(progress, 20);
        }
		else if (bar == 40) {
            loadingTime = setTimeout(progress, 1000);
        }
		else if (bar < 70& bar > 40) {
            loadingTime = setTimeout(progress, 20);
        }
		else if (bar == 70) {
            loadingTime = setTimeout(progress, 1000);
        }
		else if (bar <= 99& bar > 70) {
            loadingTime = setTimeout(progress, 20);
        }
        else {
            $('#loading').fadeOut(1000);
            $("#media")[0].play();
            //$(".page1").show();
			//轮播图
			var homeSwiper = new Swiper('#homeSlider', {
				direction : 'vertical',
				pagination:'.swiper-pagination', //分页
				paginationClickable: true,
				onInit: function (swiper) {
						swiperAnimateCache(swiper);
						swiperAnimate(swiper);
				},
				onSlideChangeEnd: function (swiper) {
					swiperAnimate(swiper);
					if(swiper.activeIndex==3){
					  $('#array').hide();
					}
					
				}
		  
			});
		
        }

    }

    setTimeout(function(){
		$('.loading-img').addClass('zoomInOut');
		$(".loading_wrp").show();
		progress();
	},500);
  
  
  
$('.js-share-btn').on('click', function () {
    $('.js-share-pop').show();
});
$('.js-share-pop').on('click', function () {
    $('.js-share-pop').hide();
});

 
 
  $('.look-btn').on('click',function() {
	  $('#homeSlider').hide();
	  $('.page5').show();
	  
 });  
 
 
 $('.select-sex span').on('click',function() {
		$(this).addClass("cur").siblings().removeClass("cur");	
});
	
	//内容提交
$(".btn-submit").on('click',function(e) {
    e.preventDefault();
	var sex = $('.select-sex').find('.cur').text();
	//console.log(sex);
	window.location.href="share.html";
    
});


});





