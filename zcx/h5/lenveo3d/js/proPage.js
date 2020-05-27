$(function() {
	//initScripts();
	//点击图片查看大图
	
	/*var space = document.getElementById('deviceBox');
	if (window.DeviceOrientationEvent) {

		window.addEventListener('deviceorientation', function(event) {
			var alpha = event.alpha,
				beta = event.beta,
				gamma = event.gamma;

			space.style.webkitTransform = 'rotateX(' + beta + 'deg) rotateY(' + gamma + 'deg) rotateZ(' + alpha + 'deg)';
			space.style.transform = 'rotateX(' + beta + 'deg) rotateY(' + gamma + 'deg) rotateZ(' + alpha + 'deg)';

		}, false);
	} else {
		document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
	}*/
	
	var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
	};
	//滚动条不可滚动、高度100%
	//tool.disabledScroll();
	
	
	var $scene = $('#deviceBox').parallax({
          limitY: false,
          scalarX: 6,
          scalarY: 6,
          frictionX: 0.2,
          frictionY: 0.8
    });

	$('.box').on('click','#Ellipse>img', function(e){
		$('.js-pop-box').children().remove();
		var popImgSrc = $(this).attr('src');
		var proTitle = $(this).attr('data-title');
		var prodesc = $(this).attr('data-desc');
		var proName = $(this).attr('name');
		var proHref = $(this).attr('data-href');
		var html='';
			html += '<div class="pop-container">';
			html += '<div class="pop-txt">';
            html += '<h3>'+ proTitle +'</h3>';
            html += '<p>'+ prodesc +'</p>';
			if(proHref!=""){
			html += '<a class="more" href='+ proHref +'>了解更多>></a>';	
			}
			html += '</div>';
			if(proName=="eduIcon1"){
			html += '<div class="pop-img"><img class="lazyload eduIcon1" data-src='+popImgSrc+' ></div>';	
			}else if(proName=="eduIcon2"){
			html += '<div class="pop-img"><img class="lazyload eduIcon2" data-src='+popImgSrc+' ></div>';
			}else{
			html += '<div class="pop-img"><img class="lazyload" data-src='+popImgSrc+' ></div>';
			}
			html += '</div>';
			
	
		/*var html='';
			html += '<div class="swiper-container" id="imgSlider">';
			html += '<div class="swiper-wrapper">';
			$.each(popImgArr,function(index,value){
				 html += '<div class="swiper-slide"><img class="lazyload" data-src='+value+' ></div>';
			});
			html += '</div>';
			html += '<div class="swiper-pagination"></div>';
			html += '</div>';*/
		
		$('.js-pop-box').append(html);
		//setTimeout(function(){
			$('.pro-container').addClass('blur');
			$('.pop-mask').fadeIn();
			$('.hand-btn').hide();
		//},500);
		
		
		/*if($('#imgSlider').length>0){
		  if($('#imgSlider .swiper-slide').length>1){
				var detailSlider = new Swiper('#imgSlider',{
					initialSlide :initialSlide,
					pagination:'.swiper-pagination',
					paginationClickable: true,
				});
		   }
		};*/
	
		
	});
	
	$('.pop-mask').on('click',function(e){
		$('.pop-mask').hide();
		$('.blur-mask').hide();
		$('.pro-container').removeClass('blur');
		//$('.tip').removeClass('tipMove');
		$('.tip').css({'right':'2%','z-index':6});
		$('.js-pop-box').children().remove();
	});
	
	$('.tip').click(function(e){
		//alert(1);
		$(this).css({'right':'74%','z-index':1006});
		$('.js-pop-box').children().remove();
		var tipTxt = $(this).attr('data-txt');

		var html='';
			html += '<div class="tip-box">';
			//html += '<div class="tip-icon"><img src="img/bank_pro_tip.png" /></div>';
            html += '<p>'+ tipTxt +'</p>';
			html += '<div class="overlay-bottom overlay-bottom-animate"></div>';
			html += '<div class="overlay-left overlay-left-animate"></div>';
			html += '<div class="overlay-top overlay-top-animate"></div>';
			html += '<div class="overlay-right overlay-right-animate"></div>';
			html += '<div class="tip-close"><img src="img/back_btn.png" /></div>';
			html += '</div>';
			
		$('.js-pop-box').append(html);
		setTimeout(function(){
			$('.blur-mask').fadeIn();
			$('.pro-container').addClass('blur');
			$('.pop-mask').fadeIn();
		},300)
		
	});
	
	
})
var imageRotater = null;
function initScripts(){
   imageRotater = ImageRotatorJS('Ellipse','RotatingIcon',1,110,0, 0, 90, 40, null);
   $('#Ellipse>div').remove();
   $('#Ellipse').css('visibility','visible')
   //$('.ellipse-box').addClass('flip1');
   setTimeout(function(){
   	IRJS_StartRotation('Ellipse',-1);
   },100);
   setTimeout(function(){
   	$('.hand-btn').show();
   },1000);
   
   
   $(".box").on("touchstart", function(e) {
		
		startX = e.originalEvent.changedTouches[0].pageX,
		startY = e.originalEvent.changedTouches[0].pageY;
	});
	$(".box").on("touchend", function(e) {         
		          
		moveEndX = e.originalEvent.changedTouches[0].pageX,
		moveEndY = e.originalEvent.changedTouches[0].pageY,
		X = moveEndX - startX,
		Y = moveEndY - startY;
		//左滑
		if ( X > 80 ) {
			//alert('左滑');
			IRJS_StartRotation('Ellipse',-1);                
		}
		//右滑
		else if ( X < -80 ) {
			//alert('右滑');    
			IRJS_StartRotation('Ellipse',1);
		}
	})
}


  
	
	