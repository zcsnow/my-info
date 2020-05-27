;$(function(){

var flag = true;
//点赞
$('.like').click(function(){
	var likeNum = parseInt($(this).text());
	if($(this).hasClass('liked'))
	{
		popTip('你已经赞过了！');
	}else{
	   $(this).addClass('liked');
	   likeNum++;
	   $(this).html('<i class="icon-heart-empty"></i>'+likeNum);
	   $(this).find('i').removeClass('icon-heart-empty').addClass('icon-heart');
	}
})


//点击发布评论
$('.post-btn').click(function(){
	/*$.ajax({
		type: "POST",
		url: "",         
		success: function(e){
			
		}
	})*/
	
	popTip('提交成功，等待审核');


})


//点击图片查看大图
var popImgArr = [];
$('.active-page').on('click','.dynamic-img li', function(e){
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




var imgLength = $('.post-form .img-list').length;
$('.post-form #file').change(function() { 
	if(imgLength<3){
		var file = this.files[0]; 
		console.log(file.name);
		var r = new FileReader(); 
		r.readAsDataURL(file); 
		$(r).load(function() { 
			var div_img = '<div class="img-list"><img src="' + this.result + '" alt="" /><a href="javascript:;" class="delete-btn"><img src="images/close-btn.png" /></a></div>';
			$('.fuc').before(div_img);
			imgLength = $('.upload-list .img-list').length;
			
		});
	}else{
	  alert('最多能上传3张图片');
	}
});

$('.post-form .upload-list').on('click','.delete-btn',function(e){
  e.stopPropagation();
  $(this).parent().remove();
});


});