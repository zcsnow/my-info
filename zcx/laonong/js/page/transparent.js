$(function() {

	//点击图片查看大图
	var popImgArr = [];
	$('.dynamic-box').on('click','.dynamic-img li', function(e){
		var popImgSrc = $(this).find('img').attr('data-pop-img');
		var initialSlide = $(this).index();
		$(this).parent().find('img').each(function(i,item) {
			popImgArr.push($(item).attr("data-pop-img"));
		});

		var html='';
			html += '<div class="swiper-container" id="imgSlider">';
			html += '<div class="swiper-wrapper">';
			$.each(popImgArr,function(index,value){
				 html += '<div class="swiper-slide"><img class="lazyload" data-src='+value+' ></div>';
			});
			html += '</div>';
			html += '<div class="swiper-pagination"></div>';
			html += '</div>';
		
		$('.js-pop-box').append(html);
		$('.pop-mask').show();
		if($('#imgSlider').length>0){
		  if($('#imgSlider .swiper-slide').length>1){
				var detailSlider = new Swiper('#imgSlider',{
					initialSlide :initialSlide,
					pagination:'.swiper-pagination',
					paginationClickable: true,
				});
		   }
		};

		
	});
	
	$('.pop-mask').on('click',function(e){
		e.preventDefault();
		$('.pop-mask').hide();
		$('.js-pop-box').children().remove();
		popImgArr = [];
	});

	/*$('.dynamic-box').on('click','.play-btn',function (event) {
		 event.stopImmediatePropagation();
		 $('.iframe-box').show();
	});*/

});